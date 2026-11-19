<div align="center">

# AlgoMaster

Cours d'algorithmique interactif pour débutants, qui tourne entièrement dans le navigateur.

[![Démo](https://img.shields.io/badge/démo-en%20ligne-2ea44f?logo=githubpages&logoColor=white)](https://mldv-ssh.github.io/algomaster/)
[![Last commit](https://img.shields.io/github/last-commit/mldv-ssh/algomaster?color=blue)](https://github.com/mldv-ssh/algomaster/commits)
![Dépendances](https://img.shields.io/badge/dépendances-0-success)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![C#](https://img.shields.io/badge/C%23-512BD4?logo=dotnet&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?logo=powershell&logoColor=white)

**[mldv-ssh.github.io/algomaster](https://mldv-ssh.github.io/algomaster/)**

</div>

## Fonctionnalités

- Leçons avec exécution des algorithmes pas à pas
- Quiz corrigés instantanément, avec des questions générées aléatoirement
- Flashcards et fiche résumé
- Examen blanc
- Atelier de pseudo-code : le code est exécuté par un interpréteur intégré et vérifié sur des jeux de tests
- Assistant : répond aux questions à partir du cours et exécute le pseudo-code collé ; IA locale optionnelle (Qwen 2.5 via [WebLLM](https://github.com/mlc-ai/web-llm), exécutée dans le navigateur avec WebGPU, sans serveur ni clé API)
- Progression sauvegardée en local (`localStorage`)

Aucun serveur, aucune dépendance : l'application complète est un seul fichier `index.html`.

## Lancer en local

```bash
git clone https://github.com/mldv-ssh/algomaster.git
```

Ouvrir ensuite `index.html` dans un navigateur.

## Structure

```
src/
├── course.js      catégories, leçons, traces pas à pas, fiche résumé, flashcards
├── questions.js   questions des quiz et générateurs aléatoires
├── exos.js        exercices de l'atelier et jeux de tests
├── chat.js        assistant : recherche dans le cours + IA locale WebLLM
├── interp.js      interpréteur de pseudo-code
├── app.js         interface
├── style.css
├── index.html     gabarit
└── Launcher.cs    lanceur Windows (AlgoMaster.exe)
build.ps1          script de build
index.html         fichier généré, servi par GitHub Pages
```

## Build

Les sources sont dans `src/`. Après une modification :

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

Le script régénère `index.html` et crée `AlgoMaster.exe` et `AlgoMaster.html` sur le Bureau.

Le site est déployé via GitHub Pages : pousser `index.html` suffit à le mettre à jour.
