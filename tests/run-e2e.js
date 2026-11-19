// Lance le test de bout en bout dans Edge (headless), sur grand écran puis en largeur téléphone.
// Usage : node tests/run-e2e.js   (Windows, Microsoft Edge installé ; build.ps1 lancé avant)
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const root = path.join(__dirname, "..");
const edge = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(fs.existsSync);
if (!edge) { console.error("Microsoft Edge introuvable."); process.exit(2); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "algomaster-e2e-"));
const page = path.join(tmp, "e2e.html");
fs.writeFileSync(page, fs.readFileSync(path.join(root, "index.html"), "utf8")
  .replace("</body>", () => "<script>" + fs.readFileSync(path.join(__dirname, "e2e.js"), "utf8") + "</script></body>")); // fonction : les $ du script restent intacts
let failed = false;
for (const [label, size] of [["Grand écran", "1400,1000"], ["Téléphone", "400,850"]]) {
  const dom = execFileSync(edge, ["--headless=new", "--disable-gpu", `--user-data-dir=${path.join(tmp, "profile-" + size)}`,
    `--window-size=${size}`, "--virtual-time-budget=120000", "--dump-dom", "file:///" + page.replace(/\\/g, "/")], { encoding: "utf8", maxBuffer: 1 << 28 });
  const m = [...dom.matchAll(/<pre id="e2e-report"[^>]*>([\s\S]*?)<\/pre>/g)].pop(); // le rapport ajouté en fin de page (attribut hidden)
  if (!m) { console.log(`${label} : ❌ aucun rapport (le test ne s'est pas terminé)`); failed = true; continue; }
  const R = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  if (!R.done) R.fails.push("le test s'est arrêté après : " + R.step);
  const bad = R.fails.length + R.errors.length + R.overflow.length;
  console.log(`${label} : ${R.passed} vérifications réussies, ${R.fails.length} échec(s), ${R.errors.length} erreur(s) JavaScript, ${R.overflow.length} débordement(s)`);
  R.fails.forEach(f => console.log("   ❌ " + f));
  R.errors.forEach(f => console.log("   💥 " + f));
  R.overflow.forEach(f => console.log("   ↔️ déborde : " + f));
  if (bad) failed = true;
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? "\n❌ Des problèmes ont été trouvés." : "\n✅ Tout fonctionne.");
process.exit(failed ? 1 : 0);
