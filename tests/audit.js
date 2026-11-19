// Audit du contenu d'AlgoMaster : node tests/audit.js
// Vérifie que les exercices, les questions du quiz, les leçons et l'assistant sont corrects et cohérents.
// Code de sortie 1 si un problème est trouvé.
const fs = require("fs"), vm = require("vm"), path = require("path");
const SRC = path.join(__dirname, "..", "src");
const ctx = { esc: s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") };
vm.createContext(ctx);
vm.runInContext(["course.js","questions.js","interp.js","exos.js","chat.js"].map(f=>fs.readFileSync(path.join(SRC,f),"utf8")).join("\n;\n")
  + ";this.X={CATS,LESSONS,TRACES,FICHE,FLASH,QB,GENS,EXOS,PC,search};", ctx);
const { CATS, LESSONS, TRACES, FLASH, QB, GENS, EXOS, PC, search } = ctx.X;
const appSrc = fs.readFileSync(path.join(SRC,"app.js"),"utf8");
const problems = [], warnings = [];
const fail = (where, msg) => problems.push(`${where} : ${msg}`);
const warn = (where, msg) => warnings.push(`${where} : ${msg}`);
const low = PC.low;
const num = s => parseFloat(String(s).replace(",", "."));
const same = (a, b) => { const x = num(a), y = num(b); return !isNaN(x) && !isNaN(y) && /^[-\d.,\s]+$/.test(String(a).trim()) ? Math.abs(x-y) < 1e-6 : low(String(a)).replace(/\s+/g," ").trim() === low(String(b)).replace(/\s+/g," ").trim(); };

// ------------------------------------------------------------------ 1. Exercices
const MUST = { boucle:/^\s*(pour|tant\s*que|repeter)\b/m, si:/^\s*si\b/m, fonction:/^\s*(fonction|procedure)\b/m };
const ids = new Set();
for (const e of EXOS) {
  const W = `Exercice ${e.id}`;
  if (ids.has(e.id)) fail(W, "identifiant en double"); ids.add(e.id);
  if (!CATS[e.cat]) fail(W, `catégorie inconnue ${e.cat}`);
  if (!e.h || !e.h.length) fail(W, "aucun indice");
  // la correction passe tous les tests, le code de départ aucun
  const g = PC.grade(e.s, e.tests);
  if (g.syntax) fail(W, `la correction ne compile pas : ${g.syntax.msg}`);
  else g.res.forEach((r,i)=>{ if(!r.ok) fail(W, `la correction échoue au test ${i+1} (${r.why || (r.err&&r.err.msg)})`); });
  const st = PC.grade(e.start, e.tests);
  if (!st.syntax && st.res.every(r=>r.ok)) fail(W, "le code de départ passe déjà les tests");
  // construction obligatoire présente dans la correction
  const code = low(e.s);
  if (e.must === "recursif") { const m = e.s.match(/(?:Fonction|Procédure)\s+(\w+)/); if (!m || !new RegExp(m[1]+"\\s*\\(").test(e.s.slice(e.s.indexOf(m[0]) + m[0].length))) fail(W, "la correction n'est pas récursive"); }
  else if (e.must && !MUST[e.must].test(code)) fail(W, `la correction n'utilise pas la construction exigée (${e.must})`);
  // cohérence Lire / entrées
  const text = low(e.q + " " + (e.spec||""));
  const usesLire = /^\s*(lire|saisir)\b/m.test(code);
  const hasInputs = e.tests.some(t => t.in && t.in.length);
  if (usesLire && !hasInputs) fail(W, "la correction utilise Lire mais aucun test ne fournit d'entrée");
  if (!usesLire && hasInputs) fail(W, "les tests fournissent des entrées mais la correction n'utilise pas Lire");
  if (/\b(demande[rsz]?|saisi[rt]|saisisse|lire|lis)\b/.test(text) && !usesLire && !e.tests[0].call) fail(W, "l'énoncé demande une saisie mais la correction n'utilise pas Lire");
  if (hasInputs && !/\b(lire|lis|demande[rsz]?|saisi[rt]|saisisse)\b/.test(text)) fail(W, "les tests passent des valeurs à Lire mais l'énoncé ne dit pas de lire/demander");
  // cohérence données fournies
  const varNames = [...new Set(e.tests.flatMap(t => Object.keys(t.vars||{})))];
  for (const v of varNames) if (!new RegExp("\\b"+v.toLowerCase()+"\\b").test(low(e.q+" "+(e.spec||"")+" "+(e.vars||"")))) fail(W, `la variable ${v} est fournie par les tests mais l'énoncé ne la nomme pas`);
  if (varNames.length && !e.vars) fail(W, "des variables sont fournies mais le champ vars est absent (pas d'avertissement « ne pas redéfinir »)");
  if (e.vars && !varNames.length) fail(W, `vars="${e.vars}" mais aucun test ne fournit de variable`);
  for (const v of varNames) if (new RegExp("^\\s*"+v+"\\s*(←|<-)\\s*\\[", "mi").test(e.s)) fail(W, `la correction redéfinit ${v}, alors qu'il est fourni`);
  if (/fourni/.test(text) && !varNames.length && !e.tests[0].call) fail(W, "l'énoncé dit « fourni » mais les tests ne fournissent rien");
  // nombre de lignes annoncé
  const nl = (e.spec||"").match(/Affiche (\d+) lignes/);
  if (nl) e.tests.forEach((t,i)=>{ if (t.out && t.out.length !== +nl[1]) fail(W, `la consigne annonce ${nl[1]} lignes mais le test ${i+1} en attend ${t.out.length}`); });
  // messages exacts annoncés entre guillemets
  const quoted = [...(e.q+" "+(e.spec||"")).matchAll(/"([^"]{2,40})"/g)].map(m=>m[1]);
  const expected = new Set(e.tests.flatMap(t => (t.out||[]).map(String)));
  for (const s of quoted) if (/^[A-ZÉÈ]/.test(s) && ![...expected].some(x=>same(x,s)) && !/x \d|=|algo2026|Bienvenue/.test(s)) warn(W, `message "${s}" annoncé mais attendu par aucun test`);
  // un « Afficher » d'invite juste avant un Lire ne doit pas être compté : vérifie une variante avec invites
  if (usesLire) {
    const withPrompts = e.s.replace(/^(\s*)(Lire\s+\w+)/gm, '$1Afficher "Valeur ?"\n$1$2');
    const gp = PC.grade(withPrompts, e.tests);
    if (gp.syntax || gp.res.some(r=>!r.ok)) fail(W, "la correction échoue si on ajoute des invites Afficher avant les Lire");
  }
  // variante avec « <- », « Fin Si », « Affiche » : la correction doit toujours passer
  const variant = e.s.replace(/←/g,"<-").replace(/\bFinSi\b/g,"Fin Si").replace(/\bFinPour\b/g,"Fin Pour").replace(/^(\s*)Afficher\b/gm,"$1Affiche");
  const gv = PC.grade(variant, e.tests);
  if (gv.syntax || gv.res.some(r=>!r.ok)) fail(W, `la correction échoue avec l'écriture <- / Fin Si / Affiche (${gv.syntax?gv.syntax.msg:"test"})`);
}

// ------------------------------------------------------------------ 2. Questions (statiques + générées)
function answerOf(q){ return q.t==="qcm" ? q.ch[q.a] : q.t==="vf" ? (q.a?"VRAI":"FAUX") : q.a[0]; }
// Recalcule la réponse d'une question à partir de son code quand c'est possible
function recompute(q){
  if (!q.code) return null;
  const vars = {};
  for (const m of q.q.matchAll(/\b([a-zA-Z_]\w*) = (\[[^\]]*\]|VRAI|FAUX|-?\d+(?:\.\d+)?)/g)) vars[m[1]] = m[2]==="VRAI"?true:m[2]==="FAUX"?false:m[2].startsWith("[")?JSON.parse(m[2]):+m[2];
  let inputs = [];
  const sais = q.q.match(/saisit ([-\d, ]+) puis 0/); if (sais) inputs = sais[1].split(",").map(s=>s.trim()).concat(["0"]);
  // seules les questions qui demandent un résultat d'exécution sont recalculées (les autres montrent parfois un code volontairement faux)
  if (!/Que retourne|Que vaut|Combien de fois|Combien de nombres sont affichés|Que s'affiche|Qu'affiche|Qu'est-ce qui s'affiche|s'affiche\.$/.test(q.q)) return null;
  let prog; try { prog = PC.parse(q.code); } catch(e){ return {err:"le code de la question ne compile pas : "+e.message}; }
  const call = q.q.match(/Que retourne (\w+\([^)]*\))/);
  if (call) { const r = PC.run(prog,{vars, call:call[1]}); return r.err ? {err:r.err.msg} : {val:PC.fmt(r.ret)}; }
  const qv = q.q.match(/Que vaut (\w+)(?: à la fin)?/);
  if (qv) {
    let p2; try { p2 = PC.parse(q.code + "\nAfficher " + qv[1]); } catch(e){ return null; }
    const r = PC.run(p2,{vars, inputs}); return r.err ? {err:r.err.msg} : {val:r.out[r.out.length-1].text};
  }
  const r = PC.run(prog,{vars, inputs});
  if (/Combien de fois|Combien de nombres sont affichés/.test(q.q)) return r.err ? {err:r.err.msg} : {val:String(r.out.length)};
  if (/Que s'affiche|Qu'affiche|Qu'est-ce qui s'affiche|s'affiche\.$/.test(q.q)) {
    if (r.err) return {err:r.err.msg};
    if (q.t==="vf") return {val: r.out.length ? "VRAI" : "FAUX"};
    return {val: r.out.map(o=>o.text).join(" ")};
  }
  return null;
}
let verified = 0;
function checkQ(q, where){
  if (!CATS[q.c]) fail(where, `catégorie inconnue ${q.c}`);
  if (q.t==="qcm") {
    if (!(q.a>=0 && q.a<q.ch.length)) fail(where, "index de bonne réponse invalide");
    if (new Set(q.ch).size !== q.ch.length) fail(where, `choix en double : ${q.ch.join(" | ")}`);
    if (q.ch.length < 2) fail(where, "moins de 2 choix");
  }
  if (q.t==="in" && (!q.a.length || q.a.some(a=>/NaN|undefined|null/.test(a)))) fail(where, `réponse attendue invalide ${q.a}`);
  if (!q.e) fail(where, "pas d'explication");
  const rc = recompute(q);
  if (rc && rc.err) fail(where, `exécution du code impossible : ${rc.err}`);
  else if (rc && rc.val !== undefined) {
    verified++;
    const ans = answerOf(q);
    const ok = q.t==="in" ? q.a.some(a=>same(a, rc.val)) : same(ans, rc.val) || same(ans.replace(/[\[\],]/g," ").replace(/\s+/g," "), rc.val);
    if (!ok) fail(where, `réponse « ${ans} » mais l'exécution donne « ${rc.val} »`);
  }
}
QB.forEach((q,i)=>checkQ(q, `Question ${i+1} « ${q.q.slice(0,60)} »`));
const staticVerified = verified;
GENS.forEach((g,k)=>{ for (let r=0;r<300;r++){ let q; try{ q=g(); } catch(e){ fail(`Générateur ${k}`, "plante : "+e.message); break; } checkQ(q, `Générateur ${k} « ${q.q.slice(0,50)} »`); } });

