# Tech Debt

Registro del debito tecnico accumulato durante lo sviluppo.
Ogni item include la priorità, il contesto di origine e il piano di risoluzione.
Aggiornato da `/session-end`.

---

<!-- TEMPLATE PER NUOVO ITEM:

### [Titolo breve — cosa è il debito]
**Priorità:** Alta / Media / Bassa
**Area:** [modulo, layer, o feature coinvolta]
**Data:** YYYY-MM-DD
**Introdotto da:** [commit hash o descrizione della sessione]
**Descrizione:** [cosa è il problema — duplicazione, workaround, astrazione mancante, ecc.]
**Perché rimandato:** [motivo — deadline, dipendenza esterna, complessità]
**Impatto attuale:** [rallenta sviluppo / rischio bug / problema performance / tech risk]
**Risoluzione suggerita:** [come andrebbe affrontato]

-->

## Alta priorità

<!-- Item che bloccano o rallentano significativamente lo sviluppo -->

## Media priorità

<!-- Item che introducono rischio o duplicazione ma non bloccano -->

## Bassa priorità

---

## Archiviato

<!-- Item risolti — non eliminare, servono come storico -->

### Immagini social preview mancanti — risolto 2026-10-04
**Descrizione originale:** og:image e twitter:image erano placeholder, non c'era un'immagine reale di 1200x630.
**Risoluzione:** `og-image.png` (1200x630) generata da `social/og-image.html` con `social/build-og-image.ps1`; meta og/twitter aggiornati. Corretti anche `og:url`/`twitter:url`, che puntavano a `gioelemantello.dev` (non raggiungibile), ora l'URL di GitHub Pages, con `rel="canonical"`.
