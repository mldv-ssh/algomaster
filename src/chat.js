// ================== ASSISTANT (chatbot) ==================
// Deux moteurs, tous deux gratuits et sans serveur :
//  1. Assistant du cours (toujours actif) : recherche BM25 dans les leçons, la fiche, les flashcards
//     et les corrections du quiz ; exécute aussi le pseudo-code collé dans le message.
//  2. IA locale (optionnelle) : petit modèle Qwen exécuté dans le navigateur via WebLLM (WebGPU),
//     qui rédige sa réponse à partir des passages du cours trouvés par le moteur 1.
const WEBLLM_URL = "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.79/+esm";
const CHAT = { log: [], kb: null, idf: null, avgLen: 0, engine: null, model: null, loading: false, busy: false };

// ---------- base de connaissances ----------
const STOP = new Set("le la les un une des de du d l a au aux en est ce c ca cela que qui quoi quel quelle quels quelles dans pour par sur avec sans pas ne n se s son sa ses mon ma mes ton ta tes je tu il elle on nous vous ils elles me te y comment pourquoi quand combien faire fait fais veut dire explique expliquer moi peux peut svp stp entre plus moins tres bien marche fonctionne sert servir utilise utiliser qu quest cest ca".split(" "));
const SYN = { while:"tantque", for:"pour", if:"si", else:"sinon", function:"fonction", procedure:"fonction", array:"tableau", list:"tableau", liste:"tableau", sort:"tri", trier:"tri", bubble:"bulle", recursion:"recursif", recursivite:"recursif", recursive:"recursif", loop:"boucle", modulo:"mod", reste:"mod", fleche:"affectation" };
function toks(s){
  return PC.low(String(s)).replace(/tant\s*que/g,"tantque").replace(/jusqu\W?\s*a/g,"jusqua").replace(/fin\s*(si|pour|tantque)/g,"fin$1")
    .split(/[^a-z0-9]+/).filter(w=>w && !STOP.has(w)).map(w=>{
      w = SYN[w] || w;
      if(w.startsWith("recurs")) return "recurs";
      if(w.length>4) w = w.replace(/(ements?|ations?|iques?|ites?|ives?|ifs?|eurs?|es|s|x|e)$/,"");
      return w;
    });
}
const htmlText = h => h.replace(/<[^>]+>/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
const cleanHtml = h => h.replace(/<div data-trace="[^"]*"><\/div>/g,`<p class="note">▶️ L'exécution pas à pas est dans la leçon.</p>`).replace(/<div data-widget="tt"><\/div>/g,"");

function buildKB(){
  const kb = [];
  const add = (o, w=1) => { o.tt = new Set(toks(o.title)); o.t = toks(o.title).concat(toks(o.title), toks(o.text)); o.w = w; kb.push(o); };
  LESSONS.forEach(l=>{
    l.html.split(/(?=<h3>)/).forEach((p,i)=>{
      if(htmlText(p).length < 30) return; // morceau vide (leçon qui commence par un sous-titre)
      const h = (p.match(/^<h3>(.*?)<\/h3>/)||[])[1];
      add({kind:"lecon", title:l.title + (h ? " — " + htmlText(h) : ""), html:cleanHtml(p), text:htmlText(p), lesson:l.id}, i===0?1.15:1);
    });
  });
  FICHE.split(/(?=<div class="card">)/).filter(c=>c.startsWith('<div class="card">')).forEach(card=>{
    const h = htmlText((card.match(/<h3>(.*?)<\/h3>/)||[])[1]||"");
    add({kind:"fiche", title:"Fiche résumé — "+h, html:card.replace(/^<div class="card">/,"").replace(/<\/div>\s*(<\/div>\s*)?$/,""), text:htmlText(card)}, 1.1);
  });
  FLASH.forEach(([q,a])=>add({kind:"flash", title:q, html:a, text:htmlText(a)}, 1.05));
  QB.forEach(q=>{
    const good = q.t==="qcm"?q.ch[q.a]:q.t==="vf"?(q.a?"Vrai":"Faux"):q.a[0];
    add({kind:"quiz", title:q.q, html:`<p><b>${esc(good)}</b></p>${q.code?`<pre class="code">${esc(q.code)}</pre>`:""}<p>${q.e}</p>`, text:q.q+" "+good+" "+htmlText(q.e)}, 0.7);
  });
  const df = {};
  kb.forEach(d=>{ new Set(d.t).forEach(w=>df[w]=(df[w]||0)+1); });
  CHAT.idf = w => Math.log(1 + (kb.length - (df[w]||0) + .5) / ((df[w]||0) + .5));
  CHAT.avgLen = kb.reduce((s,d)=>s+d.t.length,0)/kb.length;
  CHAT.kb = kb;
}
function search(query, n=5){
  if(!CHAT.kb) buildKB();
  const qt = [...new Set(toks(query))];
  if(!qt.length) return [];
  return CHAT.kb.map(d=>{
    const tf = {}; d.t.forEach(w=>tf[w]=(tf[w]||0)+1);
    let s = 0;
    for(const w of qt){ const f = tf[w]||0; if(f) s += CHAT.idf(w) * f*2.2 / (f + 1.2*(.25 + .75*d.t.length/CHAT.avgLen)); }
    const cover = qt.filter(w=>d.tt.has(w)).length / qt.length; // bonus si la question correspond au titre
    return {d, s: s*d.w*(1 + cover)};
  }).filter(r=>r.s>0).sort((a,b)=>b.s-a.s).slice(0,n);
}

// ---------- pseudo-code collé dans le message ----------
function looksLikeCode(m){ return m.includes("\n") && /(←|<-|^\s*(afficher|lire|si\s.+\salors|pour\s|tant\s*que|fonction\s|début|debut)\b)/im.test(m); }
function runSnippet(m){
  let prog;
  try{ prog = PC.parse(m); } catch(e){ return {html:`<div class="errbox">⚠️ ${e.ln?`Ligne ${e.ln} : `:""}${esc(e.message)}</div>`, text:`erreur d'écriture ligne ${e.ln} : ${e.message}`}; }
  const r = PC.run(prog,{});
  const out = r.out.map(o=>o.text);
  const needsRead = r.err && /Lire/.test(r.err.msg);
  const html = `<div class="out">${out.length?esc(out.join("\n")):"<span class='pr'>(rien d'affiché)</span>"}</div>`
    + (needsRead ? `<p class="note">Ton code utilise <code>Lire</code> : je ne peux pas deviner les valeurs. Teste-le dans la console de l'<a onclick="go('exos')">Atelier code</a>.</p>`
      : r.err ? `<div class="errbox">⚠️ ${r.err.ln?`Ligne ${r.err.ln} : `:""}${esc(r.err.msg)}</div>` : `<p class="note">✅ Le code s'exécute sans erreur.</p>`);
  return {html, text:`affichage : ${out.join(" | ")||"rien"}${r.err?` ; erreur ligne ${r.err.ln} : ${r.err.msg}`:" ; aucune erreur"}`};
}

// ---------- réponses de l'assistant du cours ----------
const SMALL = [
  [/^(salut|bonjour|hello|coucou|hey|yo|bonsoir)\b/i, "Salut ! 👋 Pose-moi une question sur le cours (variables, conditions, boucles, tableaux, récursivité, tris, fonctions…) ou colle ton pseudo-code pour que je l'exécute."],
  [/^(merci|thanks|super|top|parfait|cool)\b/i, "Avec plaisir ! Une autre question ?"],
  [/^(qui es[- ]tu|tu es qui|t'es qui)/i, "Je suis l'assistant d'AlgoMaster. Je réponds à partir du cours et j'exécute ton pseudo-code. Active l'IA pour des réponses rédigées."],
];
function courseAnswer(m, hits){
  for(const [re,txt] of SMALL) if(re.test(m.trim())) return `<p>${txt}</p>`;
  if(!hits.length || hits[0].s < 2.5) return `<p>Je n'ai rien trouvé de clair dans le cours pour ça. Essaie avec les mots du cours (ex : « boucle TantQue », « tri à bulles », « cas de base »)${CHAT.engine?"":", ou active l'IA"}.</p>`;
  const best = hits[0].d;
  const others = hits.slice(1).filter(h=>h.s > hits[0].s*0.45 && h.d.title!==best.title).slice(0,3);
  const label = {lecon:"Dans la leçon", fiche:"Dans la fiche résumé", flash:"Flashcard", quiz:"Correction du quiz"}[best.kind];
  return `<p class="lbl">${label} : <b>${esc(best.title)}</b></p><div class="chat-src">${best.html}</div>
    ${best.lesson?`<div class="row" style="margin-top:8px"><button class="btn ghost sm" onclick="go('cours','${best.lesson}')">📚 Ouvrir la leçon</button></div>`:""}
    ${others.length?`<p class="lbl" style="margin-top:10px">Voir aussi :</p><div class="row">${others.map(h=>`<button class="chip" data-q="${esc(h.d.title)}">${esc(h.d.title.length>60?h.d.title.slice(0,58)+"…":h.d.title)}</button>`).join("")}</div>`:""}`;
}

// ---------- IA locale (WebLLM) ----------
async function enableAI(){
  if(CHAT.engine || CHAT.loading) return;
  if(!navigator.gpu){ $("#ai-status").innerHTML = `<span class="er">Ton navigateur ne gère pas WebGPU, nécessaire à l'IA locale. Essaie Chrome ou Edge récent sur ordinateur. L'assistant du cours reste disponible.</span>`; return; }
  CHAT.loading = true; drawAIBar();
  try{
    const adapter = await navigator.gpu.requestAdapter();
    if(!adapter) throw new Error("aucune carte graphique compatible WebGPU trouvée");
    const f16 = adapter.features.has("shader-f16");
    const small = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
    const webllm = await import(WEBLLM_URL);
    const ids = webllm.prebuiltAppConfig.model_list.map(m=>m.model_id);
    const want = `Qwen2.5-${small?"0.5":"1.5"}B-Instruct-q4f${f16?16:32}_1-MLC`;
    CHAT.model = ids.includes(want) ? want : ids.find(i=>/^Qwen2\.5-.*Instruct-q4f32_1-MLC$/.test(i));
    CHAT.engine = await webllm.CreateMLCEngine(CHAT.model, { initProgressCallback: p => {
      const el = $("#ai-status"); if(el) el.innerHTML = `<div class="bar"><i style="width:${Math.round((p.progress||0)*100)}%"></i></div><small>${esc(p.text||"")}</small>`;
    }});
  } catch(e){
    CHAT.engine = null; CHAT.loading = false; drawAIBar();
    const s = $("#ai-status"); if(s) s.innerHTML = `<span class="er">Impossible de charger l'IA : ${esc(e.message||e)}. L'assistant du cours reste disponible.</span>`;
    return;
  }
  CHAT.loading = false; drawAIBar();
}
function drawAIBar(){
  const b = $("#ai-bar"); if(!b) return;
  const name = CHAT.model ? CHAT.model.replace(/-q4f.*$/,"").replace(/-Instruct/,"") : "";
  b.innerHTML = CHAT.engine
    ? `<span class="pill c3">✨ IA locale active · ${esc(name)}</span><small class="note">Elle tourne sur ton appareil : rien n'est envoyé sur Internet. Elle peut se tromper, vérifie avec le cours.</small>`
    : `<span class="pill">📚 Assistant du cours</span><button class="btn sm" id="ai-on" ${CHAT.loading?"disabled":""}>✨ Activer l'IA</button>
       <small class="note">Gratuit, tourne sur ton appareil. 1er chargement : environ 1 Go (gardé en cache ensuite). Ordinateur récent avec Chrome ou Edge recommandé.</small>
       <div id="ai-status" style="width:100%">${CHAT.loading?"<small>Préparation…</small>":""}</div>`;
  const on = $("#ai-on"); if(on) on.onclick = enableAI;
}
const SYSTEM = `Tu es le tuteur d'AlgoMaster, un cours d'algorithmique pour grands débutants (école Sup De Vinci).
Réponds en français, simplement, en 3 à 8 phrases maximum, avec un petit exemple si utile.
Utilise la syntaxe de pseudo-code du cours : affectation avec ←, Lire, Afficher, Si … Alors … Sinon … FinSi, Pour i allant de a à b Faire … FinPour, TantQue … Faire … FinTantQue, Répéter … Jusqu'à …, Fonction Nom(param) : type … Retourner … FinFonction, MOD, DIV, ET, OU, NON, VRAI, FAUX. Les tableaux commencent à l'indice 0.
Appuie-toi d'abord sur les extraits du cours fournis. Si la question n'a aucun rapport avec l'algorithmique, dis-le poliment.
Ne donne pas directement la solution complète d'un exercice : donne des pistes, sauf si l'élève la demande explicitement.`;
// Les petits modèles peuvent se mettre à répéter la même phrase en boucle.
// Si la fin du texte est déjà apparue plus haut, on coupe après la première occurrence.
function cutLoop(t){
  if(t.length < 160) return null;
  const tail = t.slice(-60), first = t.indexOf(tail);
  if(first < 0 || first >= t.length - 60) return null;
  const cut = t.slice(0, first + 60);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(".\n"), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return end > 40 ? cut.slice(0, end + 1) : cut;
}
async function aiAnswer(m, hits, runInfo, el){
  const ctx = hits.slice(0,3).map(h=>`### ${h.d.title}\n${h.d.text.slice(0,700)}`).join("\n\n");
  // historique court, sans les réponses ratées (qui pousseraient le modèle à recommencer)
  const hist = CHAT.log.filter(x=>x.plain && !x.bad).slice(-4).map(x=>({role:x.role, content:x.plain.slice(0,800)}));
  const user = `Extraits du cours :\n${ctx||"(aucun extrait trouvé)"}\n${runInfo?`\nRésultat de l'exécution du code de l'élève : ${runInfo}\n`:""}\nQuestion de l'élève : ${m}`;
  const messages = [{role:"system",content:SYSTEM}, ...hist, {role:"user",content:user}];
  const base = {messages, stream:true, temperature:0.4, top_p:0.9, max_tokens:400};
  let chunks;
  try { chunks = await CHAT.engine.chat.completions.create({...base, repetition_penalty:1.15, frequency_penalty:0.5, presence_penalty:0.3}); }
  catch(e){ chunks = await CHAT.engine.chat.completions.create(base); } // si ces réglages ne sont pas acceptés
  let txt = "", looped = false, stopped = false;
  for await (const c of chunks){
    txt += c.choices[0]?.delta?.content || "";
    const cut = cutLoop(txt);
    if(cut !== null){ txt = cut; looped = true; }
    if(looped || CHAT.stop){ stopped = CHAT.stop; try{ CHAT.engine.interruptGenerate(); }catch{} break; }
    el.innerHTML = md(txt) + `<span class="cursor">▍</span>`; scrollChat();
  }
  return {txt: txt.trim(), looped, stopped};
}
function md(s){
  const blocks = [];
  s = s.replace(/```[a-z]*\n?([\s\S]*?)(```|$)/g,(_,c)=>{ blocks.push(c.replace(/\n$/,"")); return `\u0000${blocks.length-1}\u0000`; });
  s = esc(s).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/^#+\s*(.*)$/gm,"<b>$1</b>").replace(/^\s*[-*]\s+/gm,"• ").replace(/\n/g,"<br>");
  return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>`<pre class="code">${esc(blocks[i])}</pre>`);
}

// ---------- page ----------
const SUGG = ["C'est quoi la récursivité ?","Différence entre TantQue et Répéter","Comment marche le tri à bulles ?","À quoi sert MOD ?","Pourquoi les indices commencent à 0 ?","Afficher ou Retourner ?"];
function chat(){
  page(`<h1>💬 Assistant</h1><p class="sub">Pose une question sur le cours, ou colle ton pseudo-code : je l'exécute et je te dis ce qu'il affiche.</p>
  <div class="card ai-bar" id="ai-bar"></div>
  <div class="chat-log" id="chat-log"></div>
  <div class="chips" id="chat-sugg">${SUGG.map(s=>`<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div>
  <form class="chat-form" id="chat-form"><textarea id="chat-in" rows="2" placeholder="Ta question… (Entrée pour envoyer, Maj+Entrée pour aller à la ligne)"></textarea><button class="btn" id="chat-send">Envoyer</button></form>`);
  drawAIBar();
  if(!CHAT.log.length) CHAT.log.push({role:"assistant", html:`<p>Salut ! Je connais tout le cours d'AlgoMaster. Exemples : « c'est quoi un cas de base ? », « pourquoi ma boucle est infinie ? », ou colle un algorithme complet.</p>`});
  CHAT.log.forEach(drawMsg);
  const inp = $("#chat-in");
  $("#chat-form").onsubmit = ev => { ev.preventDefault(); if(CHAT.busy && CHAT.engine) CHAT.stop = true; else send(inp.value); };
  inp.addEventListener("keydown", ev => { if(ev.key==="Enter" && !ev.shiftKey){ ev.preventDefault(); send(inp.value); } });
  const onChip = ev => { const c = ev.target.closest(".chip"); if(c) send(c.dataset.q); };
  $("#chat-log").onclick = onChip; $("#chat-sugg").onclick = onChip;
  scrollChat();
}
function drawMsg(msg){
  const log = $("#chat-log"); if(!log) return null;
  const d = document.createElement("div");
  d.className = "msg " + (msg.role==="user"?"me":"bot");
  d.innerHTML = msg.role==="user" ? (msg.code?`<pre class="code">${esc(msg.text)}</pre>`:esc(msg.text).replace(/\n/g,"<br>")) : msg.html;
  log.appendChild(d); enhance(); return d;
}
const scrollChat = () => { const m = $("#main"); if(m) m.scrollTop = m.scrollHeight; window.scrollTo(0, document.body.scrollHeight); };
async function send(text){
  text = (text||"").trim();
  if(!text || CHAT.busy || !$("#chat-log")) return;
  CHAT.busy = true; CHAT.stop = false; $("#chat-in").value = "";
  const sendBtn = $("#chat-send");
  if(CHAT.engine) sendBtn.textContent = "■ Arrêter"; else sendBtn.disabled = true;
  const code = looksLikeCode(text);
  const small = !code && SMALL.some(([re])=>re.test(text)); // salutations : réponse directe, sans l'IA
  const u = {role:"user", text, code, plain:text}; CHAT.log.push(u); drawMsg(u);
  const hits = search(code ? text.replace(/[←<\-"]/g," ") : text);
  const run = code ? runSnippet(text) : null;
  const bot = {role:"assistant", html:""}; CHAT.log.push(bot);
  const el = drawMsg(bot);
  try{
    if(CHAT.engine && !small){
      el.innerHTML = `<span class="cursor">▍</span>`;
      const {txt, looped, stopped} = await aiAnswer(text, hits, run && run.text, el);
      const src = hits.filter(h=>h.d.lesson).slice(0,2);
      bot.plain = txt; bot.bad = looped || !txt;
      const runHtml = run ? `<p class="lbl">Exécution de ton code :</p>${run.html}` : "";
      if(bot.bad) bot.html = runHtml + (txt?md(txt):"") + `<div class="errbox">L'IA s'est mise à tourner en rond, je l'ai arrêtée. Voici ce que dit le cours :</div>` + courseAnswer(text, hits);
      else bot.html = runHtml + md(txt) + (stopped?`<p class="note">(réponse arrêtée)</p>`:"")
        + (src.length?`<p class="lbl" style="margin-top:8px">📚 Pour réviser : ${src.map(h=>`<a onclick="go('cours','${h.d.lesson}')">${esc(h.d.title)}</a>`).join(" · ")}</p>`:"");
    } else {
      bot.html = run ? `<p class="lbl">Exécution de ton code :</p>${run.html}` : courseAnswer(text, hits);
    }
  } catch(e){
    bot.html = `<div class="errbox">L'IA a rencontré un problème (${esc(e.message||e)}). Voici ce que dit le cours :</div>` + courseAnswer(text, hits);
  }
  if(el){ el.innerHTML = bot.html; enhance(); scrollChat(); }
  CHAT.busy = false; CHAT.stop = false;
  const sb = $("#chat-send"); if(sb){ sb.disabled = false; sb.textContent = "Envoyer"; }
}
