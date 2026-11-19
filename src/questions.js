// t: "qcm" | "vf" | "in"  — a: index (qcm), bool (vf), [réponses acceptées] (in)
const QB = [];
const Q  = (c,q,ch,a,e,code) => QB.push({t:"qcm",c,q,ch,a,e,code});
const VF = (c,q,a,e,code)    => QB.push({t:"vf",c,q,a,e,code});
const IN = (c,q,a,e,code)    => QB.push({t:"in",c,q,a:[].concat(a),e,code});

// ===================== INTRO =====================
Q("intro","Qu'est-ce qu'un algorithme ?",["Une suite finie et non ambiguë d'instructions pour résoudre un problème","Un langage de programmation","Un ordinateur très puissant","Un logiciel installé sur un PC"],0,"Définition du cours : une suite <b>finie</b> et <b>non ambiguë</b> d'instructions, dans un ordre précis, pour résoudre un problème.");
Q("intro","Qu'est-ce que l'algorithmique ?",["L'étude et la production de règles et techniques pour concevoir des algorithmes","Le fait d'utiliser un ordinateur","Un langage comme Python","La réparation de matériel informatique"],0,"L'algorithmique est la <b>discipline</b> ; l'algorithme est le <b>produit</b>.");
Q("intro","Que signifie « non ambiguë » dans la définition d'un algorithme ?",["Chaque instruction n'a qu'une seule interprétation possible","L'algorithme est très court","L'algorithme est écrit en anglais","L'algorithme utilise des nombres"],0,"Une instruction ambiguë comme « ajoute un peu de sel » peut être comprise de plusieurs façons. Un algorithme doit être précis.");
Q("intro","Que signifie « finie » dans la définition d'un algorithme ?",["Il doit se terminer après un nombre limité d'étapes","Il doit être terminé d'écrire","Il ne contient pas de boucle","Il ne fait qu'un seul calcul"],0,"Un algorithme doit <b>s'arrêter</b>. Une boucle infinie viole cette règle.");
Q("intro","Quelle est la différence entre un algorithme et un programme ?",["Le programme traduit l'algorithme dans un langage exécutable par un ordinateur","Il n'y en a aucune","L'algorithme est exécuté par l'ordinateur, pas le programme","Le programme est écrit en français"],0,"L'algorithme est la méthode (pseudo-code) ; le programme est sa traduction dans un langage (Python, C…).");
Q("intro","Lequel de ces exemples N'EST PAS cité dans le cours comme algorithme du quotidien ?",["Faire la vaisselle à la main","Vérifier le code PIN d'une carte bancaire","Filtrer les spams","Déterminer l'ordre de desserte des étages d'un ascenseur"],0,"Le cours cite : carte bancaire, itinéraire GPS, filtre anti-spam, ascenseur.");
Q("intro","Quelle est la PREMIÈRE étape pour résoudre un problème avec un algorithme ?",["Comprendre le problème","Écrire le pseudo-code","Tester la solution","Décomposer la solution"],0,"Ordre : Comprendre → Identifier les données → Décomposer → Formaliser → Tester.");
Q("intro","Quelle est la DERNIÈRE étape de la méthode de résolution ?",["Tester la solution","Formaliser l'algorithme","Identifier les données","Comprendre le problème"],0,"On termine par <b>tester</b> avec plusieurs exemples et corriger les erreurs.");
Q("intro","« Identifier les données », c'est…",["Déterminer les informations disponibles et le résultat attendu","Écrire le code en Python","Afficher le résultat","Choisir un ordinateur"],0,"On identifie les <b>entrées</b> (ce qu'on a) et la <b>sortie</b> (ce qu'on veut).");
Q("intro","« Formaliser l'algorithme », c'est…",["Décrire les instructions en pseudo-code","Comprendre l'objectif","Tester avec des exemples","Acheter un logiciel"],0,"Formaliser = écrire proprement en <b>pseudo-code</b>.");
Q("intro","Remets dans l'ordre : (A) Tester (B) Décomposer (C) Comprendre (D) Formaliser (E) Identifier les données",["C, E, B, D, A","C, B, E, D, A","E, C, B, A, D","C, E, D, B, A"],0,"Comprendre → Identifier les données → Décomposer → Formaliser → Tester.");
Q("intro","Dans l'algorithme Calculer_Moyenne, quelles sont les entrées ?",["Deux nombres A et B","La moyenne","Le mot « Afficher »","Aucune"],0,"Entrée : A et B. Sortie : la moyenne.");
Q("intro","Quel est le pseudo-code correct pour la moyenne de A et B ?",["Moyenne ← (A + B) / 2","Moyenne ← A + B / 2","Moyenne = A + B / 2","Moyenne ← A / 2 + B"],0,"Sans parenthèses, la division est prioritaire : A + B/2 ≠ (A+B)/2.");
IN("intro","Avec l'algorithme ci-dessous, que s'affiche-t-il ?",["14"],"(12 + 16) / 2 = 28 / 2 = 14.","A ← 12\nB ← 16\nMoyenne ← (A + B) / 2\nAfficher Moyenne");
Q("intro","Quel est l'objectif principal d'un algorithme selon le cours ?",["Obtenir un résultat attendu à partir de données d'entrée","Rendre l'ordinateur plus rapide","Remplacer le langage de programmation","Dessiner des graphiques"],0,"Objectifs : résoudre un problème logiquement, suite finie d'instructions, résultat à partir de données, tâche automatique et reproductible.");
VF("intro","Un algorithme peut être exécuté directement par un ordinateur sans être traduit.",false,"Il faut le <b>traduire</b> en programme (langage de programmation) pour qu'un ordinateur l'exécute.");
VF("intro","Une recette de cuisine peut être vue comme un algorithme.",true,"Ingrédients = entrées, étapes ordonnées = instructions, plat = résultat.");
VF("intro","L'ordre des instructions d'un algorithme n'a pas d'importance.",false,"La définition précise : dans un <b>ordre précis</b>.");
VF("intro","Un algorithme doit permettre d'accomplir une tâche de manière automatique et reproductible.",true,"C'est un des objectifs cités dans le cours.");
VF("intro","Le pseudo-code est un langage de programmation que l'ordinateur comprend.",false,"Le pseudo-code est du français structuré destiné aux <b>humains</b>.");
VF("intro","Tester un algorithme avec un seul exemple suffit toujours.",false,"Il faut tester avec <b>plusieurs</b> exemples, dont des cas limites.");

// ===================== VARIABLES =====================
Q("variables","Quel est le type de la valeur 42 ?",["Entier","Réel","Booléen","Chaîne"],0,"Nombre sans partie décimale → <b>Entier</b>.");
Q("variables","Quel est le type de la valeur 3.14 ?",["Réel","Entier","Booléen","Chaîne"],0,"Nombre avec partie décimale → <b>Réel</b>.");
Q("variables","Quel est le type de la valeur -5 ?",["Entier","Réel","Chaîne","Booléen"],0,"Un nombre négatif sans décimale reste un <b>Entier</b>.");
Q("variables","Quel est le type de la valeur 10.0 ?",["Réel","Entier","Chaîne","Booléen"],0,"10.0 a une partie décimale (même nulle) → <b>Réel</b>.");
Q("variables","Quel est le type de la valeur \"12345\" ?",["Chaîne","Entier","Réel","Booléen"],0,"Les guillemets en font du <b>texte</b> → Chaîne.");
Q("variables","Quel est le type de la valeur VRAI ?",["Booléen","Chaîne","Entier","Réel"],0,"VRAI / FAUX → <b>Booléen</b>.");
Q("variables","Quel est le type de \"VRAI\" (avec guillemets) ?",["Chaîne","Booléen","Entier","Réel"],0,"Entre guillemets, c'est du texte → <b>Chaîne</b>.");
Q("variables","Quel type pour stocker un âge ?",["Entier","Réel","Booléen","Chaîne"],0,"Le cours cite l'âge comme exemple d'utilisation d'un <b>Entier</b>.");
Q("variables","Quel type pour stocker un prix ?",["Réel","Entier","Booléen","Chaîne"],0,"Un prix peut avoir des centimes → <b>Réel</b>.");
Q("variables","Quel type pour stocker « le mot de passe est-il correct ? »",["Booléen","Chaîne","Entier","Réel"],0,"Réponse oui/non → <b>Booléen</b>.");
Q("variables","Quel type pour stocker une adresse postale ?",["Chaîne","Entier","Réel","Booléen"],0,"Du texte → <b>Chaîne</b>.");
Q("variables","Quel type pour une température ?",["Réel","Entier","Booléen","Chaîne"],0,"Le cours cite la température comme exemple de <b>Réel</b>.");
Q("variables","Quel type pour le nombre d'étudiants d'une classe ?",["Entier","Réel","Chaîne","Booléen"],0,"On compte des personnes → <b>Entier</b>.");
Q("variables","Quel type pour un numéro de téléphone « 0612345678 » ?",["Chaîne","Entier","Réel","Booléen"],0,"On ne calcule jamais dessus et le 0 initial serait perdu en entier → <b>Chaîne</b>.");
Q("variables","Combien de valeurs différentes peut prendre un booléen ?",["2","1","3","Une infinité"],0,"Seulement <b>VRAI</b> ou <b>FAUX</b>.");
Q("variables","Que signifie « déclarer une variable » ?",["Définir son nom et, selon la notation, son type","Lui donner une valeur","L'afficher à l'écran","La supprimer"],0,"Déclarer = annoncer le <b>nom</b> (et le type). Donner une valeur = <b>affecter</b>.");
Q("variables","Quelle est la bonne déclaration ?",["Déclarer prenom : Chaîne","prenom ← Chaîne","Afficher prenom : Chaîne","Lire Chaîne prenom"],0,"Syntaxe du cours : <code>Déclarer nom : Type</code>.");
Q("variables","Que signifie age ← 20 ?",["La variable age reçoit la valeur 20","age est égal à 20 ? (question)","On affiche 20","On lit 20 au clavier"],0,"← est l'<b>affectation</b> : on range 20 dans age.");
Q("variables","Quel symbole représente l'affectation en pseudo-code ?",["←","=","==","→"],0,"La flèche <b>←</b> (la valeur va dans la variable).");
Q("variables","Que fait l'instruction Lire age ?",["Attend une saisie de l'utilisateur et la stocke dans age","Affiche la valeur de age","Supprime age","Compare age à une valeur"],0,"Lire = <b>entrée</b> : l'algorithme attend que l'utilisateur fournisse une valeur.");
Q("variables","Que fait l'instruction Afficher ?",["Présente une information à l'utilisateur","Stocke une valeur","Lit une valeur au clavier","Déclare une variable"],0,"Afficher = <b>sortie</b> vers l'utilisateur.");
Q("variables","age ← 20 puis Afficher \"age\". Qu'est-ce qui s'affiche ?",["age","20","\"20\"","Rien"],0,"Entre guillemets, on affiche le <b>texte</b> « age », pas la valeur.");
Q("variables","Pourquoi utilise-t-on une variable temporaire pour échanger a et b ?",["Pour ne pas perdre la valeur de a écrasée par b","Pour aller plus vite","C'est obligatoire pour toute affectation","Pour changer le type de a"],0,"Sans temp : a ← b écrase a, et on ne peut plus la mettre dans b.");
IN("variables","Que vaut age à la fin ?",["21"],"Une variable ne garde que sa <b>dernière</b> valeur : 21.","age ← 20\nage ← 21");
IN("variables","Que vaut x à la fin ?",["6"],"On calcule x + 1 = 5 + 1 = 6 puis on range dans x.","x ← 5\nx ← x + 1");
IN("variables","Que vaut a à la fin ?",["7"],"temp=3, a ← b = 7, b ← temp = 3. Donc a = 7.","a ← 3\nb ← 7\ntemp ← a\na ← b\nb ← temp");
IN("variables","Que vaut b à la fin ? (piège)",["7"],"a ← b met 7 dans a ; puis b ← a remet 7 dans b. La valeur 3 est perdue !","a ← 3\nb ← 7\na ← b\nb ← a");
IN("variables","Que vaut y à la fin ?",["10"],"x vaut 4, y ← 4 * 2 = 8, puis y ← 8 + 2 = 10.","x ← 4\ny ← x * 2\ny ← y + 2");
IN("variables","Que vaut z ?",["12"],"x ← 2+1 = 3 ; y ← 3*3 = 9 ; z ← 9+3 = 12.","x ← 2\nx ← x + 1\ny ← x * x\nz ← y + x");
VF("variables","Une variable peut changer de valeur au cours de l'algorithme.",true,"D'où son nom ! Seule la dernière valeur est conservée.");
VF("variables","Une variable peut contenir deux valeurs en même temps.",false,"Une variable simple ne contient qu'<b>une</b> valeur à la fois (pour plusieurs → tableau).");
VF("variables","age ← 20 signifie que la variable age reçoit la valeur 20.",true,"Exactement la phrase du cours.");
VF("variables","Lire et Afficher font la même chose.",false,"Lire = entrée (utilisateur → algo), Afficher = sortie (algo → utilisateur).");
VF("variables","\"Bonjour\" est une chaîne de caractères.",true,"Du texte entre guillemets.");
VF("variables","On peut faire des calculs arithmétiques avec la chaîne \"12\".",false,"\"12\" est du texte, pas un nombre.");

