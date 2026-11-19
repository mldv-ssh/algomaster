// ================== ATELIER : EXERCICES CORRIGÉS AUTOMATIQUEMENT ==================
// tests : {in:[entrées Lire], out:[lignes attendues]} | {vars:{T:[..]}, out:[..]} | {call:"F(…)", ret:valeur} | {call:"P(…)", out:[..]}
// Une ligne attendue numérique est comparée au DERNIER nombre de la ligne affichée (« Moyenne : 14 » valide 14).
// must : construction obligatoire ("boucle" | "si" | "fonction")
const D0 = "Début\n   \nFin";
const EXOS = [
// ---------------------------------------------------------------- INTRO / VARIABLES
{id:"moy2",cat:"intro",d:1,t:"Moyenne de deux nombres",
 q:"Lire deux nombres A et B, puis afficher leur moyenne. (C'est l'algorithme Calculer_Moyenne du cours.)",
 h:["Lis A puis B avec deux instructions Lire.","Attention aux parenthèses : (A + B) / 2, pas A + B / 2."],
 start:D0, tests:[{in:[12,16],out:[14]},{in:[10,15],out:[12.5]},{in:[0,0],out:[0]}],
 s:`Début
   Lire A
   Lire B
   Moyenne ← (A + B) / 2
   Afficher Moyenne
Fin`},
{id:"echange",cat:"variables",d:1,t:"Échanger deux variables",
 q:"Lire a puis b. Échanger leurs valeurs (a doit contenir l'ancienne valeur de b et inversement), puis afficher a, puis afficher b (deux lignes).",
 h:["Si tu fais a ← b directement, l'ancienne valeur de a est perdue.","Utilise une troisième variable temp pour garder a de côté."],
 start:D0, tests:[{in:[3,7],out:[7,3]},{in:[1,2],out:[2,1]},{in:[5,5],out:[5,5]}],
 s:`Début
   Lire a
   Lire b
   temp ← a
   a ← b
   b ← temp
   Afficher a
   Afficher b
Fin`},
{id:"ttc0",cat:"variables",d:1,t:"Prix TTC simple",
 q:"Lire un prix hors taxe (HT) et afficher le prix TTC avec une TVA de 20 %.",
 h:["TTC = HT × 1.2 (ou HT + HT × 20 / 100)."],
 start:D0, tests:[{in:[100],out:[120]},{in:[50],out:[60]},{in:[9.5],out:[11.4]}],
 s:`Début
   Lire ht
   ttc ← ht * 1.2
   Afficher ttc
Fin`},
// ---------------------------------------------------------------- CONDITIONS
{id:"majeur",cat:"conditions",d:1,t:"Majeur ou mineur",must:"si",
 q:'Lire un âge et afficher "Majeur" si l\'âge est supérieur ou égal à 18, sinon "Mineur".',
 h:["Une structure Si … Alors … Sinon … FinSi suffit.","Attention : 18 ans est majeur → utilise >= et pas >."],
 start:D0, tests:[{in:[20],out:["Majeur"]},{in:[18],out:["Majeur"]},{in:[15],out:["Mineur"]}],
 s:`Début
   Lire age
   Si age >= 18 Alors
      Afficher "Majeur"
   Sinon
      Afficher "Mineur"
   FinSi
Fin`},
{id:"posneg",cat:"conditions",d:1,t:"Positif, négatif ou nul",must:"si",
 q:'Lire un nombre et afficher "Positif", "Négatif" ou "Nul".',
 h:["Il y a 3 cas : utilise Si … Sinon Si … Sinon.","Teste > 0, puis < 0 ; le dernier cas (Sinon) est forcément 0."],
 start:D0, tests:[{in:[5],out:["Positif"]},{in:[-3],out:["Négatif"]},{in:[0],out:["Nul"]}],
 s:`Début
   Lire n
   Si n > 0 Alors
      Afficher "Positif"
   Sinon Si n < 0 Alors
      Afficher "Négatif"
   Sinon
      Afficher "Nul"
   FinSi
Fin`},
{id:"pair",cat:"conditions",d:1,t:"Pair ou impair",must:"si",
 q:'Lire un nombre entier et afficher "Pair" ou "Impair".',
 h:["Le reste de la division par 2 s'obtient avec MOD.","Un nombre est pair si nombre MOD 2 = 0."],
 start:D0, tests:[{in:[4],out:["Pair"]},{in:[7],out:["Impair"]},{in:[0],out:["Pair"]}],
 s:`Début
   Lire nombre
   Si nombre MOD 2 = 0 Alors
      Afficher "Pair"
   Sinon
      Afficher "Impair"
   FinSi
Fin`},
{id:"max2",cat:"conditions",d:1,t:"Le plus grand de deux nombres",must:"si",
 q:"Lire deux nombres et afficher le plus grand (si égaux, afficher cette valeur).",
 h:["Compare a et b avec >."],
 start:D0, tests:[{in:[3,8],out:[8]},{in:[9,2],out:[9]},{in:[5,5],out:[5]},{in:[-4,-1],out:[-1]}],
 s:`Début
   Lire a
   Lire b
   Si a > b Alors
      Afficher a
   Sinon
      Afficher b
   FinSi
Fin`},
{id:"tarif",cat:"conditions",d:2,t:"Tarif selon l'âge",must:"si",
 q:"Lire un âge. Gratuit (0) avant 6 ans, 5 € de 6 à 17 ans, 10 € à partir de 18 ans. Afficher le prix.",
 h:["Commence par le cas age < 6, puis age < 18.","Avec Sinon Si, si tu arrives au 2ᵉ test, tu sais déjà que age >= 6."],
 start:D0, tests:[{in:[3],out:[0]},{in:[6],out:[5]},{in:[17],out:[5]},{in:[18],out:[10]},{in:[40],out:[10]}],
 s:`Début
   Lire age
   Si age < 6 Alors
      prix ← 0
   Sinon Si age < 18 Alors
      prix ← 5
   Sinon
      prix ← 10
   FinSi
   Afficher prix
Fin`},
{id:"appr",cat:"conditions",d:2,t:"Appréciation d'une note",must:"si",
 q:'Lire une note sur 20. Afficher "Très bien" à partir de 16, "Bien" à partir de 14, "Assez bien" à partir de 12, "Admis" à partir de 10, sinon "Ajourné".',
 h:["Teste du plus grand seuil au plus petit.","5 cas → Si, puis 3 Sinon Si, puis Sinon."],
 start:D0, tests:[{in:[17],out:["Très bien"]},{in:[16],out:["Très bien"]},{in:[15],out:["Bien"]},{in:[13],out:["Assez bien"]},{in:[10],out:["Admis"]},{in:[9.5],out:["Ajourné"]}],
 s:`Début
   Lire note
   Si note >= 16 Alors
      Afficher "Très bien"
   Sinon Si note >= 14 Alors
      Afficher "Bien"
   Sinon Si note >= 12 Alors
      Afficher "Assez bien"
   Sinon Si note >= 10 Alors
      Afficher "Admis"
   Sinon
      Afficher "Ajourné"
   FinSi
Fin`},
{id:"bugtarif",cat:"conditions",d:2,t:"🐞 Corrige l'erreur logique",must:"si",
 q:"Ce code (tiré du cours) doit donner 15 € aux 18 ans et plus, 8 € de 12 à 17 ans, 5 € avant 12 ans. Il contient une erreur logique : corrige-le.",
 h:["Lance-le avec age = 30 : quelle branche est prise ?","La branche age >= 18 n'est jamais atteinte. Change l'ordre des tests."],
 start:`Début
   Lire age
   Si age >= 12 Alors
      prix ← 8
   Sinon Si age >= 18 Alors
      prix ← 15
   Sinon
      prix ← 5
   FinSi
   Afficher prix
Fin`, tests:[{in:[30],out:[15]},{in:[18],out:[15]},{in:[14],out:[8]},{in:[12],out:[8]},{in:[5],out:[5]}],
 s:`Début
   Lire age
   Si age >= 18 Alors
      prix ← 15
   Sinon Si age >= 12 Alors
      prix ← 8
   Sinon
      prix ← 5
   FinSi
   Afficher prix
Fin`},
{id:"acces",cat:"conditions",d:2,t:"Contrôle d'accès (conditions imbriquées)",must:"si",
 q:'Lire age puis possede_carte (VRAI ou FAUX). Si majeur : afficher "Accès autorisé" s\'il a sa carte, sinon "Carte obligatoire". Si mineur : "Accès interdit aux mineurs".',
 h:["Mets un Si à l'intérieur d'un autre Si.","Le Si extérieur teste l'âge, le Si intérieur teste la carte."],
 start:D0, tests:[{in:[20,"VRAI"],out:["Accès autorisé"]},{in:[20,"FAUX"],out:["Carte obligatoire"]},{in:[15,"VRAI"],out:["Accès interdit aux mineurs"]},{in:[15,"FAUX"],out:["Accès interdit aux mineurs"]}],
 s:`Début
   Lire age
   Lire possede_carte
   Si age >= 18 Alors
      Si possede_carte = VRAI Alors
         Afficher "Accès autorisé"
      Sinon
         Afficher "Carte obligatoire"
      FinSi
   Sinon
      Afficher "Accès interdit aux mineurs"
   FinSi
Fin`},
{id:"reduit",cat:"conditions",d:2,t:"Tarif réduit (OU)",must:"si",
 q:'Lire est_etudiant (VRAI/FAUX) puis age. Afficher "Tarif réduit" si la personne est étudiante OU a moins de 26 ans, sinon "Plein tarif".',
 h:["Une seule condition suffit → opérateur OU."],
 start:D0, tests:[{in:["VRAI",30],out:["Tarif réduit"]},{in:["FAUX",20],out:["Tarif réduit"]},{in:["FAUX",26],out:["Plein tarif"]},{in:["VRAI",19],out:["Tarif réduit"]}],
 s:`Début
   Lire est_etudiant
   Lire age
   Si est_etudiant = VRAI OU age < 26 Alors
      Afficher "Tarif réduit"
   Sinon
      Afficher "Plein tarif"
   FinSi
Fin`},
{id:"bissex",cat:"conditions",d:3,t:"Année bissextile",must:"si",
 q:'Lire une année et afficher "Bissextile" ou "Non bissextile". Règle : divisible par 4 mais pas par 100, OU divisible par 400.',
 h:["« divisible par 4 » s'écrit annee MOD 4 = 0.","Mets des parenthèses : (… ET …) OU …"],
 start:D0, tests:[{in:[2024],out:["Bissextile"]},{in:[2023],out:["Non bissextile"]},{in:[1900],out:["Non bissextile"]},{in:[2000],out:["Bissextile"]}],
 s:`Début
   Lire annee
   Si (annee MOD 4 = 0 ET annee MOD 100 ≠ 0) OU annee MOD 400 = 0 Alors
      Afficher "Bissextile"
   Sinon
      Afficher "Non bissextile"
   FinSi
Fin`},
{id:"triangle",cat:"conditions",d:2,t:"Triangle possible ?",must:"si",
 q:"Déterminer si trois longueurs peuvent former un triangle.",
 spec:"Lis a, b puis c, et affiche \"Triangle possible\" ou \"Triangle impossible\". Rappel : chaque côté doit être plus petit que la somme des deux autres.",
 h:["Inégalité triangulaire : chaque côté doit être plus petit que la somme des deux autres.","a < b + c ET b < a + c ET c < a + b"],
 start:D0, tests:[{in:[3,4,5],out:["Triangle possible"]},{in:[1,2,10],out:["Triangle impossible"]},{in:[5,5,5],out:["Triangle possible"]},{in:[10,3,4],out:["Triangle impossible"]}],
 s:`Début
   Lire a
   Lire b
   Lire c
   Si a < b + c ET b < a + c ET c < a + b Alors
      Afficher "Triangle possible"
   Sinon
      Afficher "Triangle impossible"
   FinSi
Fin`},
{id:"typetri",cat:"conditions",d:2,t:"Équilatéral, isocèle ou quelconque",must:"si",
 q:"Déterminer si un triangle est équilatéral, isocèle ou quelconque à partir de ses trois côtés.\n- Équilatéral : les 3 côtés sont égaux.\n- Isocèle : 2 côtés sont égaux.\n- Quelconque : aucun côté égal.",
 spec:"Lis a, b puis c, et affiche \"Équilatéral\", \"Isocèle\" ou \"Quelconque\".",
 h:["Teste d'abord le cas le plus restrictif : les trois égaux.","Isocèle : a = b OU b = c OU a = c."],
 start:D0, tests:[{in:[5,5,5],out:["Équilatéral"]},{in:[5,5,3],out:["Isocèle"]},{in:[3,5,5],out:["Isocèle"]},{in:[5,3,5],out:["Isocèle"]},{in:[3,4,5],out:["Quelconque"]}],
 s:`Début
   Lire a
   Lire b
   Lire c
   Si a = b ET b = c Alors
      Afficher "Équilatéral"
   Sinon Si a = b OU b = c OU a = c Alors
      Afficher "Isocèle"
   Sinon
      Afficher "Quelconque"
   FinSi
Fin`},
{id:"reduc",cat:"conditions",d:2,t:"Réduction commerciale",must:"si",
 q:"Calculer le montant d'une réduction commerciale :\n- Achat inférieur à 100 € : aucune réduction.\n- De 100 à 199,99 € : réduction de 5 %.\n- À partir de 200 € : réduction de 10 %.",
 spec:"Lis le montant de l'achat et affiche le montant de la réduction (0 s'il n'y en a pas).",
 h:["Trois tranches → Si … Sinon Si … Sinon.","5 % de montant = montant * 5 / 100"],
 start:D0, tests:[{in:[50],out:[0]},{in:[100],out:[5]},{in:[150],out:[7.5]},{in:[200],out:[20]},{in:[320],out:[32]}],
 s:`Début
   Lire montant
   Si montant < 100 Alors
      reduction ← 0
   Sinon Si montant < 200 Alors
      reduction ← montant * 5 / 100
   Sinon
      reduction ← montant * 10 / 100
   FinSi
   Afficher reduction
Fin`},
{id:"datevalide",cat:"conditions",d:3,t:"Date valide",must:"si",
 q:"Écrire un algorithme qui détermine si une date est valide à partir du jour, du mois et de l'année.",
 spec:"Lis le jour, le mois puis l'année, et affiche \"Date valide\" ou \"Date invalide\". Pense aux mois de 30 jours (4, 6, 9, 11) et à février (29 jours les années bissextiles, sinon 28).",
 h:["Calcule d'abord le nombre de jours du mois dans une variable joursMax.","Février : réutilise la règle de l'année bissextile. Ensuite : mois entre 1 et 12 ET jour entre 1 et joursMax."],
 start:D0, tests:[{in:[29,2,2024],out:["Date valide"]},{in:[29,2,2023],out:["Date invalide"]},{in:[31,4,2025],out:["Date invalide"]},{in:[31,12,2025],out:["Date valide"]},{in:[0,5,2025],out:["Date invalide"]},{in:[15,13,2025],out:["Date invalide"]}],
 s:`Début
   Lire jour
   Lire mois
   Lire annee
   Si mois = 2 Alors
      Si (annee MOD 4 = 0 ET annee MOD 100 ≠ 0) OU annee MOD 400 = 0 Alors
         joursMax ← 29
      Sinon
         joursMax ← 28
      FinSi
   Sinon Si mois = 4 OU mois = 6 OU mois = 9 OU mois = 11 Alors
      joursMax ← 30
   Sinon
      joursMax ← 31
   FinSi
   Si mois >= 1 ET mois <= 12 ET jour >= 1 ET jour <= joursMax Alors
      Afficher "Date valide"
   Sinon
      Afficher "Date invalide"
   FinSi
Fin`},
// ---------------------------------------------------------------- BOUCLES
{id:"compte",cat:"boucles",d:1,t:"De 1 à 10 puis de 10 à 1",must:"boucle",
 q:"Afficher les nombres de 1 à 10 (un par ligne), puis de 10 à 1.",
 h:["Deux boucles Pour, l'une après l'autre.","Pour descendre : Pour i allant de 10 à 1 pas de -1 Faire"],
 start:D0, tests:[{out:[1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1]}],
 s:`Début
   Pour i allant de 1 à 10 Faire
      Afficher i
   FinPour
   Pour i allant de 10 à 1 pas de -1 Faire
      Afficher i
   FinPour
Fin`},
{id:"mult3",cat:"boucles",d:1,t:"Multiples de 3 jusqu'à 30",must:"boucle",
 q:"Afficher les multiples de 3 inférieurs ou égaux à 30 (3, 6, 9, …, 30).",
 h:["Soit tu testes i MOD 3 = 0 dans une boucle de 1 à 30,","soit tu avances directement de 3 en 3 avec « pas de 3 »."],
 start:D0, tests:[{out:[3,6,9,12,15,18,21,24,27,30]}],
 s:`Début
   Pour i allant de 3 à 30 pas de 3 Faire
      Afficher i
   FinPour
Fin`},
{id:"pairs50",cat:"boucles",d:1,t:"Nombres pairs jusqu'à 50 (TantQue)",must:"boucle",
 q:"Avec une boucle TantQue, afficher les nombres pairs de 2 à 50 inclus.",
 h:["Initialise i à 2 AVANT la boucle.","N'oublie pas d'augmenter i de 2 dans la boucle, sinon boucle infinie !"],
 start:D0, tests:[{out:Array.from({length:25},(_,k)=>2*k+2)}],
 s:`Début
   i ← 2
   TantQue i <= 50 Faire
      Afficher i
      i ← i + 2
   FinTantQue
Fin`},
{id:"bugsomme",cat:"boucles",d:1,t:"🐞 Trouvez l'erreur (somme)",must:"boucle",
 q:"Ce code (exercice du cours) doit afficher la somme 1 + 2 + … + 10 = 55. Lance-le, observe le problème, puis corrige-le.",
 h:["Que vaut i au 2ᵉ tour ? au 100ᵉ tour ?","i n'est jamais incrémenté → boucle infinie. Ajoute i ← i + 1."],
 start:`Début
   i ← 1
   somme ← 0
   TantQue i <= 10 Faire
      somme ← somme + i
   FinTantQue
   Afficher somme
Fin`, tests:[{out:[55]}],
 s:`Début
   i ← 1
   somme ← 0
   TantQue i <= 10 Faire
      somme ← somme + i
      i ← i + 1
   FinTantQue
   Afficher somme
Fin`},
{id:"rebours",cat:"boucles",d:1,t:"Compte à rebours",must:"boucle",
 q:'Lire n, afficher n, n-1, …, 1 (un par ligne) avec un TantQue, puis afficher "Décollage".',
 h:["TantQue n > 0 Faire … n ← n - 1"],
 start:D0, tests:[{in:[3],out:[3,2,1,"Décollage"]},{in:[1],out:[1,"Décollage"]},{in:[5],out:[5,4,3,2,1,"Décollage"]}],
 s:`Début
   Lire n
   TantQue n > 0 Faire
      Afficher n
      n ← n - 1
   FinTantQue
   Afficher "Décollage"
Fin`},
{id:"table",cat:"boucles",d:2,t:"Table de multiplication",must:"boucle",
 q:"Écrire un algorithme qui demande un nombre N et affiche sa table de multiplication.",
 spec:"Une ligne par calcul, de 1 à 10 (ex : \"7 x 3 = 21\").",
 h:["Une boucle Pour i de 1 à 10.","Afficher n, \" x \", i, \" = \", n * i"],
 start:D0, tests:[{in:[7],out:[7,14,21,28,35,42,49,56,63,70]},{in:[3],out:[3,6,9,12,15,18,21,24,27,30]}],
 s:`Début
   Lire n
   Pour i allant de 1 à 10 Faire
      Afficher n, " x ", i, " = ", n * i
   FinPour
Fin`},
{id:"saisie",cat:"boucles",d:2,t:"Saisie contrôlée (Répéter)",must:"boucle",
 q:"Demander une note avec Lire jusqu'à ce qu'elle soit comprise entre 0 et 20 (inclus), puis afficher la note retenue.",
 h:["Répéter … Jusqu'à : la saisie se fait au moins une fois.","La condition d'arrêt est la condition « note valide » : note >= 0 ET note <= 20."],
 start:D0, tests:[{in:[25,-3,14],out:[14]},{in:[20],out:[20]},{in:[21,0],out:[0]}],
 s:`Début
   Répéter
      Afficher "Note (0-20) :"
      Lire note
   Jusqu'à note >= 0 ET note <= 20
   Afficher "Note retenue : ", note
Fin`},
{id:"pin",cat:"boucles",d:2,t:"Code PIN",must:"boucle",
 q:'Redemander le code (Lire) jusqu\'à ce qu\'il vaille 1234, puis afficher "Code correct". (Exemple du cours.) N\'affiche rien d\'autre que des invites juste avant Lire.',
 h:["C'est exactement le cas d'usage de Répéter … Jusqu'à."],
 start:D0, tests:[{in:[1111,0,1234],out:["Code correct"]},{in:[1234],out:["Code correct"]}],
 s:`Début
   Répéter
      Afficher "Entrez votre code PIN :"
      Lire code
   Jusqu'à code = 1234
   Afficher "Code correct"
Fin`},
{id:"nbpairs",cat:"boucles",d:2,t:"Compter les nombres pairs",must:"boucle",
 q:"Lire N et afficher combien de nombres pairs il y a entre 1 et N (inclus).",
 h:["Un compteur initialisé à 0.","Dans une boucle de 1 à N : si i MOD 2 = 0 alors compteur ← compteur + 1."],
 start:D0, tests:[{in:[50],out:[25]},{in:[7],out:[3]},{in:[1],out:[0]}],
 s:`Début
   Lire N
   compteur ← 0
   Pour i allant de 1 à N Faire
      Si i MOD 2 = 0 Alors
         compteur ← compteur + 1
      FinSi
   FinPour
   Afficher compteur
Fin`},
{id:"mdp",cat:"boucles",d:1,t:"Mot de passe",must:"boucle",
 q:"Écrire un algorithme qui demande un mot de passe jusqu'à ce que l'utilisateur saisisse le bon mot de passe.",
 spec:"Le bon mot de passe est algo2026. Ensuite, affiche \"Accès autorisé\".",
 h:["Répéter … Jusqu'à mdp = \"algo2026\"","Un texte se compare entre guillemets."],
 start:D0, tests:[{in:["abc","1234","algo2026"],out:["Accès autorisé"]},{in:["algo2026"],out:["Accès autorisé"]}],
 s:`Début
   Répéter
      Afficher "Mot de passe :"
      Lire mdp
   Jusqu'à mdp = "algo2026"
   Afficher "Accès autorisé"
Fin`},
{id:"somme0",cat:"boucles",d:2,t:"Somme jusqu'à 0",must:"boucle",
 q:"Écrire un algorithme qui demande des nombres à l'utilisateur jusqu'à ce qu'il saisisse 0, puis affiche la somme des nombres saisis (sans compter le 0).",
 spec:"Affiche uniquement la somme, à la fin.",
 h:["Lis un premier nombre AVANT la boucle, puis TantQue n ≠ 0.","Dans la boucle : ajoute n à la somme, puis lis le nombre suivant."],
 start:D0, tests:[{in:[5,3,2,0],out:[10]},{in:[0],out:[0]},{in:[-4,4,7,0],out:[7]}],
 s:`Début
   somme ← 0
   Lire n
   TantQue n ≠ 0 Faire
      somme ← somme + n
      Lire n
   FinTantQue
   Afficher somme
Fin`},
{id:"diviseurs",cat:"boucles",d:2,t:"Diviseurs d'un nombre",must:"boucle",
 q:"Décomposition en facteurs : demander un entier positif et afficher ses diviseurs.",
 spec:"Affiche les diviseurs un par ligne, du plus petit au plus grand.",
 h:["d est un diviseur de n si n MOD d = 0.","Teste tous les d de 1 à n."],
 start:D0, tests:[{in:[12],out:[1,2,3,4,6,12]},{in:[7],out:[1,7]},{in:[1],out:[1]}],
 s:`Début
   Lire n
   Pour d ← 1 à n Faire
      Si n MOD d = 0 Alors
         Afficher d
      FinSi
   FinPour
Fin`},
{id:"interets",cat:"boucles",d:3,t:"Intérêts bancaires",must:"boucle",
 q:"Simulation d'intérêts bancaires : une personne dépose une somme sur un compte rémunéré à 3 % par an. Écrire un algorithme qui calcule le nombre d'années nécessaires pour atteindre un bénéfice de 2 000 € en plus de la somme.",
 spec:"Lis la somme de départ et affiche le nombre d'années.",
 h:["Chaque année : capital ← capital * 1.03","TantQue capital - somme < 2000 : on ajoute une année."],
 start:D0, tests:[{in:[10000],out:[7]},{in:[1000],out:[38]},{in:[50000],out:[2]}],
 s:`Début
   Lire somme
   capital ← somme
   annees ← 0
   TantQue capital - somme < 2000 Faire
      capital ← capital * 1.03
      annees ← annees + 1
   FinTantQue
   Afficher annees
Fin`},
{id:"palindrome",cat:"boucles",d:3,t:"Nombre palindrome",must:"boucle",
 q:"Vérification d'un palindrome : demander un nombre entier et déterminer s'il se lit de la même manière de gauche à droite et de droite à gauche (exemple : 1221).",
 spec:"Affiche \"Palindrome\" ou \"Pas palindrome\".",
 h:["Construis le nombre inversé : n MOD 10 donne le dernier chiffre, n DIV 10 l'enlève.","inverse ← inverse * 10 + reste MOD 10, puis reste ← reste DIV 10, TantQue reste > 0. Compare ensuite inverse et n."],
 start:D0, tests:[{in:[1221],out:["Palindrome"]},{in:[123],out:["Pas palindrome"]},{in:[7],out:["Palindrome"]},{in:[10],out:["Pas palindrome"]},{in:[12321],out:["Palindrome"]}],
 s:`Début
   Lire n
   reste ← n
   inverse ← 0
   TantQue reste > 0 Faire
      inverse ← inverse * 10 + reste MOD 10
      reste ← reste DIV 10
   FinTantQue
   Si inverse = n Alors
      Afficher "Palindrome"
   Sinon
      Afficher "Pas palindrome"
   FinSi
Fin`},
// ---------------------------------------------------------------- CLASSIQUES
{id:"somme",cat:"classiques",d:1,t:"Somme de 1 à N",must:"boucle",
 q:"Lire N et afficher 1 + 2 + … + N.",
 h:["Accumulateur : somme ← 0 avant la boucle.","Dans la boucle : somme ← somme + i"],
 start:D0, tests:[{in:[10],out:[55]},{in:[1],out:[1]},{in:[100],out:[5050]}],
 s:`Début
   Lire N
   somme ← 0
   Pour i allant de 1 à N Faire
      somme ← somme + i
   FinPour
   Afficher somme
Fin`},
{id:"fact",cat:"classiques",d:2,t:"Factorielle",must:"boucle",
 q:"Lire N et afficher N! (produit de 1 à N). Rappel : 0! = 1.",
 h:["Pour un produit, on initialise à 1, jamais à 0.","Si N = 0, la boucle de 1 à 0 ne fait aucun tour → le résultat reste 1 : parfait."],
 start:D0, tests:[{in:[5],out:[120]},{in:[0],out:[1]},{in:[1],out:[1]},{in:[7],out:[5040]}],
 s:`Début
   Lire N
   fact ← 1
   Pour i allant de 1 à N Faire
      fact ← fact * i
   FinPour
   Afficher fact
Fin`},
{id:"pgcd",cat:"classiques",d:3,t:"PGCD (Euclide)",must:"boucle",
 q:"Lire a puis b, afficher leur PGCD avec la méthode d'Euclide.",
 h:["TantQue b ≠ 0 : on remplace (a, b) par (b, a MOD b).","Il faut une variable r pour ne pas perdre a MOD b : r ← a MOD b, a ← b, b ← r. À la fin, le PGCD est a."],
 start:D0, tests:[{in:[48,18],out:[6]},{in:[17,5],out:[1]},{in:[20,5],out:[5]},{in:[12,18],out:[6]}],
 s:`Début
   Lire a
   Lire b
   TantQue b ≠ 0 Faire
      r ← a MOD b
      a ← b
      b ← r
   FinTantQue
   Afficher a
Fin`},
{id:"premier",cat:"classiques",d:3,t:"Nombre premier",must:"boucle",
 q:'Lire n (≥ 2) et afficher "Premier" s\'il n\'est divisible que par 1 et lui-même, sinon "Pas premier".',
 h:["Un booléen premier ← VRAI au départ.","Teste chaque diviseur d de 2 à n - 1 : si n MOD d = 0 alors premier ← FAUX."],
 start:D0, tests:[{in:[7],out:["Premier"]},{in:[9],out:["Pas premier"]},{in:[2],out:["Premier"]},{in:[15],out:["Pas premier"]},{in:[97],out:["Premier"]}],
 s:`Début
   Lire n
   premier ← VRAI
   Pour d allant de 2 à n - 1 Faire
      Si n MOD d = 0 Alors
         premier ← FAUX
      FinSi
   FinPour
   Si premier Alors
      Afficher "Premier"
   Sinon
      Afficher "Pas premier"
   FinSi
Fin`},
{id:"puiss",cat:"classiques",d:2,t:"Puissance",must:"boucle",
 q:"Lire x puis n (entier ≥ 0) et afficher x à la puissance n, calculé avec une boucle (sans opérateur de puissance).",
 h:["Comme la factorielle : résultat ← 1, puis multiplier n fois par x."],
 start:D0, tests:[{in:[2,10],out:[1024]},{in:[5,0],out:[1]},{in:[3,3],out:[27]}],
 s:`Début
   Lire x
   Lire n
   p ← 1
   Pour i allant de 1 à n Faire
      p ← p * x
   FinPour
   Afficher p
Fin`},
// ---------------------------------------------------------------- RÉCURSIVITÉ
{id:"factrec",cat:"recursivite",d:2,t:"Factorielle récursive",must:"recursif",
 q:"Écrire la fonction récursive FactorielleRec(n) qui retourne n! (exemple du cours). Elle doit s'appeler elle-même.",
 h:["Cas de base : si n <= 1, retourner 1.","Appel récursif : Retourner n * FactorielleRec(n - 1)"],
 start:`Fonction FactorielleRec(n : entier) : entier
   
FinFonction`, tests:[{call:"FactorielleRec(5)",ret:120},{call:"FactorielleRec(1)",ret:1},{call:"FactorielleRec(0)",ret:1},{call:"FactorielleRec(7)",ret:5040}],
 s:`Fonction FactorielleRec(n : entier) : entier
   Si n <= 1 Alors
      Retourner 1
   FinSi
   Retourner n * FactorielleRec(n - 1)
FinFonction`},
{id:"sommerec",cat:"recursivite",d:2,t:"Somme récursive",must:"recursif",
 q:"Écrire la fonction récursive SommeRec(n) qui retourne 1 + 2 + … + n (et 0 si n = 0).",
 h:["Cas de base : n = 0 → 0.","SommeRec(n) = n + SommeRec(n - 1)"],
 start:`Fonction SommeRec(n : entier) : entier
   
FinFonction`, tests:[{call:"SommeRec(4)",ret:10},{call:"SommeRec(10)",ret:55},{call:"SommeRec(0)",ret:0}],
 s:`Fonction SommeRec(n : entier) : entier
   Si n = 0 Alors
      Retourner 0
   FinSi
   Retourner n + SommeRec(n - 1)
FinFonction`},
{id:"puissrec",cat:"recursivite",d:2,t:"Puissance récursive",must:"recursif",
 q:"Écrire la fonction récursive PuissanceRec(x, n) qui retourne x à la puissance n (n ≥ 0).",
 h:["x⁰ = 1 : c'est le cas de base.","xⁿ = x × xⁿ⁻¹"],
 start:`Fonction PuissanceRec(x : entier, n : entier) : entier
   
FinFonction`, tests:[{call:"PuissanceRec(2, 10)",ret:1024},{call:"PuissanceRec(5, 0)",ret:1},{call:"PuissanceRec(3, 3)",ret:27}],
 s:`Fonction PuissanceRec(x : entier, n : entier) : entier
   Si n = 0 Alors
      Retourner 1
   FinSi
   Retourner x * PuissanceRec(x, n - 1)
FinFonction`},
{id:"rebrec",cat:"recursivite",d:2,t:"Compte à rebours récursif",must:"recursif",
 q:"Écrire la procédure récursive Rebours(n) qui affiche n, n − 1, …, 1 (un par ligne), sans boucle.",
 h:["Cas de base : si n = 0, on ne fait rien.","Sinon : Afficher n, puis appeler Rebours(n - 1)."],
 start:`Procédure Rebours(n : entier)
   
FinProcédure`, tests:[{call:"Rebours(3)",out:[3,2,1]},{call:"Rebours(1)",out:[1]},{call:"Rebours(5)",out:[5,4,3,2,1]}],
 s:`Procédure Rebours(n : entier)
   Si n > 0 Alors
      Afficher n
      Rebours(n - 1)
   FinSi
FinProcédure`},
{id:"fibo",cat:"recursivite",d:3,t:"Suite de Fibonacci",must:"recursif",
 q:"Écrire la fonction récursive Fibonacci(n) : Fibonacci(0) = 0, Fibonacci(1) = 1, et ensuite Fibonacci(n) = Fibonacci(n − 1) + Fibonacci(n − 2).",
 h:["Il y a DEUX cas de base : n = 0 et n = 1 (ou : si n <= 1, Retourner n).","Deux appels récursifs dans la même ligne."],
 start:`Fonction Fibonacci(n : entier) : entier
   
FinFonction`, tests:[{call:"Fibonacci(0)",ret:0},{call:"Fibonacci(1)",ret:1},{call:"Fibonacci(10)",ret:55},{call:"Fibonacci(15)",ret:610}],
 s:`Fonction Fibonacci(n : entier) : entier
   Si n <= 1 Alors
      Retourner n
   FinSi
   Retourner Fibonacci(n - 1) + Fibonacci(n - 2)
FinFonction`},
// ---------------------------------------------------------------- TABLEAUX
{id:"parcours",cat:"tableaux",d:1,t:"Parcourir un tableau",must:"boucle",vars:"T",
 q:"Le tableau T est déjà rempli par le test (ne le redéfinis pas). Afficher chacun de ses éléments, un par ligne.",
 h:["Les indices vont de 0 à taille(T) - 1."],
 start:D0, tests:[{vars:{T:[4,8,15]},out:[4,8,15]},{vars:{T:[7]},out:[7]},{vars:{T:[1,2,3,4,5]},out:[1,2,3,4,5]}],
 s:`Début
   Pour i allant de 0 à taille(T) - 1 Faire
      Afficher T[i]
   FinPour
Fin`},
{id:"moyT",cat:"tableaux",d:2,t:"Moyenne de la promotion",must:"boucle",vars:"Notes",
 q:"Le tableau Notes est fourni par le test (ne le redéfinis pas). Afficher la moyenne des notes.",
 h:["Somme de tous les éléments dans une boucle.","moyenne ← somme / taille(Notes)"],
 start:D0, tests:[{vars:{Notes:[12,15,8,17,14]},out:[13.2]},{vars:{Notes:[10,20]},out:[15]},{vars:{Notes:[7]},out:[7]}],
 s:`Début
   somme ← 0
   Pour i allant de 0 à taille(Notes) - 1 Faire
      somme ← somme + Notes[i]
   FinPour
   moyenne ← somme / taille(Notes)
   Afficher moyenne
Fin`},
{id:"minmax",cat:"tableaux",d:2,t:"Meilleure et moins bonne note",must:"boucle",vars:"Notes",
 q:"Notes est fourni. Afficher le minimum, puis le maximum (deux lignes).",
 h:["Initialise minimum et maximum à Notes[0] (pas à 0 : les valeurs peuvent être négatives !).","Boucle de 1 à taille(Notes) - 1 avec deux Si."],
 start:D0, tests:[{vars:{Notes:[12,15,8,17,14]},out:[8,17]},{vars:{Notes:[-5,-2,-9]},out:[-9,-2]},{vars:{Notes:[3]},out:[3,3]}],
 s:`Début
   minimum ← Notes[0]
   maximum ← Notes[0]
   Pour i allant de 1 à taille(Notes) - 1 Faire
      Si Notes[i] < minimum Alors
         minimum ← Notes[i]
      FinSi
      Si Notes[i] > maximum Alors
         maximum ← Notes[i]
      FinSi
   FinPour
   Afficher "Minimum :", minimum
   Afficher "Maximum :", maximum
Fin`},
{id:"admis",cat:"tableaux",d:2,t:"Compter les admis",must:"boucle",vars:"Notes",
 q:"Notes est fourni. Afficher le nombre de notes supérieures ou égales à 10.",
 h:["compteur ← 0 puis +1 à chaque note >= 10."],
 start:D0, tests:[{vars:{Notes:[12,15,8,17,14]},out:[4]},{vars:{Notes:[5,10,9,20]},out:[2]},{vars:{Notes:[1,2]},out:[0]}],
 s:`Début
   compteur ← 0
   Pour i allant de 0 à taille(Notes) - 1 Faire
      Si Notes[i] >= 10 Alors
         compteur ← compteur + 1
      FinSi
   FinPour
   Afficher compteur
Fin`},
{id:"promo",cat:"tableaux",d:3,t:"Atelier : notes de la promotion",must:"boucle",vars:"Notes",
 q:"Atelier pratique, dans un même algorithme.\nOn dispose d'un tableau Notes contenant les notes de plusieurs centaines ou milliers d'étudiants.\n- Calculer la moyenne de la promotion.\n- Trouver la meilleure et la moins bonne note.\n- Compter les étudiants admis (note ≥ 10).",
 spec:"Affiche 4 lignes : la moyenne, la meilleure note, la moins bonne note, puis le nombre d'admis. Notes est fourni par les tests.",
 h:["Un seul parcours suffit : somme, maximum, minimum et compteur se mettent à jour dans la même boucle.","Initialise maximum et minimum à Notes[0], somme et compteur à 0."],
 start:D0, tests:[{vars:{Notes:[12,15,8,17,14]},out:[13.2,17,8,4]},{vars:{Notes:[10,20]},out:[15,20,10,2]},{vars:{Notes:[6,9,3]},out:[6,9,3,0]}],
 s:`Début
   somme ← 0
   compteur ← 0
   maximum ← Notes[0]
   minimum ← Notes[0]
   Pour i ← 0 à taille(Notes) - 1 Faire
      somme ← somme + Notes[i]
      Si Notes[i] > maximum Alors
         maximum ← Notes[i]
      FinSi
      Si Notes[i] < minimum Alors
         minimum ← Notes[i]
      FinSi
      Si Notes[i] >= 10 Alors
         compteur ← compteur + 1
      FinSi
   FinPour
   Afficher "Moyenne :", somme / taille(Notes)
   Afficher "Meilleure note :", maximum
   Afficher "Moins bonne note :", minimum
   Afficher "Admis :", compteur
Fin`},
{id:"inverse",cat:"tableaux",d:2,t:"Afficher à l'envers",must:"boucle",vars:"T",
 q:"T est fourni. Afficher ses éléments du dernier au premier.",
 h:["Le dernier indice est taille(T) - 1, le premier est 0.","Pour i allant de taille(T) - 1 à 0 pas de -1"],
 start:D0, tests:[{vars:{T:[1,2,3]},out:[3,2,1]},{vars:{T:[5,9]},out:[9,5]}],
 s:`Début
   Pour i allant de taille(T) - 1 à 0 pas de -1 Faire
      Afficher T[i]
   FinPour
Fin`},
{id:"sommepairs",cat:"tableaux",d:2,t:"Somme des éléments pairs",must:"boucle",vars:"T",
 q:"T est fourni. Afficher la somme de ses éléments pairs uniquement.",
 h:["Combine un accumulateur et un test T[i] MOD 2 = 0."],
 start:D0, tests:[{vars:{T:[1,2,3,4]},out:[6]},{vars:{T:[5,7]},out:[0]},{vars:{T:[10,-2,3]},out:[8]}],
 s:`Début
   somme ← 0
   Pour i allant de 0 à taille(T) - 1 Faire
      Si T[i] MOD 2 = 0 Alors
         somme ← somme + T[i]
      FinSi
   FinPour
   Afficher somme
Fin`},
{id:"position",cat:"tableaux",d:3,t:"Position d'une valeur",must:"boucle",vars:"T et x",
 q:"T et x sont fournis. Afficher l'indice de la PREMIÈRE case contenant x, ou -1 si x est absent.",
 h:["pos ← -1 au départ.","TantQue i < taille(T) ET pos = -1 : on s'arrête dès qu'on a trouvé."],
 start:D0, tests:[{vars:{T:[4,7,9],x:7},out:[1]},{vars:{T:[4,7,9],x:5},out:[-1]},{vars:{T:[3,3],x:3},out:[0]}],
 s:`Début
   i ← 0
   pos ← -1
   TantQue i < taille(T) ET pos = -1 Faire
      Si T[i] = x Alors
         pos ← i
      FinSi
      i ← i + 1
   FinTantQue
   Afficher pos
Fin`},
{id:"ca30",cat:"tableaux",d:3,t:"Atelier : chiffre d'affaires",must:"boucle",vars:"CA",
 q:"Dans un même algorithme.\nUn magasin enregistre le chiffre d'affaires réalisé pendant 30 jours (tableau CA).\n- Calculer le chiffre d'affaires total.\n- Trouver le jour où les ventes ont été les plus importantes.\n- Compter le nombre de jours où le chiffre d'affaires a dépassé 1 000 €.",
 spec:"Affiche 3 lignes : le total, puis le numéro du jour des meilleures ventes (jour 1 = indice 0), puis le nombre de jours au-dessus de 1 000 €. CA est fourni par les tests (moins de 30 jours) : ne le redéfinis pas.",
 h:["Un seul parcours avec 3 variables : total, meilleur (un indice), compteur.","Si CA[i] > CA[meilleur] alors meilleur ← i. Le numéro du jour est meilleur + 1."],
 start:D0, tests:[{vars:{CA:[800,1200,950,1500,1100]},out:[5550,4,3]},{vars:{CA:[500,400]},out:[900,1,0]},{vars:{CA:[2000,2000,100]},out:[4100,1,2]}],
 s:`Début
   total ← 0
   meilleur ← 0
   compteur ← 0
   Pour i ← 0 à taille(CA) - 1 Faire
      total ← total + CA[i]
      Si CA[i] > CA[meilleur] Alors
         meilleur ← i
      FinSi
      Si CA[i] > 1000 Alors
         compteur ← compteur + 1
      FinSi
   FinPour
   Afficher "Total : ", total
   Afficher "Meilleur jour : ", meilleur + 1
   Afficher "Jours au-dessus de 1000 : ", compteur
Fin`},
{id:"occur",cat:"tableaux",d:3,t:"Atelier : toutes les positions d'une valeur",must:"boucle",vars:"T et x",
 q:"Dans un même algorithme.\nOn dispose d'un tableau T contenant 20 nombres entiers et d'un nombre x à rechercher (dans le cours, x est demandé avec Lire).\n- Vérifier si ce nombre existe dans le tableau.\n- Afficher toutes les positions où il apparaît.\n- Compter le nombre d'occurrences.",
 spec:"Affiche chaque position (une par ligne), puis le nombre d'occurrences. Si x est absent, affiche seulement \"Absent\". T et x sont fournis par les tests.",
 h:["Un compteur, et un Afficher i chaque fois que T[i] = x.","Après la boucle : Si compteur = 0 alors \"Absent\", sinon afficher compteur."],
 start:D0, tests:[{vars:{T:[4,7,4,1],x:4},out:[0,2,2]},{vars:{T:[4,7,4,1],x:9},out:["Absent"]},{vars:{T:[5,5,5],x:5},out:[0,1,2,3]}],
 s:`Début
   compteur ← 0
   Pour i ← 0 à taille(T) - 1 Faire
      Si T[i] = x Alors
         Afficher i
         compteur ← compteur + 1
      FinSi
   FinPour
   Si compteur = 0 Alors
      Afficher "Absent"
   Sinon
      Afficher compteur
   FinSi
Fin`},
{id:"presences",cat:"tableaux",d:2,t:"Atelier : taux de présence",must:"boucle",vars:"P",
 q:"Dans un même algorithme.\nUn tableau P contient les présences de 25 étudiants (1 = présent, 0 = absent).\n- Compter le nombre de présents et d'absents.\n- Calculer le taux de présence.\n- Identifier si le taux de présence est supérieur ou égal à 80 %.",
 spec:"Affiche 4 lignes : présents, absents, taux en %, puis \"Objectif atteint\" ou \"Objectif non atteint\". P est fourni par les tests.",
 h:["Compte les 1 ; les absents = taille(P) - présents.","taux ← presents / taille(P) * 100"],
 start:D0, tests:[{vars:{P:[1,1,1,1,0]},out:[4,1,80,"Objectif atteint"]},{vars:{P:[1,0,0,1]},out:[2,2,50,"Objectif non atteint"]},{vars:{P:[1,1,1]},out:[3,0,100,"Objectif atteint"]}],
 s:`Début
   presents ← 0
   Pour i ← 0 à taille(P) - 1 Faire
      Si P[i] = 1 Alors
         presents ← presents + 1
      FinSi
   FinPour
   absents ← taille(P) - presents
   taux ← presents / taille(P) * 100
   Afficher presents
   Afficher absents
   Afficher taux
   Si taux >= 80 Alors
      Afficher "Objectif atteint"
   Sinon
      Afficher "Objectif non atteint"
   FinSi
Fin`},
{id:"ordre",cat:"tableaux",d:2,t:"Atelier : croissant ou décroissant ?",must:"boucle",vars:"T",
 q:"Dans un même algorithme.\nOn dispose d'un tableau T de nombres entiers.\n- Vérifier si les éléments sont classés dans l'ordre croissant.\n- Vérifier s'ils sont classés dans l'ordre décroissant.\n- Afficher un message indiquant le résultat.",
 spec:"Affiche \"Croissant\", \"Décroissant\" ou \"Non trié\". T est fourni par les tests.",
 h:["Deux booléens, croissant et decroissant, initialisés à VRAI.","Compare chaque T[i] avec T[i + 1], pour i de 0 à taille(T) - 2."],
 start:D0, tests:[{vars:{T:[1,2,3]},out:["Croissant"]},{vars:{T:[5,3,1]},out:["Décroissant"]},{vars:{T:[1,3,2]},out:["Non trié"]},{vars:{T:[1,1,2]},out:["Croissant"]}],
 s:`Début
   croissant ← VRAI
   decroissant ← VRAI
   Pour i ← 0 à taille(T) - 2 Faire
      Si T[i] > T[i + 1] Alors
         croissant ← FAUX
      FinSi
      Si T[i] < T[i + 1] Alors
         decroissant ← FAUX
      FinSi
   FinPour
   Si croissant Alors
      Afficher "Croissant"
   Sinon Si decroissant Alors
      Afficher "Décroissant"
   Sinon
      Afficher "Non trié"
   FinSi
Fin`},
// ---------------------------------------------------------------- TRIS
{id:"bulles",cat:"tris",d:3,t:"Tri à bulles",must:"boucle",vars:"T",
 q:"T est fourni. Trier T par ordre croissant avec le tri à bulles, puis terminer par Afficher T.",
 h:["N ← taille(T), puis deux boucles : i de 0 à N - 2, j de 0 à N - i - 2.","Si T[j] > T[j + 1] : échange avec Temp (3 lignes)."],
 start:D0, tests:[{vars:{T:[5,1,4,2,8]},out:["[1, 2, 4, 5, 8]"]},{vars:{T:[3,2,1]},out:["[1, 2, 3]"]},{vars:{T:[7]},out:["[7]"]}],
 s:`Début
   N ← taille(T)
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
Fin`},
{id:"selection",cat:"tris",d:3,t:"Tri par sélection",must:"boucle",vars:"T",
 q:"T est fourni. Trier T par ordre croissant avec le tri par sélection, puis terminer par Afficher T.",
 h:["Pour chaque i : IndiceMin ← i, puis cherche un plus petit élément entre i + 1 et N - 1.","Après la boucle j : échange T[i] et T[IndiceMin] avec Temp."],
 start:D0, tests:[{vars:{T:[5,1,4,2,8]},out:["[1, 2, 4, 5, 8]"]},{vars:{T:[9,7,8]},out:["[7, 8, 9]"]},{vars:{T:[2,1]},out:["[1, 2]"]}],
 s:`Début
   N ← taille(T)
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
Fin`},
// ---------------------------------------------------------------- COMPLEXITÉ
{id:"doublon",cat:"complexite",d:3,t:"Détecter un doublon en O(N)",must:"fonction",
 q:"Écrire la fonction ContientDoublon(numeros) : booléen, qui retourne VRAI si une valeur apparaît deux fois, en UN seul parcours (version « intelligente » du cours avec un ensemble).",
 h:["vus ← ensemble vide ; Pour chaque numero dans numeros …","Si numero appartient à vus Alors Retourner VRAI ; sinon Ajouter numero à vus. Après la boucle : Retourner FAUX."],
 start:`Fonction ContientDoublon(numeros) : booléen

FinFonction`, tests:[{call:"ContientDoublon([1, 2, 3, 2])",ret:true},{call:"ContientDoublon([1, 2, 3])",ret:false},{call:"ContientDoublon([5, 5])",ret:true},{call:"ContientDoublon([])",ret:false}],
 s:`Fonction ContientDoublon(numeros) : booléen
   vus ← ensemble vide
   Pour chaque numero dans numeros
      Si numero appartient à vus Alors
         Retourner VRAI
      FinSi
      Ajouter numero à vus
   FinPour
   Retourner FAUX
FinFonction`},
// ---------------------------------------------------------------- FONCTIONS
{id:"fttc",cat:"fonctions",d:1,t:"Fonction CalculerTTC",must:"fonction",
 q:"Écrire la fonction CalculerTTC(prixHT, taux) qui retourne le prix TTC (taux en %).",
 h:["TTC = prixHT × (1 + taux / 100).","Utilise Retourner, pas Afficher."],
 start:`Fonction CalculerTTC(prixHT : réel, taux : réel) : réel

FinFonction`, tests:[{call:"CalculerTTC(100, 20)",ret:120},{call:"CalculerTTC(50, 10)",ret:55},{call:"CalculerTTC(0, 20)",ret:0}],
 s:`Fonction CalculerTTC(prixHT : réel, taux : réel) : réel
   Retourner prixHT * (1 + taux / 100)
FinFonction`},
{id:"fmax",cat:"fonctions",d:1,t:"Fonction Max",must:"fonction",
 q:"Écrire la fonction Max(a, b) qui retourne le plus grand des deux nombres.",
 h:["Un Si … Sinon avec un Retourner dans chaque branche."],
 start:`Fonction Max(a : entier, b : entier) : entier

FinFonction`, tests:[{call:"Max(3, 9)",ret:9},{call:"Max(9, 3)",ret:9},{call:"Max(-1, -5)",ret:-1},{call:"Max(4, 4)",ret:4}],
 s:`Fonction Max(a : entier, b : entier) : entier
   Si a > b Alors
      Retourner a
   Sinon
      Retourner b
   FinSi
FinFonction`},
{id:"fbienvenue",cat:"fonctions",d:1,t:"Procédure AfficherBienvenue",must:"fonction",
 q:'Écrire la procédure AfficherBienvenue(nom) qui affiche "Bienvenue " suivi du nom.',
 h:["Une procédure n'a ni type de retour, ni Retourner.","Afficher \"Bienvenue \", nom"],
 start:`Procédure AfficherBienvenue(nom : chaîne)

FinProcédure`, tests:[{call:'AfficherBienvenue("Alice")',out:["Bienvenue Alice"]},{call:'AfficherBienvenue("Sam")',out:["Bienvenue Sam"]}],
 s:`Procédure AfficherBienvenue(nom : chaîne)
   Afficher "Bienvenue ", nom
FinProcédure`},
{id:"festpair",cat:"fonctions",d:1,t:"Fonction EstPair",must:"fonction",
 q:"Écrire la fonction EstPair(n) : booléen qui retourne VRAI si n est pair, FAUX sinon.",
 h:["On peut retourner directement une comparaison : Retourner n MOD 2 = 0"],
 start:`Fonction EstPair(n : entier) : booléen

FinFonction`, tests:[{call:"EstPair(4)",ret:true},{call:"EstPair(7)",ret:false},{call:"EstPair(0)",ret:true}],
 s:`Fonction EstPair(n : entier) : booléen
   Retourner n MOD 2 = 0
FinFonction`},
{id:"fcarres",cat:"fonctions",d:2,t:"Somme des carrés (fonction qui en appelle une autre)",must:"fonction",
 q:"Écrire Carre(x) qui retourne x × x, puis SommeDesCarres(a, b) qui retourne Carre(a) + Carre(b) en APPELANT Carre.",
 h:["Deux fonctions, l'une sous l'autre.","Retourner Carre(a) + Carre(b)"],
 start:`Fonction Carre(x : entier) : entier

FinFonction

Fonction SommeDesCarres(a : entier, b : entier) : entier

FinFonction`, tests:[{call:"SommeDesCarres(3, 4)",ret:25},{call:"SommeDesCarres(0, 5)",ret:25},{call:"Carre(7)",ret:49}],
 s:`Fonction Carre(x : entier) : entier
   Retourner x * x
FinFonction

Fonction SommeDesCarres(a : entier, b : entier) : entier
   Retourner Carre(a) + Carre(b)
FinFonction`},
{id:"ffact",cat:"fonctions",d:2,t:"Fonction Factorielle",must:"fonction",
 q:"Écrire la fonction Factorielle(n) qui retourne n!.",
 h:["Même algorithme que l'exercice Factorielle, mais avec Retourner à la fin."],
 start:`Fonction Factorielle(n : entier) : entier

FinFonction`, tests:[{call:"Factorielle(5)",ret:120},{call:"Factorielle(0)",ret:1},{call:"Factorielle(6)",ret:720}],
 s:`Fonction Factorielle(n : entier) : entier
   f ← 1
   Pour i allant de 2 à n Faire
      f ← f * i
   FinPour
   Retourner f
FinFonction`},
{id:"fmoyT",cat:"fonctions",d:2,t:"Fonction MoyenneTableau",must:"fonction",
 q:"Écrire la fonction MoyenneTableau(T) qui retourne la moyenne des éléments de T.",
 h:["Variables locales somme et i, boucle sur T, puis Retourner somme / taille(T)."],
 start:`Fonction MoyenneTableau(T) : réel

FinFonction`, tests:[{call:"MoyenneTableau([12, 15, 8, 17, 14])",ret:13.2},{call:"MoyenneTableau([10, 20])",ret:15},{call:"MoyenneTableau([4])",ret:4}],
 s:`Fonction MoyenneTableau(T) : réel
   somme ← 0
   Pour i allant de 0 à taille(T) - 1 Faire
      somme ← somme + T[i]
   FinPour
   Retourner somme / taille(T)
FinFonction`},
{id:"panier",cat:"fonctions",d:3,t:"Étude de cas : le panier en ligne",must:"fonction",
 q:"Écrire les 3 fonctions du cours : CalculerSousTotal(prix, quantites) (somme des prix[i] × quantites[i]), CalculerReduction(st) (10 % de st si st > 100, sinon 0), CalculerFraisLivraison(st) (5 si st < 50, sinon 0).",
 h:["Chaque fonction fait UNE chose et retourne son résultat.","Attention aux comparaisons strictes : « dépasse 100 » → > 100 ; « inférieur à 50 » → < 50."],
 start:`Fonction CalculerSousTotal(prix, quantites) : réel

FinFonction

Fonction CalculerReduction(st : réel) : réel

FinFonction

Fonction CalculerFraisLivraison(st : réel) : réel

FinFonction`, tests:[{call:"CalculerSousTotal([20, 45.5, 10], [2, 1, 3])",ret:115.5},{call:"CalculerReduction(150)",ret:15},{call:"CalculerReduction(100)",ret:0},{call:"CalculerFraisLivraison(40)",ret:5},{call:"CalculerFraisLivraison(50)",ret:0}],
 s:`Fonction CalculerSousTotal(prix, quantites) : réel
   total ← 0
   Pour i allant de 0 à taille(prix) - 1 Faire
      total ← total + prix[i] * quantites[i]
   FinPour
   Retourner total
FinFonction

Fonction CalculerReduction(st : réel) : réel
   Si st > 100 Alors
      Retourner st * 0.10
   FinSi
   Retourner 0
FinFonction

Fonction CalculerFraisLivraison(st : réel) : réel
   Si st < 50 Alors
      Retourner 5
   FinSi
   Retourner 0
FinFonction`},
];
