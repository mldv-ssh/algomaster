// ================== CATÉGORIES ==================
const CATS = {
  intro:      {name:"Introduction",            icon:"🧭", part:1},
  variables:  {name:"Variables & types",       icon:"📦", part:1},
  operateurs: {name:"Opérateurs & logique",    icon:"🧮", part:1},
  conditions: {name:"Conditions",              icon:"🔀", part:1},
  boucles:    {name:"Boucles",                 icon:"🔁", part:2},
  classiques: {name:"Algorithmes classiques",  icon:"🏛️", part:2},
  recursivite:{name:"Récursivité",            icon:"🪆", part:2},
  tableaux:   {name:"Tableaux",                icon:"🗂️", part:2},
  tris:       {name:"Algorithmes de tri",      icon:"🔃", part:2},
  complexite: {name:"Complexité",              icon:"⏱️", part:2},
  fonctions:  {name:"Fonctions & modularité",  icon:"🧩", part:3},
};
const PARTS = {1:"Fondations et conditions",2:"Boucles, tableaux et complexité",3:"Fonctions et résolution de problèmes"};

// ================== TRACES PAS À PAS ==================
const TRACES = {
  moyenne: {
    code:["Début","  A ← 12","  B ← 16","  Moyenne ← (A + B) / 2","  Afficher Moyenne","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{A:12}},{l:2,v:{A:12,B:16}},{l:3,v:{A:12,B:16,Moyenne:14}},{l:4,v:{A:12,B:16,Moyenne:14},o:"14"},{l:5,v:{A:12,B:16,Moyenne:14},o:"14"}]
  },
  pour: {
    code:["Début","  Pour i allant de 1 à 3 Faire","    Afficher i","  FinPour","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{i:1}},{l:2,v:{i:1},o:"1"},{l:3,v:{i:1},o:"1"},{l:1,v:{i:2},o:"1"},{l:2,v:{i:2},o:"1\n2"},{l:3,v:{i:2},o:"1\n2"},{l:1,v:{i:3},o:"1\n2"},{l:2,v:{i:3},o:"1\n2\n3"},{l:3,v:{i:3},o:"1\n2\n3"},{l:4,v:{i:3},o:"1\n2\n3"}]
  },
  tantque: {
    code:["Début","  i ← 1","  TantQue i <= 3 Faire","    Afficher i","    i ← i + 1","  FinTantQue","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{i:1}},{l:2,v:{i:1},n:"1 <= 3 ? VRAI → on entre"},{l:3,v:{i:1},o:"1"},{l:4,v:{i:2},o:"1"},{l:2,v:{i:2},o:"1",n:"2 <= 3 ? VRAI"},{l:3,v:{i:2},o:"1\n2"},{l:4,v:{i:3},o:"1\n2"},{l:2,v:{i:3},o:"1\n2",n:"3 <= 3 ? VRAI"},{l:3,v:{i:3},o:"1\n2\n3"},{l:4,v:{i:4},o:"1\n2\n3"},{l:2,v:{i:4},o:"1\n2\n3",n:"4 <= 3 ? FAUX → on sort"},{l:6,v:{i:4},o:"1\n2\n3"}]
  },
  somme: {
    code:["Début","  somme ← 0","  Pour i allant de 1 à 4 Faire","    somme ← somme + i","  FinPour","  Afficher somme","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{somme:0}},{l:2,v:{somme:0,i:1}},{l:3,v:{somme:1,i:1},n:"0 + 1 = 1"},{l:2,v:{somme:1,i:2}},{l:3,v:{somme:3,i:2},n:"1 + 2 = 3"},{l:2,v:{somme:3,i:3}},{l:3,v:{somme:6,i:3},n:"3 + 3 = 6"},{l:2,v:{somme:6,i:4}},{l:3,v:{somme:10,i:4},n:"6 + 4 = 10"},{l:5,v:{somme:10,i:4},o:"10"},{l:6,v:{somme:10,i:4},o:"10"}]
  },
  max: {
    code:["Début","  Notes ← [12, 8, 17, 14]","  maximum ← Notes[0]","  Pour i allant de 1 à 3 Faire","    Si Notes[i] > maximum Alors","      maximum ← Notes[i]","    FinSi","  FinPour","  Afficher maximum","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{Notes:"[12,8,17,14]"}},{l:2,v:{maximum:12}},{l:3,v:{maximum:12,i:1}},{l:4,v:{maximum:12,i:1},n:"Notes[1]=8 > 12 ? FAUX"},{l:3,v:{maximum:12,i:2}},{l:4,v:{maximum:12,i:2},n:"Notes[2]=17 > 12 ? VRAI"},{l:5,v:{maximum:17,i:2}},{l:3,v:{maximum:17,i:3}},{l:4,v:{maximum:17,i:3},n:"Notes[3]=14 > 17 ? FAUX"},{l:8,v:{maximum:17,i:3},o:"17"},{l:9,v:{maximum:17,i:3},o:"17"}]
  },
  pgcd: {
    code:["Début","  a ← 48","  b ← 18","  TantQue b ≠ 0 Faire","    r ← a MOD b","    a ← b","    b ← r","  FinTantQue","  Afficher a","Fin"],
    steps:[{l:0,v:{}},{l:1,v:{a:48}},{l:2,v:{a:48,b:18}},{l:3,v:{a:48,b:18},n:"18 ≠ 0 → on continue"},{l:4,v:{a:48,b:18,r:12},n:"48 MOD 18 = 12"},{l:5,v:{a:18,b:18,r:12}},{l:6,v:{a:18,b:12,r:12}},{l:3,v:{a:18,b:12,r:12},n:"12 ≠ 0"},{l:4,v:{a:18,b:12,r:6},n:"18 MOD 12 = 6"},{l:5,v:{a:12,b:12,r:6}},{l:6,v:{a:12,b:6,r:6}},{l:3,v:{a:12,b:6,r:6},n:"6 ≠ 0"},{l:4,v:{a:12,b:6,r:0},n:"12 MOD 6 = 0"},{l:5,v:{a:6,b:6,r:0}},{l:6,v:{a:6,b:0,r:0}},{l:3,v:{a:6,b:0,r:0},n:"b = 0 → on sort"},{l:8,v:{a:6,b:0,r:0},o:"6"},{l:9,v:{a:6,b:0,r:0},o:"6"}]
  }
};

TRACES.factrec = {
  code:["Fonction Fact(n) : entier","  Si n <= 1 Alors","    Retourner 1","  FinSi","  Retourner n * Fact(n - 1)","FinFonction"],
  steps:[
    {l:0,v:{pile:"Fact(3)",n:3},n:"On appelle Fact(3)"},
    {l:1,v:{pile:"Fact(3)",n:3},n:"3 <= 1 ? FAUX"},
    {l:4,v:{pile:"Fact(3)",n:3},n:"Pour calculer 3 × Fact(2), il faut d'abord Fact(2) : nouvel appel"},
    {l:0,v:{pile:"Fact(3) → Fact(2)",n:2}},
    {l:1,v:{pile:"Fact(3) → Fact(2)",n:2},n:"2 <= 1 ? FAUX"},
    {l:4,v:{pile:"Fact(3) → Fact(2)",n:2},n:"Il faut Fact(1) : nouvel appel"},
    {l:0,v:{pile:"Fact(3) → Fact(2) → Fact(1)",n:1}},
    {l:1,v:{pile:"Fact(3) → Fact(2) → Fact(1)",n:1},n:"1 <= 1 ? VRAI : c'est le cas de base"},
    {l:2,v:{pile:"Fact(3) → Fact(2) → Fact(1)",n:1},n:"Fact(1) retourne 1. On remonte !"},
    {l:4,v:{pile:"Fact(3) → Fact(2)",n:2},n:"Fact(2) = 2 × Fact(1) = 2 × 1 = 2"},
    {l:4,v:{pile:"Fact(3)",n:3},n:"Fact(3) = 3 × Fact(2) = 3 × 2 = 6"},
    {l:5,v:{"résultat":6},o:"6"}]
};
TRACES.bulles = {
  code:["Début","  T ← [3, 1, 2]","  Pour i ← 0 à N - 2 Faire","    Pour j ← 0 à N - i - 2 Faire","      Si T[j] > T[j + 1] Alors","        Temp ← T[j]","        T[j] ← T[j + 1]","        T[j + 1] ← Temp","      FinSi","    FinPour","  FinPour","  Afficher T","Fin"],
  steps:[
    {l:1,v:{T:"[3, 1, 2]",N:3}},
    {l:2,v:{T:"[3, 1, 2]",i:0},n:"1er passage"},
    {l:3,v:{T:"[3, 1, 2]",i:0,j:0}},
    {l:4,v:{T:"[3, 1, 2]",i:0,j:0},n:"T[0]=3 > T[1]=1 ? VRAI → on échange"},
    {l:5,v:{T:"[3, 1, 2]",i:0,j:0,Temp:3}},
    {l:6,v:{T:"[1, 1, 2]",i:0,j:0,Temp:3}},
    {l:7,v:{T:"[1, 3, 2]",i:0,j:0,Temp:3}},
    {l:3,v:{T:"[1, 3, 2]",i:0,j:1}},
    {l:4,v:{T:"[1, 3, 2]",i:0,j:1},n:"T[1]=3 > T[2]=2 ? VRAI → on échange"},
    {l:7,v:{T:"[1, 2, 3]",i:0,j:1,Temp:3},n:"Le plus grand (3) est arrivé à la fin"},
    {l:2,v:{T:"[1, 2, 3]",i:1},n:"2e passage (un voisin de moins à comparer)"},
    {l:3,v:{T:"[1, 2, 3]",i:1,j:0}},
    {l:4,v:{T:"[1, 2, 3]",i:1,j:0},n:"T[0]=1 > T[1]=2 ? FAUX → rien"},
    {l:11,v:{T:"[1, 2, 3]"},o:"[1, 2, 3]"},
    {l:12,v:{T:"[1, 2, 3]"},o:"[1, 2, 3]"}]
};

// ================== LEÇONS ==================
const LESSONS = [
// ---------------------------------------------------------------- PARTIE 1
{id:"l1", part:1, cat:"intro", title:"C'est quoi un algorithme ?", html:`
<p>Bienvenue ! Ici on part de <b>zéro</b>. Pas besoin de savoir programmer : l'algorithmique, c'est d'abord apprendre à <b>réfléchir étape par étape</b>.</p>
<div class="box def"><b class="t">📘 Définition — Algorithme</b>Un algorithme est une <b>suite finie</b> et <b>non ambiguë</b> d'instructions, à suivre dans un <b>ordre précis</b>, pour résoudre un problème ou obtenir un résultat.</div>
<div class="box def"><b class="t">📘 Définition — Algorithmique</b>L'algorithmique est l'étude et la production de règles et de techniques qui servent à <b>concevoir</b> des algorithmes.</div>
<div class="analogy">Une <b>recette de cuisine</b> est un algorithme : des ingrédients (les <i>données d'entrée</i>), des étapes dans un ordre précis (les <i>instructions</i>), et un plat à la fin (le <i>résultat</i>).</div>
<h3>Décortiquons les 3 mots-clés</h3>
<ul>
<li><b>Finie</b> : l'algorithme doit <b>s'arrêter</b> un jour. Une recette qui dit « remuer pour toujours » n'est pas un algorithme.</li>
<li><b>Non ambiguë</b> : chaque instruction n'a <b>qu'une seule interprétation</b>. « Ajouter un peu de sel » est ambigu ; « ajouter 5 g de sel » ne l'est pas.</li>
<li><b>Ordre précis</b> : on ne met pas le gâteau au four avant de mélanger la pâte.</li>
</ul>
<h3>Des algorithmes partout autour de toi</h3>
<ul>
<li>💳 <b>Carte bancaire</b> : vérifier le code PIN.</li>
<li>🗺️ <b>GPS</b> : comparer plusieurs chemins pour trouver le plus rapide.</li>
<li>📧 <b>Boîte mail</b> : détecter et filtrer les spams.</li>
<li>🛗 <b>Ascenseur</b> : déterminer l'ordre de desserte des étages.</li>
</ul>
<h3>À quoi ça sert ?</h3>
<ul>
<li>Résoudre un problème de manière <b>logique et structurée</b>.</li>
<li>Définir une suite <b>finie</b> d'instructions <b>précises</b>.</li>
<li>Obtenir un <b>résultat attendu</b> à partir de <b>données d'entrée</b>.</li>
<li>Accomplir une tâche de manière <b>automatique et reproductible</b>.</li>
</ul>
<div class="box tip"><b class="t">✅ En bref</b>Un algorithme sert à… nous simplifier la vie !</div>
<h3>Algorithme ≠ Programme</h3>
<p>Un <b>algorithme</b> est une idée, une méthode, écrite en français structuré (le <b>pseudo-code</b>). Un <b>programme</b> <b>traduit</b> cet algorithme dans un <b>langage de programmation</b> (Python, Java, C…) pour qu'un ordinateur puisse l'<b>exécuter</b>.</p>
<div class="analogy">L'algorithme, c'est le plan de la maison. Le programme, c'est la maison construite avec de vraies briques (un vrai langage).</div>
<table class="t"><tr><th></th><th>Algorithme</th><th>Programme</th></tr>
<tr><td>Écrit en</td><td>pseudo-code (français)</td><td>langage (Python, C…)</td></tr>
<tr><td>Lu par</td><td>un humain</td><td>un ordinateur</td></tr>
<tr><td>Exécutable ?</td><td class="f">Non</td><td class="v">Oui</td></tr></table>
`},
{id:"l2", part:1, cat:"intro", title:"Résoudre un problème étape par étape", html:`
<p>Avant d'écrire la moindre ligne, il faut une <b>méthode</b>. Voici les 5 étapes du cours, à suivre <b>dans l'ordre</b> :</p>
<ol>
<li><b>Comprendre le problème</b> : identifier l'objectif à atteindre.</li>
<li><b>Identifier les données</b> : quelles informations ai-je (<i>entrées</i>) et quel résultat j'attends (<i>sortie</i>) ?</li>
<li><b>Décomposer la solution</b> : définir les étapes nécessaires dans le bon ordre.</li>
<li><b>Formaliser l'algorithme</b> : écrire les instructions en <b>pseudo-code</b>.</li>
<li><b>Tester la solution</b> : vérifier le résultat avec plusieurs exemples et corriger les erreurs.</li>
</ol>
<div class="box tip"><b class="t">🧠 Moyen mnémotechnique</b><b>C</b>omprendre → <b>I</b>dentifier → <b>D</b>écomposer → <b>F</b>ormaliser → <b>T</b>ester</div>
<h3>Exemple complet : calculer une moyenne</h3>
<p><b>1. Comprendre</b> : on veut la moyenne de deux nombres.<br><b>2. Données</b> : entrée = deux nombres A et B ; sortie = leur moyenne.<br><b>3. Décomposer</b> : additionner A et B, diviser par 2, afficher.<br><b>4. Formaliser</b> :</p>
<pre class="code">Algorithme : Calculer_Moyenne
// Entrée : deux nombres A et B
// Sortie : la moyenne des deux nombres
Début
  Moyenne ← (A + B) / 2
  Afficher Moyenne
Fin</pre>
<p><b>5. Tester</b> : avec A = 12 et B = 16 → (12 + 16) / 2 = 28 / 2 = <b>14</b> ✔️. Avec A = 10 et B = 10 → 10 ✔️.</p>
<h3>▶️ Regarde l'algorithme s'exécuter</h3>
<p>Clique sur « Étape suivante » et observe comment les variables changent :</p>
<div data-trace="moyenne"></div>
<div class="box warn"><b class="t">⚠️ Piège classique</b>Écrire <code>A + B / 2</code> sans parenthèses ! La division est prioritaire : 12 + 16 / 2 = 12 + 8 = 20 ❌. Il faut <code>(A + B) / 2</code>.</div>
<div class="box def"><b class="t">À retenir</b>Un algorithme combine des <b>données</b>, des <b>calculs</b> et des <b>conditions</b> pour résoudre un problème. Il commence par <code>Début</code> et finit par <code>Fin</code>.</div>
`},
{id:"l3", part:1, cat:"variables", title:"Les variables et les types", html:`
<div class="box def"><b class="t">📘 Variable</b>Une variable est une <b>case mémoire</b> qui porte un <b>nom</b> et qui contient une <b>valeur</b>. Cette valeur peut <b>changer</b> au cours de l'algorithme (d'où le nom « variable »).</div>
<div class="analogy">Une variable, c'est une <b>boîte avec une étiquette</b>. L'étiquette = le nom (<code>age</code>), le contenu = la valeur (<code>20</code>). Le <b>type</b> dit quel genre de chose on a le droit de mettre dedans.</div>
<h3>Les 4 types de base</h3>
<table class="t"><tr><th>Type</th><th>Définition</th><th>Exemples</th><th>Utilisation</th></tr>
<tr><td><b>Entier</b> (Integer)</td><td>nombre sans partie décimale</td><td>-5, 0, 12, 150</td><td>âge, nombre d'étudiants, quantité</td></tr>
<tr><td><b>Réel</b> (Float)</td><td>nombre pouvant avoir une partie décimale</td><td>3.14, -2.5, 10.0</td><td>prix, température, moyenne</td></tr>
<tr><td><b>Booléen</b> (Boolean)</td><td>valeur logique à 2 états seulement</td><td>VRAI, FAUX</td><td>majeur ?, mot de passe correct ?</td></tr>
<tr><td><b>Chaîne</b> (String)</td><td>suite de caractères = du texte</td><td>"Bonjour", "Alice", "12345"</td><td>nom, adresse, message</td></tr></table>
<div class="box warn"><b class="t">⚠️ Pièges fréquents</b>
<ul><li><code>10.0</code> est un <b>réel</b>, pas un entier (il a une partie décimale, même nulle).</li>
<li><code>"12345"</code> est une <b>chaîne</b> (il y a des guillemets !), pas un nombre. On ne peut pas faire de calcul avec.</li>
<li><code>"VRAI"</code> entre guillemets est une chaîne ; <code>VRAI</code> sans guillemets est un booléen.</li>
<li>Un nombre <b>négatif</b> comme -5 reste un <b>entier</b>.</li></ul></div>
<h3>Comment choisir le bon type ?</h3>
<ul>
<li>Ça se compte (personnes, objets) → <b>Entier</b></li>
<li>Ça se mesure / peut avoir des virgules (prix, moyenne, taille) → <b>Réel</b></li>
<li>C'est une réponse oui/non → <b>Booléen</b></li>
<li>C'est du texte (nom, code postal, numéro de téléphone) → <b>Chaîne</b></li>
</ul>
<div class="box tip"><b class="t">💡 Astuce</b>Un numéro de téléphone « 0612345678 » se stocke en <b>Chaîne</b> : on ne fait jamais de calcul dessus, et le 0 du début disparaîtrait avec un entier !</div>
<h3>Déclarer une variable</h3>
<p><b>Déclarer</b> une variable, c'est annoncer son <b>nom</b> et (selon la notation) son <b>type</b>, avant de l'utiliser.</p>
<pre class="code">Déclarer age : Entier
Déclarer prenom : Chaîne
Déclarer moyenne : Réel
Déclarer est_majeur : Booléen</pre>
<p><b>Objectif</b> : identifier les données que l'algorithme doit manipuler.</p>
`},
{id:"l4", part:1, cat:"variables", title:"Affectation, Lire et Afficher", html:`
<h3>1. L'affectation : ←</h3>
<div class="box def"><b class="t">📘 Affectation</b>Affecter une valeur, c'est <b>stocker</b> cette valeur dans une variable. Notation : la flèche <code>←</code></div>
<pre class="code">age ← 20
moyenne ← 15.5
prenom ← "Alice"</pre>
<p><code>age ← 20</code> se lit : « la variable <b>age reçoit</b> la valeur 20 ». On lit <b>de droite à gauche</b> : la valeur va dans la boîte.</p>
<h3>Une variable peut changer de valeur</h3>
<pre class="code">age ← 20
age ← 21</pre>
<p>La valeur finale de <code>age</code> est <b>21</b>. L'ancienne valeur (20) est <b>écrasée</b> : une variable ne garde qu'<b>une seule valeur à la fois</b>.</p>
<h3>Le cas qui perturbe tout le monde : x ← x + 1</h3>
<pre class="code">x ← 5
x ← x + 1</pre>
<p>En maths, « x = x + 1 » est impossible. Mais en algorithmique, on <b>calcule d'abord la droite</b> (x + 1 = 5 + 1 = 6), <b>puis</b> on range le résultat dans x. Donc x vaut <b>6</b>. C'est ce qu'on appelle <b>incrémenter</b>.</p>
<div class="box tip"><b class="t">✅ Règle d'or de l'affectation</b>1) On évalue <b>tout</b> le côté droit avec les valeurs actuelles. 2) On met le résultat dans la variable de gauche.</div>
<h3>Exemple : échanger deux variables</h3>
<pre class="code">a ← 3
b ← 7
temp ← a     // temp = 3
a ← b        // a = 7
b ← temp     // b = 3</pre>
<p>Sans la variable <code>temp</code>, on perdrait la valeur de a ! (si on fait <code>a ← b</code> puis <code>b ← a</code>, les deux valent 7).</p>
<h3>2. Lire : récupérer une donnée</h3>
<p><b>Lire</b> une donnée consiste à récupérer une information fournie par l'<b>utilisateur</b> (au clavier) ou une autre source.</p>
<pre class="code">Afficher "Quel est votre âge ?"
Lire age</pre>
<p>L'algorithme <b>attend</b> que l'utilisateur tape une valeur, puis la <b>stocke</b> dans <code>age</code>.</p>
<h3>3. Afficher : montrer un résultat</h3>
<p><b>Afficher</b> consiste à présenter une information à l'utilisateur (à l'écran).</p>
<pre class="code">age ← 20
Afficher age            // affiche : 20
Afficher "age"          // affiche le TEXTE : age
Afficher "J'ai ", age, " ans"   // affiche : J'ai 20 ans</pre>
<div class="box warn"><b class="t">⚠️ Attention aux guillemets</b><code>Afficher age</code> affiche la <b>valeur</b> de la variable (20). <code>Afficher "age"</code> affiche le <b>mot</b> « age ».</div>
<div class="box def"><b class="t">À retenir</b><code>Lire</code> = entrée (utilisateur → algorithme). <code>Afficher</code> = sortie (algorithme → utilisateur). <code>←</code> = ranger une valeur dans une variable.</div>
`},
{id:"l5", part:1, cat:"operateurs", title:"Opérateurs, = vs ← et table de vérité", html:`
<h3>Opérateurs arithmétiques (calculs)</h3>
<table class="t"><tr><th>Opérateur</th><th>Rôle</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>+</code></td><td>addition</td><td>7 + 2</td><td>9</td></tr>
<tr><td><code>-</code></td><td>soustraction</td><td>7 - 2</td><td>5</td></tr>
<tr><td><code>*</code></td><td>multiplication</td><td>7 * 2</td><td>14</td></tr>
<tr><td><code>/</code></td><td>division</td><td>7 / 2</td><td>3.5</td></tr>
<tr><td><code>DIV</code></td><td>division entière (quotient)</td><td>7 DIV 2</td><td>3</td></tr>
<tr><td><code>MOD</code></td><td>reste de la division entière</td><td>7 MOD 2</td><td>1</td></tr></table>
<div class="analogy">7 bonbons partagés entre 2 enfants : chacun en a <b>3</b> (7 DIV 2) et il en <b>reste 1</b> (7 MOD 2).</div>
<div class="box tip"><b class="t">💡 MOD, l'outil magique</b>
<ul><li><code>n MOD 2 = 0</code> → n est <b>pair</b> ; <code>n MOD 2 = 1</code> → n est <b>impair</b>.</li>
<li><code>a MOD b = 0</code> → a est <b>divisible</b> par b (b divise a).</li>
<li>Si a &lt; b, alors <code>a MOD b = a</code> (ex : 3 MOD 5 = 3).</li></ul></div>
<p><b>Priorité</b> : comme en maths, <code>* / DIV MOD</code> passent avant <code>+ -</code>. Les parenthèses passent avant tout. Ex : 2 + 3 * 4 = 14 (pas 20).</p>
<h3>Opérateurs de comparaison (résultat = VRAI ou FAUX)</h3>
<table class="t"><tr><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr>
<tr><td><code>=</code></td><td>égal à</td><td>5 = 5 → VRAI</td></tr>
<tr><td><code>≠</code> ou <code>&lt;&gt;</code></td><td>différent de</td><td>5 ≠ 3 → VRAI</td></tr>
<tr><td><code>&lt;</code> / <code>&gt;</code></td><td>strictement inférieur / supérieur</td><td>5 &gt; 5 → FAUX</td></tr>
<tr><td><code>&lt;=</code> / <code>&gt;=</code></td><td>inférieur ou égal / supérieur ou égal</td><td>5 &gt;= 5 → VRAI</td></tr></table>
<h3>⚡ La différence entre = et ←</h3>
<div class="grid g2"><div class="box def" style="margin:0"><b class="t">← : affectation</b>Attribue une valeur à une variable.<br><code>x ← 5</code> : x <b>prend</b> la valeur 5. C'est une <b>action</b>.</div>
<div class="box ex" style="margin:0"><b class="t">= : comparaison</b>Vérifie si deux valeurs sont égales.<br><code>x = 5</code> : est-ce que x <b>vaut</b> 5 ? C'est une <b>question</b> (réponse VRAI/FAUX).</div></div>
<h3>Opérateurs logiques : ET, OU, NON</h3>
<ul>
<li><b>ET</b> : VRAI seulement si les <b>deux</b> conditions sont vraies.</li>
<li><b>OU</b> : VRAI si <b>au moins une</b> des deux conditions est vraie.</li>
<li><b>NON</b> : <b>inverse</b> : VRAI devient FAUX et FAUX devient VRAI.</li>
</ul>
<h3>Table de vérité</h3>
<table class="t"><tr><th>A</th><th>B</th><th>A ET B</th><th>A OU B</th><th>NON A</th></tr>
<tr><td class="v">VRAI</td><td class="v">VRAI</td><td class="v">VRAI</td><td class="v">VRAI</td><td class="f">FAUX</td></tr>
<tr><td class="v">VRAI</td><td class="f">FAUX</td><td class="f">FAUX</td><td class="v">VRAI</td><td class="f">FAUX</td></tr>
<tr><td class="f">FAUX</td><td class="v">VRAI</td><td class="f">FAUX</td><td class="v">VRAI</td><td class="v">VRAI</td></tr>
<tr><td class="f">FAUX</td><td class="f">FAUX</td><td class="f">FAUX</td><td class="f">FAUX</td><td class="v">VRAI</td></tr></table>
<h3>🎮 Teste toi-même</h3>
<p>Clique sur A et B pour changer leur valeur :</p>
<div data-widget="tt"></div>
<div class="analogy"><b>ET</b> = il faut la clé <b>et</b> le badge pour entrer. <b>OU</b> = la porte s'ouvre avec la clé <b>ou</b> le badge (un seul suffit).</div>
<div class="box tip"><b class="t">✅ Raccourcis à connaître</b>Avec ET : un seul FAUX → tout est FAUX. Avec OU : un seul VRAI → tout est VRAI.</div>
`},
{id:"l6", part:1, cat:"conditions", title:"Les conditions : Si, Sinon, Sinon Si", html:`
<div class="box def"><b class="t">📘 Structure conditionnelle</b>Une condition permet à un algorithme de <b>prendre une décision</b> et d'exécuter des instructions selon qu'une condition est <b>vraie</b> ou <b>fausse</b>.</div>
<div class="analogy">« <b>Si</b> il pleut, <b>alors</b> je prends un parapluie, <b>sinon</b> je prends des lunettes de soleil. » Tu fais déjà des conditions tous les jours !</div>
<h3>1. SI … ALORS … FINSI</h3>
<p>Exécute les instructions <b>uniquement si</b> la condition est vraie. Sinon, on ne fait rien et on passe à la suite.</p>
<pre class="code">Si age >= 18 Alors
   Afficher "Majeur"
FinSi</pre>
<p>Si age = 15 → rien n'est affiché. Si age = 20 → « Majeur ».</p>
<h3>2. SI … SINON</h3>
<p>Permet de choisir entre <b>deux chemins</b>. Un des deux blocs est <b>toujours</b> exécuté (jamais les deux).</p>
<pre class="code">Si age >= 18 Alors
   Afficher "Majeur"
Sinon
   Afficher "Mineur"
FinSi</pre>
<h3>3. SI … SINON SI … SINON</h3>
<p>Permet de tester <b>plusieurs conditions successivement</b>. <b>La première condition vraie</b> détermine le bloc exécuté ; les suivantes ne sont <b>même pas testées</b>.</p>
<pre class="code">Si note >= 16 Alors
   Afficher "Très bien"
Sinon Si note >= 10 Alors
   Afficher "Admis"
Sinon
   Afficher "Ajourné"
FinSi</pre>
<table class="t"><tr><th>note</th><th>Résultat</th><th>Pourquoi</th></tr>
<tr><td>18</td><td>Très bien</td><td>18 >= 16 vrai → on s'arrête là</td></tr>
<tr><td>12</td><td>Admis</td><td>12 >= 16 faux, 12 >= 10 vrai</td></tr>
<tr><td>16</td><td>Très bien</td><td>16 >= 16 est vrai (supérieur <b>ou égal</b>)</td></tr>
<tr><td>7</td><td>Ajourné</td><td>tout est faux → Sinon</td></tr></table>
<div class="box warn"><b class="t">⚠️ L'ordre compte !</b>Avec Sinon Si, il faut tester du <b>plus restrictif</b> au <b>moins restrictif</b>. Exemple d'<b>erreur logique</b> (tirée du cours) :
<pre class="code">Si age >= 12 Alors
   prix ← 8
Sinon Si age >= 18 Alors
   prix ← 15
Sinon
   prix ← 5
FinSi</pre>
Problème : un adulte de 30 ans vérifie déjà <code>age >= 12</code> → il paie 8 €. La branche <code>age >= 18</code> n'est <b>jamais atteinte</b> ! Correction : tester <code>age >= 18</code> en premier, puis <code>age >= 12</code>.</div>
<h3>Exemple du cours : que fait cet algorithme ?</h3>
<pre class="code">Lire a
Lire b
Si a > b Alors
   Afficher b
Sinon
   Afficher a
FinSi</pre>
<p>Réponse : il affiche le <b>plus petit</b> des deux nombres (le minimum). Si a = 7 et b = 3 → affiche 3.</p>
<h3>Exemple : pair ou impair ?</h3>
<pre class="code">Début
  Déclarer nombre : Entier
  Afficher "Entrez un nombre entier :"
  Lire nombre
  Si nombre MOD 2 = 0 Alors
     Afficher "Le nombre est pair"
  Sinon
     Afficher "Le nombre est impair"
  FinSi
Fin</pre>
<div class="box tip"><b class="t">✅ Toujours fermer</b>Chaque <code>Si</code> se termine par un <code>FinSi</code>. Indente (décale) le contenu pour que ce soit lisible.</div>
`},
{id:"l7", part:1, cat:"conditions", title:"Conditions composées et imbriquées", html:`
<h3>Conditions composées (ET, OU, NON)</h3>
<p>Une condition composée <b>combine plusieurs conditions</b> avec les opérateurs logiques.</p>
<p><b>ET</b> — les deux conditions doivent être vraies :</p>
<pre class="code">Si age >= 18 ET possede_carte = VRAI Alors
   Afficher "Accès autorisé"
FinSi</pre>
<p><b>OU</b> — au moins une des conditions doit être vraie :</p>
<pre class="code">Si est_etudiant = VRAI OU age < 26 Alors
   Afficher "Tarif réduit"
FinSi</pre>
<p>Un étudiant de 30 ans → tarif réduit ✔️. Un non-étudiant de 20 ans → tarif réduit ✔️. Un non-étudiant de 40 ans → ❌.</p>
<p><b>NON</b> — inverse le résultat :</p>
<pre class="code">Si NON(est_connecte) Alors
   Afficher "Veuillez vous connecter"
FinSi</pre>
<p>Si <code>est_connecte</code> vaut FAUX, alors <code>NON(est_connecte)</code> vaut VRAI → le message s'affiche.</p>
<h3>Intervalles : le piège du « entre »</h3>
<p>Pour tester « x est entre 10 et 20 », on écrit <b>deux</b> comparaisons reliées par ET :</p>
<pre class="code">Si x >= 10 ET x <= 20 Alors
   Afficher "Dans l'intervalle"
FinSi</pre>
<div class="box warn"><b class="t">⚠️</b>On n'écrit pas <code>10 <= x <= 20</code> en pseudo-code. Et attention : <code>x < 10 ET x > 20</code> est <b>toujours faux</b> (impossible d'être les deux) ; pour « en dehors », il faut <code>x < 10 OU x > 20</code>.</div>
<h3>Conditions imbriquées</h3>
<p>Une condition imbriquée est une condition placée <b>à l'intérieur</b> d'une autre. Elle sert quand le <b>deuxième test dépend du résultat du premier</b>.</p>
<pre class="code">Si age >= 18 Alors
   Si possede_carte = VRAI Alors
      Afficher "Accès autorisé"
   Sinon
      Afficher "Carte obligatoire"
   FinSi
Sinon
   Afficher "Accès interdit aux mineurs"
FinSi</pre>
<table class="t"><tr><th>age</th><th>possede_carte</th><th>Affichage</th></tr>
<tr><td>20</td><td>VRAI</td><td>Accès autorisé</td></tr>
<tr><td>20</td><td>FAUX</td><td>Carte obligatoire</td></tr>
<tr><td>15</td><td>VRAI</td><td>Accès interdit aux mineurs</td></tr>
<tr><td>15</td><td>FAUX</td><td>Accès interdit aux mineurs</td></tr></table>
<div class="box tip"><b class="t">💡 Composée ou imbriquée ?</b>La version <b>imbriquée</b> permet des messages <b>différents</b> selon quelle condition échoue. La version <b>composée</b> (ET) est plus courte mais ne dit pas pourquoi ça échoue.</div>
<h3>Exercice corrigé : tarif selon l'âge</h3>
<p>Gratuit avant 6 ans, 5 € de 6 à 17 ans, 10 € à partir de 18 ans.</p>
<pre class="code">Début
  Lire age
  Si age < 6 Alors
     prix ← 0
  Sinon Si age < 18 Alors
     prix ← 5
  Sinon
     prix ← 10
  FinSi
  Afficher prix
Fin</pre>
`},
// ---------------------------------------------------------------- PARTIE 2
{id:"l8", part:2, cat:"boucles", title:"Les boucles : POUR", html:`
<div class="box def"><b class="t">📘 Boucle</b>Une boucle est une structure qui permet de <b>répéter</b> un bloc d'instructions plusieurs fois. Chaque passage dans la boucle s'appelle une <b>itération</b>.</div>
<p><b>Pourquoi ?</b></p>
<ul><li>Éviter de répéter les mêmes instructions à la main.</li><li>Automatiser des tâches répétitives.</li><li>Parcourir des données et faire des calculs.</li></ul>
<p>Exemple : afficher les nombres de 1 à 100 <b>sans écrire 100 instructions</b> !</p>
<p>Il existe <b>3 boucles</b> : <b>POUR</b>, <b>TANT QUE</b> et <b>RÉPÉTER … JUSQU'À</b>.</p>
<h3>La boucle POUR</h3>
<p>POUR répète des instructions un <b>nombre déterminé de fois</b>, à l'aide d'un <b>compteur</b>.</p>
<pre class="code">Début
  Pour i allant de 1 à 5 Faire
     Afficher i
  FinPour
Fin</pre>
<p>Affiche : 1, 2, 3, 4, 5.</p>
<h3>▶️ Exécution pas à pas</h3>
<div data-trace="pour"></div>
<div class="box def"><b class="t">À retenir</b>
<ul><li><code>i</code> est le <b>compteur</b> de boucle.</li>
<li>Le compteur <b>évolue automatiquement</b> (+1) à chaque itération.</li>
<li>On <b>connaît à l'avance</b> le nombre de répétitions.</li>
<li>Pour i de <b>a</b> à <b>b</b> → <b>b − a + 1</b> itérations (bornes incluses). Ex : de 1 à 5 → 5 fois ; de 0 à 4 → 5 fois.</li></ul></div>
<h3>Avec un pas</h3>
<p>On peut avancer de plus de 1, ou à reculons :</p>
<pre class="code">Pour i allant de 0 à 10 pas de 2 Faire    // 0 2 4 6 8 10
   Afficher i
FinPour

Pour i allant de 10 à 1 pas de -1 Faire   // 10 9 8 ... 1
   Afficher i
FinPour</pre>
<h3>Exemple : table de multiplication de 7</h3>
<pre class="code">Pour i allant de 1 à 10 Faire
   Afficher "7 x ", i, " = ", 7 * i
FinPour</pre>
<h3>Exemple : multiples de 3 jusqu'à 30</h3>
<pre class="code">Pour i allant de 1 à 30 Faire
   Si i MOD 3 = 0 Alors
      Afficher i
   FinSi
FinPour</pre>
`},
{id:"l9", part:2, cat:"boucles", title:"TANT QUE et RÉPÉTER … JUSQU'À", html:`
<h3>La boucle TANT QUE</h3>
<p>TANT QUE répète des instructions <b>tant qu'une condition est vraie</b>. On l'utilise quand on <b>ne sait pas à l'avance</b> combien de fois on va répéter.</p>
<pre class="code">Début
  i ← 1
  TantQue i <= 3 Faire
     Afficher i
     i ← i + 1
  FinTantQue
Fin</pre>
<div data-trace="tantque"></div>
<div class="box def"><b class="t">À retenir</b>
<ul><li>La condition est vérifiée <b>AVANT</b> chaque itération.</li>
<li>Si elle est fausse <b>dès le départ</b>, la boucle ne s'exécute <b>jamais</b> (0 fois).</li>
<li>Il faut <b>faire évoluer</b> la variable dans la boucle, sinon → <b>boucle infinie</b>.</li>
<li>Contrairement à POUR, le compteur <b>n'avance pas tout seul</b> : c'est toi qui écris <code>i ← i + 1</code>.</li></ul></div>
<h3>La boucle RÉPÉTER … JUSQU'À</h3>
<p>Répète des instructions <b>jusqu'à ce qu'une condition devienne vraie</b>.</p>
<pre class="code">Début
  Répéter
     Afficher "Entrez votre code PIN :"
     Lire code
  Jusqu'à code = 1234
  Afficher "Code correct"
Fin</pre>
<div class="box def"><b class="t">À retenir</b>
<ul><li>Le bloc est exécuté <b>au moins une fois</b>.</li>
<li>La condition d'arrêt est vérifiée <b>à la FIN</b>.</li>
<li>La boucle <b>s'arrête</b> quand la condition devient <b>VRAIE</b> (l'inverse de TantQue !).</li></ul></div>
<div class="analogy">TantQue = « <b>Tant que</b> j'ai faim, je mange » (je vérifie d'abord si j'ai faim). Répéter = « Je goûte le plat <b>jusqu'à</b> ce qu'il soit assez salé » (je goûte au moins une fois).</div>
<h3>Comparatif des 3 boucles</h3>
<table class="t"><tr><th></th><th>POUR</th><th>TANT QUE</th><th>RÉPÉTER…JUSQU'À</th></tr>
<tr><td>Nb de tours connu ?</td><td class="v">Oui</td><td class="f">Non</td><td class="f">Non</td></tr>
<tr><td>Test de la condition</td><td>—</td><td>au début</td><td>à la fin</td></tr>
<tr><td>Minimum d'exécutions</td><td>0</td><td><b>0</b></td><td><b>1</b></td></tr>
<tr><td>Continue tant que…</td><td>compteur ≤ fin</td><td>condition VRAIE</td><td>condition FAUSSE</td></tr>
<tr><td>Usage typique</td><td>compter, parcourir</td><td>attendre un événement</td><td>saisie contrôlée</td></tr></table>
<div class="box tip"><b class="t">💡 Convertir</b><code>TantQue x < 10</code> ↔ <code>Jusqu'à x >= 10</code> : la condition d'arrêt de Répéter est le <b>contraire</b> de la condition de continuation de TantQue.</div>
`},
{id:"l10", part:2, cat:"boucles", title:"Erreurs fréquentes avec les boucles", html:`
<p>Le cours cite 4 erreurs classiques. Apprends à les <b>repérer</b> : c'est souvent demandé (« Trouvez l'erreur »).</p>
<h3>1. La boucle infinie</h3>
<p>La condition ne devient <b>jamais fausse</b> → l'algorithme ne s'arrête jamais (et ce n'est donc plus un algorithme : il n'est pas <b>fini</b> !).</p>
<pre class="code">Début
  i ← 1
  somme ← 0
  TantQue i <= 10 Faire
     somme ← somme + i
  FinTantQue          // ❌ i n'augmente jamais : i vaut toujours 1
  Afficher somme
Fin</pre>
<p><b>Correction</b> : ajouter <code>i ← i + 1</code> dans la boucle. (C'est l'exercice « Trouvez l'erreur » du cours.)</p>
<h3>2. L'erreur « Off-by-one » (erreur d'un élément)</h3>
<p>La boucle fait <b>un tour de trop</b> ou <b>un tour de moins</b>. Souvent à cause de <code>&lt;</code> au lieu de <code>&lt;=</code> ou d'une mauvaise borne.</p>
<pre class="code">// On veut afficher 1 à 10
i ← 1
TantQue i < 10 Faire     // ❌ s'arrête à 9
   Afficher i
   i ← i + 1
FinTantQue</pre>
<pre class="code">// Tableau de taille 5 (indices 0 à 4)
Pour i allant de 0 à taille(T) Faire   // ❌ va jusqu'à 5 → erreur !
   Afficher T[i]
FinPour</pre>
<p><b>Correction</b> : <code>i <= 10</code> ; et <code>de 0 à taille(T) - 1</code>.</p>
<h3>3. Mauvaise modification de la variable de contrôle</h3>
<pre class="code">i ← 10
TantQue i > 0 Faire
   Afficher i
   i ← i + 1      // ❌ on s'éloigne de la condition d'arrêt → infini
FinTantQue</pre>
<pre class="code">Pour i allant de 1 à 5 Faire
   Afficher i
   i ← i + 1      // ❌ ne JAMAIS modifier le compteur d'un POUR à la main
FinPour</pre>
<h3>4. Confusion TantQue / Répéter … Jusqu'à</h3>
<pre class="code">// On veut s'arrêter quand x atteint 10
x ← 0
Répéter
   x ← x + 1
Jusqu'à x < 10     // ❌ condition inversée : s'arrête dès le 1er tour (x=1)
</pre>
<p>Répéter s'arrête quand la condition est <b>VRAIE</b> → il faut <code>Jusqu'à x >= 10</code> (ou <code>x = 10</code>).</p>
<div class="box tip"><b class="t">✅ Check-list anti-bug</b>
<ol><li>La variable de la condition est-elle <b>initialisée</b> avant la boucle ?</li>
<li>Est-elle <b>modifiée</b> dans la boucle, dans le <b>bon sens</b> ?</li>
<li>Les <b>bornes</b> sont-elles bonnes (&lt; ou &lt;= ? taille ou taille−1 ?)</li>
<li>Teste à la main le <b>premier</b> et le <b>dernier</b> tour.</li></ol></div>
`},
{id:"l11", part:2, cat:"classiques", title:"Algorithmes classiques : Somme, Factorielle, PGCD", html:`
<h3>1. La somme (accumulateur)</h3>
<p>Pour additionner plein de valeurs, on utilise une variable <b>accumulateur</b> initialisée à <b>0</b>.</p>
<pre class="code">Début
  somme ← 0
  Pour i allant de 1 à 4 Faire
     somme ← somme + i
  FinPour
  Afficher somme
Fin</pre>
<div data-trace="somme"></div>
<div class="box tip"><b class="t">💡 Formule bonus</b>1 + 2 + … + N = N × (N + 1) / 2. Ex : de 1 à 100 → 5050.</div>
<h3>2. La factorielle</h3>
<div class="box def"><b class="t">📘 Factorielle</b>La factorielle d'un entier naturel N, notée <b>N!</b>, est le <b>produit</b> de tous les entiers de 1 à N.<br>5! = 1 × 2 × 3 × 4 × 5 = 120. Par convention, <b>0! = 1</b>.</div>
<pre class="code">Début
  Lire N
  fact ← 1                   // ⚠️ 1 et pas 0 !
  Pour i allant de 1 à N Faire
     fact ← fact * i
  FinPour
  Afficher fact
Fin</pre>
<div class="box warn"><b class="t">⚠️ Piège n°1 des examens</b>Pour un <b>produit</b>, on initialise à <b>1</b> (élément neutre de ×). Si on initialise à 0, tout fait 0 ! Pour une <b>somme</b>, on initialise à <b>0</b>.</div>
<table class="t"><tr><th>N</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><th>N!</th><td>1</td><td>1</td><td>2</td><td>6</td><td>24</td><td>120</td><td>720</td><td>5040</td></tr></table>
<h3>3. Le PGCD</h3>
<div class="box def"><b class="t">📘 PGCD</b>Le PGCD (Plus Grand Commun Diviseur) de deux entiers est le <b>plus grand entier positif</b> qui divise ces deux nombres <b>sans reste</b>.<br>PGCD(12, 18) = 6 car 6 divise 12 et 18, et aucun nombre plus grand ne divise les deux.</div>
<p><b>Méthode d'Euclide</b> : on remplace (a, b) par (b, a MOD b) jusqu'à ce que b vaille 0. Le PGCD est alors a.</p>
<pre class="code">Début
  Lire a
  Lire b
  TantQue b ≠ 0 Faire
     r ← a MOD b
     a ← b
     b ← r
  FinTantQue
  Afficher a
Fin</pre>
<div data-trace="pgcd"></div>
<p><b>Méthode naïve</b> (plus lente mais plus intuitive) : tester tous les diviseurs depuis le plus petit des deux nombres en descendant, et s'arrêter au premier qui divise les deux.</p>
<div class="box tip"><b class="t">💡 Astuces PGCD</b>PGCD(a, a) = a. PGCD(a, 1) = 1. Si b divise a, PGCD(a, b) = b. Deux nombres dont le PGCD vaut 1 sont dits <b>premiers entre eux</b>.</div>
<h3>4. Bonus : compter et chercher</h3>
<pre class="code">// Compter les nombres pairs de 1 à 50
compteur ← 0
Pour i allant de 1 à 50 Faire
   Si i MOD 2 = 0 Alors
      compteur ← compteur + 1
   FinSi
FinPour
Afficher compteur      // 25</pre>
`},
{id:"l11r", part:2, cat:"recursivite", title:"Les algorithmes récursifs", html:`
<div class="box def"><b class="t">📘 Récursivité</b>Un algorithme est <b>récursif</b> lorsqu'une fonction ou une procédure <b>s'appelle elle-même</b> pour résoudre un problème.</div>
<div class="analogy">Des <b>poupées russes</b> : pour atteindre la plus petite, tu ouvres une poupée, qui contient une poupée plus petite, et ainsi de suite… jusqu'à la dernière, qui ne s'ouvre pas. C'est le <b>cas de base</b>.</div>
<h3>Les 2 éléments obligatoires</h3>
<ul><li><b>Un cas de base</b> : la condition qui <b>arrête</b> les appels récursifs.</li>
<li><b>Un appel récursif</b> : la fonction s'appelle avec un problème <b>plus simple</b> (plus petit).</li></ul>
<h3>Exemple du cours : la factorielle récursive</h3>
<p>Le cours l'écrit ainsi (style Python) :</p>
<pre class="code">Entrée : Entier n
Sortie : Entier
if n <= 1:
    return 1
return n * factorielle(n - 1)</pre>
<p>Le même algorithme en pseudo-code :</p>
<pre class="code">Fonction Factorielle(n : entier) : entier
   Si n <= 1 Alors
      Retourner 1                      // cas de base
   FinSi
   Retourner n * Factorielle(n - 1)    // appel récursif (problème plus simple)
FinFonction</pre>
<p>L'idée : 4! = 4 × 3!, et 3! = 3 × 2!, etc. On ramène le problème à un problème plus petit, jusqu'à 1! = 1.</p>
<h3>▶️ Regarde les appels s'empiler puis se dépiler</h3>
<div data-trace="factrec"></div>
<table class="t"><tr><th>Phase</th><th>Ce qui se passe pour Fact(4)</th></tr>
<tr><td>Descente</td><td>Fact(4) → Fact(3) → Fact(2) → Fact(1)</td></tr>
<tr><td>Cas de base</td><td>Fact(1) = 1</td></tr>
<tr><td>Remontée</td><td>Fact(2) = 2 × 1 = 2 → Fact(3) = 3 × 2 = 6 → Fact(4) = 4 × 6 = <b>24</b></td></tr></table>
<div class="box warn"><b class="t">⚠️ Les 2 erreurs classiques</b>
<ul><li><b>Pas de cas de base</b> : la fonction s'appelle à l'infini, jusqu'au plantage (« dépassement de pile »).</li>
<li><b>Le problème ne devient pas plus simple</b> : <code>Retourner n * Factorielle(n + 1)</code> s'éloigne du cas de base, le résultat est le même plantage.</li></ul></div>
<h3>D'autres exemples</h3>
<pre class="code">// Somme 1 + 2 + … + n
Fonction Somme(n : entier) : entier
   Si n = 0 Alors
      Retourner 0
   FinSi
   Retourner n + Somme(n - 1)
FinFonction

// Puissance x^n
Fonction Puissance(x, n : entier) : entier
   Si n = 0 Alors
      Retourner 1
   FinSi
   Retourner x * Puissance(x, n - 1)
FinFonction</pre>
<h3>Récursif ou itératif (avec une boucle) ?</h3>
<table class="t"><tr><th></th><th>Itératif (boucle)</th><th>Récursif</th></tr>
<tr><td>Outil</td><td>Pour / TantQue</td><td>La fonction s'appelle elle-même</td></tr>
<tr><td>Arrêt</td><td>condition de la boucle</td><td>cas de base</td></tr>
<tr><td>Avantage</td><td>économe en mémoire</td><td>code court, proche de la définition mathématique</td></tr></table>
<div class="box def"><b class="t">À retenir</b>Un algorithme récursif = un <b>cas de base</b> qui arrête + un <b>appel récursif</b> sur un problème <b>plus simple</b>. Tout ce qu'on fait en récursif peut aussi s'écrire avec une boucle.</div>
`},
{id:"l12", part:2, cat:"tableaux", title:"Les tableaux", html:`
<div class="box def"><b class="t">📘 Tableau</b>Un tableau permet de stocker <b>plusieurs valeurs</b> dans une <b>seule variable</b>, chaque valeur étant accessible grâce à sa <b>position</b> (son <b>indice</b>).</div>
<pre class="code">Notes ← [12, 15, 8, 17, 14]</pre>
<div class="analogy">Un tableau, c'est une <b>rangée de casiers numérotés</b>. Le numéro du casier = l'indice ; le contenu = la valeur.</div>
<table class="t"><tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>Valeur</th><td>12</td><td>15</td><td>8</td><td>17</td><td>14</td></tr></table>
<ul>
<li>Un tableau regroupe des valeurs de <b>même nature</b> (même type).</li>
<li>Chaque élément possède un <b>indice</b>.</li>
<li>En programmation, les indices <b>commencent à 0</b>.</li>
<li>La <b>taille</b> du tableau = le nombre d'éléments (ici 5).</li>
</ul>
<h3>Accéder à un élément</h3>
<p><code>Notes[0] = 12</code>, <code>Notes[2] = 8</code>, <code>Notes[4] = 14</code>.</p>
<div class="box warn"><b class="t">⚠️ Indice hors limites</b>Accéder à un indice inexistant provoque une <b>erreur</b>. Pour un tableau de taille 5, les indices valides vont de <b>0 à 4</b>. <code>Notes[5]</code> → ERREUR ! Le dernier élément est toujours <code>T[taille(T) - 1]</code>.</div>
<p>On peut aussi <b>modifier</b> une case : <code>Notes[2] ← 10</code> → le tableau devient [12, 15, 10, 17, 14].</p>
<h3>Parcourir un tableau</h3>
<p>Parcourir = examiner <b>chaque élément</b>, avec une boucle POUR :</p>
<pre class="code">Début
  Notes ← [12, 15, 8, 17, 14]
  Pour i allant de 0 à taille(Notes) - 1
     Afficher Notes[i]
  FinPour
Fin</pre>
<div class="box def"><b class="t">À retenir</b>Pour parcourir un tableau, les indices vont de <b>0</b> à <b>taille(tableau) − 1</b>.</div>
<h3>Calculer la moyenne</h3>
<pre class="code">Variables :
  Notes : tableau de réels
  i : entier
  somme, moyenne : réel
Début
  Notes ← [12, 15, 8, 17, 14]
  somme ← 0
  Pour i allant de 0 à taille(Notes) - 1
     somme ← somme + Notes[i]
  FinPour
  moyenne ← somme / taille(Notes)
  Afficher moyenne          // 66 / 5 = 13.2
Fin</pre>
<h3>Trouver le minimum et le maximum</h3>
<p>Astuce : on suppose que le <b>premier élément</b> est le min et le max, puis on compare avec les autres (donc on commence à l'indice <b>1</b>).</p>
<pre class="code">Début
  Notes ← [12, 15, 8, 17, 14]
  minimum ← Notes[0]
  maximum ← Notes[0]
  Pour i allant de 1 à taille(Notes) - 1
     Si Notes[i] < minimum Alors
        minimum ← Notes[i]
     FinSi
     Si Notes[i] > maximum Alors
        maximum ← Notes[i]
     FinSi
  FinPour
  Afficher "Minimum :", minimum     // 8
  Afficher "Maximum :", maximum     // 17
Fin</pre>
<div data-trace="max"></div>
<div class="box warn"><b class="t">⚠️ Pourquoi pas maximum ← 0 ?</b>Si toutes les valeurs sont négatives (ex : températures [-5, -2, -9]), un max initialisé à 0 donnerait 0, qui n'est même pas dans le tableau ! Initialiser avec <code>Notes[0]</code> marche toujours.</div>
<h3>Compter les admis (note ≥ 10)</h3>
<pre class="code">Début
  Notes ← [12, 15, 8, 17, 14]
  compteur ← 0
  Pour i allant de 0 à taille(Notes) - 1
     Si Notes[i] >= 10 Alors
        compteur ← compteur + 1
     FinSi
  FinPour
  Afficher compteur        // 4
Fin</pre>
<h3>🛠️ Ateliers pratiques du cours</h3>
<p>Le cours propose plusieurs ateliers à résoudre <b>dans un même algorithme</b> (tu les retrouves dans l'Atelier code, corrigés automatiquement) :</p>
<ul><li><b>Chiffre d'affaires sur 30 jours</b> : total, jour des meilleures ventes, nombre de jours au-dessus de 1 000 €.</li>
<li><b>Recherche dans 20 nombres</b> : la valeur existe-t-elle ? à quelles positions ? combien de fois ?</li>
<li><b>Présences de 25 étudiants</b> (1 = présent, 0 = absent) : présents, absents, taux de présence, objectif de 80 %.</li>
<li><b>Ordre du tableau</b> : croissant, décroissant ou non trié ?</li></ul>
<h3>Rechercher une valeur</h3>
<p>Pour savoir si une valeur est dans le tableau, on est <b>obligé de parcourir</b> le tableau. Complexité : <b>O(n)</b>, car tous les éléments peuvent devoir être examinés.</p>
<pre class="code">trouve ← FAUX
Pour i allant de 0 à taille(T) - 1
   Si T[i] = valeur Alors
      trouve ← VRAI
   FinSi
FinPour
Afficher trouve</pre>
`},
{id:"l12t", part:2, cat:"tris", title:"Les algorithmes de tri", html:`
<div class="box def"><b class="t">📘 Objectif d'un tri</b>Réorganiser les éléments d'un tableau dans un <b>ordre donné</b>, généralement <b>croissant</b> ou <b>décroissant</b>.</div>
<h3>1. Le tri à bulles (Bubble Sort)</h3>
<ul><li>Comparer deux éléments <b>voisins</b>.</li>
<li>Les <b>échanger</b> si le premier est supérieur au second.</li>
<li><b>Répéter</b> les passages jusqu'à obtenir un tableau trié.</li>
<li>Les plus <b>grandes</b> valeurs <b>remontent</b> progressivement vers la <b>fin</b> du tableau (comme des bulles).</li></ul>
<pre class="code">Début
   Pour i ← 0 à N - 2 Faire
      Pour j ← 0 à N - i - 2 Faire
         Si T[j] > T[j + 1] Alors
            Temp ← T[j]
            T[j] ← T[j + 1]
            T[j + 1] ← Temp
         FinSi
      FinPour
   FinPour
   Afficher T
Fin</pre>
<p><b>N</b> est la taille du tableau. Les 3 lignes avec <code>Temp</code> font l'<b>échange</b> de deux cases (comme l'échange de deux variables).</p>
<h3>▶️ Le tri à bulles pas à pas</h3>
<div data-trace="bulles"></div>
<p>Exemple sur <code>[5, 1, 4, 2, 8]</code> :</p>
<table class="t"><tr><th>Passage</th><th>Tableau après le passage</th><th>Remarque</th></tr>
<tr><td>Départ</td><td>[5, 1, 4, 2, 8]</td><td></td></tr>
<tr><td>1</td><td>[1, 4, 2, 5, 8]</td><td>5 a « remonté » jusqu'à 8</td></tr>
<tr><td>2</td><td>[1, 2, 4, 5, 8]</td><td>4 et 2 échangés</td></tr>
<tr><td>3 et 4</td><td>[1, 2, 4, 5, 8]</td><td>plus aucun échange : trié</td></tr></table>
<div class="box tip"><b class="t">💡 Pourquoi N - i - 2 ?</b>Après chaque passage, le plus grand élément restant est à sa place définitive à la fin : inutile de le comparer à nouveau. On compare donc un voisin de moins à chaque passage.</div>
<h3>2. Le tri par sélection (Selection Sort)</h3>
<ul><li><b>Rechercher le plus petit</b> élément dans la partie <b>non triée</b> du tableau.</li>
<li>Le <b>placer au début</b> de cette partie en l'échangeant avec le premier élément.</li>
<li>Répéter jusqu'à ce que le tableau soit trié.</li>
<li>Les plus <b>petites</b> valeurs sont placées progressivement au <b>début</b> du tableau.</li></ul>
<pre class="code">Début
   Pour i ← 0 à N - 2 Faire
      IndiceMin ← i
      Pour j ← i + 1 à N - 1 Faire
         Si T[j] < T[IndiceMin] Alors
            IndiceMin ← j
         FinSi
      FinPour
      Temp ← T[i]
      T[i] ← T[IndiceMin]
      T[IndiceMin] ← Temp
   FinPour
   Afficher T
Fin</pre>
<table class="t"><tr><th>Étape (i)</th><th>Minimum trouvé</th><th>Tableau après l'échange</th></tr>
<tr><td>Départ</td><td></td><td>[5, 1, 4, 2, 8]</td></tr>
<tr><td>0</td><td>1 (indice 1)</td><td>[<b>1</b>, 5, 4, 2, 8]</td></tr>
<tr><td>1</td><td>2 (indice 3)</td><td>[1, <b>2</b>, 4, 5, 8]</td></tr>
<tr><td>2</td><td>4 (déjà en place)</td><td>[1, 2, <b>4</b>, 5, 8]</td></tr>
<tr><td>3</td><td>5 (déjà en place)</td><td>[1, 2, 4, <b>5</b>, 8]</td></tr></table>
<div class="box def"><b class="t">À retenir (cours)</b>Le tri à bulles <b>compare les voisins</b>, tandis que le tri par sélection <b>recherche le minimum</b>. Les deux utilisent deux boucles imbriquées : complexité <b>O(N²)</b>.</div>
<h3>Vérifier si un tableau est trié</h3>
<p>Atelier du cours : un tableau est trié par ordre croissant si chaque élément est inférieur ou égal à son voisin de droite.</p>
<pre class="code">croissant ← VRAI
Pour i ← 0 à taille(T) - 2 Faire
   Si T[i] > T[i + 1] Alors
      croissant ← FAUX
   FinSi
FinPour</pre>
<div class="box warn"><b class="t">⚠️ Borne</b>On s'arrête à <code>taille(T) - 2</code> car on lit <code>T[i + 1]</code> : avec <code>taille(T) - 1</code>, le dernier tour lirait une case qui n'existe pas.</div>
`},
{id:"l13", part:2, cat:"complexite", title:"La complexité algorithmique", html:`
<div class="box def"><b class="t">📘 Complexité</b>La complexité algorithmique est la <b>quantité de ressources</b> (temps, mémoire…) qu'un algorithme consomme <b>en fonction de la taille de ses données d'entrée</b>.</div>
<ul>
<li><b>Temps d'exécution</b> : durée réelle, qui dépend <b>aussi de la machine</b> (un PC rapide va plus vite).</li>
<li><b>Nombre d'opérations</b> : quantité de travail de l'algorithme — <b>indépendant de la machine</b>.</li>
<li><b>Taille des données</b> : notée <b>N</b>, par exemple le nombre d'éléments d'un tableau.</li>
</ul>
<p><b>Objectif</b> : comparer les algorithmes <b>sans dépendre d'un ordinateur précis</b>. C'est pourquoi on compte des <b>opérations</b>, pas des secondes.</p>
<h3>O(1) — constant</h3>
<p>Le nombre d'opérations <b>ne dépend pas</b> de N. Ex : accéder à <code>T[3]</code>, faire <code>a + b</code>.</p>
<h3>O(N) — linéaire</h3>
<p>Un algorithme est en O(N) lorsqu'il effectue un nombre d'opérations <b>proportionnel</b> à la taille des données. Ex : compter les éléments d'un tableau, rechercher une valeur, calculer une somme.</p>
<p>Tableau de 5 éléments → 5 itérations. Avec 100 éléments → 100 itérations. <b>Une boucle simple = O(N)</b>.</p>
<h3>O(N²) — quadratique</h3>
<p>Une <b>double boucle</b> (une boucle dans une boucle) peut effectuer <b>N × N</b> opérations.</p>
<pre class="code">Pour i allant de 1 à n Faire
   Pour j allant de 1 à n Faire
      Afficher i, j
   FinPour
FinPour</pre>
<p>Pour n = 4, le corps s'exécute 4 × 4 = <b>16</b> fois. Pour n = 100 → 100 × 100 = <b>10 000</b> fois.</p>
<table class="t"><tr><th>N</th><th>O(1)</th><th>O(N)</th><th>O(N²)</th></tr>
<tr><td>10</td><td>1</td><td>10</td><td>100</td></tr>
<tr><td>100</td><td>1</td><td>100</td><td>10 000</td></tr>
<tr><td>1 000</td><td>1</td><td>1 000</td><td>1 000 000</td></tr></table>
<div class="box tip"><b class="t">💡 Si N double…</b>O(N) → le travail <b>double</b>. O(N²) → le travail est multiplié par <b>4</b>. O(1) → ne change pas.</div>
<h3>Exemple du cours : détecter un doublon</h3>
<p><b>Version naïve — O(N²)</b> : on compare chaque élément avec tous les suivants.</p>
<pre class="code">Variables :
  numeros : tableau d'entiers ; i, j : entiers
Début
  Pour i allant de 0 à taille(numeros) - 1
     Pour j allant de i + 1 à taille(numeros) - 1
        Si numeros[i] = numeros[j] Alors
           Afficher "Doublon trouvé"
           Retourner VRAI
        FinSi
     FinPour
  FinPour
  Afficher "Aucun doublon"
  Retourner FAUX
Fin</pre>
<p><b>Version intelligente — O(N)</b> : on mémorise les numéros déjà vus dans un <b>ensemble</b> (où vérifier « appartient à » est très rapide).</p>
<pre class="code">Variables :
  numeros : tableau d'entiers ; vus : ensemble d'entiers ; numero : entier
Début
  vus ← ensemble vide
  Pour chaque numero dans numeros
     Si numero appartient à vus Alors
        Afficher "Doublon trouvé"
        Retourner VRAI
     FinSi
     Ajouter numero à vus
  FinPour
  Afficher "Aucun doublon"
  Retourner FAUX
Fin</pre>
<div class="box def"><b class="t">À retenir</b>Une seule boucle → O(N). Deux boucles imbriquées → O(N²). Deux boucles <b>l'une après l'autre</b> (pas imbriquées) → O(N) + O(N) = toujours <b>O(N)</b>. La version « intelligente » utilise <b>plus de mémoire</b> (l'ensemble) pour gagner du <b>temps</b>.</div>
`},
// ---------------------------------------------------------------- PARTIE 3
{id:"l14", part:3, cat:"fonctions", title:"Les fonctions", html:`
<div class="box def"><b class="t">📘 Fonction</b>Une fonction est un <b>bloc d'instructions</b> qui réalise une <b>tâche précise</b> et que l'on peut <b>réutiliser</b> plusieurs fois.</div>
<div class="analogy">Une fonction, c'est une <b>machine</b> : tu mets des ingrédients dedans (les <b>paramètres</b>), elle travaille (le <b>traitement</b>), et elle te rend un produit (la <b>valeur de retour</b>). Ex : une machine à café.</div>
<h3>Pourquoi utiliser des fonctions ?</h3>
<ul><li><b>Éviter de répéter</b> les mêmes instructions.</li>
<li><b>Décomposer</b> un problème complexe en tâches simples.</li>
<li>Faciliter la <b>lecture</b> et la <b>compréhension</b>.</li>
<li>Faciliter les <b>tests</b> et la <b>correction</b>.</li></ul>
<h3>Les 4 composants d'une fonction</h3>
<ul><li>Un <b>nom</b> : identifie la fonction.</li>
<li>Des <b>paramètres</b> : données reçues par la fonction.</li>
<li>Un <b>traitement</b> : instructions exécutées.</li>
<li>Une <b>valeur de retour</b> : résultat transmis à l'appelant, si nécessaire.</li></ul>
<pre class="code">Fonction NomFonction(paramètres) : typeRetour
   Instructions
   Retourner résultat
FinFonction</pre>
<h3>Exemple</h3>
<pre class="code">Fonction Additionner(a, b) : entier
   resultat ← a + b
   Retourner resultat
FinFonction

// Programme principal (l'appelant)
somme ← Additionner(5, 3)
Afficher somme       // 8</pre>
<p>Quand on écrit <code>Additionner(5, 3)</code>, on <b>appelle</b> la fonction : <code>a</code> prend 5, <code>b</code> prend 3, la fonction calcule 8 et le <b>retourne</b>. Ce 8 est rangé dans <code>somme</code>.</p>
<div class="box tip"><b class="t">💡 Vocabulaire</b><b>Paramètres</b> (formels) = les noms dans la définition (<code>a, b</code>). <b>Arguments</b> (effectifs) = les valeurs passées à l'appel (<code>5, 3</code>).</div>
<h3>Plusieurs paramètres</h3>
<p>Exercice du cours : calculer le prix TTC à partir du prix HT et du taux de TVA.</p>
<pre class="code">Fonction CalculerTTC(prixHT : réel, taux : réel) : réel
   Retourner prixHT * (1 + taux / 100)
FinFonction

Afficher CalculerTTC(100, 20)    // 120</pre>
<h3>Afficher ou retourner ?</h3>
<table class="t"><tr><th>Afficher</th><th>Retourner</th></tr>
<tr><td>Montre le résultat à l'<b>utilisateur</b> (écran)</td><td>Renvoie le résultat au <b>programme</b> qui a appelé</td></tr>
<tr><td>Le résultat est « perdu » pour le programme</td><td>Le résultat peut être <b>réutilisé</b> (stocké, recalculé…)</td></tr>
<tr><td>Ne termine pas la fonction</td><td><b>Termine</b> immédiatement la fonction</td></tr></table>
<div class="box warn"><b class="t">⚠️</b>Une fonction qui fait <code>Afficher</code> au lieu de <code>Retourner</code> ne peut pas être utilisée dans un calcul : <code>x ← Double(4) + 1</code> ne marche que si Double <b>retourne</b> sa valeur. Toute instruction après un <code>Retourner</code> n'est <b>jamais exécutée</b>.</div>
<h3>Procédure : fonction sans valeur de retour</h3>
<p>Certaines fonctions réalisent une <b>action</b> sans transmettre de résultat. On les appelle des <b>procédures</b>.</p>
<pre class="code">Procédure AfficherBienvenue(nom : chaîne)
   Afficher "Bienvenue ", nom
FinProcédure

AfficherBienvenue("Alice")    // affiche : Bienvenue Alice</pre>
`},
{id:"l15", part:3, cat:"fonctions", title:"Modularité : décomposer un problème", html:`
<div class="box def"><b class="t">📘 Modularité</b>La modularité consiste à <b>diviser un problème complexe en plusieurs fonctions simples</b> (des sous-problèmes).</div>
<div class="analogy">Pour construire une voiture, une usine ne fait pas tout d'un bloc : un atelier fait le moteur, un autre les roues, un autre la carrosserie. Puis on assemble.</div>
<h3>Exemple du cours : CalculerMontantCommande()</h3>
<p>Au lieu d'écrire un seul gros algorithme, on crée plusieurs fonctions :</p>
<ul><li><code>CalculerSousTotal()</code></li><li><code>CalculerReduction()</code></li><li><code>CalculerFraisLivraison()</code></li></ul>
<p><b>Avantage</b> : si le calcul de la réduction est faux, il suffit de corriger <code>CalculerReduction()</code> <b>sans toucher au reste</b> de l'algorithme.</p>
<h3>Étude de cas corrigée : le panier en ligne</h3>
<p>Un site veut calculer le montant final d'un panier :</p>
<ul><li>Sous-total = somme des (prix × quantité).</li>
<li>Réduction de <b>10 %</b> si le sous-total <b>dépasse 100 €</b>.</li>
<li>Livraison : <b>5 €</b> si le sous-total est <b>inférieur à 50 €</b>, sinon gratuite.</li>
<li>Calculer et afficher le montant final.</li></ul>
<p><b>Étape 1 — Décomposer</b> en fonctions, <b>Étape 2</b> — définir paramètres et retours :</p>
<table class="t"><tr><th>Fonction</th><th>Paramètres</th><th>Retour</th></tr>
<tr><td>CalculerSousTotal</td><td>prix : tableau de réels, quantites : tableau d'entiers</td><td>réel</td></tr>
<tr><td>CalculerReduction</td><td>sousTotal : réel</td><td>réel</td></tr>
<tr><td>CalculerFraisLivraison</td><td>sousTotal : réel</td><td>réel</td></tr></table>
<p><b>Étape 3 — Les fonctions :</b></p>
<pre class="code">Fonction CalculerSousTotal(prix, quantites) : réel
   total ← 0
   Pour i allant de 0 à taille(prix) - 1
      total ← total + prix[i] * quantites[i]
   FinPour
   Retourner total
FinFonction

Fonction CalculerReduction(sousTotal : réel) : réel
   Si sousTotal > 100 Alors
      Retourner sousTotal * 0.10
   Sinon
      Retourner 0
   FinSi
FinFonction

Fonction CalculerFraisLivraison(sousTotal : réel) : réel
   Si sousTotal < 50 Alors
      Retourner 5
   Sinon
      Retourner 0
   FinSi
FinFonction</pre>
<p><b>Étape 4 — Algorithme principal :</b></p>
<pre class="code">Début
  prix ← [20, 45.5, 10]
  quantites ← [2, 1, 3]
  st ← CalculerSousTotal(prix, quantites)     // 40 + 45.5 + 30 = 115.5
  reduc ← CalculerReduction(st)               // 11.55
  livraison ← CalculerFraisLivraison(st)      // 0
  montant ← st - reduc + livraison            // 103.95
  Afficher "Montant à payer : ", montant
Fin</pre>
<div class="box warn"><b class="t">⚠️ Question piège</b>Faut-il calculer les frais de livraison sur le sous-total <b>avant</b> ou <b>après</b> réduction ? L'énoncé dit « si le <b>sous-total</b> est inférieur à 50 € » → on utilise le sous-total. Toujours relire l'énoncé !</div>
<div class="box def"><b class="t">À retenir</b>Une bonne fonction fait <b>une seule chose</b>, porte un <b>nom clair</b> (verbe + objet : CalculerX, AfficherY), et <b>retourne</b> son résultat plutôt que de l'afficher.</div>
`},
{id:"l16", part:3, cat:"fonctions", title:"Portée des variables et bonnes pratiques", html:`
<h3>Variables locales et globales</h3>
<p>Une variable déclarée <b>dans une fonction</b> est <b>locale</b> : elle n'existe <b>que pendant l'exécution</b> de cette fonction et n'est pas visible de l'extérieur.</p>
<pre class="code">Fonction Carre(x : entier) : entier
   resultat ← x * x       // resultat est LOCALE à Carre
   Retourner resultat
FinFonction

Début
  y ← Carre(4)
  Afficher y              // 16
  Afficher resultat       // ❌ ERREUR : resultat n'existe pas ici
Fin</pre>
<div class="analogy">Ce qui se passe dans la machine reste dans la machine. Seul ce qui est <b>retourné</b> sort.</div>
<h3>Appeler une fonction dans une autre</h3>
<pre class="code">Fonction Carre(x) : entier
   Retourner x * x
FinFonction

Fonction SommeDesCarres(a, b) : entier
   Retourner Carre(a) + Carre(b)
FinFonction

Afficher SommeDesCarres(3, 4)    // 9 + 16 = 25</pre>
<h3>Fonction qui retourne un booléen</h3>
<pre class="code">Fonction EstPair(n : entier) : booléen
   Retourner n MOD 2 = 0
FinFonction

Si EstPair(10) Alors
   Afficher "pair"
FinSi</pre>
<h3>Fonction avec boucle : factorielle réutilisable</h3>
<pre class="code">Fonction Factorielle(n : entier) : entier
   f ← 1
   Pour i allant de 2 à n Faire
      f ← f * i
   FinPour
   Retourner f
FinFonction</pre>
<h3>Bonnes pratiques (synthèse de tout le cours)</h3>
<div class="box tip"><b class="t">✅ Pour écrire un bon algorithme</b>
<ol><li>Suivre la méthode : Comprendre → Identifier les données → Décomposer → Formaliser → Tester.</li>
<li>Donner des <b>noms clairs</b> aux variables (<code>moyenne</code>, pas <code>m</code>).</li>
<li><b>Initialiser</b> les variables (somme ← 0, produit ← 1, max ← T[0]).</li>
<li><b>Indenter</b> le code et fermer chaque bloc (FinSi, FinPour, FinTantQue, FinFonction).</li>
<li>Ordonner les <b>Sinon Si</b> du plus restrictif au moins restrictif.</li>
<li>Vérifier les <b>bornes</b> des boucles (0 à taille−1).</li>
<li>S'assurer que chaque boucle <b>se termine</b>.</li>
<li>Découper en <b>fonctions</b> qui font une seule chose.</li>
<li>Penser à la <b>complexité</b> : éviter les doubles boucles inutiles.</li>
<li><b>Tester</b> avec plusieurs exemples, y compris les cas limites (0, négatif, tableau vide, égalité).</li></ol></div>
`},
];

// ================== FICHE DE RÉVISION ==================
const FICHE = `
<div class="grid g2">
<div class="card"><h3>🧭 Algorithme</h3>Suite <b>finie</b> et <b>non ambiguë</b> d'instructions dans un <b>ordre précis</b> pour résoudre un problème. Programme = traduction dans un langage exécutable.<br><br><b>Méthode</b> : Comprendre → Identifier données → Décomposer → Formaliser (pseudo-code) → Tester.</div>
<div class="card"><h3>📦 Types</h3><b>Entier</b> : -5, 0, 12<br><b>Réel</b> : 3.14, 10.0<br><b>Booléen</b> : VRAI / FAUX<br><b>Chaîne</b> : "Bonjour", "123"<br><br><code>Déclarer age : Entier</code></div>
<div class="card"><h3>✍️ Instructions de base</h3><code>x ← 5</code> affectation (x reçoit 5)<br><code>x = 5</code> comparaison (VRAI/FAUX)<br><code>Lire x</code> entrée utilisateur<br><code>Afficher x</code> sortie écran<br><code>x ← x + 1</code> incrémentation</div>
<div class="card"><h3>🧮 Opérateurs</h3><code>+ - * /</code> · <code>DIV</code> quotient · <code>MOD</code> reste<br>17 DIV 5 = 3 · 17 MOD 5 = 2<br>Pair : <code>n MOD 2 = 0</code><br>Comparaison : <code>= ≠ &lt; &gt; &lt;= &gt;=</code></div>
<div class="card"><h3>🔣 Logique</h3><b>ET</b> : vrai si les 2 vrais<br><b>OU</b> : vrai si au moins 1 vrai<br><b>NON</b> : inverse<br>Intervalle : <code>x >= a ET x <= b</code><br>Hors intervalle : <code>x < a OU x > b</code></div>
<div class="card"><h3>🔀 Conditions</h3><code>Si … Alors … FinSi</code><br><code>Si … Sinon … FinSi</code><br><code>Si … Sinon Si … Sinon … FinSi</code> → la <b>1ʳᵉ condition vraie</b> gagne. Ordre : plus restrictif d'abord !<br>Imbriquée = Si dans un Si.</div>
<div class="card"><h3>🔁 Boucles</h3><b>POUR</b> : nb de tours connu, compteur auto. de a à b → b−a+1 tours.<br><b>TANT QUE</b> : test <b>avant</b>, 0 tour possible, continue tant que VRAI.<br><b>RÉPÉTER…JUSQU'À</b> : test <b>après</b>, ≥ 1 tour, s'arrête quand VRAI.</div>
<div class="card"><h3>🐞 Erreurs de boucle</h3>Boucle <b>infinie</b> (variable jamais modifiée)<br><b>Off-by-one</b> (&lt; au lieu de &lt;=, taille au lieu de taille−1)<br>Mauvaise modif. de la variable de contrôle<br>Confusion TantQue / Répéter</div>
<div class="card"><h3>🏛️ Classiques</h3><b>Somme</b> : s ← 0 ; s ← s + i<br><b>Factorielle</b> : f ← 1 ; f ← f * i ; 5! = 120 ; 0! = 1<br><b>PGCD</b> (Euclide) : TantQue b ≠ 0 : r ← a MOD b ; a ← b ; b ← r → résultat a</div>
<div class="card"><h3>🗂️ Tableaux</h3><code>T ← [12, 15, 8]</code> · indices de <b>0</b> à <b>taille−1</b><br>T[taille] → <b>ERREUR</b><br>Parcours : <code>Pour i de 0 à taille(T) - 1</code><br>Min/max : initialiser à <b>T[0]</b>, boucle depuis 1<br>Recherche : O(n)</div>
<div class="card"><h3>🪆 Récursivité</h3>Une fonction qui <b>s'appelle elle-même</b>.<br>Obligatoire : un <b>cas de base</b> (arrêt) + un <b>appel récursif</b> sur un problème <b>plus simple</b>.<br><code>Si n <= 1 Alors Retourner 1</code><br><code>Retourner n * Fact(n - 1)</code></div>
<div class="card"><h3>🔃 Tris</h3><b>Bulles</b> : compare les <b>voisins</b>, échange si T[j] > T[j+1] ; les grands remontent à la fin.<br><b>Sélection</b> : cherche le <b>minimum</b> de la partie non triée, l'échange avec le 1er.<br>Échange : Temp ← a ; a ← b ; b ← Temp. Les deux : <b>O(N²)</b>.</div>
<div class="card"><h3>⏱️ Complexité</h3>Ressources (temps, mémoire) en fonction de la taille <b>N</b>. On compte les <b>opérations</b> (indépendant de la machine).<br>O(1) constant · O(N) 1 boucle · O(N²) 2 boucles imbriquées (n=100 → 10 000)</div>
<div class="card"><h3>🧩 Fonctions</h3>Nom + paramètres + traitement + retour.<br><code>Fonction F(a, b) : type … Retourner r FinFonction</code><br><b>Procédure</b> = sans retour.<br>Retourner ≠ Afficher. Variables internes = <b>locales</b>.<br>Modularité = découper en sous-fonctions.</div>
</div>`;

// ================== FLASHCARDS ==================
const FLASH = [
["Qu'est-ce qu'un algorithme ?","Une suite <b>finie</b> et <b>non ambiguë</b> d'instructions, à suivre dans un <b>ordre précis</b>, pour résoudre un problème ou obtenir un résultat."],
["Qu'est-ce que l'algorithmique ?","L'étude et la production de règles et techniques qui servent à <b>concevoir des algorithmes</b>."],
["Différence algorithme / programme ?","Le <b>programme</b> traduit l'algorithme dans un <b>langage de programmation</b> exécutable par un ordinateur. L'algorithme est écrit en pseudo-code."],
["Les 5 étapes pour résoudre un problème","1. Comprendre le problème<br>2. Identifier les données<br>3. Décomposer la solution<br>4. Formaliser (pseudo-code)<br>5. Tester"],
["Les 4 types de base","<b>Entier</b> (sans décimale), <b>Réel</b> (avec décimale), <b>Booléen</b> (VRAI/FAUX), <b>Chaîne</b> (texte)"],
["Type de 10.0 ?","<b>Réel</b> (il a une partie décimale, même nulle)"],
["Type de \"12345\" ?","<b>Chaîne de caractères</b> (à cause des guillemets)"],
["Que signifie age ← 20 ?","La variable <b>age reçoit</b> la valeur 20 (affectation)."],
["Différence entre ← et = ?","<b>←</b> : affectation (on range une valeur).<br><b>=</b> : comparaison (on vérifie l'égalité → VRAI/FAUX)."],
["x ← 5 puis x ← x + 1. Que vaut x ?","<b>6</b> : on calcule la droite (5+1) puis on range dans x."],
["Que fait l'instruction Lire ?","Récupère une donnée fournie par l'utilisateur et la <b>stocke</b> dans une variable. L'algorithme attend la saisie."],
["Afficher age vs Afficher \"age\"","Le premier affiche la <b>valeur</b> de la variable ; le second affiche le <b>texte</b> « age »."],
["17 MOD 5 = ?","<b>2</b> (17 = 3×5 + 2 → reste 2)"],
["17 DIV 5 = ?","<b>3</b> (quotient de la division entière)"],
["Comment tester si n est pair ?","<code>n MOD 2 = 0</code>"],
["Table de vérité de ET","VRAI uniquement si <b>les deux</b> sont VRAI. Sinon FAUX."],
["Table de vérité de OU","FAUX uniquement si <b>les deux</b> sont FAUX. Sinon VRAI."],
["NON(VRAI) = ?","<b>FAUX</b>. NON inverse la valeur."],
["Si … Sinon Si … : quel bloc s'exécute ?","Celui de la <b>première condition vraie</b>. Les suivantes ne sont pas testées."],
["Qu'est-ce qu'une condition imbriquée ?","Une condition placée <b>à l'intérieur</b> d'une autre, quand le 2ᵉ test dépend du 1ᵉʳ."],
["Erreur : Si age>=12 … Sinon Si age>=18","La branche >=18 n'est <b>jamais atteinte</b> (un adulte vérifie déjà >=12). Il faut tester >=18 en premier."],
["Qu'est-ce qu'une boucle ?","Une structure qui <b>répète</b> un bloc d'instructions plusieurs fois."],
["Les 3 boucles","<b>POUR</b>, <b>TANT QUE</b>, <b>RÉPÉTER … JUSQU'À</b>"],
["Quand utiliser POUR ?","Quand on connaît <b>à l'avance</b> le nombre de répétitions. Le compteur évolue automatiquement."],
["Pour i de 3 à 8 : combien de tours ?","<b>6</b> tours (8 − 3 + 1)"],
["TANT QUE : quand est testée la condition ?","<b>Avant</b> chaque itération. Si fausse au départ → <b>0</b> exécution."],
["RÉPÉTER…JUSQU'À : combien de tours minimum ?","<b>Au moins 1</b>. Condition testée à la fin. S'arrête quand elle devient <b>VRAIE</b>."],
["Les 4 erreurs fréquentes avec les boucles","Boucle infinie · Off-by-one · Mauvaise modification de la variable de contrôle · Confusion TantQue/Répéter"],
["Qu'est-ce que l'erreur « off-by-one » ?","La boucle fait <b>un tour de trop ou de moins</b> (ex : &lt; au lieu de &lt;=)."],
["Définition de N! (factorielle)","Le <b>produit</b> de tous les entiers de 1 à N. 5! = 120. 0! = 1."],
["Valeur initiale pour une somme ? un produit ?","Somme → <b>0</b>. Produit (factorielle) → <b>1</b>."],
["Définition du PGCD","Le plus grand entier positif qui divise deux nombres <b>sans reste</b>. PGCD(12,18)=6."],
["Algorithme d'Euclide","TantQue b ≠ 0 : r ← a MOD b ; a ← b ; b ← r. Le PGCD est <b>a</b>."],
["Qu'est-ce qu'un tableau ?","Une variable qui stocke <b>plusieurs valeurs de même nature</b>, accessibles par leur <b>indice</b>."],
["Indice du premier élément ?","<b>0</b> (en programmation)."],
["Tableau de taille 5 : indices valides ?","De <b>0 à 4</b>. T[5] → erreur."],
["Bornes pour parcourir un tableau","<code>Pour i allant de 0 à taille(T) - 1</code>"],
["Comment trouver le max d'un tableau ?","max ← T[0], puis pour i de 1 à taille−1 : si T[i] > max alors max ← T[i]."],
["Complexité d'une recherche dans un tableau","<b>O(n)</b> : il faut potentiellement examiner tous les éléments."],
["Qu'est-ce que la complexité ?","La quantité de <b>ressources</b> (temps, mémoire) consommée en fonction de la <b>taille N</b> des données."],
["Pourquoi compter les opérations et pas les secondes ?","Le temps réel dépend de la <b>machine</b> ; le nombre d'opérations permet de comparer sans dépendre d'un ordinateur."],
["Complexité d'une double boucle de 1 à n","<b>O(N²)</b>. Pour n=100 → 10 000 opérations."],
["Doublons : naïf vs intelligent","Naïf : double boucle → <b>O(N²)</b>. Intelligent : ensemble « vus » → <b>O(N)</b>."],
["Qu'est-ce qu'une fonction ?","Un bloc d'instructions qui réalise une <b>tâche précise</b> et qu'on peut <b>réutiliser</b>."],
["Les 4 composants d'une fonction","<b>Nom</b>, <b>paramètres</b>, <b>traitement</b>, <b>valeur de retour</b>."],
["Qu'est-ce qu'une procédure ?","Une fonction <b>sans valeur de retour</b> : elle réalise une action."],
["Afficher vs Retourner","Afficher montre à l'utilisateur. Retourner <b>renvoie</b> au programme appelant (réutilisable) et termine la fonction."],
["Qu'est-ce que la modularité ?","Diviser un problème complexe en <b>plusieurs fonctions simples</b>."],
["Variable locale ?","Variable déclarée dans une fonction, qui n'existe <b>que dans cette fonction</b>."],
["Qu'est-ce qu'un algorithme récursif ?","Une fonction ou procédure qui <b>s'appelle elle-même</b> pour résoudre un problème."],
["Les 2 éléments obligatoires d'un algorithme récursif","Un <b>cas de base</b> (arrête les appels) et un <b>appel récursif</b> sur un problème <b>plus simple</b>."],
["Que se passe-t-il sans cas de base ?","Les appels ne s'arrêtent jamais : récursion infinie, puis plantage (dépassement de pile)."],
["Factorielle récursive","Si n <= 1 : Retourner 1<br>Sinon : Retourner n × Factorielle(n − 1)"],
["Objectif d'un algorithme de tri","Réorganiser les éléments d'un tableau dans un ordre donné (croissant ou décroissant)."],
["Principe du tri à bulles","Comparer deux <b>voisins</b>, les échanger si le premier est plus grand, répéter les passages. Les grandes valeurs remontent à la fin."],
["Principe du tri par sélection","Chercher le <b>minimum</b> de la partie non triée et l'échanger avec le premier élément de cette partie."],
["Bulles vs sélection","Bulles : compare les <b>voisins</b>.<br>Sélection : recherche le <b>minimum</b>."],
["Complexité du tri à bulles et du tri par sélection","<b>O(N²)</b> : deux boucles imbriquées."],
["Échanger T[j] et T[j + 1]","Temp ← T[j]<br>T[j] ← T[j + 1]<br>T[j + 1] ← Temp"],
["Comment savoir si un tableau est trié (croissant) ?","Vérifier que T[i] <= T[i + 1] pour tout i de 0 à taille − 2."],
["Condition pour que a, b, c forment un triangle","a < b + c <b>ET</b> b < a + c <b>ET</b> c < a + b"],
["Inverser les chiffres d'un nombre (palindrome)","inverse ← inverse × 10 + n MOD 10, puis n ← n DIV 10, tant que n > 0."],
["4 avantages des fonctions","Éviter la répétition · Décomposer un problème · Faciliter la lecture · Faciliter tests et corrections"],
];
