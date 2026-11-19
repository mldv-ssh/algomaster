<div align="center">

# 🧠 AlgoMaster

**Apprends l'algorithmique de zéro, directement dans ton navigateur.**

Leçons interactives · Quiz · Flashcards · Examen blanc · Atelier de pseudo-code

[![Essayer en ligne](https://img.shields.io/badge/▶_Essayer-en_ligne-2ea44f?style=for-the-badge)](https://mldv-ssh.github.io/algomaster/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zéro dépendance](https://img.shields.io/badge/dépendances-0-blue?style=for-the-badge)

**[mldv-ssh.github.io/algomaster](https://mldv-ssh.github.io/algomaster/)**

</div>

---

## ✨ Fonctionnalités

| | Module | Ce qu'il fait |
|---|---|---|
| 📖 | **Leçons** | Chaque notion expliquée avec une exécution **pas à pas** de l'algorithme |
| ✅ | **Quiz** | Questions corrigées **instantanément**, dont des questions générées aléatoirement |
| 🃏 | **Flashcards** | Révision rapide des définitions et concepts clés |
| 📝 | **Examen blanc** | Mise en situation complète pour tester ses acquis |
| 💻 | **Atelier pseudo-code** | Écris ton algorithme : un interpréteur l'exécute sur des jeux de tests et le **corrige automatiquement** |
| 💾 | **Progression** | Sauvegardée dans ton navigateur (`localStorage`), sans compte |

## 🚀 Utilisation

**En ligne** : [mldv-ssh.github.io/algomaster](https://mldv-ssh.github.io/algomaster/)

**En local** : tout tient dans un seul fichier `index.html`, sans serveur ni dépendance.

```bash
git clone https://github.com/mldv-ssh/algomaster.git
```

Puis ouvre `index.html` dans un navigateur. C'est tout.

## 📂 Structure

```
algomaster/
├── index.html        # application complète, générée par build.ps1
├── build.ps1         # script de build (Windows)
└── src/
    ├── course.js     # catégories, leçons, traces pas à pas, fiche résumé, flashcards
    ├── questions.js  # questions des quiz et générateurs aléatoires
    ├── exos.js       # exercices de l'atelier et jeux de tests
    ├── interp.js     # interpréteur de pseudo-code qui corrige l'atelier
    ├── app.js        # interface
    ├── style.css     # style
    ├── index.html    # gabarit
    └── Launcher.cs   # lanceur Windows AlgoMaster.exe
```

## 🛠️ Modifier le contenu

1. Modifie les fichiers dans `src/`.
2. Lance le build :

   ```powershell
   powershell -ExecutionPolicy Bypass -File build.ps1
   ```

   Il régénère `index.html`, puis crée `AlgoMaster.exe` et `AlgoMaster.html` sur le Bureau.
3. Commit et push `index.html` : GitHub Pages met le site à jour.

---

<div align="center">
Fait avec ☕ pour apprendre l'algo sans prise de tête.
</div>