// ===================== OPÉRATEURS =====================
IN("operateurs","Combien vaut 17 MOD 5 ?",["2"],"17 = 3 × 5 + <b>2</b>. MOD donne le reste.");
IN("operateurs","Combien vaut 17 DIV 5 ?",["3"],"17 = <b>3</b> × 5 + 2. DIV donne le quotient entier.");
IN("operateurs","Combien vaut 10 MOD 2 ?",["0"],"10 est pair : reste 0.");
IN("operateurs","Combien vaut 3 MOD 7 ?",["3"],"3 < 7 : 3 = 0 × 7 + <b>3</b>.");
IN("operateurs","Combien vaut 2 + 3 * 4 ?",["14"],"La multiplication est prioritaire : 2 + 12 = 14.");
IN("operateurs","Combien vaut (2 + 3) * 4 ?",["20"],"Les parenthèses d'abord : 5 × 4 = 20.");
IN("operateurs","Combien vaut 7 / 2 ?",["3.5","3,5"],"Division réelle : 3.5. (7 DIV 2 donnerait 3.)");
Q("operateurs","Quelle condition teste si n est pair ?",["n MOD 2 = 0","n DIV 2 = 0","n / 2 = 1","n MOD 2 = 1"],0,"Pair ⇔ reste de la division par 2 nul.");
Q("operateurs","Quelle condition teste si n est divisible par 3 ?",["n MOD 3 = 0","n DIV 3 = 0","n / 3 = 0","n MOD 0 = 3"],0,"Divisible ⇔ reste nul.");
Q("operateurs","Quelle est la différence entre ← et = ?",["← affecte une valeur, = compare deux valeurs","Aucune différence","= affecte, ← compare","← sert aux chaînes, = aux nombres"],0,"← : affectation (action). = : comparaison (question VRAI/FAUX).");
Q("operateurs","Dans « Si x = 5 Alors », que fait le = ?",["Il compare x à 5","Il met 5 dans x","Il affiche 5","Il déclare x"],0,"Dans une condition, = est une <b>comparaison</b>.");
Q("operateurs","VRAI ET FAUX = ?",["FAUX","VRAI","Erreur","Ça dépend"],0,"ET n'est vrai que si les <b>deux</b> sont vrais.");
Q("operateurs","VRAI OU FAUX = ?",["VRAI","FAUX","Erreur","Ça dépend"],0,"OU est vrai si <b>au moins un</b> est vrai.");
Q("operateurs","FAUX OU FAUX = ?",["FAUX","VRAI","Erreur","Ça dépend"],0,"OU n'est faux que si les deux sont faux.");
Q("operateurs","NON(FAUX) = ?",["VRAI","FAUX","Erreur","Rien"],0,"NON inverse : FAUX → VRAI.");
Q("operateurs","NON(VRAI ET FAUX) = ?",["VRAI","FAUX","Erreur","Indéfini"],0,"VRAI ET FAUX = FAUX, puis NON(FAUX) = VRAI.");
Q("operateurs","(VRAI OU FAUX) ET FAUX = ?",["FAUX","VRAI","Erreur","Indéfini"],0,"(VRAI) ET FAUX = FAUX.");
Q("operateurs","Avec ET, combien de FAUX suffit-il pour que le résultat soit FAUX ?",["Un seul","Deux","Aucun","Tous"],0,"Un seul FAUX rend toute la conjonction fausse.");
Q("operateurs","Dans la table de vérité, A OU B est FAUX quand…",["A et B sont FAUX","A est VRAI","B est VRAI","A et B sont VRAI"],0,"Seule ligne fausse du OU : FAUX / FAUX.");
Q("operateurs","Quel opérateur signifie « différent de » ?",["≠ (ou <>)","=","<=","MOD"],0,"≠ ou &lt;&gt;.");
Q("operateurs","5 >= 5 vaut…",["VRAI","FAUX","Erreur","5"],0,">= signifie supérieur <b>ou égal</b>.");
Q("operateurs","5 > 5 vaut…",["FAUX","VRAI","Erreur","0"],0,"> est <b>strictement</b> supérieur.");
VF("operateurs","Le résultat d'une comparaison est toujours un booléen.",true,"Une comparaison répond VRAI ou FAUX.");
VF("operateurs","x ← 5 et x = 5 signifient la même chose.",false,"← range 5 dans x ; = demande si x vaut 5.");
VF("operateurs","VRAI ET VRAI = VRAI",true,"Les deux sont vrais.");
VF("operateurs","FAUX ET VRAI = VRAI",false,"Un FAUX dans un ET → FAUX.");
VF("operateurs","n MOD 2 = 1 signifie que n est impair.",true,"Reste 1 → impair.");
VF("operateurs","MOD donne le quotient de la division entière.",false,"MOD donne le <b>reste</b> ; DIV donne le quotient.");

// ===================== CONDITIONS =====================
Q("conditions","À quoi sert une structure conditionnelle ?",["Prendre une décision selon qu'une condition est vraie ou fausse","Répéter des instructions","Stocker plusieurs valeurs","Déclarer une variable"],0,"Définition du cours.");
Q("conditions","Comment se termine un bloc Si ?",["FinSi","Fin","Stop","FinPour"],0,"Chaque Si se ferme par <b>FinSi</b>.");
Q("conditions","Dans un Si … Sinon … FinSi, combien de blocs sont exécutés ?",["Exactement un","Les deux","Aucun ou un","Toujours aucun"],0,"Soit le bloc Alors, soit le bloc Sinon : <b>jamais les deux</b>, jamais aucun.");
Q("conditions","Dans un Si … Alors … FinSi (sans Sinon), si la condition est fausse…",["On ne fait rien et on continue après FinSi","On exécute le bloc quand même","L'algorithme s'arrête","On recommence"],0,"Sans Sinon, rien n'est exécuté si la condition est fausse.");
Q("conditions","Avec Si … Sinon Si … Sinon, quel bloc est exécuté ?",["Celui de la première condition vraie","Celui de la dernière condition vraie","Tous ceux dont la condition est vraie","Toujours le Sinon"],0,"La <b>première condition vraie</b> détermine le bloc exécuté.");
Q("conditions","Que fait cet algorithme ?",["Il affiche le plus petit des deux nombres","Il affiche le plus grand","Il affiche la somme","Il affiche toujours a"],0,"Si a > b il affiche b (le plus petit), sinon a (le plus petit ou égal).","Lire a\nLire b\nSi a > b Alors\n   Afficher b\nSinon\n   Afficher a\nFinSi");
Q("conditions","Quelle est l'erreur dans cet algorithme ?",["La branche age >= 18 n'est jamais atteinte","Il manque FinSi","prix devrait être une chaîne","Il ne faut pas de Sinon"],0,"Un adulte satisfait déjà age >= 12. Il faut tester age >= 18 en premier.","Si age >= 12 Alors\n   prix ← 8\nSinon Si age >= 18 Alors\n   prix ← 15\nSinon\n   prix ← 5\nFinSi");
Q("conditions","Quel opérateur faut-il pour « l'âge est ≥ 18 ET la personne a une carte » ?",["ET","OU","NON","MOD"],0,"Les deux conditions doivent être vraies → ET.");
Q("conditions","« Tarif réduit si étudiant ou si moins de 26 ans ». Quel opérateur ?",["OU","ET","NON","="],0,"Une seule condition suffit → OU.");
Q("conditions","Comment tester que x est entre 10 et 20 inclus ?",["x >= 10 ET x <= 20","x >= 10 OU x <= 20","10 <= x <= 20","x > 10 ET x < 20"],0,"Deux comparaisons reliées par <b>ET</b>, avec >= et <= pour inclure les bornes.");
Q("conditions","Comment tester que x est EN DEHORS de [10 ; 20] ?",["x < 10 OU x > 20","x < 10 ET x > 20","x >= 10 ET x <= 20","NON(x = 15)"],0,"x < 10 ET x > 20 est impossible ! Il faut OU.");
Q("conditions","Qu'est-ce qu'une condition imbriquée ?",["Une condition placée à l'intérieur d'une autre condition","Une condition avec ET","Une condition sans Sinon","Une condition dans une boucle"],0,"Utile quand le 2ᵉ test dépend du résultat du 1ᵉʳ.");
Q("conditions","Que s'affiche-t-il si age = 15 et possede_carte = VRAI ?",["Accès interdit aux mineurs","Accès autorisé","Carte obligatoire","Rien"],0,"age >= 18 est faux → on va directement au Sinon extérieur.","Si age >= 18 Alors\n   Si possede_carte = VRAI Alors\n      Afficher \"Accès autorisé\"\n   Sinon\n      Afficher \"Carte obligatoire\"\n   FinSi\nSinon\n   Afficher \"Accès interdit aux mineurs\"\nFinSi");
Q("conditions","Avec le même code, que s'affiche-t-il si age = 25 et possede_carte = FAUX ?",["Carte obligatoire","Accès autorisé","Accès interdit aux mineurs","Rien"],0,"age >= 18 vrai, carte fausse → Sinon intérieur.","Si age >= 18 Alors\n   Si possede_carte = VRAI Alors\n      Afficher \"Accès autorisé\"\n   Sinon\n      Afficher \"Carte obligatoire\"\n   FinSi\nSinon\n   Afficher \"Accès interdit aux mineurs\"\nFinSi");
Q("conditions","note = 16. Qu'affiche ce code ?",["Très bien","Admis","Ajourné","Très bien puis Admis"],0,"16 >= 16 est VRAI (supérieur ou égal) → Très bien, et on s'arrête.","Si note >= 16 Alors\n   Afficher \"Très bien\"\nSinon Si note >= 10 Alors\n   Afficher \"Admis\"\nSinon\n   Afficher \"Ajourné\"\nFinSi");
Q("conditions","note = 9.5. Qu'affiche ce code ?",["Ajourné","Admis","Très bien","Rien"],0,"9.5 < 10 → toutes les conditions sont fausses → Sinon.","Si note >= 16 Alors\n   Afficher \"Très bien\"\nSinon Si note >= 10 Alors\n   Afficher \"Admis\"\nSinon\n   Afficher \"Ajourné\"\nFinSi");
Q("conditions","Si est_connecte vaut FAUX, que vaut NON(est_connecte) ?",["VRAI","FAUX","Erreur","Rien"],0,"NON inverse : FAUX → VRAI, donc le message « Veuillez vous connecter » s'affiche.");
Q("conditions","Gratuit < 6 ans, 5 € de 6 à 17, 10 € dès 18. Quelle condition pour la 2ᵉ branche (après Si age < 6) ?",["Sinon Si age < 18","Sinon Si age > 6","Sinon Si age >= 18","Sinon Si age = 17"],0,"Si on arrive là, age >= 6 est déjà garanti. Il reste à tester age < 18.");
Q("conditions","Que manque-t-il ?",["FinSi","Alors","Sinon","Fin"],0,"Chaque Si doit être fermé par FinSi.","Si x > 0 Alors\n   Afficher \"Positif\"\nSinon\n   Afficher \"Négatif ou nul\"");
VF("conditions","Dans un Si … Sinon, les deux blocs peuvent être exécutés.",false,"Un seul des deux chemins est pris.");
VF("conditions","Dans Si … Sinon Si, si la 1ʳᵉ condition est vraie, les suivantes ne sont pas testées.",true,"La première vraie gagne.");
VF("conditions","Le Sinon est obligatoire après un Si.",false,"Un Si peut exister seul.");
VF("conditions","Avec ET, les deux conditions doivent être vraies.",true,"Définition du ET.");
VF("conditions","Avec OU, les deux conditions doivent être vraies.",false,"Au moins une suffit.");
VF("conditions","Une condition imbriquée peut contenir son propre Sinon.",true,"Chaque Si imbriqué a son Sinon et son FinSi.");
VF("conditions","L'ordre des Sinon Si n'a aucune importance.",false,"Il faut aller du plus restrictif au moins restrictif, sinon des branches sont inatteignables.");
IN("conditions","Que s'affiche-t-il ?",["10"],"a = 4, b = 10 : a > b est faux → Sinon → Afficher b = 10.","a ← 4\nb ← 10\nSi a > b Alors\n   Afficher a\nSinon\n   Afficher b\nFinSi");
IN("conditions","Que vaut prix à la fin si age = 30 ?",["8"],"30 >= 12 est vrai → prix ← 8 (c'est l'erreur logique du cours !).","Si age >= 12 Alors\n   prix ← 8\nSinon Si age >= 18 Alors\n   prix ← 15\nSinon\n   prix ← 5\nFinSi");

