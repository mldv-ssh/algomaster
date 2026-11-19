# AlgoMaster

Cours interactif d'algorithmique, en partant de zéro : leçons avec exécution pas à pas, quiz corrigés instantanément, flashcards, examen blanc et atelier de pseudo-code corrigé automatiquement.

Site : https://mldv-ssh.github.io/algomaster/

## Utilisation

Tout tient dans un seul fichier `index.html`, sans serveur ni dépendance : l'ouvrir dans un navigateur suffit. La progression est enregistrée dans le navigateur de chaque visiteur (localStorage).

## Modifier le contenu

Les sources sont dans `src/` :

| Fichier | Contenu |
|---|---|
| `course.js` | catégories, leçons, traces pas à pas, fiche résumé, flashcards |
| `questions.js` | questions des quiz et générateurs de questions aléatoires |
| `exos.js` | exercices de l'atelier code et leurs jeux de tests |
| `interp.js` | interpréteur de pseudo-code qui corrige l'atelier |
| `app.js` | interface |
| `style.css`, `index.html` | style et gabarit |
| `Launcher.cs` | lanceur Windows `AlgoMaster.exe` |

Après une modification, lancer `powershell -ExecutionPolicy Bypass -File build.ps1` (Windows) : il régénère `index.html`, puis `AlgoMaster.exe` et `AlgoMaster.html` sur le Bureau. Committer et pousser `index.html` met le site à jour.
