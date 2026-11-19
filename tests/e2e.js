// Test de bout en bout, injecté dans index.html par tests/run-e2e.js et exécuté dans Edge (headless).
// Parcourt toute l'appli comme un utilisateur et écrit un rapport JSON dans un élément pre (id e2e-report), mis à jour au fil du test.
(async () => {
  const R = { errors: [], fails: [], passed: 0, overflow: [], step: "début", done: false };
  const pre = document.createElement("pre"); pre.id = "e2e-report"; pre.hidden = true;
  const flush = () => { pre.textContent = JSON.stringify(R); if (!pre.isConnected) document.body.appendChild(pre); };
  window.addEventListener("error", e => R.errors.push(`${e.message} (ligne ${e.lineno})`));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const ok = (name, cond, detail) => { R.step = name; flush(); if (cond) R.passed++; else R.fails.push(name + (detail ? " : " + detail : "")); };
  const txt = sel => (document.querySelector(sel) || {}).innerText || "";
  const overflow = name => { if (document.documentElement.scrollWidth > innerWidth + 1 || document.querySelector("#main").scrollWidth > document.querySelector("#main").clientWidth + 1) R.overflow.push(name); };
  try {
    // 1. Toutes les pages
    for (const v of ["home","cours","quiz","exam","chat","fiche","flash","errors","exos"]) {
      go(v); ok(`page ${v}`, txt("#main").length > 80); overflow(`page ${v}`);
    }
    // 2. Toutes les leçons, et chaque exécution pas à pas jusqu'au bout
    for (const l of LESSONS) {
      go("cours", l.id);
      ok(`leçon ${l.id}`, txt(".lesson").length > 300); overflow(`leçon ${l.id}`);
      document.querySelectorAll("[data-trace]").forEach((t, k) => {
        let n = 0; const next = () => t.querySelector('[data-a="n"]');
        while (next() && !next().disabled && n < 200) { next().click(); n++; }
        ok(`trace ${l.id}#${k}`, n > 0 && /Étape (\d+)\/\1/.test(t.innerText), `${n} étapes`);
      });
      document.querySelectorAll("[data-widget=tt] .tog").forEach(b => b.click());
      markRead(l.id);
    }
    ok("toutes les leçons marquées lues", S.read.length === LESSONS.length);
    // 3. Chaque exercice : code de départ refusé, correction acceptée, console, indices, correction
    for (const e of EXOS) {
      go("exos", e.id);
      const ed = document.querySelector("#ed");
      document.querySelector("#solb").click();
      ok(`exercice ${e.id} : confirmation avant la correction`, !!document.querySelector(".modal"));
      document.querySelector('.modal [data-r="1"]')?.click();
      ok(`exercice ${e.id} : correction affichée`, txt("#sol").length > 20);
      document.querySelector("#checkb").click();
      ok(`exercice ${e.id} : code de départ refusé`, !document.querySelector(".win"));
      ed.value = e.s; ed.dispatchEvent(new Event("input"));
      document.querySelector("#checkb").click();
      ok(`exercice ${e.id} : correction acceptée`, !!document.querySelector(".win"), txt("#res").slice(0, 200));
      document.querySelector("#runb").click();
      ok(`exercice ${e.id} : console`, !/Erreur interne/.test(txt("#cons")) && txt("#cons").length > 0, txt("#cons").slice(0, 120));
      for (let k = 0; k < 6; k++) document.querySelector("#hintb").click();
      ok(`exercice ${e.id} : indices`, document.querySelectorAll("#hints .box").length === e.h.length + 1);
      overflow(`exercice ${e.id}`);
    }
    ok("exercices comptés réussis", EXOS.every(e => S.solved[e.id]));
    // 4. Quiz complet : tout juste, puis tout faux
    const answerAll = good => { let n = 0; while (QZ && document.querySelector(".qcard") && n < 200) { const q = QZ.qs[QZ.i];
      answer(q.t==="qcm" ? (good ? q.a : (q.a + 1) % q.ch.length) : q.t==="vf" ? (good === q.a ? 1 : 0) : (good ? q.a[0] : "réponse fausse"));
      if (!document.querySelector(".fb")) { R.fails.push("pas de correction affichée après une réponse : " + q.q); break; }
      nextQ(); n++; } return n; };
    startQuiz(Object.keys(CATS), 50, true, "Test");
    const total = QZ.qs.length, n1 = answerAll(true);
    ok("quiz tout juste", n1 === total && /100 %/.test(txt("#main")), `${n1}/${total}`);
    startQuiz(Object.keys(CATS), 20, true, "Test");
    answerAll(false);
    ok("quiz tout faux → erreurs enregistrées", S.errors.length >= 20, `${S.errors.length} erreurs`);
    go("errors"); ok("page Mes erreurs remplie", document.querySelectorAll(".review-item").length >= 20);
    startQuiz([], 0, false, "Révision des erreurs", { qs: shuffle(S.errors).slice(0, 20), errorsMode: true });
    answerAll(true);
    ok("révision des erreurs les retire", S.errors.length < 20, `${S.errors.length} restantes`);
    // Quiz par catégorie : chaque catégorie fournit des questions
    for (const c of Object.keys(CATS)) { startQuiz([c], 10, true, c); ok(`quiz ${c}`, QZ.qs.length === 10 && QZ.qs.every(q => q.c === c), `${QZ.qs.length} questions`); }
    // 5. Examen blanc
    examStart();
    ok("examen : 30 questions", QZ.qs.length === 30 && !!document.querySelector("#timer"));
    answerAll(true);
    ok("examen : note 20/20 enregistrée", S.exams.length && S.exams[S.exams.length - 1].note === 20, JSON.stringify(S.exams.slice(-1)));
    // 6. Flashcards
    go("flash"); let f = 0;
    while (FL.deck.length && f < 300) { document.querySelector("#fc").click(); flAns(f % 5 !== 0); f++; }
    ok("flashcards : paquet terminé", /Paquet terminé/.test(txt("#main")));
    // 7. Assistant
    go("chat");
    const chatQ = [["c'est quoi la récursivité ?", /récursi/i], ["différence entre TantQue et Répéter", /tant que|répéter/i], ["comment marche le tri à bulles", /bulle/i], ["à quoi sert MOD", /mod/i], ["bonjour", /salut/i]];
    for (const [q, re] of chatQ) { await send(q); const m = [...document.querySelectorAll(".msg.bot")].pop(); ok(`assistant « ${q} »`, m && re.test(m.innerText), m && m.innerText.slice(0, 100)); }
    await send("x ← 5\nPour i allant de 1 à 3 Faire\n   x ← x + i\nFinPour\nAfficher x");
    ok("assistant exécute le code", /11/.test([...document.querySelectorAll(".msg.bot")].pop().innerText));
    document.querySelector("#chat-sugg .chip").click(); await wait(10);
    ok("assistant : suggestion cliquable", document.querySelectorAll(".msg.me").length === chatQ.length + 2);
    overflow("assistant");
    // 7 bis. IA locale simulée : réponse normale, réponse qui boucle, arrêt manuel
    const fakeEngine = (text, delay = 0) => ({ interruptGenerate(){ this.stopped = true; }, chat: { completions: { create: async () => (async function* (eng) {
      for (const w of text.match(/\S+\s*/g)) { if (eng.stopped) return; if (delay) await wait(delay); yield { choices: [{ delta: { content: w } }] }; } })(CHAT.engine) } } });
    CHAT.engine = fakeEngine("Une boucle TantQue répète un bloc tant que sa condition est VRAIE. Elle teste la condition avant chaque tour.");
    await send("c'est quoi TantQue ?");
    let last = [...document.querySelectorAll(".msg.bot")].pop();
    ok("IA : réponse normale affichée", /teste la condition/.test(last.innerText) && !last.querySelector(".errbox"), last.innerText.slice(0, 120));
    CHAT.engine = fakeEngine("Bonjour. " + "Je suis ici pour vous aider et offrir des informations de manière générale. ".repeat(40));
    await send("explique les tableaux");
    last = [...document.querySelectorAll(".msg.bot")].pop();
    const reps = (last.innerText.match(/Je suis ici pour vous aider/g) || []).length;
    ok("IA : boucle de répétition coupée", reps <= 2 && /tourner en rond/.test(last.innerText), `${reps} répétitions`);
    ok("IA : réponse en boucle exclue de l'historique", CHAT.log[CHAT.log.length - 1].bad === true);
    CHAT.engine = fakeEngine("mot ".repeat(300), 5);
    const pending = send("question longue");
    await wait(30);
    ok("IA : bouton Arrêter pendant la réponse", /Arrêter/.test(document.querySelector("#chat-send").textContent));
    document.querySelector("#chat-send").click();
    await pending;
    ok("IA : arrêt manuel", /réponse arrêtée/.test([...document.querySelectorAll(".msg.bot")].pop().innerText) && /Envoyer/.test(document.querySelector("#chat-send").textContent));
    await send("bonjour");
    ok("IA : salutation sans passer par l'IA", /Salut/.test([...document.querySelectorAll(".msg.bot")].pop().innerText));
    CHAT.engine = null;
    // 8. Réinitialisation via la fenêtre de confirmation
    go("home"); resetAll(); document.querySelector('.modal [data-r="1"]').click();
    ok("réinitialisation", S.xp === 0 && S.read.length === 0 && !Object.keys(S.solved).length);
  } catch (e) { R.errors.push("Exception : " + e.message + " " + (e.stack || "").split("\n")[1]); }
  R.done = true; flush();
})();