// ===================== BOUCLES =====================
Q("boucles","Qu'est-ce qu'une boucle ?",["Une structure qui répète un bloc d'instructions","Une condition","Un type de variable","Une fonction"],0,"Définition du cours.");
Q("boucles","Quelles sont les 3 boucles principales ?",["POUR, TANT QUE, RÉPÉTER … JUSQU'À","SI, SINON, FINSI","POUR, SI, FONCTION","LIRE, AFFICHER, DÉCLARER"],0,"Les trois structures citées dans le cours.");
Q("boucles","Quelle boucle utiliser quand on connaît à l'avance le nombre de répétitions ?",["POUR","TANT QUE","RÉPÉTER … JUSQU'À","SI"],0,"POUR utilise un compteur pour un nombre déterminé de fois.");
Q("boucles","Dans « Pour i allant de 1 à 5 », que représente i ?",["Le compteur de boucle","Le résultat","Une constante","Le nombre total de tours"],0,"i est le <b>compteur</b>, il évolue à chaque itération.");
Q("boucles","Quand la condition d'un TANT QUE est-elle vérifiée ?",["Avant chaque itération","Après chaque itération","Une seule fois au début","Jamais"],0,"TantQue teste <b>avant</b> → peut faire 0 tour.");
Q("boucles","Quand la condition d'un RÉPÉTER … JUSQU'À est-elle vérifiée ?",["À la fin de chaque itération","Avant chaque itération","Une seule fois","Jamais"],0,"Test à la fin → au moins 1 exécution.");
Q("boucles","Quelle boucle s'exécute toujours au moins une fois ?",["RÉPÉTER … JUSQU'À","TANT QUE","POUR","Aucune"],0,"Le bloc est exécuté avant le premier test.");
Q("boucles","Si la condition d'un TANT QUE est fausse dès le départ…",["La boucle ne s'exécute jamais","La boucle s'exécute une fois","Boucle infinie","Erreur"],0,"Point « à retenir » du cours.");
Q("boucles","RÉPÉTER … JUSQU'À s'arrête quand la condition devient…",["VRAIE","FAUSSE","Égale à 0","Une chaîne"],0,"« Jusqu'à » : on répète jusqu'à ce que ce soit vrai. (TantQue, lui, continue tant que c'est vrai.)");
Q("boucles","Quel est le risque si on oublie i ← i + 1 dans un TANT QUE i <= 10 ?",["Une boucle infinie","Une erreur off-by-one","La boucle ne démarre pas","Rien"],0,"i reste à sa valeur initiale, la condition reste vraie pour toujours.");
Q("boucles","Quelle est l'erreur ?",["i n'est jamais incrémenté : boucle infinie","somme devrait commencer à 1","Il faut < au lieu de <=","Afficher est mal placé"],0,"Exercice « Trouvez l'erreur » du cours. Il manque i ← i + 1.","i ← 1\nsomme ← 0\nTantQue i <= 10 Faire\n   somme ← somme + i\nFinTantQue\nAfficher somme");
Q("boucles","Qu'est-ce que l'erreur « off-by-one » ?",["La boucle fait un tour de trop ou de moins","Une boucle infinie","Oublier FinPour","Utiliser une mauvaise variable"],0,"Erreur d'un élément, souvent < vs <= ou taille vs taille−1.");
Q("boucles","On veut afficher 1 à 10. Quel est le problème ?",["Off-by-one : s'arrête à 9","Boucle infinie","N'affiche rien","Affiche 0 à 10"],0,"i < 10 exclut 10. Il faut i <= 10.","i ← 1\nTantQue i < 10 Faire\n   Afficher i\n   i ← i + 1\nFinTantQue");
Q("boucles","Quel est le problème ?",["i augmente au lieu de diminuer : boucle infinie","Off-by-one","N'affiche rien","Aucun problème"],0,"Mauvaise modification de la variable de contrôle : on s'éloigne de la condition d'arrêt.","i ← 10\nTantQue i > 0 Faire\n   Afficher i\n   i ← i + 1\nFinTantQue");
Q("boucles","Quelle condition faut-il pour que ce Répéter tourne jusqu'à ce que x atteigne 10 ?",["Jusqu'à x >= 10","Jusqu'à x < 10","Jusqu'à x <= 10","Jusqu'à x ≠ 10"],0,"Répéter s'arrête quand la condition est VRAIE → condition d'arrêt x >= 10.","x ← 0\nRépéter\n   x ← x + 1\nJusqu'à ???");
Q("boucles","Quelle boucle est la plus adaptée pour redemander un code PIN tant qu'il est faux ?",["RÉPÉTER … JUSQU'À","POUR","SI … SINON","Aucune boucle"],0,"On doit demander au moins une fois, et on ne sait pas combien d'essais : exemple du cours.");
Q("boucles","TantQue x < 10 est équivalent à quelle condition d'arrêt avec Répéter ?",["Jusqu'à x >= 10","Jusqu'à x < 10","Jusqu'à x > 10","Jusqu'à x = 0"],0,"La condition d'arrêt est le contraire de la condition de continuation.");
Q("boucles","Que fait ce code ?",["Affiche les multiples de 3 de 3 à 30","Affiche les nombres de 1 à 30","Affiche les nombres impairs","Affiche 10 fois le chiffre 3"],0,"Seuls les i dont le reste par 3 vaut 0 sont affichés.","Pour i allant de 1 à 30 Faire\n   Si i MOD 3 = 0 Alors\n      Afficher i\n   FinSi\nFinPour");
Q("boucles","Pourquoi ne faut-il pas écrire i ← i + 1 dans une boucle POUR ?",["Le compteur évolue déjà automatiquement","C'est obligatoire","Ça rend la boucle plus rapide","Ça transforme la boucle en TantQue"],0,"Le POUR incrémente tout seul ; le modifier fausse le nombre de tours.");
IN("boucles","Combien de fois « Bonjour » est-il affiché ?",["5"],"De 1 à 5 inclus : 5 − 1 + 1 = 5 tours.","Pour i allant de 1 à 5 Faire\n   Afficher \"Bonjour\"\nFinPour");
IN("boucles","Combien de fois la boucle s'exécute-t-elle ?",["0"],"10 <= 5 est faux dès le départ → TantQue ne s'exécute jamais.","i ← 10\nTantQue i <= 5 Faire\n   Afficher i\n   i ← i + 1\nFinTantQue");
IN("boucles","Combien de fois « Salut » est-il affiché ?",["1"],"Répéter s'exécute une fois, puis x = 11 > 5 → condition vraie → arrêt.","x ← 10\nRépéter\n   Afficher \"Salut\"\n   x ← x + 1\nJusqu'à x > 5");
IN("boucles","Que vaut i à la sortie de la boucle ?",["6"],"La boucle sort quand i <= 5 devient faux, donc quand i = 6.","i ← 1\nTantQue i <= 5 Faire\n   i ← i + 1\nFinTantQue");
IN("boucles","Que vaut s à la fin ?",["15"],"1+2+3+4+5 = 15.","s ← 0\nPour i allant de 1 à 5 Faire\n   s ← s + i\nFinPour");
IN("boucles","Combien de nombres sont affichés ?",["25"],"Les pairs de 2 à 50 : 2, 4, …, 50 → 25 nombres.","i ← 2\nTantQue i <= 50 Faire\n   Afficher i\n   i ← i + 2\nFinTantQue");
VF("boucles","Une boucle TANT QUE peut ne jamais s'exécuter.",true,"Si la condition est fausse au départ.");
VF("boucles","Une boucle RÉPÉTER … JUSQU'À peut ne jamais s'exécuter.",false,"Elle s'exécute toujours au moins une fois.");
VF("boucles","Dans un POUR, on connaît généralement à l'avance le nombre de répétitions.",true,"Point « à retenir ».");
VF("boucles","Dans un TANT QUE, le compteur augmente automatiquement.",false,"C'est à toi de le faire évoluer, sinon boucle infinie.");
VF("boucles","Une boucle permet d'éviter de répéter les mêmes instructions manuellement.",true,"C'est le premier avantage cité.");
VF("boucles","Pour i allant de 0 à 4 fait 4 tours.",false,"0,1,2,3,4 → <b>5</b> tours.");

