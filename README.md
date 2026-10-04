# CV Portfolio - Gioele Mantello

Sito web portfolio personale per presentare competenze, progetti ed esperienze come Senior Full Stack Developer.

## Demo

[Live Demo](https://gioixxx.github.io/Cv_PortFolio/) *(se attivi GitHub Pages)*

## Tecnologie

- **HTML5** - Struttura semantica
- **CSS3** - Styling con variabili CSS e design responsive
- **JavaScript** - Interattività e animazioni

## Funzionalita

- Design responsive (mobile-first)
- Toggle tema Dark/Light
- Filtri portfolio per tecnologia
- Animazioni fluide
- Stile "developer/terminal"

## Struttura

```
├── index.html    # Pagina principale
├── style.css     # Stili e temi
├── script.js     # Logica interattiva (filtri, modale progetti, terminale)
├── cv.pdf        # CV scaricabile, generato da cv/cv.html
├── cv/
│   ├── cv.html       # Sorgente del CV (A4, stampa)
│   └── build-cv.ps1  # Rigenera cv.pdf con Edge/Chrome headless
└── README.md
```

## CV scaricabile

`cv.pdf` non si modifica a mano: si aggiorna `cv/cv.html` e si rigenera il PDF.

```powershell
powershell -File cv/build-cv.ps1
```

## Sezioni

- **Hero** - Presentazione e call-to-action
- **Chi sono** - Profilo, formazione ed esperienza
- **Portfolio** - Progetti con filtri per tecnologia
- **Competenze** - Stack tecnologico e metodologie
- **Contatti** - Email e link social

## Utilizzo

Clona il repository e apri `index.html` nel browser:

```bash
git clone https://github.com/Gioixxx/Cv_PortFolio.git
cd Cv_PortFolio
# Apri index.html nel browser
```

## Licenza

MIT
