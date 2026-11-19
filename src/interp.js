// ================== INTERPRÉTEUR DE PSEUDO-CODE ==================
// Comprend la syntaxe du cours : ←, Lire, Afficher, Si/Sinon Si/Sinon/FinSi, Pour/FinPour (pas de),
// Pour chaque, TantQue/FinTantQue, Répéter/Jusqu'à, Fonction/Procédure/Retourner, tableaux, ensembles.
const PC = (() => {
  const STRIP = {"à":"a","â":"a","ä":"a","á":"a","é":"e","è":"e","ê":"e","ë":"e","î":"i","ï":"i","ô":"o","ö":"o","ù":"u","û":"u","ü":"u","ç":"c","œ":"o"};
  // même longueur que l'entrée : les indices des captures restent valables sur le texte d'origine
  const low = s => s.toLowerCase().replace(/[^\x00-\x7f]/g, c => STRIP[c] || c);

  class PErr extends Error { constructor(msg, ln){ super(msg); this.ln = ln; } }
  class Ret { constructor(v){ this.v = v; } }

  // ---------- lignes ----------
  function prep(src){
    return src.replace(/\r/g,"").split("\n").map((raw,i)=>{
      const s = raw.replace(/<-/g,"←").replace(/≤/g,"<=").replace(/≥/g,">=").replace(/\t/g,"   ").replace(/[“”]/g,'"');
      let inS=false, out="";
      for(let k=0;k<s.length;k++){ const c=s[k]; if(c==='"') inS=!inS; if(!inS && c==="/" && s[k+1]==="/") break; out+=c; }
      out = out.trim().replace(/^\d+\.\s+/,"");
      return {t:out, n:low(out), ln:i+1};
    }).filter(l=>l.t);
  }

  // ---------- expressions ----------
  function lex(s, ln){
    const T=[]; let i=0;
    while(i<s.length){
      const c=s[i];
      if(/\s/.test(c)){ i++; continue; }
      if(/\d/.test(c)){ let j=i; while(j<s.length && /\d/.test(s[j])) j++; if(s[j]==="." && /\d/.test(s[j+1]||"")){ j++; while(j<s.length && /\d/.test(s[j])) j++; } T.push({k:"num",v:parseFloat(s.slice(i,j))}); i=j; continue; }
      if(c==='"'){ const j=s.indexOf('"',i+1); if(j<0) throw new PErr('Guillemet " non fermé',ln); T.push({k:"str",v:s.slice(i+1,j)}); i=j+1; continue; }
      if(/[A-Za-z_À-ſ]/.test(c)){ let j=i; while(j<s.length && /[\wÀ-ſ]/.test(s[j])) j++; const w=s.slice(i,j); T.push({k:"id",v:w,n:low(w)}); i=j; continue; }
      const two=s.slice(i,i+2);
      if(["<=",">=","<>","!=","=="].includes(two)){ T.push({k:"op",v:two==="<>"||two==="!="?"≠":two==="=="?"=":two}); i+=2; continue; }
      if(c==="%"){ T.push({k:"id",v:"MOD",n:"mod"}); i++; continue; }
      if("+-*/()[],=<>≠×÷".includes(c)){ T.push({k:"op",v:c==="×"?"*":c==="÷"?"/":c}); i++; continue; }
      if(c==="←") throw new PErr("« ← » ne peut pas être utilisé au milieu d'une expression",ln);
      throw new PErr(`Caractère inattendu « ${c} »`,ln);
    }
    return T;
  }
  function parseExpr(text, ln){
    const T=lex(text,ln); let p=0;
    const isOp=v=>T[p]&&T[p].k==="op"&&T[p].v===v;
    const isKw=w=>T[p]&&T[p].k==="id"&&T[p].n===w;
    const expect=v=>{ if(!isOp(v)) throw new PErr(`« ${v} » attendu`+(T[p]?` avant « ${T[p].v} »`:" en fin d'expression"),ln); p++; };
    const or=()=>{ let l=and(); while(isKw("ou")){ p++; l={t:"or",l,r:and()}; } return l; };
    const and=()=>{ let l=not(); while(isKw("et")){ p++; l={t:"and",l,r:not()}; } return l; };
    const not=()=>{ if(isKw("non")){ p++; return {t:"not",e:not()}; } return cmp(); };
    const cmp=()=>{ let l=add();
      for(;;){ const t=T[p];
        if(t&&t.k==="op"&&["=","≠","<",">","<=",">="].includes(t.v)){ p++; l={t:"bin",op:t.v,l,r:add()}; }
        else if(isKw("appartient")){ p++; if(isKw("a")) p++; l={t:"in",l,r:add()}; }
        else return l; } };
    const add=()=>{ let l=mul(); while(isOp("+")||isOp("-")){ const o=T[p++].v; l={t:"bin",op:o,l,r:mul()}; } return l; };
    const mul=()=>{ let l=un(); for(;;){ if(isOp("*")||isOp("/")){ const o=T[p++].v; l={t:"bin",op:o,l,r:un()}; } else if(isKw("mod")||isKw("div")){ const o=T[p++].n; l={t:"bin",op:o,l,r:un()}; } else return l; } };
    const un=()=>{ if(isOp("-")){ p++; return {t:"neg",e:un()}; } if(isOp("+")){ p++; return un(); } return post(); };
    const post=()=>{ let e=prim(); while(isOp("[")){ p++; const i=or(); expect("]"); e={t:"idx",a:e,i}; } return e; };
    const list=close=>{ const a=[]; if(!isOp(close)){ do{ a.push(or()); } while(isOp(",")&&++p); } expect(close); return a; };
    const prim=()=>{
      const t=T[p++];
      if(!t) throw new PErr("Expression incomplète (il manque une valeur)",ln);
      if(t.k==="num"||t.k==="str") return {t:"lit",v:t.v};
      if(t.k==="op"&&t.v==="("){ const e=or(); expect(")"); return e; }
      if(t.k==="op"&&t.v==="[") return {t:"list",items:list("]")};
      if(t.k==="id"){
        if(t.n==="vrai") return {t:"lit",v:true};
        if(t.n==="faux") return {t:"lit",v:false};
        if(t.n==="ensemble"){ if(isKw("vide")) p++; return {t:"set"}; }
        if(isOp("(")){ p++; return {t:"call",name:t.v,args:list(")")}; }
        if(["et","ou","mod","div","alors","faire","sinon"].includes(t.n)) throw new PErr(`Mot-clé « ${t.v} » mal placé`,ln);
        return {t:"var",name:t.v};
      }
      throw new PErr(`Symbole inattendu « ${t.v} »`,ln);
    };
    const e=or();
    if(p<T.length) throw new PErr(`Symbole inattendu « ${T[p].v} » (opérateur oublié ? « Alors »/« Faire » mal placé ?)`,ln);
    return e;
  }
  const target=(text,ln)=>{ const e=parseExpr(text,ln); if(e.t!=="var"&&e.t!=="idx") throw new PErr(`« ${text} » n'est pas une variable : on ne peut rien y ranger`,ln); return e; };

  // ---------- instructions ----------
  const RX = [
    ["skip",   /^(debut|fin|demarrer)\s*:?$/d],
    ["skip",   /^(algorithme|programme)\b/d],
    ["skip",   /^(variables?|entrees?|sorties?|donnees?)\s*:/d],
    ["skip",   /^(variables?)$/d],
    ["skip",   /^(declarer|var|constante)\s/d],
    ["skip",   /^(?!fonction|procedure)[^←"]*:\s*(un |une |des )?(entier|reel|chaine|booleen|tableau|ensemble|caractere|nombre)/d],
    ["func",   /^(fonction|procedure)\s+(\w+)\s*\((.*)\)\s*(?::.*)?$/d],
    ["endf",   /^fin\s*(fonction|procedure)$/d],
    ["elif",   /^sinon\s*si\s+(.+?)\s+alors\s*:?$/d],
    ["else",   /^sinon\s*:?$/d],
    ["endif",  /^fin\s*si$/d],
    ["if",     /^si\s+(.+?)\s+alors\s*:?$/d],
    ["foreach",/^pour\s+chaque\s+(\w+)\s+(?:dans|de)\s+(.+?)(?:\s+faire)?\s*:?$/d],
    ["for",    /^pour\s+(\w+)\s+(?:allant\s+)?(?:de\s+|←\s*|=\s*)(.+?)\s+(?:a|jusqu'a|jusqua)\s+(.+?)(?:\s+(?:par\s+)?pas\s+(?:de\s+)?(.+?))?(?:\s+faire)?\s*:?$/d],
    ["endfor", /^fin\s*pour$/d],
    ["while",  /^tant\s*que\s+(.+?)(?:\s+faire)?\s*:?$/d],
    ["endwhile",/^(fin\s*tant\s*que|fintq)$/d],
    ["repeat", /^repeter\s*:?$/d],
    ["until",  /^jusqu'?\s*a\s+(.+)$/d],
    ["ret",    /^(?:retourner|renvoyer|retourne)\b\s*(.*)$/d],
    ["read",   /^(?:lire|saisir)\s+(.+)$/d],
    ["print",  /^(?:afficher|affiche|ecrire|ecris)\b\s*(.*)$/d],
    ["add",    /^ajouter\s+(.+?)\s+(?:a|dans)\s+(\w+)$/d],
    ["assign", /^(.+?)\s*←\s*(.*)$/d],
    ["call",   /^(\w+\s*\(.*\))$/d],
  ];
  const NAMES = {endif:"FinSi",endfor:"FinPour",endwhile:"FinTantQue",until:"Jusqu'à",endf:"FinFonction",else:"Sinon",elif:"Sinon Si"};
  function kind(l){
    for(const [type,re] of RX){ const m=re.exec(l.n); if(m) return {type, g:m.indices.map(ix=>ix?l.t.slice(ix[0],ix[1]):undefined)}; }
    if(/^si\s/.test(l.n)) throw new PErr("Il manque « Alors » à la fin de la ligne Si",l.ln);
    if(/^[\w\[\]]+\s*=[^=]/.test(l.n)) throw new PErr("Pour ranger une valeur dans une variable, utilise ← (ou <-), pas =. Le = sert à comparer.",l.ln);
    throw new PErr(`Instruction non comprise : « ${l.t} »`,l.ln);
  }

  function parse(src){
    const L=prep(src); let i=0; const funcs={}, main=[];
    function block(ends){
      const body=[];
      while(i<L.length){
        const l=L[i], k=kind(l);
        if(ends.includes(k.type)) return {body,end:k,line:l};
        i++; const s=stmt(k,l); if(s) body.push(s);
      }
      return {body,end:null};
    }
    function stmt(k,l){
      const g=k.g, ln=l.ln;
      switch(k.type){
        case "skip": return null;
        case "assign": { if(!g[2].trim()) throw new PErr("Rien à droite de ←",ln); return {t:"assign",ln,tg:target(g[1],ln),e:parseExpr(g[2],ln)}; }
        case "print": return {t:"print",ln,args:g[1].trim()?parseExpr("["+g[1]+"]",ln).items:[]};
        case "read": return {t:"read",ln,tgs:g[1].split(",").map(x=>target(x.trim(),ln))};
        case "ret": return {t:"ret",ln,e:g[1].trim()?parseExpr(g[1],ln):null};
        case "add": return {t:"add",ln,e:parseExpr(g[1],ln),set:g[2]};
        case "call": return {t:"expr",ln,e:parseExpr(g[1],ln)};
        case "if": {
          const node={t:"if",ln,br:[{c:parseExpr(g[1],ln)}],els:null};
          let r=block(["elif","else","endif"]); node.br[0].b=r.body;
          while(r.end&&r.end.type==="elif"){ i++; const br={c:parseExpr(r.end.g[1],r.line.ln)}; r=block(["elif","else","endif"]); br.b=r.body; node.br.push(br); }
          if(r.end&&r.end.type==="else"){ i++; r=block(["endif"]); node.els=r.body; }
          if(!r.end) throw new PErr(`Le « Si » de la ligne ${ln} n'est jamais fermé : il manque FinSi`,ln);
          i++; return node;
        }
        case "for": { const r=block(["endfor"]); if(!r.end) throw new PErr(`Le « Pour » de la ligne ${ln} n'est jamais fermé : il manque FinPour`,ln); i++;
          return {t:"for",ln,v:g[1],a:parseExpr(g[2],ln),b:parseExpr(g[3],ln),st:g[4]?parseExpr(g[4],ln):null,body:r.body}; }
        case "foreach": { const r=block(["endfor"]); if(!r.end) throw new PErr(`Le « Pour chaque » de la ligne ${ln} n'est jamais fermé : il manque FinPour`,ln); i++;
          return {t:"foreach",ln,v:g[1],e:parseExpr(g[2],ln),body:r.body}; }
        case "while": { const r=block(["endwhile"]); if(!r.end) throw new PErr(`Le « TantQue » de la ligne ${ln} n'est jamais fermé : il manque FinTantQue`,ln); i++;
          return {t:"while",ln,c:parseExpr(g[1],ln),body:r.body}; }
        case "repeat": { const r=block(["until"]); if(!r.end) throw new PErr(`Le « Répéter » de la ligne ${ln} n'a pas de « Jusqu'à »`,ln); i++;
          return {t:"repeat",ln,c:parseExpr(r.end.g[1],r.line.ln),body:r.body}; }
        case "func": throw new PErr("On ne peut pas définir une fonction à l'intérieur d'un bloc",ln);
        default: throw new PErr(`« ${NAMES[k.type]||l.t} » inattendu ici (aucun bloc correspondant ouvert)`,ln);
      }
    }
    while(i<L.length){
      const l=L[i], k=kind(l);
      if(k.type==="func"){
        i++;
        const params=k.g[3].split(",").map(x=>x.split(":")[0].trim()).filter(Boolean);
        const r=block(["endf"]);
        if(!r.end) throw new PErr(`La ${low(k.g[1])==="fonction"?"fonction":"procédure"} « ${k.g[2]} » n'est jamais fermée : il manque Fin${k.g[1]}`,l.ln);
        i++;
        funcs[low(k.g[2])]={name:k.g[2],proc:low(k.g[1])==="procedure",params,body:r.body,ln:l.ln};
      } else { i++; const s=stmt(k,l); if(s) main.push(s); }
    }
    return {funcs,main};
  }

  // ---------- exécution ----------
  const fmt = v => typeof v==="number" ? (Number.isInteger(v)?String(v):String(+v.toFixed(10)))
    : typeof v==="boolean" ? (v?"VRAI":"FAUX")
    : Array.isArray(v) ? "["+v.map(x=>typeof x==="string"?`"${x}"`:fmt(x)).join(", ")+"]"
    : v instanceof Set ? "{"+[...v].map(fmt).join(", ")+"}"
    : v===undefined ? "(rien)" : String(v);
  const tname = v => typeof v==="number"?"un nombre":typeof v==="boolean"?"un booléen":typeof v==="string"?"une chaîne":Array.isArray(v)?"un tableau":v instanceof Set?"un ensemble":"rien";
  const clone = v => Array.isArray(v) ? v.map(clone) : v;
  const parseInput = s => { s=String(s).trim(); if(/^-?\d+([.,]\d+)?$/.test(s)) return parseFloat(s.replace(",",".")); const l=low(s); if(l==="vrai") return true; if(l==="faux") return false; return s.replace(/^"(.*)"$/,"$1"); };

  function run(prog, {inputs=[], vars={}, call=null, maxSteps=200000}={}){
    const out=[]; let steps=0, prevPrint=false, depth=0; const inQ=inputs.map(parseInput);
    const G=Object.create(null); for(const k in vars) G[low(k)]=clone(vars[k]);
    const tick=ln=>{ if(++steps>maxSteps) throw new PErr("Plus de 200 000 instructions exécutées : boucle infinie probable. La condition d'arrêt devient-elle vraiment vraie ? La variable est-elle modifiée dans la boucle ?",ln); };
    const num=(v,ln,op)=>{ if(typeof v!=="number") throw new PErr(`« ${op} » attend des nombres, mais reçoit ${tname(v)} (${fmt(v)})`,ln); return v; };
    const bool=(v,ln,what)=>{ if(typeof v!=="boolean") throw new PErr(`${what} doit valoir VRAI ou FAUX, mais vaut ${fmt(v)} (${tname(v)})`,ln); return v; };
    const eq=(a,b)=>typeof a==="number"&&typeof b==="number"?Math.abs(a-b)<1e-9:a===b;

    function ev(n,sc,ln){
      switch(n.t){
        case "lit": return n.v;
        case "list": return n.items.map(x=>ev(x,sc,ln));
        case "set": return new Set();
        case "var": { const k=low(n.name); if(!(k in sc)) throw new PErr(`La variable « ${n.name} » est utilisée avant d'avoir reçu une valeur (oubli d'initialisation ou de Lire ?)`,ln); return sc[k]; }
        case "idx": { const a=ev(n.a,sc,ln), i=ev(n.i,sc,ln);
          if(!Array.isArray(a)&&typeof a!=="string") throw new PErr(`On ne peut utiliser [ ] que sur un tableau, pas sur ${tname(a)}`,ln);
          if(typeof i!=="number"||!Number.isInteger(i)) throw new PErr(`Un indice doit être un entier (reçu : ${fmt(i)})`,ln);
          if(i<0||i>=a.length) throw new PErr(`Indice ${i} hors limites : le tableau a ${a.length} élément(s), indices valides de 0 à ${a.length-1}`,ln);
          return a[i]; }
        case "neg": return -num(ev(n.e,sc,ln),ln,"-");
        case "not": return !bool(ev(n.e,sc,ln),ln,"L'expression après NON");
        case "and": return bool(ev(n.l,sc,ln),ln,"Le côté gauche de ET") && bool(ev(n.r,sc,ln),ln,"Le côté droit de ET");
        case "or":  return bool(ev(n.l,sc,ln),ln,"Le côté gauche de OU") || bool(ev(n.r,sc,ln),ln,"Le côté droit de OU");
        case "in": { const s=ev(n.r,sc,ln), v=ev(n.l,sc,ln); if(s instanceof Set) return s.has(v); if(Array.isArray(s)) return s.some(x=>eq(x,v)); throw new PErr("« appartient à » attend un ensemble ou un tableau",ln); }
        case "bin": {
          const a=ev(n.l,sc,ln), b=ev(n.r,sc,ln), o=n.op;
          if(o==="="||o==="≠"){ const r=eq(a,b); return o==="="?r:!r; }
          if(o==="+"&&(typeof a==="string"||typeof b==="string")) return fmt(a)+fmt(b);
          if(["<",">","<=",">="].includes(o)){
            if(typeof a!==typeof b||(typeof a!=="number"&&typeof a!=="string")) throw new PErr(`Impossible de comparer ${tname(a)} et ${tname(b)} avec « ${o} »`,ln);
            return o==="<"?a<b:o===">"?a>b:o==="<="?a<=b:a>=b;
          }
          num(a,ln,o.toUpperCase()); num(b,ln,o.toUpperCase());
          if(o==="+") return a+b; if(o==="-") return a-b; if(o==="*") return a*b;
          if(b===0) throw new PErr(`Division par zéro (${fmt(a)} ${o==="/"?"/":o.toUpperCase()} 0)`,ln);
          if(o==="/") return a/b;
          if(o==="div") return Math.trunc(a/b);
          return a%b;
        }
        case "call": return callF(n,sc,ln,true);
      }
    }
    function callF(n,sc,ln,needVal){
      const k=low(n.name), args=n.args.map(x=>ev(x,sc,ln));
      const one=()=>{ if(args.length!==1) throw new PErr(`${n.name}() attend 1 paramètre`,ln); return args[0]; };
      if(k==="taille"||k==="longueur"){ const v=one(); if(Array.isArray(v)||typeof v==="string") return v.length; if(v instanceof Set) return v.size; throw new PErr(`${n.name}() attend un tableau ou une chaîne`,ln); }
      if(k==="abs") return Math.abs(num(one(),ln,"abs"));
      if(k==="racine") return Math.sqrt(num(one(),ln,"racine"));
      if(k==="ent"||k==="partie_entiere") return Math.floor(num(one(),ln,n.name));
      if(k==="arrondi"){ const d=args[1]||0; return Math.round(num(args[0],ln,"arrondi")*10**d)/10**d; }
      const f=prog.funcs[k];
      if(!f) throw new PErr(`Fonction « ${n.name} » inconnue (pas encore écrite, ou nom mal orthographié ?)`,ln);
      if(args.length!==f.params.length) throw new PErr(`« ${f.name} » attend ${f.params.length} paramètre(s) mais en reçoit ${args.length}`,ln);
      if(depth>=500) throw new PErr(`Trop d'appels imbriqués de « ${f.name} » (récursion sans fin ?)`,ln);
      depth++;
      const L=Object.create(null); f.params.forEach((p,i)=>L[low(p)]=args[i]);
      let val, returned=false;
      try{ exec(f.body,L); } catch(e){ if(e instanceof Ret){ val=e.v; returned=true; } else throw e; } finally { depth--; }
      if(needVal && (!returned||val===undefined)) throw new PErr(f.proc?`« ${f.name} » est une procédure : elle ne renvoie pas de valeur utilisable dans un calcul`:`La fonction « ${f.name} » s'est terminée sans « Retourner » une valeur`,ln);
      return val;
    }
    function assign(tg,v,sc,ln){
      if(tg.t==="var"){ sc[low(tg.name)]=v; return; }
      const a=ev(tg.a,sc,ln), i=ev(tg.i,sc,ln);
      if(!Array.isArray(a)) throw new PErr("On ne peut écrire T[i] ← … que sur un tableau",ln);
      if(typeof i!=="number"||!Number.isInteger(i)||i<0||i>=a.length) throw new PErr(`Indice ${fmt(i)} hors limites : indices valides de 0 à ${a.length-1}`,ln);
      a[i]=v;
    }
    function exec(body,sc){
      for(const s of body){
        tick(s.ln); const ln=s.ln;
        switch(s.t){
          case "assign": assign(s.tg,ev(s.e,sc,ln),sc,ln); break;
          case "print": {
            const txt=s.args.map(a=>fmt(ev(a,sc,ln))).join(" ").replace(/ {2,}/g," ").trim();
            out.push({text:txt,prompt:false}); if(out.length>3000) throw new PErr("Plus de 3000 lignes affichées : boucle infinie probable",ln);
            break; }
          case "read":
            if(prevPrint&&out.length) out[out.length-1].prompt=true;
            for(const tg of s.tgs){
              if(!inQ.length) throw new PErr(`« Lire » ne trouve plus de donnée : ce test n'en fournit que ${inputs.length}. Lis-tu trop de valeurs, ou est-ce une boucle qui ne s'arrête pas ?`,ln);
              assign(tg,inQ.shift(),sc,ln);
            } break;
          case "ret": throw new Ret(s.e?ev(s.e,sc,ln):undefined);
          case "add": { const st=sc[low(s.set)]; if(st instanceof Set) st.add(ev(s.e,sc,ln)); else if(Array.isArray(st)) st.push(ev(s.e,sc,ln)); else throw new PErr(`« ${s.set} » n'est pas un ensemble (as-tu écrit ${s.set} ← ensemble vide ?)`,ln); break; }
          case "expr": callF(s.e,sc,ln,false); break;
          case "if": {
            let done=false;
            for(const b of s.br){ if(bool(ev(b.c,sc,ln),ln,"La condition du Si")){ exec(b.b,sc); done=true; break; } }
            if(!done&&s.els) exec(s.els,sc);
            break; }
          case "for": {
            const a=num(ev(s.a,sc,ln),ln,"Pour"), b=num(ev(s.b,sc,ln),ln,"Pour"), st=s.st?num(ev(s.st,sc,ln),ln,"pas"):1;
            if(st===0) throw new PErr("Un pas de 0 ne fait jamais avancer la boucle",ln);
            for(let v=a; st>0?v<=b+1e-9:v>=b-1e-9; v+=st){ tick(ln); sc[low(s.v)]=v; exec(s.body,sc); }
            break; }
          case "foreach": { const c=ev(s.e,sc,ln); if(!Array.isArray(c)&&!(c instanceof Set)) throw new PErr("« Pour chaque » attend un tableau ou un ensemble",ln);
            for(const v of [...c]){ tick(ln); sc[low(s.v)]=v; exec(s.body,sc); } break; }
          case "while": while(bool(ev(s.c,sc,ln),ln,"La condition du TantQue")){ tick(ln); exec(s.body,sc); } break;
          case "repeat": do{ tick(ln); exec(s.body,sc); } while(!bool(ev(s.c,sc,ln),ln,"La condition du Jusqu'à")); break;
        }
        prevPrint = s.t==="print";
      }
    }
    let ret, err=null;
    try{
      if(call){ ret=callF(parseExpr(call,0),G,0,false); }
      else { try{ exec(prog.main,G); } catch(e){ if(!(e instanceof Ret)) throw e; } }
    } catch(e){ err={msg:e.message, ln:e.ln||null}; if(!(e instanceof PErr)) err.msg="Erreur interne : "+e.message; }
    return {out, ret, err, steps};
  }

  // ---------- correction ----------
  const normT = s => low(String(s)).replace(/(?<!\d)\.|\.(?!\d)/g," ").replace(/-(?!\d)/g," ").replace(/[^a-z0-9.\-]+/g," ").trim();
  const isNum = x => typeof x==="number" || /^-?\d+(\.\d+)?$/.test(String(x).trim());
  function lineOK(exp, act){
    if(isNum(exp)){ const ns=String(act).match(/-?\d+(?:\.\d+)?/g); return !!ns && Math.abs(parseFloat(ns[ns.length-1])-parseFloat(exp))<1e-6; }
    return normT(exp)===normT(act);
  }
  function valOK(exp, act){
    if(typeof exp==="number") return typeof act==="number" && Math.abs(exp-act)<1e-6;
    if(typeof exp==="boolean") return act===exp;
    return normT(fmt(exp))===normT(fmt(act));
  }
  function grade(src, tests){
    let prog;
    try{ prog=parse(src); } catch(e){ return {syntax:{msg:e.message,ln:e.ln}}; }
    const res = tests.map(t=>{
      const r=run(prog,{inputs:t.in||[],vars:t.vars||{},call:t.call||null});
      const shown=r.out.filter(o=>!o.prompt).map(o=>o.text);
      let ok=!r.err, why="";
      if(ok && t.out){ if(shown.length!==t.out.length){ ok=false; why=`${t.out.length} ligne(s) attendue(s), ${shown.length} affichée(s)`; } else { const k=t.out.findIndex((e,i)=>!lineOK(e,shown[i])); if(k>=0){ ok=false; why=`Ligne ${k+1} différente`; } } }
      if(ok && "ret" in t && !valOK(t.ret,r.ret)){ ok=false; why=`Valeur retournée : ${fmt(r.ret)} au lieu de ${fmt(t.ret)}`; }
      return {t, ok, why, shown, ret:r.ret, err:r.err};
    });
    return {res, prog};
  }
  return {parse, run, grade, fmt, low};
})();