// ===================== CLASSIQUES =====================
Q("classiques","Qu'est-ce que la factorielle de N (N!) ?",["Le produit de tous les entiers de 1 à N","La somme des entiers de 1 à N","N × 2","Le plus grand diviseur de N"],0,"Définition du cours.");
Q("classiques","Que vaut 0! par convention ?",["1","0","Indéfini","-1"],0,"Par convention 0! = 1.");
Q("classiques","À quelle valeur initialiser la variable d'une factorielle ?",["1","0","N","-1"],0,"Pour un produit, on part de 1 (multiplier par 0 donnerait toujours 0).");
Q("classiques","À quelle valeur initialiser une variable somme ?",["0","1","N","Aucune"],0,"0 est l'élément neutre de l'addition.");
Q("classiques","Que signifie PGCD ?",["Plus Grand Commun Diviseur","Plus Grand Calcul Décimal","Petit Groupe de Calcul Divisible","Premier Grand Chiffre Divisible"],0,"Le plus grand entier positif qui divise deux nombres sans reste.");
Q("classiques","Quelle est l'erreur de ce calcul de factorielle ?",["fact devrait être initialisé à 1","La boucle doit commencer à 0","Il faut + au lieu de *","Aucune erreur"],0,"0 × n'importe quoi = 0. Il faut fact ← 1.","fact ← 0\nPour i allant de 1 à N Faire\n   fact ← fact * i\nFinPour");
Q("classiques","Dans l'algorithme d'Euclide, quand s'arrête-t-on ?",["Quand b vaut 0","Quand a vaut 0","Quand a = b","Après 10 tours"],0,"TantQue b ≠ 0 ; le PGCD est alors a.");
Q("classiques","Dans Euclide, à chaque tour (a, b) devient…",["(b, a MOD b)","(a MOD b, b)","(a - 1, b)","(a DIV b, b)"],0,"r ← a MOD b ; a ← b ; b ← r.");
Q("classiques","Deux nombres dont le PGCD vaut 1 sont dits…",["Premiers entre eux","Pairs","Égaux","Divisibles"],0,"Ex : 8 et 15.");
Q("classiques","Quelle formule donne 1 + 2 + … + N ?",["N × (N + 1) / 2","N × N","N! ","2 × N"],0,"Ex : N = 100 → 5050.");
IN("classiques","Que vaut 4! ?",["24"],"1 × 2 × 3 × 4 = 24.");
IN("classiques","Que vaut 6! ?",["720"],"5! = 120, × 6 = 720.");
IN("classiques","Que vaut PGCD(12, 18) ?",["6"],"6 divise 12 et 18 ; aucun plus grand.");
IN("classiques","Que vaut PGCD(17, 5) ?",["1"],"17 est premier et ne divise pas 5 → 1.");
IN("classiques","Que vaut 1 + 2 + … + 10 ?",["55"],"10 × 11 / 2 = 55.");
IN("classiques","Que vaut 1 + 2 + … + 100 ?",["5050"],"100 × 101 / 2 = 5050.");
VF("classiques","PGCD(a, a) = a",true,"a est le plus grand diviseur de lui-même.");
VF("classiques","La factorielle est une somme.",false,"C'est un <b>produit</b>.");
VF("classiques","Si b divise a, alors PGCD(a, b) = b.",true,"Ex : PGCD(20, 5) = 5.");
VF("classiques","L'algorithme d'Euclide utilise l'opérateur MOD.",true,"r ← a MOD b.");

// ===================== TABLEAUX =====================
Q("tableaux","Qu'est-ce qu'un tableau ?",["Une variable qui stocke plusieurs valeurs accessibles par leur position","Une variable booléenne","Une boucle","Une fonction"],0,"Définition du cours.");
Q("tableaux","À quel indice commence un tableau en programmation ?",["0","1","-1","Ça dépend de la taille"],0,"Les indices commencent à <b>0</b>.");
Q("tableaux","Notes ← [12, 15, 8, 17, 14]. Que vaut Notes[4] ?",["14","17","Erreur","8"],0,"Indices 0→12, 1→15, 2→8, 3→17, 4→14.");
Q("tableaux","Notes ← [12, 15, 8, 17, 14]. Que vaut Notes[5] ?",["Erreur : indice inexistant","14","0","12"],0,"Taille 5 → indices valides de 0 à 4.");
Q("tableaux","Pour un tableau de taille 5, les indices valides vont de…",["0 à 4","1 à 5","0 à 5","1 à 4"],0,"De 0 à taille − 1.");
Q("tableaux","Quelles bornes pour parcourir tout le tableau T ?",["Pour i allant de 0 à taille(T) - 1","Pour i allant de 1 à taille(T)","Pour i allant de 0 à taille(T)","Pour i allant de 1 à taille(T) - 1"],0,"Point « à retenir » du cours.");
Q("tableaux","Quel est le problème ?",["Off-by-one : T[taille(T)] n'existe pas","Boucle infinie","Il faut commencer à 1","Aucun"],0,"La dernière itération accède à un indice hors limites.","Pour i allant de 0 à taille(T) Faire\n   Afficher T[i]\nFinPour");
Q("tableaux","Comment initialiser maximum pour chercher le max de Notes ?",["maximum ← Notes[0]","maximum ← 0","maximum ← 100","maximum ← taille(Notes)"],0,"Avec 0, ça échoue si toutes les valeurs sont négatives.");
Q("tableaux","Dans la recherche du min/max, pourquoi la boucle commence-t-elle à 1 ?",["Notes[0] est déjà pris comme valeur de départ","Parce que les indices commencent à 1","Pour éviter une erreur","Par convention, sans raison"],0,"Comparer Notes[0] avec lui-même serait inutile.");
Q("tableaux","Que calcule ce code ?",["Le nombre de notes supérieures ou égales à 10","La moyenne","Le maximum","La somme des notes"],0,"compteur augmente de 1 pour chaque note ≥ 10 (les admis).","compteur ← 0\nPour i allant de 0 à taille(Notes) - 1\n   Si Notes[i] >= 10 Alors\n      compteur ← compteur + 1\n   FinSi\nFinPour");
Q("tableaux","Comment calcule-t-on la moyenne d'un tableau ?",["somme / taille(Notes)","somme / 2","somme * taille(Notes)","Notes[0] / taille(Notes)"],0,"Somme de tous les éléments divisée par leur nombre.");
Q("tableaux","Quelle est la complexité d'une recherche de valeur dans un tableau (non trié) ?",["O(n)","O(1)","O(n²)","O(0)"],0,"Tous les éléments peuvent devoir être examinés.");
Q("tableaux","Comment accéder au dernier élément de T ?",["T[taille(T) - 1]","T[taille(T)]","T[0]","T[-0]"],0,"Le dernier indice est taille − 1.");
Q("tableaux","T ← [3, 9, 4]. Après T[1] ← 7, que vaut T ?",["[3, 7, 4]","[7, 9, 4]","[3, 9, 7]","[3, 9, 4, 7]"],0,"T[1] est la 2ᵉ case.");
IN("tableaux","Notes ← [12, 15, 8, 17, 14]. Que vaut Notes[2] ?",["8"],"Indice 2 = 3ᵉ case = 8.");
IN("tableaux","Notes ← [12, 15, 8, 17, 14]. Quelle est la taille du tableau ?",["5"],"5 éléments.");
IN("tableaux","Notes ← [12, 15, 8, 17, 14]. Quelle est la moyenne ?",["13.2","13,2"],"(12+15+8+17+14) / 5 = 66 / 5 = 13.2.");
IN("tableaux","Notes ← [12, 15, 8, 17, 14]. Combien d'admis (≥ 10) ?",["4"],"Seul 8 est < 10.");
IN("tableaux","Que s'affiche-t-il ?",["30"],"T[0] + T[2] = 10 + 20 = 30.","T ← [10, 5, 20, 15]\nAfficher T[0] + T[2]");
VF("tableaux","Un tableau regroupe des valeurs de même nature.",true,"Point du cours.");
VF("tableaux","Accéder à un indice inexistant provoque une erreur.",true,"Pour une taille 5, T[5] → erreur.");
VF("tableaux","La taille d'un tableau correspond à son plus grand indice.",false,"Taille = nombre d'éléments = plus grand indice + 1.");
VF("tableaux","Pour parcourir un tableau, on utilise généralement une boucle.",true,"Typiquement une boucle POUR.");

// ===================== COMPLEXITÉ =====================
Q("complexite","Qu'est-ce que la complexité algorithmique ?",["La quantité de ressources consommées en fonction de la taille des données","La difficulté à comprendre un code","Le nombre de lignes d'un algorithme","Le nombre de variables"],0,"Ressources = temps, mémoire… en fonction de N.");
Q("complexite","Pourquoi compte-t-on le nombre d'opérations plutôt que le temps en secondes ?",["Le temps réel dépend de la machine","Les secondes sont trop longues à mesurer","Les opérations sont plus précises en secondes","C'est obligatoire en Python"],0,"Objectif : comparer sans dépendre d'un ordinateur précis.");
Q("complexite","Comment note-t-on la taille des données ?",["N","T","C","O"],0,"N, par exemple le nombre d'éléments d'un tableau.");
Q("complexite","Un algorithme qui parcourt une fois un tableau de N éléments est en…",["O(N)","O(1)","O(N²)","O(2)"],0,"Nombre d'opérations proportionnel à N.");
Q("complexite","Une double boucle imbriquée de 1 à N est en…",["O(N²)","O(N)","O(1)","O(2N)"],0,"N × N opérations.");
Q("complexite","Accéder à T[3] est en…",["O(1)","O(N)","O(N²)","O(3)"],0,"Temps constant, indépendant de la taille.");
Q("complexite","Deux boucles de 1 à N l'une APRÈS l'autre (non imbriquées) : complexité ?",["O(N)","O(N²)","O(1)","O(N³)"],0,"N + N = 2N → on garde O(N).");
Q("complexite","Si N double, combien de fois plus d'opérations pour un algo en O(N²) ?",["4 fois plus","2 fois plus","Autant","8 fois plus"],0,"(2N)² = 4N².");
Q("complexite","Si N double, combien de fois plus d'opérations pour un algo en O(N) ?",["2 fois plus","4 fois plus","Autant","N fois plus"],0,"Proportionnel.");
Q("complexite","Détection de doublons avec double boucle : complexité ?",["O(N²)","O(N)","O(1)","O(log N)"],0,"Version naïve du cours.");
Q("complexite","Détection de doublons avec un ensemble « vus » : complexité ?",["O(N)","O(N²)","O(1)","O(N³)"],0,"Un seul parcours : version intelligente.");
Q("complexite","Quel est le « prix » de la version intelligente des doublons ?",["Elle utilise plus de mémoire (l'ensemble vus)","Elle est plus lente","Elle donne parfois un mauvais résultat","Elle ne marche que sur des chaînes"],0,"On échange de la mémoire contre du temps.");
IN("complexite","Pour n = 4, combien de fois le corps d'une double boucle (1 à n, 1 à n) s'exécute-t-il ?",["16"],"4 × 4 = 16.");
IN("complexite","Pour n = 100, combien de fois le corps d'une double boucle (1 à n, 1 à n) s'exécute-t-il ?",["10000","10 000"],"100 × 100 = 10 000.");
IN("complexite","Combien de fois « X » est-il affiché ?",["15"],"3 × 5 = 15.","Pour i allant de 1 à 3 Faire\n   Pour j allant de 1 à 5 Faire\n      Afficher \"X\"\n   FinPour\nFinPour");
VF("complexite","Le temps d'exécution réel dépend aussi de la machine.",true,"Point du cours.");
VF("complexite","Un algorithme en O(N²) est plus rapide qu'un O(N) pour de grandes données.",false,"C'est l'inverse : O(N²) explose quand N grandit.");
VF("complexite","Une boucle simple sur un tableau de 100 éléments fait 100 itérations.",true,"Exemple du cours : O(N).");
VF("complexite","La complexité ne concerne que le temps, jamais la mémoire.",false,"Ressources = temps, mémoire…");