// ------------------------------------------------------------------ 3. Leçons
const lessonCode = [];
for (const l of LESSONS) {
  if (!CATS[l.cat]) fail(`Leçon ${l.id}`, "catégorie inconnue");
  for (const m of l.html.matchAll(/data-trace="(\w+)"/g)) {
    const T = TRACES[m[1]]; if (!T) { fail(`Leçon ${l.id}`, `trace ${m[1]} introuvable`); continue; }
    T.steps.forEach((s,i)=>{ if (s.l<0 || s.l>=T.code.length) fail(`Trace ${m[1]}`, `étape ${i+1} pointe hors du code`); });
  }
  for (const m of l.html.matchAll(/<pre class="code">([\s\S]*?)<\/pre>/g)) {
    const code = m[1].replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
    if (/^\s*(if|return|Entrée)\b/m.test(code)) continue; // écriture Python du cours, volontairement différente
    if (/NomFonction/.test(code)) continue;               // modèle de syntaxe générique, pas un vrai algorithme
    lessonCode.push(code);
    try { PC.parse(code); } catch(e){ fail(`Leçon ${l.id}`, `un exemple ne passe pas dans l'atelier (ligne ${e.ln} : ${e.message}) :\n      ${code.split("\n").slice(0,3).join(" / ")}`); }
  }
}
// les traces pas à pas doivent correspondre à une vraie exécution (affichage final)
for (const [k,T] of Object.entries(TRACES)) {
  if (/^Fonction/.test(T.code[0])) continue;
  try {
    const r = PC.run(PC.parse(T.code.join("\n").replace(/N - /g,"taille(T) - ")), {});
    const last = T.steps[T.steps.length-1].o || "";
    if (r.err) fail(`Trace ${k}`, "le code ne s'exécute pas : " + r.err.msg);
    else if (r.out.map(o=>o.text).join("\n").replace(/\s/g,"") !== last.replace(/\s/g,"")) fail(`Trace ${k}`, `affichage final « ${last} » mais l'exécution donne « ${r.out.map(o=>o.text).join(" ")} »`);
  } catch(e){ fail(`Trace ${k}`, "ne compile pas : " + e.message); }
}

