// ================== ÉTAT PERSISTANT ==================
const KEY = "algomaster_v1";
const DEF = () => ({stats:{}, errors:[], read:[], xp:0, exams:[], answered:0, correct:0, seen:{}, code:{}, solved:{}});
let S;
try { S = Object.assign(DEF(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch { S = DEF(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };

// ================== UTILS ==================
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const norm = s => String(s).trim().toLowerCase().replace(/\s+/g,"").replace(",",".").replace(/€$/,"");
const qkey = q => q.c + "|" + q.q + "|" + (q.code||"");
const KW = new Set("Début Fin Si Alors Sinon FinSi Pour allant de à Faire FinPour TantQue FinTantQue Répéter Jusqu'à Fonction FinFonction Procédure FinProcédure Retourner Afficher Lire Déclarer ET OU NON MOD DIV VRAI FAUX pas chaque dans Variables Algorithme Ajouter appartient ensemble vide taille".split(" "));
function hl(code){
  return code.split("\n").map(line=>{
    let out="", re=/("[^"]*")|(\/\/.*$)|(\d+(?:\.\d+)?)|([A-Za-zÀ-ÿ_']+)|([^"\/\dA-Za-zÀ-ÿ_']+|\/)/g, m;
    while((m=re.exec(line))){
      if(m[1]) out+=`<span class="st">${esc(m[1])}</span>`;
      else if(m[2]) out+=`<span class="cm">${esc(m[2])}</span>`;
      else if(m[3]) out+=`<span class="nu">${m[3]}</span>`;
      else if(m[4]) out+= KW.has(m[4]) ? `<span class="kw">${m[4]}</span>` : esc(m[4]);
      else out+=esc(m[0]);
    }
    return out;
  }).join("\n");
}
function toast(msg){ const t=document.createElement("div"); t.className="toast"; t.innerHTML=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200); }
function addXP(n){ S.xp+=n; save(); renderSide(); }
const level = () => Math.floor(S.xp/100)+1;

// ================== NAV ==================
const NAV = [
  ["home","🏠","Accueil"],["cours","📚","Cours"],["quiz","🎯","Quiz"],["exam","📝","Examen blanc"],["chat","💬","Assistant"],
  ["sep"],["fiche","📋","Fiche résumé"],["flash","🃏","Flashcards"],["errors","🔁","Mes erreurs"],["exos","✏️","Atelier code"],
];
let view = "home", stopTimer = null;
function renderSide(){
  $("#nav").innerHTML = NAV.map(n => n[0]==="sep" ? `<div class="sep"></div>` :
    `<button class="${view===n[0]?"on":""}" onclick="go('${n[0]}')"><span class="ic">${n[1]}</span>${n[2]}${n[0]==="errors"&&S.errors.length?`<span class="badge">${S.errors.length}</span>`:""}</button>`).join("");
  const p = S.xp%100;
  $("#lvl").innerHTML = `<div class="lvl"><span>Niveau <b style="color:#fff">${level()}</b></span><span>${S.xp} XP</span></div><div class="bar"><i style="width:${p}%"></i></div>`;
}
function go(v, arg){
  if(stopTimer){ stopTimer(); stopTimer=null; }
  view = v; renderSide();
  const m = $("#main"); m.scrollTop = 0; window.scrollTo(0,0);
  ({home, cours, quiz:quizSetup, exam:examIntro, chat, fiche, flash, errors, exos})[v](arg);
}
const page = html => { $("#main").innerHTML = `<div class="wrap">${html}</div>`; enhance(); };
function enhance(){
  document.querySelectorAll("#main pre.code:not([data-h])").forEach(p=>{ p.dataset.h=1; p.innerHTML = hl(p.textContent); });
  document.querySelectorAll("[data-trace]").forEach(el=>tracer(el, TRACES[el.dataset.trace]));
  document.querySelectorAll("[data-widget=tt]").forEach(ttWidget);
}

// ================== ACCUEIL ==================
function home(){
  const rate = S.answered ? Math.round(100*S.correct/S.answered) : 0;
  const bars = Object.entries(CATS).map(([k,c])=>{
    const st=S.stats[k]||{n:0,ok:0}; const p=st.n?Math.round(100*st.ok/st.n):0;
    return `<div class="catbar"><span>${c.icon} ${c.name}</span><div class="bar"><i style="width:${p}%;${p<50&&st.n?"background:var(--warn)":""}"></i></div><em>${st.n?p+" %":"—"}</em></div>`;
  }).join("");
  const nextL = LESSONS.find(l=>!S.read.includes(l.id));
  page(`
  <div class="hero"><span class="pill">Sup De Vinci · Algorithmie</span>
    <h1 style="margin-top:12px">Apprends l'algorithmique de zéro 🚀</h1>
    <p class="sub" style="margin-bottom:18px">Cours pas à pas, ${QB.length}+ questions + questions générées à l'infini, correction immédiate, flashcards et examen blanc.</p>
    <div class="row">${nextL?`<button class="btn" onclick="go('cours','${nextL.id}')">${S.read.length?"▶ Continuer : ":"▶ Commencer : "}${nextL.title}</button>`:`<button class="btn" onclick="go('exam')">🏆 Cours terminé — passe l'examen blanc</button>`}
    <button class="btn ghost" onclick="startQuiz(Object.keys(CATS),10,true,'Quiz rapide')">⚡ Quiz rapide (10)</button></div>
  </div>
  <div class="grid g4">
    <div class="card stat"><b>${S.read.length}/${LESSONS.length}</b><span>Leçons lues</span></div>
    <div class="card stat"><b>${S.answered}</b><span>Questions répondues</span></div>
    <div class="card stat"><b style="color:${rate>=70?"var(--ok)":rate>=50?"var(--warn)":"var(--txt)"}">${rate} %</b><span>Taux de réussite</span></div>
    <div class="card stat"><b style="color:${S.errors.length?"var(--ko)":"var(--ok)"}">${S.errors.length}</b><span>Erreurs à revoir</span></div>
  </div>
  <h2>Que veux-tu faire ?</h2>
  <div class="grid g3">
    <div class="card click" onclick="go('cours')"><h3>📚 Cours</h3>${LESSONS.length} leçons expliquées simplement, avec exemples et exécution pas à pas.</div>
    <div class="card click" onclick="go('quiz')"><h3>🎯 Quiz par catégorie</h3>Choisis tes thèmes, le nombre de questions. Ordre et réponses aléatoires.</div>
    <div class="card click" onclick="go('exam')"><h3>📝 Examen blanc</h3>30 questions chronométrées sur tout le programme, note sur 20.</div>
    <div class="card click" onclick="go('chat')"><h3>💬 Assistant</h3>Pose tes questions sur le cours ou colle ton code. IA locale gratuite en option.</div>
    <div class="card click" onclick="go('fiche')"><h3>📋 Fiche résumé</h3>Tout le cours sur une page pour réviser vite.</div>
    <div class="card click" onclick="go('flash')"><h3>🃏 Flashcards</h3>${FLASH.length} cartes recto/verso pour mémoriser définitions et règles.</div>
    <div class="card click" onclick="go('exos')"><h3>✏️ Atelier code</h3>${EXOS.length} exercices : écris ton algorithme, il est exécuté et corrigé instantanément (${EXOS.filter(e=>S.solved[e.id]).length} réussis).</div>
  </div>
  <h2>Ta maîtrise par catégorie</h2>
  <div class="card">${bars}${S.answered?"":`<p class="sub" style="margin:10px 0 0">Réponds à des quiz pour voir ta progression ici.</p>`}</div>
  ${S.exams.length?`<h2>Tes examens blancs</h2><div class="card">${S.exams.slice(-8).reverse().map(e=>`<div class="catbar"><span>${e.date}</span><div class="bar"><i style="width:${e.note*5}%"></i></div><em>${e.note}/20</em></div>`).join("")}</div>`:""}
  <p class="sub" style="margin-top:30px;text-align:center"><button class="btn ghost sm" onclick="resetAll()">Réinitialiser ma progression</button></p>`);
}
function resetAll(){ ask("Effacer toute ta progression (XP, stats, erreurs, leçons lues) ?", ()=>{ S=DEF(); save(); go("home"); }, "Tout effacer"); }
// Fenêtre de confirmation intégrée (confirm() est bloqué dans certaines vues, dont la page publiée)
function ask(msg, onYes, yes="Confirmer"){
  const d=document.createElement("div"); d.className="modal";
  d.innerHTML=`<div class="modal-box" role="dialog" aria-modal="true"><p>${esc(msg).replace(/\n/g,"<br>")}</p><div class="row" style="justify-content:flex-end"><button class="btn ghost sm" data-r="0">Annuler</button><button class="btn sm" data-r="1">${esc(yes)}</button></div></div>`;
  d.onclick=ev=>{ const r=ev.target.dataset.r; if(ev.target===d||r==="0") d.remove(); if(r==="1"){ d.remove(); onYes(); } };
  document.body.appendChild(d); d.querySelector('[data-r="1"]').focus();
}

// ================== COURS ==================
function cours(id){
  if(id) return lesson(id);
  let html = `<h1>📚 Le cours</h1><p class="sub">Suis les leçons dans l'ordre. Chaque leçon se termine par un mini-quiz.</p>`;
  for(const p of [1,2,3]){
    html += `<h2><span class="pill c${p}">Partie ${p}</span> ${PARTS[p]}</h2><div class="grid chap-list">`;
    LESSONS.filter(l=>l.part===p).forEach(l=>{
      const n = LESSONS.indexOf(l)+1, done=S.read.includes(l.id);
      html += `<div class="card click ${done?"done":""}" onclick="go('cours','${l.id}')"><div class="chap-num">${done?"✓":n}</div><div><b>${l.title}</b><br><small style="color:var(--mut)">${CATS[l.cat].icon} ${CATS[l.cat].name}</small></div></div>`;
    });
    html += `</div>`;
  }
  page(html);
}
function lesson(id){
  const i = LESSONS.findIndex(l=>l.id===id), l = LESSONS[i];
  const prev = LESSONS[i-1], next = LESSONS[i+1];
  page(`<div class="row" style="justify-content:space-between;margin-bottom:10px"><button class="btn ghost sm" onclick="go('cours')">← Sommaire</button><span class="pill c${l.part}">Partie ${l.part} · Leçon ${i+1}/${LESSONS.length}</span></div>
  <h1>${l.title}</h1><p class="sub">${CATS[l.cat].icon} ${CATS[l.cat].name}</p>
  <div class="lesson">${l.html}</div>
  <div class="card" style="margin-top:30px;text-align:center"><h3>🎯 Vérifie que tu as compris</h3><p class="sub" style="margin-bottom:14px">5 questions aléatoires sur « ${CATS[l.cat].name} », correction immédiate.</p>
  <button class="btn" onclick="markRead('${l.id}');startQuiz(['${l.cat}'],5,true,'Mini-quiz : ${esc(CATS[l.cat].name)}')">Lancer le mini-quiz</button></div>
  <div class="lesson-nav">${prev?`<button class="btn ghost" onclick="go('cours','${prev.id}')">← ${prev.title}</button>`:"<span></span>"}
  ${next?`<button class="btn" onclick="markRead('${l.id}');go('cours','${next.id}')">${next.title} →</button>`:`<button class="btn ok" onclick="markRead('${l.id}');go('exam')">Terminer → Examen blanc</button>`}</div>`);
}
function markRead(id){ if(!S.read.includes(id)){ S.read.push(id); addXP(10); toast("✅ Leçon terminée · +10 XP"); } }

// ---- Trace pas à pas
function tracer(el, T){
  let k = 0;
  const draw = () => {
    const s = T.steps[k];
    el.innerHTML = `<div class="tracer"><div>${T.code.map((c,j)=>`<div class="line ${j===s.l?"cur":""}">${hl(c)}</div>`).join("")}</div>
    <div class="vars">${Object.keys(s.v).length?Object.entries(s.v).map(([a,b])=>`<span>${a} = <b>${b}</b></span>`).join(""):`<span style="color:var(--mut)">aucune variable</span>`}</div>
    ${s.n?`<div style="color:var(--warn);font-size:14px;margin-bottom:8px">→ ${s.n}</div>`:""}
    <div class="out">${s.o?esc(s.o):"<span style='opacity:.4'>écran vide</span>"}</div>
    <div class="row" style="margin-top:10px"><button class="btn ghost sm" ${k?"":"disabled"} data-a="p">◀ Précédent</button><button class="btn sm" ${k<T.steps.length-1?"":"disabled"} data-a="n">Étape suivante ▶</button><button class="btn ghost sm" data-a="r">↺</button><small style="color:var(--mut)">Étape ${k+1}/${T.steps.length}</small></div></div>`;
    el.querySelectorAll("button").forEach(b=>b.onclick=()=>{ k = b.dataset.a==="n"?k+1:b.dataset.a==="p"?k-1:0; draw(); });
  };
  draw();
}
// ---- Table de vérité interactive
function ttWidget(el){
  let A=true, B=false;
  const s = x=>x?"VRAI":"FAUX", c = x=>x?"v":"f";
  const draw = () => {
    el.innerHTML = `<div class="card tt-demo"><span>A =</span><button class="tog ${A?"on":"off"}" data-k="A">${s(A)}</button><span>B =</span><button class="tog ${B?"on":"off"}" data-k="B">${s(B)}</button>
    <span style="margin-left:14px">A ET B = <b class="${c(A&&B)}">${s(A&&B)}</b></span><span>A OU B = <b class="${c(A||B)}">${s(A||B)}</b></span><span>NON A = <b class="${c(!A)}">${s(!A)}</b></span></div>`;
    el.querySelectorAll("button").forEach(b=>b.onclick=()=>{ if(b.dataset.k==="A")A=!A; else B=!B; draw(); });
  };
  draw();
}

// ================== QUIZ ==================
let QZ = null;
function buildPool(cats, n, withGen){
  const stat = shuffle(QB.filter(q=>cats.includes(q.c)));
  // on privilégie les questions jamais vues
  stat.sort((a,b)=>(S.seen[qkey(a)]||0)-(S.seen[qkey(b)]||0));
  const gens = GENS.map(g=>g).filter(g=>{ try{ return cats.includes(g().c); }catch{return false;} });
  const out = []; let si = 0; const used = new Set();
  let guard = 0;
  while(out.length<n && guard++<n*20){
    const useGen = withGen && gens.length && (si>=stat.length || Math.random()<0.4);
    let q;
    if(useGen){ q = pick(gens)(); } else if(si<stat.length){ q = stat[si++]; } else break;
    const k = qkey(q); if(used.has(k)) continue; used.add(k); out.push(q);
  }
  return shuffle(out);
}
function quizSetup(){
  const saved = (()=>{ try{return JSON.parse(localStorage.getItem(KEY+"_qs"))}catch{return null} })() || {cats:Object.keys(CATS), n:10, gen:true};
  page(`<h1>🎯 Quiz</h1><p class="sub">Choisis tes catégories. Questions et réponses mélangées à chaque fois. Correction affichée dès que tu réponds.</p>
  <div class="card"><div class="row" style="justify-content:space-between;margin-bottom:12px"><b>Catégories</b><span class="row"><button class="btn ghost sm" onclick="document.querySelectorAll('.cat-pick input').forEach(i=>i.checked=true)">Tout</button><button class="btn ghost sm" onclick="document.querySelectorAll('.cat-pick input').forEach(i=>i.checked=false)">Aucune</button></span></div>
  <div class="cat-pick">${Object.entries(CATS).map(([k,c])=>`<label><input type="checkbox" value="${k}" ${saved.cats.includes(k)?"checked":""}> ${c.icon} ${c.name} <small style="margin-left:auto;color:var(--mut)">${QB.filter(q=>q.c===k).length}</small></label>`).join("")}</div>
  <div class="row" style="margin-top:22px;gap:30px"><div><b>Nombre de questions</b><br><div class="seg" id="seg" style="margin-top:8px">${[5,10,20,30,50].map(n=>`<button class="${n===saved.n?"on":""}" data-n="${n}">${n}</button>`).join("")}</div></div>
  <label style="display:flex;gap:10px;align-items:center;cursor:pointer;margin-top:24px"><input type="checkbox" id="gen" ${saved.gen?"checked":""} style="accent-color:var(--acc);width:18px;height:18px"> Inclure des questions générées aléatoirement (valeurs différentes à chaque fois)</label></div>
  <div style="margin-top:24px"><button class="btn" onclick="launchFromSetup()">▶ Lancer le quiz</button></div></div>
  <h2>Quiz express par thème</h2><div class="grid g3">${Object.entries(CATS).map(([k,c])=>{const st=S.stats[k];return `<div class="card click" onclick="startQuiz(['${k}'],10,true,'${esc(c.name)}')"><h3>${c.icon} ${c.name}</h3><small style="color:var(--mut)">${st?`${st.ok}/${st.n} bonnes réponses`:"Pas encore tenté"}</small></div>`;}).join("")}</div>`);
  document.querySelectorAll("#seg button").forEach(b=>b.onclick=()=>{ document.querySelectorAll("#seg button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); });
}
function launchFromSetup(){
  const cats=[...document.querySelectorAll(".cat-pick input:checked")].map(i=>i.value);
  if(!cats.length) return toast("Choisis au moins une catégorie");
  const n=+$("#seg .on").dataset.n, gen=$("#gen").checked;
  try{ localStorage.setItem(KEY+"_qs", JSON.stringify({cats,n,gen})); }catch{}
  startQuiz(cats,n,gen,cats.length===1?CATS[cats[0]].name:"Quiz personnalisé");
}
function startQuiz(cats, n, withGen, title, opts={}){
  const qs = opts.qs || buildPool(cats, n, withGen);
  if(!qs.length) return toast("Aucune question disponible");
  QZ = {qs, i:0, ok:0, log:[], title, exam:!!opts.exam, errorsMode:!!opts.errorsMode, start:Date.now()};
  if(view!=="quiz" && view!=="exam" && view!=="errors"){ view="quiz"; renderSide(); }
  if(opts.time){ startTimer(opts.time); }
  showQ();
}
function startTimer(sec){
  const end = Date.now()+sec*1000;
  const id = setInterval(()=>{
    const el=$("#timer"); const r=Math.max(0,Math.round((end-Date.now())/1000));
    if(el){ el.textContent=`⏱ ${Math.floor(r/60)}:${String(r%60).padStart(2,"0")}`; el.classList.toggle("low",r<120); }
    if(r<=0){ clearInterval(id); stopTimer=null; toast("⏰ Temps écoulé !"); finishQuiz(); }
  },500);
  stopTimer = ()=>clearInterval(id);
}
function showQ(){
  const q = QZ.qs[QZ.i], n = QZ.qs.length;
  QZ.answered = false;
  let body = "";
  if(q.t==="qcm"){
    QZ.order = shuffle(q.ch.map((_,j)=>j));
    body = `<div class="choices">${QZ.order.map((j,k)=>`<button class="choice" data-j="${j}"><span class="k">${"ABCD"[k]}</span><span>${esc(q.ch[j])}</span></button>`).join("")}</div>`;
  } else if(q.t==="vf"){
    QZ.order = [1,0];
    body = `<div class="choices" style="grid-template-columns:1fr 1fr"><button class="choice" data-j="1"><span class="k">V</span>Vrai</button><button class="choice" data-j="0"><span class="k">F</span>Faux</button></div>`;
  } else {
    body = `<div class="qinput"><input id="ans" placeholder="Ta réponse…" autocomplete="off"><button class="btn" id="valid">Valider</button></div>`;
  }
  page(`<div class="qhead"><span>${esc(QZ.title)} · ${CATS[q.c].icon} ${CATS[q.c].name}</span><span class="row">${QZ.exam?`<span class="timer" id="timer">⏱</span>`:""}<b style="color:var(--txt)">${QZ.i+1} / ${n}</b> · ✅ ${QZ.ok}</span></div>
  <div class="qprog"><i style="width:${100*QZ.i/n}%"></i></div>
  <div class="qcard"><span class="pill">${q.t==="qcm"?"QCM":q.t==="vf"?"Vrai ou Faux":"Réponse libre"}</span>${q.gen?` <span class="pill c1">🎲 générée</span>`:""}
  <div class="qtext">${esc(q.q)}</div>${q.code?`<pre class="code">${esc(q.code)}</pre>`:""}${body}<div id="fb"></div></div>
  <p class="kbd-hint" style="text-align:center;color:var(--mut);font-size:13px;margin-top:14px">Raccourcis : ${q.t==="in"?"<span class='kbd'>Entrée</span> valider":q.t==="vf"?"<span class='kbd'>V</span> / <span class='kbd'>F</span>":"<span class='kbd'>A</span>-<span class='kbd'>D</span> ou <span class='kbd'>1</span>-<span class='kbd'>4</span>"} · <span class="kbd">Entrée</span> question suivante · <button class="btn ghost sm" onclick="ask('Arrêter le quiz et voir les résultats ?',finishQuiz,'Terminer')">Terminer maintenant</button></p>`);
  document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>answer(+b.dataset.j));
  if(q.t==="in"){ const inp=$("#ans"); inp.focus(); $("#valid").onclick=()=>answer(inp.value); }
}
function answer(given){
  if(QZ.answered) return; QZ.answered = true;
  const q = QZ.qs[QZ.i]; let ok, goodTxt;
  if(q.t==="qcm"){ ok = given===q.a; goodTxt = q.ch[q.a]; }
  else if(q.t==="vf"){ ok = (given===1)===q.a; goodTxt = q.a?"Vrai":"Faux"; }
  else { if(!String(given).trim()){ QZ.answered=false; return; } ok = q.a.some(a=>norm(a)===norm(given)); goodTxt = q.a[0]; }
  // visuel
  if(q.t!=="in"){
    const goodJ = q.t==="qcm"? q.a : (q.a?1:0);
    document.querySelectorAll(".choice").forEach(b=>{ const j=+b.dataset.j; b.classList.add("lock"); if(j===goodJ) b.classList.add("good"); else if(j===given) b.classList.add("bad"); else b.classList.add("dim"); });
  } else { const inp=$("#ans"); inp.disabled=true; inp.classList.add(ok?"good":"bad"); $("#valid").remove(); }
  // stats
  const st = S.stats[q.c] || (S.stats[q.c]={n:0,ok:0}); st.n++; S.answered++;
  const k = qkey(q); S.seen[k]=(S.seen[k]||0)+1;
  if(ok){ st.ok++; S.correct++; QZ.ok++; S.xp+=q.gen?3:2; S.errors = S.errors.filter(e=>qkey(e)!==k); }
  else if(!S.errors.some(e=>qkey(e)===k)) S.errors.push(q);
  save(); renderSide();
  QZ.log.push({q, ok, given: q.t==="qcm"?q.ch[given]:q.t==="vf"?(given?"Vrai":"Faux"):given, good:goodTxt});
  const last = QZ.i===QZ.qs.length-1;
  $("#fb").innerHTML = `<div class="fb ${ok?"good":"bad"}"><h4>${ok?pick(["✅ Bonne réponse !","✅ Exact !","✅ Bravo !","✅ Parfait !"]):"❌ Pas tout à fait…"}</h4>
  ${ok?"":`<p>La bonne réponse était : <b>${esc(goodTxt)}</b></p>`}<p>📖 <b>Correction :</b> ${q.e}</p>
  <div style="margin-top:12px"><button class="btn" id="nextb">${last?"Voir mes résultats 🏁":"Question suivante →"}</button></div></div>`;
  $("#nextb").onclick = nextQ; $("#nextb").focus();
  $("#fb").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function nextQ(){ if(QZ.i<QZ.qs.length-1){ QZ.i++; showQ(); } else finishQuiz(); }
function finishQuiz(){
  if(stopTimer){ stopTimer(); stopTimer=null; }
  const done = QZ.log.length, total = QZ.qs.length, p = total?Math.round(100*QZ.ok/total):0;
  const note = Math.round(20*QZ.ok/total*2)/2;
  if(QZ.exam){ S.exams.push({date:new Date().toLocaleDateString("fr-FR"), note}); save(); }
  if(p===100 && total>=5) { S.xp+=20; save(); renderSide(); }
  const col = p>=80?"var(--ok)":p>=50?"var(--warn)":"var(--ko)";
  const msg = p===100?"Parfait ! Tu maîtrises 🔥":p>=80?"Excellent travail ! 💪":p>=60?"Bien ! Encore un petit effort 👍":p>=40?"Pas mal, revois les points faibles 📖":"Courage ! Relis le cours puis réessaie 🌱";
  const cats=[...new Set(QZ.qs.map(q=>q.c))], title=QZ.title, exam=QZ.exam;
  page(`<h1>🏁 Résultats — ${esc(title)}</h1>
  <div class="card" style="text-align:center"><div class="score-ring" style="background:conic-gradient(${col} ${p*3.6}deg, var(--card2) 0)"><div><span><b>${QZ.ok}/${total}</b><small style="color:var(--mut)">${p} %</small></span></div></div>
  ${exam?`<h2 style="margin:0">Note : ${note} / 20</h2>`:""}<p style="font-size:18px">${msg}</p>${done<total?`<p class="sub">${total-done} question(s) non répondue(s).</p>`:""}
  <div class="row" style="justify-content:center"><button class="btn" id="again">🔄 Recommencer (nouvelles questions)</button>${QZ.log.some(l=>!l.ok)?`<button class="btn ghost" onclick="go('errors')">🔁 Revoir mes erreurs</button>`:""}<button class="btn ghost" onclick="go('home')">🏠 Accueil</button></div></div>
  <h2>Correction détaillée</h2>${QZ.log.map((l,i)=>`<div class="review-item ${l.ok?"":"bad"}"><small>${i+1}. ${CATS[l.q.c].name}</small><div><b>${esc(l.q.q)}</b></div>${l.q.code?`<pre class="code">${esc(l.q.code)}</pre>`:""}
  <div>${l.ok?"✅":"❌"} Ta réponse : <b>${esc(l.given)}</b>${l.ok?"":` · Bonne réponse : <b style="color:var(--ok)">${esc(l.good)}</b>`}</div><div style="color:var(--mut);margin-top:4px">${l.q.e}</div></div>`).join("")}`);
  $("#again").onclick = () => exam ? examStart() : startQuiz(cats, total, true, title);
}

// ================== EXAMEN ==================
function examIntro(){
  page(`<h1>📝 Examen blanc</h1><p class="sub">Mets-toi en condition réelle.</p>
  <div class="card"><ul class="lesson"><li><b>30 questions</b> tirées au hasard sur <b>tout le programme</b> (les 3 parties).</li><li><b>25 minutes</b> chronométrées.</li><li>Correction affichée après chaque réponse.</li><li>Note finale sur <b>20</b>, enregistrée dans ton historique.</li></ul>
  <button class="btn" onclick="examStart()">▶ Commencer l'examen</button></div>`);
}
function examStart(){
  const cats = Object.keys(CATS); const qs=[];
  // répartition équilibrée : ~3-4 questions par catégorie
  const per = Math.ceil(30/cats.length);
  cats.forEach(c=>qs.push(...buildPool([c], per, true)));
  view="exam"; renderSide();
  startQuiz(cats, 30, true, "Examen blanc", {qs: shuffle(qs).slice(0,30), exam:true, time:25*60});
}

// ================== RÉVISION ==================
function fiche(){ page(`<h1>📋 Fiche résumé</h1><p class="sub">Tout le cours en un coup d'œil. Parfait la veille d'un examen.</p>${FICHE}`); }

let FL = null;
function flash(){
  FL = {deck: shuffle(FLASH.map((f,i)=>i)), known:0, again:0};
  drawFlash();
}
function drawFlash(){
  if(!FL.deck.length){
    page(`<h1>🃏 Flashcards</h1><div class="card empty"><b>🎉</b><h2>Paquet terminé !</h2><p>${FL.known} cartes sues du premier coup, ${FL.again} revues.</p><button class="btn" onclick="flash()">Recommencer (nouvel ordre)</button></div>`); return;
  }
  const f = FLASH[FL.deck[0]];
  page(`<h1>🃏 Flashcards</h1><p class="sub">Clique sur la carte (ou <span class="kbd">Espace</span>) pour la retourner. « À revoir » la remet plus loin dans le paquet.</p>
  <div class="qhead"><span>Restantes : <b style="color:var(--txt)">${FL.deck.length}</b></span><span>✅ ${FL.known} · 🔁 ${FL.again}</span></div>
  <div class="flash-wrap"><div class="flash" id="fc"><div class="front">${f[0]}<small>Cliquer pour voir la réponse</small></div><div class="back"><div>${f[1]}</div></div></div></div>
  <div class="row" style="justify-content:center"><button class="btn ghost" onclick="flAns(false)">🔁 À revoir <span class="kbd">1</span></button><button class="btn ok" onclick="flAns(true)">✅ Je savais <span class="kbd">2</span></button></div>`);
  $("#fc").onclick = ()=>$("#fc").classList.toggle("flip");
}
function flAns(ok){
  const c = FL.deck.shift();
  if(ok){ FL.known++; addXP(1); } else { FL.again++; FL.deck.splice(Math.min(FL.deck.length, 3+Math.floor(Math.random()*4)), 0, c); }
  drawFlash();
}

function errors(){
  if(!S.errors.length){ page(`<h1>🔁 Mes erreurs</h1><div class="card empty"><b>🎉</b><h2>Aucune erreur à revoir</h2><p>Chaque question ratée dans un quiz apparaîtra ici. Réponds juste pour la retirer de la liste.</p><button class="btn" onclick="go('quiz')">Faire un quiz</button></div>`); return; }
  const by = {}; S.errors.forEach(e=>{ by[e.c]=(by[e.c]||0)+1; });
  page(`<h1>🔁 Mes erreurs</h1><p class="sub">${S.errors.length} question(s) ratée(s). Réponds-y correctement pour les retirer de la liste.</p>
  <div class="card"><div class="row">${Object.entries(by).map(([c,n])=>`<span class="pill">${CATS[c].icon} ${CATS[c].name} : ${n}</span>`).join("")}</div>
  <div class="row" style="margin-top:16px"><button class="btn" onclick="startQuiz([],0,false,'Révision des erreurs',{qs:shuffle(S.errors).slice(0,20),errorsMode:true})">▶ Réviser mes erreurs (${Math.min(20,S.errors.length)})</button><button class="btn ghost" onclick="ask('Vider la liste des erreurs ?',()=>{S.errors=[];save();go('errors')},'Vider')">Vider la liste</button></div></div>
  <h2>Liste</h2>${S.errors.map(e=>`<div class="review-item bad"><small>${CATS[e.c].icon} ${CATS[e.c].name}</small><div><b>${esc(e.q)}</b></div>${e.code?`<pre class="code">${esc(e.code)}</pre>`:""}<details class="sol"><summary>Voir la réponse</summary><p><b style="color:var(--ok)">${esc(e.t==="qcm"?e.ch[e.a]:e.t==="vf"?(e.a?"Vrai":"Faux"):e.a[0])}</b></p><p style="color:var(--mut)">${e.e}</p></details></div>`).join("")}`);
}

// ================== ATELIER CODE ==================
let exoFilter = "all", EX = null;
const MUST = {
  boucle:[/^\s*(pour|tant\s*que|repeter)\b/m, "Cet exercice demande d'utiliser une boucle (Pour, TantQue ou Répéter) : afficher les valeurs « à la main » ne compte pas !"],
  si:[/^\s*si\b/m, "Cet exercice demande d'utiliser une condition (Si … Alors)."],
  fonction:[/^\s*(fonction|procedure)\b/m, "Cet exercice demande d'écrire une Fonction / Procédure."],
  // récursif : une fonction dont le corps contient un appel à elle-même
  recursif:[{test:code=>{
    const re=/^\s*(?:fonction|procedure)\s+(\w+)\s*\(/gm; let m;
    while((m=re.exec(code))){
      const rest=code.slice(re.lastIndex), end=rest.search(/^\s*fin\s*(fonction|procedure)/m);
      if(new RegExp("\\b"+m[1]+"\\s*\\(").test(end<0?rest:rest.slice(0,end))) return true;
    }
    return false; }}, "Cet exercice demande une version RÉCURSIVE : ta fonction doit s'appeler elle-même (pas de boucle à la place)."],
};
const stars = d => `<span class="diff">${"★".repeat(d)}${"☆".repeat(3-d)}</span>`;
function exos(arg){
  if(arg && EXOS.some(e=>e.id===arg)) return exoPage(arg);
  if(arg) exoFilter = arg;
  const list = EXOS.filter(e=>exoFilter==="all"||e.cat===exoFilter);
  const cats = [...new Set(EXOS.map(e=>e.cat))];
  const nOk = EXOS.filter(e=>S.solved[e.id]).length;
  page(`<h1>✏️ Atelier code</h1><p class="sub">Écris ton algorithme en pseudo-code : il est <b>exécuté et corrigé instantanément</b> sur plusieurs jeux de tests. Indices progressifs si tu bloques, puis la correction complète.</p>
  <div class="card" style="margin-bottom:18px"><div class="catbar" style="margin:0"><span><b>${nOk} / ${EXOS.length}</b> exercices réussis</span><div class="bar"><i style="width:${100*nOk/EXOS.length}%"></i></div><em>${Math.round(100*nOk/EXOS.length)} %</em></div></div>
  <div class="seg" style="margin-bottom:20px;flex-wrap:wrap"><button class="${exoFilter==="all"?"on":""}" onclick="exos('all')">Tous</button>${cats.map(c=>`<button class="${exoFilter===c?"on":""}" onclick="exos('${c}')">${CATS[c].icon} ${CATS[c].name}</button>`).join("")}</div>
  <div class="grid g2">${list.map(e=>{ const st=S.solved[e.id]?"ok":S.code[e.id]?"wip":""; return `<div class="card click exo-card ${st}" onclick="go('exos','${e.id}')"><div class="row" style="justify-content:space-between"><span class="pill">${CATS[e.cat].icon} ${CATS[e.cat].name}</span>${stars(e.d)}</div>
  <h3 style="margin:10px 0 4px;color:var(--txt)">${e.t}</h3><small style="color:var(--mut)">${st==="ok"?"✅ Réussi":st==="wip"?"✏️ En cours":"À faire"} · ${e.tests.length} tests</small></div>`; }).join("")}</div>`);
}

const testLabel = t => t.call ? `Appel : <code>${esc(t.call)}</code>` :
  [t.vars?Object.entries(t.vars).map(([k,v])=>`<code>${k} = ${esc(PC.fmt(v))}</code>`).join(" "):"", t.in&&t.in.length?`Entrées (Lire) : <code>${t.in.map(esc).join(", ")}</code>`:""].filter(Boolean).join(" · ") || "Aucune entrée";
const testExp = t => t.out ? t.out.map(x=>esc(x)).join(" ⏎ ") : esc(PC.fmt(t.ret));
const skeleton = s => s.split("\n").map(l=>{
  const ind=l.match(/^\s*/)[0], t=l.trim(), n=PC.low(t);
  if(/^(debut|fin|sinon|finsi|finpour|fintantque|repeter|finfonction|finprocedure)$/.test(n) || /^(fonction|procedure)\b/.test(n) || /^lire\b/.test(n) || !t) return l;
  if(/^sinon si\b/.test(n)) return ind+"Sinon Si … Alors";
  if(/^si\b/.test(n)) return ind+"Si … Alors";
  if(/^pour chaque\b/.test(n)) return ind+"Pour chaque … dans …";
  if(/^pour\b/.test(n)) return ind+"Pour … allant de … à … Faire";
  if(/^tant/.test(n)) return ind+"TantQue … Faire";
  if(/^jusqu/.test(n)) return ind+"Jusqu'à …";
  if(/^afficher\b/.test(n)) return ind+"Afficher …";
  if(/^retourner\b/.test(n)) return ind+"Retourner …";
  if(/^ajouter\b/.test(n)) return ind+"Ajouter … à …";
  if(t.includes("←")) return ind+t.split("←")[0].trim()+" ← …";
  return ind+"…";
}).join("\n");

// Énoncé : lignes « - » en liste à puces, autres lignes en paragraphes
function fmtQ(q){
  let html = "", list = [];
  const flush = () => { if(list.length){ html += `<ul class="tasks">${list.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>`; list = []; } };
  q.split("\n").forEach(l=>{ if(/^- /.test(l)) list.push(l.slice(2)); else { flush(); html += `<p style="margin:6px 0">${esc(l)}</p>`; } });
  flush(); return html;
}
function exoPage(id){
  const e = EXOS.find(x=>x.id===id), i = EXOS.indexOf(e), nextE = EXOS[i+1];
  const hints = [...e.h, "__skel"];
  EX = {e, hint:0, tries:0};
  page(`<div class="row" style="justify-content:space-between;margin-bottom:10px"><button class="btn ghost sm" onclick="go('exos')">← Atelier</button><span class="row"><span class="pill">${CATS[e.cat].icon} ${CATS[e.cat].name}</span>${stars(e.d)}<small style="color:var(--mut)">Exercice ${i+1}/${EXOS.length}</small></span></div>
  <h1>${e.t} ${S.solved[id]?"✅":""}</h1>
  <div class="card"><b>📝 Énoncé</b>${fmtQ(e.q)}${e.spec?`<div class="box ex" style="margin:10px 0"><b class="t">🎯 Ce que la correction attend</b>${esc(e.spec)}</div>`:""}
  ${e.vars&&!e.spec?`<p class="note">📦 <b>${e.vars}</b> ${e.vars.includes(" et ")?"sont fournis":"est fourni"} par chaque test : utilise-le directement, sans le redéfinir (les valeurs sont visibles dans les tests).</p>`:""}
  ${e.tests[0].call?`<p class="note">🧪 Les tests appellent directement ta fonction : pas besoin de programme principal.</p>`:e.tests.some(t=>t.in)?`<p class="note">⌨️ Les valeurs de chaque test sont données une par une à tes instructions <code>Lire</code>. Un <code>Afficher</code> juste avant un <code>Lire</code> (invite) est ignoré par la correction.</p>`:""}
  <div id="hints"></div>
  <div class="row" style="margin-top:10px"><button class="btn ghost sm" id="hintb">💡 Indice (0/${hints.length})</button><button class="btn ghost sm" id="solb">📖 Voir la correction</button></div><div id="sol"></div></div>
  <div class="ex-grid">
    <div>
      <div class="toolbar">${["←","≠","<=",">=","MOD","ET","OU","NON","VRAI","FAUX"].map(s=>`<button data-ins="${s}">${s}</button>`).join("")}
        ${[["Si","Si … Alors\n   \nFinSi"],["Si/Sinon","Si … Alors\n   \nSinon\n   \nFinSi"],["Pour","Pour i allant de … à … Faire\n   \nFinPour"],["TantQue","TantQue … Faire\n   \nFinTantQue"],["Répéter","Répéter\n   \nJusqu'à …"],["Fonction","Fonction Nom(…) : type\n   Retourner …\nFinFonction"]].map(([l,s])=>`<button class="snip" data-snip="${esc(s)}">+ ${l}</button>`).join("")}</div>
      <div class="ed-wrap"><div class="gutter" id="gut"></div><textarea id="ed" spellcheck="false" autocomplete="off"></textarea></div>
      <div class="row" style="margin-top:12px"><button class="btn ok" id="checkb">✅ Corriger <span class="kbd" style="color:#d1fae5">Ctrl+Entrée</span></button><button class="btn ghost" id="runb">▶ Exécuter</button><button class="btn ghost sm" id="resetb">↺ Recommencer</button></div>
      <p class="note" style="margin-top:8px">Astuce : tape <code>&lt;-</code> pour obtenir <code>←</code>. <span class="kbd">Tab</span> indente, l'indentation suit automatiquement après Alors / Faire / Sinon / Répéter.</p>
    </div>
    <div>
      <div class="card" id="res"></div>
      <div class="card" style="margin-top:14px"><b>🖥️ Console</b> <small style="color:var(--mut)">— teste librement avec tes propres valeurs</small>
      ${e.tests[0].call?"":`<input id="inp" placeholder="Valeurs pour Lire, séparées par des virgules (ex : 12, 16)" value="${esc((e.tests[0].in||[]).join(", "))}">`}
      <div class="out" id="cons" style="margin-top:8px"><span class="pr">Clique sur ▶ Exécuter pour lancer ton code.</span></div></div>
    </div>
  </div>`);
  $("#main .wrap").style.maxWidth = "1280px";
  const ta = $("#ed");
  ta.value = S.code[id] ?? e.start;
  renderTests(null);
  gutter();

  // ---- éditeur
  let saveT;
  ta.addEventListener("input", ()=>{
    const p = ta.selectionStart;
    if(ta.value.slice(p-2,p)==="<-"){ ta.setRangeText("←",p-2,p,"end"); }
    S.code[id] = ta.value; clearTimeout(saveT); saveT = setTimeout(save, 400);
    gutter();
  });
  ta.addEventListener("scroll", ()=>{ $("#gut").scrollTop = ta.scrollTop; });
  ta.addEventListener("keydown", ev=>{
    if(ev.key==="Enter" && (ev.ctrlKey||ev.metaKey)){ ev.preventDefault(); check(); return; }
    if(ev.key==="Tab"){
      ev.preventDefault();
      const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s-1)+1;
      if(ev.shiftKey){ const m = ta.value.slice(ls).match(/^ {1,3}/); if(m){ ta.setRangeText("", ls, ls+m[0].length, "end"); } }
      else ta.setRangeText("   ", s, ta.selectionEnd, "end");
      ta.dispatchEvent(new Event("input")); return;
    }
    if(ev.key==="Enter"){
      ev.preventDefault();
      const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s-1)+1, line = ta.value.slice(ls, s);
      let ind = line.match(/^\s*/)[0]; const n = PC.low(line.trim());
      if(/(alors|faire|sinon|repeter|debut)\s*:?$/.test(n) || /^(fonction|procedure|pour chaque)\b/.test(n)) ind += "   ";
      ta.setRangeText("\n"+ind, s, ta.selectionEnd, "end"); ta.dispatchEvent(new Event("input"));
    }
  });
  const insert = (txt, isSnip) => {
    const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s-1)+1, ind = ta.value.slice(ls, s).match(/^\s*/)[0];
    const t = isSnip ? txt.split("\n").join("\n"+ind) : (/^[A-Z]/.test(txt)?` ${txt} `:txt);
    ta.setRangeText(t, s, ta.selectionEnd, "end");
    const k = ta.value.indexOf("…", s);
    if(isSnip && k>=0 && k < s+t.length) ta.setSelectionRange(k, k+1);
    ta.focus(); ta.dispatchEvent(new Event("input"));
  };
  document.querySelectorAll("[data-ins]").forEach(b=>b.onclick=()=>insert(b.dataset.ins,false));
  document.querySelectorAll("[data-snip]").forEach(b=>b.onclick=()=>insert(b.dataset.snip,true));

  // ---- boutons
  $("#checkb").onclick = check;
  $("#runb").onclick = runConsole;
  $("#resetb").onclick = () => ask("Effacer ton code et revenir au code de départ ?", ()=>{ ta.value = e.start; ta.dispatchEvent(new Event("input")); renderTests(null); }, "Recommencer");
  $("#hintb").onclick = () => {
    if(EX.hint >= hints.length) return;
    const h = hints[EX.hint++];
    $("#hints").insertAdjacentHTML("beforeend", h==="__skel"
      ? `<div class="box tip" style="margin:10px 0 0"><b class="t">💡 Indice ${EX.hint} — le squelette de la solution</b>Complète les « … » :<pre class="code">${esc(skeleton(e.s))}</pre></div>`
      : `<div class="box warn" style="margin:10px 0 0"><b class="t">💡 Indice ${EX.hint}</b>${h}</div>`);
    enhance();
    $("#hintb").textContent = `💡 Indice (${EX.hint}/${hints.length})`;
    if(EX.hint >= hints.length) $("#hintb").disabled = true;
  };
  $("#solb").onclick = () => {
    if(!S.solved[id] && EX.tries < 1 && !EX.forceSol) return ask("Tu n'as pas encore essayé de corriger ton code.\nVoir quand même la correction ?", ()=>{ EX.forceSol=true; $("#solb").click(); }, "Voir la correction");
    $("#sol").innerHTML = `<div class="box def" style="margin:12px 0 0"><b class="t">📖 Correction</b><pre class="code">${esc(e.s)}</pre>
    <p style="margin:0" class="note">Il existe souvent plusieurs bonnes solutions : si tes tests passent, ta version est valable !</p>
    <button class="btn ghost sm" style="margin-top:8px" id="copysol">Copier dans l'éditeur</button></div>`;
    enhance();
    $("#copysol").onclick = () => ask("Remplacer ton code par la correction ?", ()=>{ ta.value = e.s; ta.dispatchEvent(new Event("input")); }, "Remplacer");
  };

  function gutter(errLn){
    const n = ta.value.split("\n").length;
    $("#gut").innerHTML = Array.from({length:n},(_,k)=>`<div class="${k+1===errLn?"err":""}">${k+1}</div>`).join("");
    $("#gut").scrollTop = ta.scrollTop;
  }
  function goLine(ln){
    if(!ln) return;
    const lines = ta.value.split("\n"); let st = 0;
    for(let k=0;k<ln-1 && k<lines.length;k++) st += lines[k].length+1;
    ta.focus(); ta.setSelectionRange(st, st+(lines[ln-1]||"").length);
    ta.scrollTop = Math.max(0,(ln-4)*22.4); gutter(ln);
  }
  window.exoGoLine = goLine;
  const errHtml = er => `<div class="errbox">⚠️ ${er.ln?`<a onclick="exoGoLine(${er.ln})">Ligne ${er.ln}</a> : `:""}${esc(er.msg)}</div>`;

  function renderTests(g){
    const res = g && g.res;
    $("#res").innerHTML = `<b>🧪 Tests (${e.tests.length})</b>${res?` <span style="float:right;font-weight:700;color:${res.every(r=>r.ok)?"var(--ok)":"var(--ko)"}">${res.filter(r=>r.ok).length}/${res.length} réussis</span>`:` <small style="color:var(--mut)">— clique sur Corriger</small>`}
    ${e.tests.map((t,k)=>{ const r = res&&res[k];
      return `<div class="test ${r?(r.ok?"ok":"ko"):""}"><div class="row" style="justify-content:space-between"><span class="lbl">Test ${k+1}</span><span>${r?(r.ok?"✅":"❌"):"⏳"}</span></div>
      <div>${testLabel(t)}</div><div>Attendu : <code>${testExp(t)}</code></div>
      ${r&&!r.ok?`${r.err?errHtml(r.err):`<div>Obtenu : <code style="color:#fca5a5">${t.out?(r.shown.length?r.shown.map(esc).join(" ⏎ "):"(rien d'affiché)"):esc(PC.fmt(r.ret))}</code></div><div class="lbl">${esc(r.why)}</div>`}`:""}</div>`; }).join("")}`;
  }

  function check(){
    EX.tries++;
    const code = ta.value, g = PC.grade(code, e.tests);
    if(g.syntax){
      gutter(g.syntax.ln);
      $("#res").innerHTML = `<b>🧪 Correction</b><div class="errbox" style="margin-top:10px"><b>❌ Erreur d'écriture</b> — ton code ne peut pas être lu.<br>${g.syntax.ln?`<a onclick="exoGoLine(${g.syntax.ln})">Ligne ${g.syntax.ln}</a> : `:""}${esc(g.syntax.msg)}</div>
      <p class="note">Vérifie l'orthographe des mots-clés (Si … Alors, FinSi, Pour … Faire, FinPour, TantQue … Faire, FinTantQue, Répéter / Jusqu'à) et que chaque bloc ouvert est bien fermé.</p>`;
      return;
    }
    gutter();
    renderTests(g);
    const firstErr = g.res.find(r=>r.err); if(firstErr) gutter(firstErr.err.ln);
    const allOk = g.res.every(r=>r.ok);
    const must = e.must && MUST[e.must], mustOk = !must || must[0].test(PC.low(code));
    if(allOk && !mustOk){ $("#res").insertAdjacentHTML("beforeend", `<div class="errbox">⚠️ Les tests passent, mais : ${must[1]}</div>`); return; }
    if(allOk){
      const first = !S.solved[id];
      S.solved[id] = true; save();
      if(first){ addXP(15); toast("🎉 Exercice réussi · +15 XP"); }
      $("#res").insertAdjacentHTML("afterbegin", `<div class="win">🎉 <b>Bravo, tous les tests passent !</b><div class="row" style="margin-top:10px">
        <button class="btn ghost sm" onclick="document.getElementById('solb').click()">📖 Comparer avec la correction</button>
        ${nextE?`<button class="btn sm" onclick="go('exos','${nextE.id}')">Exercice suivant →</button>`:`<button class="btn sm" onclick="go('exos')">Retour à l'atelier</button>`}</div></div>`);
    } else {
      const nOk = g.res.filter(r=>r.ok).length;
      $("#res").insertAdjacentHTML("beforeend", `<p class="note" style="margin:10px 0 0">${nOk?`Presque ! ${nOk} test(s) sur ${g.res.length} réussi(s). Regarde les tests ❌ : compare « Attendu » et « Obtenu ».`:"Aucun test ne passe encore. Lance ▶ Exécuter pour voir ce que fait ton code"}${EX.hint<hints.length?" — ou demande un 💡 indice.":"."}</p>`);
    }
  }

  function runConsole(){
    const cons = $("#cons");
    let prog;
    try{ prog = PC.parse(ta.value); } catch(er){ gutter(er.ln); cons.innerHTML = `<span class="er">⚠️ ${er.ln?`<a onclick="exoGoLine(${er.ln})">Ligne ${er.ln}</a> : `:""}${esc(er.message)}</span>`; return; }
    gutter();
    if(!prog.main.length && e.tests[0].call){
      cons.innerHTML = e.tests.map(t=>{ const r = PC.run(prog,{call:t.call});
        return r.err ? `<span class="er">${esc(t.call)} → ⚠️ ${r.err.ln?`ligne ${r.err.ln} : `:""}${esc(r.err.msg)}</span>`
          : r.out.map(o=>esc(o.text)).join("\n")+(r.out.length?"\n":"")+`<span class="pr">${esc(t.call)} → </span>${esc(PC.fmt(r.ret))}`; }).join("\n");
      return;
    }
    const inputs = $("#inp") ? $("#inp").value.split(/[,;\n]/).map(x=>x.trim()).filter(Boolean) : [];
    const r = PC.run(prog,{inputs, vars:e.tests[0].vars||{}});
    cons.innerHTML = (r.out.map(o=>o.prompt?`<span class="pr">${esc(o.text)} ▸</span>`:esc(o.text)).join("\n") || `<span class="pr">(rien d'affiché)</span>`)
      + (r.err ? `\n<span class="er">⚠️ ${r.err.ln?`<a onclick="exoGoLine(${r.err.ln})">Ligne ${r.err.ln}</a> : `:""}${esc(r.err.msg)}</span>` : `\n<span class="pr">— fin du programme (${r.steps} instructions exécutées)</span>`);
    if(r.err) gutter(r.err.ln);
  }
}

// ================== CLAVIER ==================
document.addEventListener("keydown", e=>{
  if(view==="flash" && FL && FL.deck.length){
    if(e.key===" "){ e.preventDefault(); $("#fc")?.classList.toggle("flip"); }
    if(e.key==="1") flAns(false); if(e.key==="2") flAns(true);
    return;
  }
  if(!QZ || !$(".qcard")) return;
  const q = QZ.qs[QZ.i];
  if(e.key==="Enter"){
    if(QZ.answered){ e.preventDefault(); nextQ(); }
    else if(q.t==="in"){ e.preventDefault(); answer($("#ans").value); }
    return;
  }
  if(QZ.answered || q.t==="in") return;
  const k = e.key.toLowerCase();
  if(q.t==="vf"){ if(k==="v") answer(1); if(k==="f") answer(0); return; }
  const idx = "abcd".indexOf(k) >= 0 ? "abcd".indexOf(k) : "1234".indexOf(k);
  if(idx>=0 && idx<QZ.order.length) answer(QZ.order[idx]);
});

renderSide(); go("home");