// ===================== FONCTIONS =====================
Q("fonctions","Qu'est-ce qu'une fonction ?",["Un bloc d'instructions réalisant une tâche précise, réutilisable","Une variable spéciale","Une boucle infinie","Un type de données"],0,"Définition du cours.");
Q("fonctions","Lequel N'EST PAS un composant d'une fonction selon le cours ?",["Une boucle obligatoire","Un nom","Des paramètres","Une valeur de retour"],0,"Composants : nom, paramètres, traitement, valeur de retour.");
Q("fonctions","Que sont les paramètres d'une fonction ?",["Les données reçues par la fonction","Le résultat renvoyé","Le nom de la fonction","Les variables globales"],0,"Ils permettent à la fonction de recevoir des données.");
Q("fonctions","Que fait l'instruction Retourner ?",["Transmet le résultat à l'appelant et termine la fonction","Affiche le résultat","Relance la fonction","Revient au début de la fonction"],0,"Le résultat est renvoyé au programme qui a appelé.");
Q("fonctions","Qu'est-ce qu'une procédure ?",["Une fonction sans valeur de retour","Une fonction qui retourne un entier","Une boucle","Une condition"],0,"Elle réalise une action sans transmettre de résultat.");
Q("fonctions","Que vaut somme ?",["8","53","5","Erreur"],0,"Additionner(5, 3) retourne 5 + 3 = 8.","Fonction Additionner(a, b) : entier\n   resultat ← a + b\n   Retourner resultat\nFinFonction\n\nsomme ← Additionner(5, 3)");
Q("fonctions","Quel est l'avantage de la modularité ?",["Corriger une partie sans modifier le reste","Rendre le code plus long","Éviter les variables","Supprimer les boucles"],0,"Exemple : corriger CalculerReduction() sans toucher au reste.");
Q("fonctions","Qu'est-ce que la modularité ?",["Diviser un problème complexe en plusieurs fonctions simples","Utiliser l'opérateur MOD","Écrire tout dans un seul algorithme","Utiliser des modules Python"],0,"Définition du cours.");
Q("fonctions","Quelle est la différence entre Afficher et Retourner ?",["Afficher montre à l'utilisateur, Retourner renvoie au programme","Aucune","Retourner affiche à l'écran","Afficher termine la fonction"],0,"Seul un résultat retourné peut être réutilisé dans un calcul.");
Q("fonctions","Quel en-tête est correct pour une fonction TTC ?",["Fonction CalculerTTC(prixHT : réel, taux : réel) : réel","Fonction CalculerTTC : réel","Procédure CalculerTTC(prixHT) : réel","CalculerTTC ← Fonction(prixHT, taux)"],0,"Nom, paramètres typés, type de retour.");
Q("fonctions","Que s'affiche-t-il ?",["Bienvenue Alice","Alice","Bienvenue nom","Rien"],0,"Le paramètre nom reçoit \"Alice\".","Procédure AfficherBienvenue(nom : chaîne)\n   Afficher \"Bienvenue \", nom\nFinProcédure\n\nAfficherBienvenue(\"Alice\")");
Q("fonctions","Une variable déclarée dans une fonction est…",["Locale : elle n'existe que dans la fonction","Globale : visible partout","Constante","Un paramètre"],0,"Elle disparaît à la fin de la fonction.");
Q("fonctions","Que se passe-t-il pour une instruction placée après Retourner (dans le même bloc) ?",["Elle n'est jamais exécutée","Elle est exécutée après","Elle est exécutée avant","Elle provoque une boucle"],0,"Retourner termine immédiatement la fonction.");
Q("fonctions","Panier : réduction de 10 % si le sous-total dépasse 100 €. Sous-total = 150 €. Réduction ?",["15 €","10 €","0 €","135 €"],0,"150 × 0.10 = 15 €.");
Q("fonctions","Panier : livraison 5 € si sous-total < 50 €, sinon gratuite. Sous-total = 50 €. Frais ?",["0 €","5 €","10 €","50 €"],0,"50 < 50 est FAUX → livraison gratuite.");
Q("fonctions","Laquelle N'EST PAS un avantage des fonctions cité dans le cours ?",["Rendre l'ordinateur plus rapide","Éviter de répéter les mêmes instructions","Décomposer un problème complexe","Faciliter les tests et la correction"],0,"Les 4 avantages : éviter la répétition, décomposer, lisibilité, tests/correction.");
IN("fonctions","Que s'affiche-t-il ?",["25"],"Carre(3) + Carre(4) = 9 + 16 = 25.","Fonction Carre(x) : entier\n   Retourner x * x\nFinFonction\n\nAfficher Carre(3) + Carre(4)");
IN("fonctions","Que vaut r ?",["120"],"CalculerTTC(100, 20) = 100 × 1.2 = 120.","Fonction CalculerTTC(ht, taux) : réel\n   Retourner ht * (1 + taux / 100)\nFinFonction\n\nr ← CalculerTTC(100, 20)");
IN("fonctions","Que vaut x ?",["11"],"Double(5) = 10, + 1 = 11.","Fonction Double(n) : entier\n   Retourner n * 2\nFinFonction\n\nx ← Double(5) + 1");
IN("fonctions","Panier : sous-total 120 €, réduction 10 % si > 100 €, livraison 5 € si < 50 €. Montant final ?",["108"],"120 − 12 + 0 = 108.");
IN("fonctions","Panier : sous-total 40 €. Réduction 10 % si > 100 €, livraison 5 € si < 50 €. Montant final ?",["45"],"40 − 0 + 5 = 45.");
VF("fonctions","Une fonction peut recevoir plusieurs paramètres.",true,"Ex : CalculerTTC(prixHT, taux).");
VF("fonctions","Une procédure retourne toujours une valeur.",false,"Une procédure n'a pas de valeur de retour.");
VF("fonctions","Une fonction peut être appelée plusieurs fois.",true,"C'est tout l'intérêt : la réutilisation.");
VF("fonctions","Une fonction peut appeler une autre fonction.",true,"Ex : SommeDesCarres appelle Carre.");
VF("fonctions","Une variable locale d'une fonction est accessible dans le programme principal.",false,"Elle n'existe que dans la fonction.");

// ===================== RÉCURSIVITÉ =====================
Q("recursivite","Qu'est-ce qu'un algorithme récursif ?",["Une fonction ou procédure qui s'appelle elle-même","Une boucle TantQue","Un tableau à deux dimensions","Une fonction sans paramètre"],0,"Définition du cours : une fonction ou une procédure qui <b>s'appelle elle-même</b> pour résoudre un problème.");
Q("recursivite","Quels sont les deux éléments obligatoires d'un algorithme récursif ?",["Un cas de base et un appel récursif","Une boucle et un tableau","Un compteur et un accumulateur","Un Lire et un Afficher"],0,"Le cas de base arrête les appels ; l'appel récursif traite un problème plus simple.");
Q("recursivite","À quoi sert le cas de base ?",["À arrêter les appels récursifs","À lancer la récursion","À afficher le résultat","À déclarer les variables"],0,"C'est la condition qui permet d'arrêter les appels récursifs.");
Q("recursivite","L'appel récursif doit porter sur…",["Un problème plus simple (plus petit)","Exactement le même problème","Un problème plus grand","Un tableau vide"],0,"Sinon on ne se rapproche jamais du cas de base.");
Q("recursivite","Que se passe-t-il si une fonction récursive n'a pas de cas de base ?",["Elle s'appelle à l'infini, jusqu'au plantage","Elle retourne 0","Elle s'exécute une seule fois","Rien de spécial"],0,"Récursion infinie : la mémoire des appels (la pile) déborde.");
Q("recursivite","Dans cette fonction, quel est le cas de base ?",["Si n <= 1 Alors Retourner 1","Retourner n * Factorielle(n - 1)","Fonction Factorielle(n)","FinFonction"],0,"C'est la branche qui retourne une valeur <b>sans</b> nouvel appel.","Fonction Factorielle(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * Factorielle(n - 1)\nFinFonction");
Q("recursivite","Quelle est l'erreur ?",["L'appel se fait sur n + 1 : on s'éloigne du cas de base","Il manque une boucle","Il faut retourner 0","Aucune erreur"],0,"Le problème doit devenir plus simple : il faut F(n - 1).","Fonction F(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * F(n + 1)\nFinFonction");
IN("recursivite","Que retourne Factorielle(4) ?",["24"],"4 × Factorielle(3) = 4 × 3 × 2 × 1 = 24.","Fonction Factorielle(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * Factorielle(n - 1)\nFinFonction");
IN("recursivite","Pour calculer Factorielle(5), combien d'appels à Factorielle sont faits au total (appel initial compris) ?",["5"],"F(5), F(4), F(3), F(2), F(1) : 5 appels. F(1) est le cas de base.","Fonction Factorielle(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * Factorielle(n - 1)\nFinFonction");
IN("recursivite","Que retourne S(4) ?",["10"],"S(4) = 4 + S(3) = 4 + 3 + 2 + 1 + S(0) = 10.","Fonction S(n : entier) : entier\n   Si n = 0 Alors\n      Retourner 0\n   FinSi\n   Retourner n + S(n - 1)\nFinFonction");
VF("recursivite","Toute fonction récursive doit avoir un cas de base.",true,"Sans lui, les appels ne s'arrêtent jamais.");
VF("recursivite","Un algorithme récursif ne peut pas s'écrire avec une boucle.",false,"La factorielle s'écrit aussi avec une boucle Pour (version itérative).");
VF("recursivite","Dans l'appel récursif, le problème doit devenir plus simple.",true,"Pour se rapprocher du cas de base.");
VF("recursivite","Une procédure peut être récursive.",true,"Le cours dit : « une fonction <b>ou une procédure</b> s'appelle elle-même ».");