// ------------------------------------------------------------------ 4. Assistant
const CHATQ = [["c'est quoi la récursivité","recurs"],["différence entre tantque et répéter","tant"],["comment marche le tri à bulles","bulle"],["à quoi sert MOD","mod"],["pourquoi ma boucle est infinie","infini"],["comment déclarer une variable","variable"],["table de vérité du OU","ou"],["c'est quoi la complexité","complexit"],["afficher ou retourner","retourner"],["tri par sélection","selection"],["c'est quoi un tableau","tableau"],["PGCD","pgcd"]];
for (const [q,kw] of CHATQ) { const h = search(q); if (!h.length) fail("Assistant", `aucune réponse pour « ${q} »`); else if (!low(h[0].d.title + " " + h[0].d.text).includes(kw)) fail("Assistant", `« ${q} » → « ${h[0].d.title} » (hors sujet)`); }

// ------------------------------------------------------------------ 5. Divers
FLASH.forEach(([q,a],i)=>{ if(!q||!a) fail(`Flashcard ${i+1}`, "vide"); });

console.log(`Exercices : ${EXOS.length} | Questions : ${QB.length} (+${GENS.length} générateurs) | Leçons : ${LESSONS.length} (${lessonCode.length} exemples de code) | Flashcards : ${FLASH.length}`);
console.log(`Réponses recalculées par exécution : ${staticVerified} questions fixes + ${verified-staticVerified} questions générées`);
if (warnings.length) console.log(`\n${warnings.length} avertissement(s) :\n - ` + warnings.join("\n - "));
if (problems.length) { console.log(`\n❌ ${problems.length} problème(s) :\n - ` + [...new Set(problems)].join("\n - ")); process.exit(1); }
console.log("\n✅ Aucun problème.");