// ===================== TRIS =====================
Q("tris","Quel est l'objectif d'un algorithme de tri ?",["Réorganiser les éléments d'un tableau dans un ordre donné","Supprimer les doublons","Chercher une valeur","Calculer la moyenne"],0,"Généralement l'ordre croissant ou décroissant.");
Q("tris","Que compare le tri à bulles ?",["Deux éléments voisins","Chaque élément avec le minimum","Le premier et le dernier élément","Les indices pairs et impairs"],0,"Il compare T[j] et T[j + 1] et les échange s'ils sont mal rangés.");
Q("tris","Que recherche le tri par sélection à chaque étape ?",["Le plus petit élément de la partie non triée","Deux voisins mal rangés","Le plus grand élément du tableau entier","La moyenne"],0,"Puis il l'échange avec le premier élément de la partie non triée.");
Q("tris","Tri à bulles (croissant) : où vont les plus grandes valeurs ?",["Elles remontent vers la fin du tableau","Elles vont au début","Elles restent en place","Au milieu"],0,"Comme des bulles qui remontent à la surface.");
Q("tris","Tri par sélection : quelles valeurs sont placées en premier ?",["Les plus petites, au début du tableau","Les plus grandes, à la fin","Les valeurs paires","Les valeurs du milieu"],0,"On place le minimum au début, puis le minimum du reste, etc.");
Q("tris","Quelle est la complexité du tri à bulles ?",["O(N²)","O(N)","O(1)","O(log N)"],0,"Deux boucles imbriquées.");
Q("tris","Quelle est la complexité du tri par sélection ?",["O(N²)","O(N)","O(1)","O(N³)"],0,"Deux boucles imbriquées, comme le tri à bulles.");
Q("tris","À quoi sert la variable Temp ?",["À échanger deux cases sans perdre une valeur","À compter les passages","À stocker le minimum","À mesurer la température"],0,"Sans Temp, T[j] ← T[j + 1] écraserait l'ancienne valeur de T[j].","Temp ← T[j]\nT[j] ← T[j + 1]\nT[j + 1] ← Temp");
Q("tris","Tri à bulles croissant : quand échange-t-on T[j] et T[j + 1] ?",["Si T[j] > T[j + 1]","Si T[j] < T[j + 1]","Si T[j] = T[j + 1]","Toujours"],0,"On échange quand le premier est plus grand que son voisin.");
Q("tris","T = [5, 1, 4, 2, 8]. Que devient T après le PREMIER passage du tri à bulles ?",["[1, 4, 2, 5, 8]","[1, 2, 4, 5, 8]","[1, 5, 4, 2, 8]","[5, 1, 4, 2, 8]"],0,"5 est échangé avec 1, puis 4, puis 2 ; 5 et 8 sont déjà dans l'ordre.");
Q("tris","T = [5, 1, 4, 2, 8]. Que devient T après la PREMIÈRE étape du tri par sélection ?",["[1, 5, 4, 2, 8]","[1, 4, 2, 5, 8]","[1, 2, 4, 5, 8]","[5, 1, 4, 2, 8]"],0,"Le minimum (1) est échangé avec le premier élément (5).");
Q("tris","Comment vérifier qu'un tableau est trié par ordre croissant ?",["Vérifier que T[i] <= T[i + 1] pour chaque i","Vérifier que T[0] est le plus petit","Vérifier que la somme est positive","Vérifier que la taille est paire"],0,"Si un seul couple de voisins est mal rangé, le tableau n'est pas trié.");
IN("tris","Tableau de 5 éléments : combien de comparaisons fait le tri à bulles du cours ?",["10"],"4 + 3 + 2 + 1 = 10, soit N(N − 1) / 2.");
VF("tris","Le tri à bulles compare les voisins, le tri par sélection recherche le minimum.",true,"C'est le « à retenir » du cours.");
VF("tris","Après le premier passage du tri à bulles, le plus grand élément est à la fin du tableau.",true,"Il est poussé de voisin en voisin jusqu'au bout.");
VF("tris","Le tri par sélection fait au plus N − 1 échanges.",true,"Un échange par tour de la boucle externe (i de 0 à N − 2).");

// ===================== AJOUTS (nouvelle version du cours) =====================
Q("conditions","Trois longueurs a, b, c forment un triangle si…",["Chaque côté est plus petit que la somme des deux autres","a = b = c","a + b + c > 0","Le plus grand côté est pair"],0,"Inégalité triangulaire : a < b + c ET b < a + c ET c < a + b.");
Q("conditions","Un triangle dont les trois côtés sont égaux est…",["Équilatéral","Isocèle","Quelconque","Rectangle"],0,"Trois côtés égaux : équilatéral.");
Q("conditions","Un triangle avec exactement deux côtés égaux est…",["Isocèle","Équilatéral","Quelconque","Impossible"],0,"Deux côtés égaux : isocèle.");
Q("conditions","Réduction : rien sous 100 €, 5 % de 100 à 199,99 €, 10 % dès 200 €. Achat de 150 € : réduction ?",["7,50 €","15 €","5 €","0 €"],0,"150 × 5 / 100 = 7,50 €.");
Q("conditions","Même barème. Achat de 200 € : réduction ?",["20 €","10 €","0 €","5 €"],0,"À partir de 200 € : 10 % de 200 = 20 €.");
VF("conditions","Le 29 février 2023 est une date valide.",false,"2023 n'est pas bissextile : février a 28 jours.");
VF("conditions","Le 31 avril est une date valide.",false,"Avril a 30 jours.");
Q("boucles","Quelle boucle est la plus adaptée pour redemander un mot de passe jusqu'à ce qu'il soit correct ?",["RÉPÉTER … JUSQU'À","POUR","SI … SINON","Aucune boucle"],0,"On demande au moins une fois et on ne sait pas combien d'essais il faudra.");
IN("boucles","L'utilisateur saisit 5, 3, 2 puis 0. Que s'affiche-t-il ?",["10"],"On additionne jusqu'au 0, qui n'est pas compté : 5 + 3 + 2 = 10.","somme ← 0\nLire n\nTantQue n ≠ 0 Faire\n   somme ← somme + n\n   Lire n\nFinTantQue\nAfficher somme");
IN("boucles","Combien de diviseurs a 12 ?",["6"],"1, 2, 3, 4, 6 et 12.");
Q("boucles","Pour inverser un nombre (test de palindrome), à quoi sert n MOD 10 ?",["À récupérer le dernier chiffre","À supprimer le dernier chiffre","À compter les chiffres","À tester la parité"],0,"1234 MOD 10 = 4. Et 1234 DIV 10 = 123 enlève le dernier chiffre.");
VF("boucles","1221 est un palindrome.",true,"Il se lit pareil dans les deux sens.");
Q("tableaux","Pour trouver le JOUR des meilleures ventes, il faut retenir…",["L'indice du maximum (+ 1 pour le numéro du jour)","Seulement la valeur maximale","La moyenne","La taille du tableau"],0,"Le jour 1 correspond à l'indice 0.");
IN("tableaux","P = [1, 0, 1, 1, 1] (1 = présent). Quel est le taux de présence en % ?",["80"],"4 présents sur 5 : 4 / 5 × 100 = 80 %.");
IN("tableaux","T = [4, 7, 4, 1, 4]. Combien d'occurrences de 4 ?",["3"],"Aux positions 0, 2 et 4.");

// ===================== GÉNÉRATEURS ALÉATOIRES =====================
const R = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const pick = a => a[Math.floor(Math.random()*a.length)];
const gcd = (a,b) => b ? gcd(b,a%b) : a;
const fact = n => n<=1 ? 1 : n*fact(n-1);
const near = (v, n=3) => { const s=new Set([String(v)]); let k=0; while(s.size<n+1 && k<50){k++; const d=v+pick([-2,-1,1,2,3,-3,10,-10]); if(d>=0||v<0) s.add(String(d));} return [...s]; };
const mkq = (c,q,code,ans,e,distr) => {
  if(distr){ const ch=[String(ans),...distr.filter(x=>String(x)!==String(ans))].slice(0,4); return {t:"qcm",c,q,code,ch,a:0,e,gen:1}; }
  return {t:"in",c,q,code,a:[String(ans)],e,gen:1};
};

const GENS = [
// variables
()=>{const a=R(1,9),b=R(1,9),c=R(2,5);const x=a+b,y=x*c;return mkq("variables","Que vaut y à la fin ?",`x ← ${a}\nx ← x + ${b}\ny ← x * ${c}`,y,`x = ${a} + ${b} = ${x}, puis y = ${x} × ${c} = <b>${y}</b>.`);},
()=>{const a=R(2,20),b=R(2,20);return mkq("variables","Que vaut a à la fin ?",`a ← ${a}\nb ← ${b}\ntemp ← a\na ← b\nb ← temp`,b,`temp garde ${a}, a reçoit b = <b>${b}</b>, b reçoit temp = ${a}. C'est un échange.`);},
()=>{const a=R(1,10),n=R(2,5);let x=a;for(let i=0;i<n;i++)x=x+2;return mkq("variables","Que vaut x à la fin ?",`x ← ${a}\n`+Array(n).fill("x ← x + 2").join("\n"),x,`On ajoute 2, ${n} fois : ${a} + ${2*n} = <b>${x}</b>.`);},
()=>{const v=pick([["42","Entier"],["-7","Entier"],["3.5","Réel"],["0.0","Réel"],["-12.75","Réel"],["\"Paris\"","Chaîne"],["\"2026\"","Chaîne"],["FAUX","Booléen"],["VRAI","Booléen"],["\"FAUX\"","Chaîne"],["100","Entier"],["9.99","Réel"]]);return {t:"qcm",c:"variables",q:`Quel est le type de la valeur ${v[0]} ?`,ch:[v[1],...["Entier","Réel","Booléen","Chaîne"].filter(x=>x!==v[1])],a:0,e:`${v[0]} → <b>${v[1]}</b>.`+(v[0].startsWith('"')?" Les guillemets en font une chaîne.":""),gen:1};},
// opérateurs
()=>{const a=R(10,60),b=R(2,9);return mkq("operateurs",`Combien vaut ${a} MOD ${b} ?`,null,a%b,`${a} = ${Math.floor(a/b)} × ${b} + <b>${a%b}</b>. MOD = reste.`);},
()=>{const a=R(10,60),b=R(2,9);return mkq("operateurs",`Combien vaut ${a} DIV ${b} ?`,null,Math.floor(a/b),`${a} = <b>${Math.floor(a/b)}</b> × ${b} + ${a%b}. DIV = quotient entier.`);},
()=>{const a=R(1,9),b=R(1,9),c=R(1,9);return mkq("operateurs",`Combien vaut ${a} + ${b} * ${c} ?`,null,a+b*c,`La multiplication est prioritaire : ${a} + ${b*c} = <b>${a+b*c}</b>.`,near(a+b*c).slice(1).concat([(a+b)*c]));},
()=>{const A=pick([true,false]),B=pick([true,false]),op=pick(["ET","OU"]);const r=op==="ET"?A&&B:A||B;const s=x=>x?"VRAI":"FAUX";return {t:"vf",c:"operateurs",q:`${s(A)} ${op} ${s(B)} = VRAI`,a:r,e:`${s(A)} ${op} ${s(B)} = <b>${s(r)}</b>. ${op==="ET"?"ET exige les deux vrais.":"OU exige au moins un vrai."}`,gen:1};},
()=>{const A=pick([true,false]),B=pick([true,false]);const r=!(A&&B);const s=x=>x?"VRAI":"FAUX";return {t:"qcm",c:"operateurs",q:`NON(${s(A)} ET ${s(B)}) = ?`,ch:[s(r),s(!r)],a:0,e:`${s(A)} ET ${s(B)} = ${s(A&&B)}, puis NON → <b>${s(r)}</b>.`,gen:1};},
()=>{const n=R(1,99);return {t:"qcm",c:"operateurs",q:`${n} MOD 2 = ${n%2}. Le nombre ${n} est donc…`,ch:[n%2?"Impair":"Pair",n%2?"Pair":"Impair"],a:0,e:`Reste ${n%2} → ${n%2?"impair":"pair"}.`,gen:1};},
// conditions
()=>{const a=R(1,30),b=R(1,30);return mkq("conditions","Que s'affiche-t-il ?",`a ← ${a}\nb ← ${b}\nSi a > b Alors\n   Afficher a\nSinon\n   Afficher b\nFinSi`,Math.max(a,b),`${a} > ${b} est ${a>b?"VRAI":"FAUX"} → on affiche <b>${Math.max(a,b)}</b> (le plus grand).`);},
()=>{const n=R(0,20);const r=n>=16?"Très bien":n>=14?"Bien":n>=12?"Assez bien":n>=10?"Admis":"Ajourné";return {t:"qcm",c:"conditions",q:`note = ${n}. Qu'affiche l'algorithme ?`,code:`Si note >= 16 Alors\n   Afficher "Très bien"\nSinon Si note >= 14 Alors\n   Afficher "Bien"\nSinon Si note >= 12 Alors\n   Afficher "Assez bien"\nSinon Si note >= 10 Alors\n   Afficher "Admis"\nSinon\n   Afficher "Ajourné"\nFinSi`,ch:[r,...["Très bien","Bien","Assez bien","Admis","Ajourné"].filter(x=>x!==r).sort(()=>Math.random()-.5).slice(0,3)],a:0,e:`La première condition vraie pour ${n} donne <b>${r}</b>.`,gen:1};},
()=>{const age=R(1,70);const p=age<6?0:age<18?5:10;return mkq("conditions",`age = ${age}. Que vaut prix ?`,`Si age < 6 Alors\n   prix ← 0\nSinon Si age < 18 Alors\n   prix ← 5\nSinon\n   prix ← 10\nFinSi`,p,`Pour ${age} ans : ${age<6?"moins de 6 ans":age<18?"entre 6 et 17 ans":"18 ans ou plus"} → <b>${p} €</b>.`,["0","5","10","15"].filter(x=>x!=p));},
()=>{const x=R(0,30),a=R(5,12),b=R(14,22);const r=x>=a&&x<=b;return {t:"vf",c:"conditions",q:`x = ${x}. La condition « x >= ${a} ET x <= ${b} » est vraie.`,a:r,e:`${x} >= ${a} : ${x>=a?"VRAI":"FAUX"} ; ${x} <= ${b} : ${x<=b?"VRAI":"FAUX"} → ET = <b>${r?"VRAI":"FAUX"}</b>.`,gen:1};},
()=>{const age=R(10,40),et=pick([true,false]);const r=et||age<26;return {t:"vf",c:"conditions",q:`age = ${age}, est_etudiant = ${et?"VRAI":"FAUX"}. « Tarif réduit » s'affiche.`,code:`Si est_etudiant = VRAI OU age < 26 Alors\n   Afficher "Tarif réduit"\nFinSi`,a:r,e:`est_etudiant = ${et?"VRAI":"FAUX"}, age < 26 = ${age<26?"VRAI":"FAUX"} → OU = <b>${r?"VRAI":"FAUX"}</b>.`,gen:1};},
()=>{const age=R(10,30),c=pick([true,false]);const r=age>=18?(c?"Accès autorisé":"Carte obligatoire"):"Accès interdit aux mineurs";return {t:"qcm",c:"conditions",q:`age = ${age}, possede_carte = ${c?"VRAI":"FAUX"}. Qu'est-ce qui s'affiche ?`,code:`Si age >= 18 Alors\n   Si possede_carte = VRAI Alors\n      Afficher "Accès autorisé"\n   Sinon\n      Afficher "Carte obligatoire"\n   FinSi\nSinon\n   Afficher "Accès interdit aux mineurs"\nFinSi`,ch:[r,...["Accès autorisé","Carte obligatoire","Accès interdit aux mineurs"].filter(x=>x!==r)],a:0,e:`age >= 18 : ${age>=18?"VRAI":"FAUX"}.`+(age>=18?` Carte : ${c?"VRAI":"FAUX"}.`:"")+` → <b>${r}</b>.`,gen:1};},
// boucles
()=>{const a=R(0,5),b=R(a+2,a+12);return mkq("boucles","Combien de fois « Hello » est-il affiché ?",`Pour i allant de ${a} à ${b} Faire\n   Afficher "Hello"\nFinPour`,b-a+1,`De ${a} à ${b} inclus : ${b} − ${a} + 1 = <b>${b-a+1}</b> tours.`);},
()=>{const n=R(3,10);let s=0;for(let i=1;i<=n;i++)s+=i;return mkq("boucles","Que vaut s à la fin ?",`s ← 0\nPour i allant de 1 à ${n} Faire\n   s ← s + i\nFinPour`,s,`1 + 2 + … + ${n} = ${n}×${n+1}/2 = <b>${s}</b>.`);},
()=>{const a=R(1,5),b=R(a+3,a+10),st=pick([1,2,3]);let i=a,c=0;while(i<=b){c++;i+=st;}return mkq("boucles","Que vaut i à la sortie de la boucle ?",`i ← ${a}\nTantQue i <= ${b} Faire\n   i ← i + ${st}\nFinTantQue`,i,`i prend les valeurs ${Array.from({length:c+1},(_,k)=>a+k*st).join(", ")}. La boucle s'arrête quand i > ${b}, donc i = <b>${i}</b>.`);},
()=>{const a=R(5,20),b=R(1,a-1);return mkq("boucles","Combien de fois la boucle s'exécute-t-elle ?",`i ← ${a}\nTantQue i <= ${b} Faire\n   Afficher i\n   i ← i + 1\nFinTantQue`,0,`${a} <= ${b} est FAUX dès le départ → TantQue ne s'exécute <b>jamais</b> (0 fois).`);},
()=>{const a=R(5,20),b=R(1,a-1);return mkq("boucles","Combien de fois « Go » est-il affiché ?",`x ← ${a}\nRépéter\n   Afficher "Go"\n   x ← x + 1\nJusqu'à x > ${b}`,1,`Répéter s'exécute au moins une fois. Après, x = ${a+1} > ${b} → VRAI → arrêt. Donc <b>1</b> fois.`);},
()=>{const n=R(2,6),m=R(2,6);return mkq("boucles","Combien de fois « * » est-il affiché ?",`Pour i allant de 1 à ${n} Faire\n   Pour j allant de 1 à ${m} Faire\n      Afficher "*"\n   FinPour\nFinPour`,n*m,`${n} × ${m} = <b>${n*m}</b>.`);},
()=>{const k=pick([2,3,4,5]),lim=R(15,40);const c=Math.floor(lim/k);return mkq("boucles",`Combien de nombres sont affichés ?`,`Pour i allant de 1 à ${lim} Faire\n   Si i MOD ${k} = 0 Alors\n      Afficher i\n   FinSi\nFinPour`,c,`Multiples de ${k} entre 1 et ${lim} : ${k}, ${2*k}, …, ${c*k} → <b>${c}</b> nombres.`);},
()=>{const n=R(3,6);const out=Array.from({length:n},(_,k)=>n-k).join(" ");return {t:"qcm",c:"boucles",q:"Qu'affiche ce code ?",code:`i ← ${n}\nTantQue i > 0 Faire\n   Afficher i\n   i ← i - 1\nFinTantQue`,ch:[out,Array.from({length:n},(_,k)=>k+1).join(" "),Array.from({length:n+1},(_,k)=>n-k).join(" "),Array.from({length:n-1},(_,k)=>n-k).join(" ")],a:0,e:`On part de ${n}, on descend jusqu'à 1 (i > 0) : <b>${out}</b>.`,gen:1};},
// classiques
()=>{const n=R(2,7);return mkq("classiques",`Combien vaut ${n}! ?`,null,fact(n),`${n}! = ${Array.from({length:n},(_,k)=>k+1).join(" × ")} = <b>${fact(n)}</b>.`);},
()=>{const g=R(2,9),a=g*R(2,9),b=g*R(2,9);const r=gcd(a,b);return mkq("classiques",`Combien vaut PGCD(${a}, ${b}) ?`,null,r,`Par Euclide ou en cherchant le plus grand diviseur commun : <b>${r}</b>.`);},
()=>{const a=R(20,80),b=R(5,a-1);let x=a,y=b,t=0;while(y){const r=x%y;x=y;y=r;t++;}return mkq("classiques","Combien de tours fait la boucle TantQue ?",`a ← ${a}\nb ← ${b}\nTantQue b ≠ 0 Faire\n   r ← a MOD b\n   a ← b\n   b ← r\nFinTantQue`,t,`On répète (a,b) → (b, a MOD b) jusqu'à b = 0 : <b>${t}</b> tour(s), PGCD = ${x}.`);},
()=>{const n=R(3,6);const p=fact(n);return mkq("classiques","Que vaut f à la fin ?",`f ← 1\nPour i allant de 1 à ${n} Faire\n   f ← f * i\nFinPour`,p,`f = ${n}! = <b>${p}</b>.`);},
()=>{const n=R(10,100);return mkq("classiques",`Combien vaut 1 + 2 + … + ${n} ?`,null,n*(n+1)/2,`Formule N(N+1)/2 = ${n}×${n+1}/2 = <b>${n*(n+1)/2}</b>.`);},
// tableaux
()=>{const T=Array.from({length:R(4,7)},()=>R(1,20));const i=R(0,T.length-1);return mkq("tableaux",`T ← [${T.join(", ")}]. Que vaut T[${i}] ?`,null,T[i],`Les indices commencent à 0 : T[${i}] est la ${i+1}ᵉ case → <b>${T[i]}</b>.`);},
()=>{const T=Array.from({length:R(4,7)},()=>R(1,20));return mkq("tableaux",`T ← [${T.join(", ")}]. Quel est l'indice du dernier élément ?`,null,T.length-1,`Taille ${T.length} → dernier indice = ${T.length} − 1 = <b>${T.length-1}</b>.`);},
()=>{const T=Array.from({length:R(4,6)},()=>R(0,20));const s=T.reduce((a,b)=>a+b,0);return mkq("tableaux","Que vaut somme à la fin ?",`T ← [${T.join(", ")}]\nsomme ← 0\nPour i allant de 0 à taille(T) - 1\n   somme ← somme + T[i]\nFinPour`,s,`${T.join(" + ")} = <b>${s}</b>.`);},
()=>{const T=Array.from({length:R(4,7)},()=>R(-10,25));const m=Math.max(...T);return mkq("tableaux","Que s'affiche-t-il ?",`T ← [${T.join(", ")}]\nmaximum ← T[0]\nPour i allant de 1 à taille(T) - 1\n   Si T[i] > maximum Alors\n      maximum ← T[i]\n   FinSi\nFinPour\nAfficher maximum`,m,`Le plus grand élément est <b>${m}</b>.`);},
()=>{const T=Array.from({length:R(4,7)},()=>R(-10,25));const m=Math.min(...T);return mkq("tableaux","Que s'affiche-t-il ?",`T ← [${T.join(", ")}]\nminimum ← T[0]\nPour i allant de 1 à taille(T) - 1\n   Si T[i] < minimum Alors\n      minimum ← T[i]\n   FinSi\nFinPour\nAfficher minimum`,m,`Le plus petit élément est <b>${m}</b>.`);},
()=>{const T=Array.from({length:R(5,8)},()=>R(2,20));const c=T.filter(x=>x>=10).length;return mkq("tableaux","Que vaut compteur ?",`Notes ← [${T.join(", ")}]\ncompteur ← 0\nPour i allant de 0 à taille(Notes) - 1\n   Si Notes[i] >= 10 Alors\n      compteur ← compteur + 1\n   FinSi\nFinPour`,c,`Notes ≥ 10 : ${T.filter(x=>x>=10).join(", ")||"aucune"} → <b>${c}</b>.`);},
()=>{const n=R(3,9);return {t:"qcm",c:"tableaux",q:`Un tableau a ${n} éléments. Quels sont les indices valides ?`,ch:[`0 à ${n-1}`,`1 à ${n}`,`0 à ${n}`,`1 à ${n-1}`],a:0,e:`De 0 à taille − 1 = <b>0 à ${n-1}</b>.`,gen:1};},
// complexité
()=>{const n=pick([5,10,20,50,1000]);return mkq("complexite",`Une double boucle (i de 1 à n, j de 1 à n) avec n = ${n} : combien d'exécutions du corps ?`,null,n*n,`${n} × ${n} = <b>${n*n}</b>. C'est du O(N²).`);},
()=>{const k=pick(["une seule boucle sur le tableau","deux boucles imbriquées sur le tableau","un accès direct à T[0]","deux boucles successives (non imbriquées)"]);const m={"une seule boucle sur le tableau":"O(N)","deux boucles imbriquées sur le tableau":"O(N²)","un accès direct à T[0]":"O(1)","deux boucles successives (non imbriquées)":"O(N)"};return {t:"qcm",c:"complexite",q:`Quelle est la complexité de : ${k} ?`,ch:[m[k],...["O(1)","O(N)","O(N²)"].filter(x=>x!==m[k])],a:0,e:`${k} → <b>${m[k]}</b>.`,gen:1};},
// fonctions
()=>{const a=R(1,20),b=R(1,20);return mkq("fonctions","Que vaut s ?",`Fonction Additionner(a, b) : entier\n   Retourner a + b\nFinFonction\n\ns ← Additionner(${a}, ${b})`,a+b,`a reçoit ${a}, b reçoit ${b} → retourne <b>${a+b}</b>.`);},
()=>{const x=R(2,9),y=R(1,10);return mkq("fonctions","Que s'affiche-t-il ?",`Fonction Carre(n) : entier\n   Retourner n * n\nFinFonction\n\nAfficher Carre(${x}) + ${y}`,x*x+y,`Carre(${x}) = ${x*x}, + ${y} = <b>${x*x+y}</b>.`);},
()=>{const a=R(1,30),b=R(1,30);return mkq("fonctions","Que vaut m ?",`Fonction Max(a, b) : entier\n   Si a > b Alors\n      Retourner a\n   Sinon\n      Retourner b\n   FinSi\nFinFonction\n\nm ← Max(${a}, ${b})`,Math.max(a,b),`Max retourne le plus grand : <b>${Math.max(a,b)}</b>.`);},
()=>{const ht=pick([10,20,50,80,100,200]),t=pick([10,20]);const r=ht*(1+t/100);return mkq("fonctions",`Prix HT = ${ht} €, TVA = ${t} %. Que retourne CalculerTTC ?`,`Fonction CalculerTTC(ht, taux) : réel\n   Retourner ht * (1 + taux / 100)\nFinFonction`,r,`${ht} × ${1+t/100} = <b>${r}</b>.`);},
()=>{const st=pick([30,45,60,80,100,120,150,200]);const red=st>100?st*0.1:0,liv=st<50?5:0,m=+(st-red+liv).toFixed(2);return mkq("fonctions",`Panier : sous-total = ${st} €. Réduction 10 % si > 100 €, livraison 5 € si < 50 €. Montant final ?`,null,m,`Réduction : ${red} € ; livraison : ${liv} € → ${st} − ${red} + ${liv} = <b>${m} €</b>.`);},
()=>{const n=R(1,30);return {t:"vf",c:"fonctions",q:`EstPair(${n}) retourne VRAI.`,code:`Fonction EstPair(n : entier) : booléen\n   Retourner n MOD 2 = 0\nFinFonction`,a:n%2===0,e:`${n} MOD 2 = ${n%2} → <b>${n%2===0?"VRAI":"FAUX"}</b>.`,gen:1};},
];

// ===================== GÉNÉRATEURS (nouvelle version du cours) =====================
const uniq = (ans, others) => { const s=[String(ans)]; for(const x of others){ const v=String(x); if(!s.includes(v)) s.push(v); } return s.slice(0,4); };
const fa = a => "[" + a.join(", ") + "]";
const bubblePass = a => { a=[...a]; for(let j=0;j<a.length-1;j++) if(a[j]>a[j+1]) [a[j],a[j+1]]=[a[j+1],a[j]]; return a; };
const selStep = a => { a=[...a]; let m=0; for(let j=1;j<a.length;j++) if(a[j]<a[m]) m=j; [a[0],a[m]]=[a[m],a[0]]; return a; };
const randArr = n => { const s=new Set(); while(s.size<n) s.add(R(1,30)); return [...s]; };
const shuffleArr = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const unsortedArr = n => { let a; do { a=shuffleArr(randArr(n)); } while(a.every((v,i)=>!i||a[i-1]<v)); return a; };
GENS.push(
()=>{ const T=unsortedArr(5), p=bubblePass(T); return {t:"qcm",c:"tris",q:`T = ${fa(T)}. Que devient T après le PREMIER passage du tri à bulles ?`,ch:uniq(fa(p),[fa([...T].sort((x,y)=>x-y)),fa(T),fa(selStep(T)),fa(bubblePass(p))]),a:0,e:`On compare chaque paire de voisins de gauche à droite et on échange si le premier est plus grand : <b>${fa(p)}</b>. Le maximum (${Math.max(...T)}) est arrivé à la fin.`,gen:1}; },
()=>{ const T=unsortedArr(5), s=selStep(T); return {t:"qcm",c:"tris",q:`T = ${fa(T)}. Que devient T après la PREMIÈRE étape du tri par sélection ?`,ch:uniq(fa(s),[fa(bubblePass(T)),fa([...T].sort((x,y)=>x-y)),fa(T)]),a:0,e:`Le minimum (${Math.min(...T)}) est échangé avec le premier élément : <b>${fa(s)}</b>.`,gen:1}; },
()=>{ const n=R(3,9); return mkq("tris",`Combien de comparaisons fait le tri à bulles du cours sur un tableau de ${n} éléments ?`,null,n*(n-1)/2,`(${n}−1) + (${n}−2) + … + 1 = ${n}×${n-1}/2 = <b>${n*(n-1)/2}</b>.`); },
()=>{ let T=randArr(5); if(Math.random()<.4) T.sort((x,y)=>x-y); const ok=T.every((v,i)=>i===0||T[i-1]<=v); return {t:"vf",c:"tris",q:`Le tableau ${fa(T)} est trié par ordre croissant.`,a:ok,e:ok?"Chaque élément est inférieur ou égal à son voisin de droite.":`Au moins un couple de voisins est mal rangé (${T.find((v,i)=>i<T.length-1&&v>T[i+1])} est plus grand que son voisin de droite).`,gen:1}; },
()=>{ const n=R(2,7); return mkq("recursivite","Que retourne Factorielle("+n+") ?","Fonction Factorielle(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * Factorielle(n - 1)\nFinFonction",fact(n),`${n}! = ${Array.from({length:n},(_,k)=>n-k).join(" × ")} = <b>${fact(n)}</b>.`); },
()=>{ const n=R(2,8); return mkq("recursivite",`Pour calculer Factorielle(${n}), combien d'appels à Factorielle sont faits au total ?`,"Fonction Factorielle(n : entier) : entier\n   Si n <= 1 Alors\n      Retourner 1\n   FinSi\n   Retourner n * Factorielle(n - 1)\nFinFonction",n,`F(${n}), F(${n-1}), …, F(1) : <b>${n}</b> appels ; F(1) est le cas de base.`); },
()=>{ const n=R(3,10); return mkq("recursivite","Que retourne S("+n+") ?","Fonction S(n : entier) : entier\n   Si n = 0 Alors\n      Retourner 0\n   FinSi\n   Retourner n + S(n - 1)\nFinFonction",n*(n+1)/2,`S(${n}) = ${n} + ${n-1} + … + 1 + 0 = <b>${n*(n+1)/2}</b>.`); },
()=>{ const x=R(2,5), n=R(0,5); return mkq("recursivite",`Que retourne P(${x}, ${n}) ?`,"Fonction P(x, n : entier) : entier\n   Si n = 0 Alors\n      Retourner 1\n   FinSi\n   Retourner x * P(x, n - 1)\nFinFonction",x**n,n?`${x} multiplié ${n} fois par lui-même = <b>${x**n}</b>.`:"n = 0 : cas de base, on retourne <b>1</b>."); },
()=>{ const a=R(1,12),b=R(1,12),c=R(1,12); const ok=a<b+c&&b<a+c&&c<a+b; return {t:"vf",c:"conditions",q:`Les longueurs ${a}, ${b} et ${c} peuvent former un triangle.`,a:ok,e:`${a} < ${b+c} : ${a<b+c?"VRAI":"FAUX"} ; ${b} < ${a+c} : ${b<a+c?"VRAI":"FAUX"} ; ${c} < ${a+b} : ${c<a+b?"VRAI":"FAUX"} → <b>${ok?"VRAI":"FAUX"}</b>.`,gen:1}; },
()=>{ const k=R(0,2), v=R(3,9); const s = k===0?[v,v,v] : k===1?shuffleArr([v,v,v+R(1,3)]) : [v,v+1,v+2+R(0,2)];
  const t=s[0]===s[1]&&s[1]===s[2]?"Équilatéral":(s[0]===s[1]||s[1]===s[2]||s[0]===s[2])?"Isocèle":"Quelconque";
  return {t:"qcm",c:"conditions",q:`Un triangle a pour côtés ${s.join(", ")}. Il est…`,ch:uniq(t,["Équilatéral","Isocèle","Quelconque"]),a:0,e:t==="Équilatéral"?"Trois côtés égaux.":t==="Isocèle"?"Exactement deux côtés égaux.":"Aucun côté égal.",gen:1}; },
()=>{ const m=pick([40,80,99,100,120,150,180,199,200,250,320,500]); const r=+(m<100?0:m<200?m*0.05:m*0.1).toFixed(2); return mkq("conditions",`Réduction : rien sous 100 €, 5 % de 100 à 199,99 €, 10 % dès 200 €. Réduction pour un achat de ${m} € ?`,null,r,m<100?"Moins de 100 € : <b>0 €</b>.":`${m} × ${m<200?5:10} / 100 = <b>${r} €</b>.`); },
()=>{ const n=R(6,40); const d=[]; for(let k=1;k<=n;k++) if(n%k===0) d.push(k); return mkq("boucles",`Combien de diviseurs a ${n} ?`,null,d.length,`Diviseurs de ${n} : ${d.join(", ")} → <b>${d.length}</b>.`); },
()=>{ const L=Array.from({length:R(2,5)},()=>R(1,15)), s=L.reduce((x,y)=>x+y,0); return mkq("boucles","L'utilisateur saisit "+L.join(", ")+" puis 0. Que s'affiche-t-il ?","somme ← 0\nLire n\nTantQue n ≠ 0 Faire\n   somme ← somme + n\n   Lire n\nFinTantQue\nAfficher somme",s,`${L.join(" + ")} = <b>${s}</b> (le 0 arrête la boucle sans être compté).`); },
()=>{ const T=Array.from({length:R(5,8)},()=>R(1,5)), x=R(1,5); const pos=T.map((v,i)=>v===x?i:-1).filter(i=>i>=0); return mkq("tableaux",`T = ${fa(T)}. Combien d'occurrences de ${x} ?`,null,pos.length,pos.length?`${x} apparaît aux positions ${pos.join(", ")} → <b>${pos.length}</b>.`:`${x} n'apparaît pas → <b>0</b>.`); },
);
