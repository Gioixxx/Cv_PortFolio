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

### Immagini social preview mancanti
**Priorità:** Bassa
**Area:** SEO e social sharing
**Data:** 2026-07-21
**Introdotto da:** commit corrente
**Descrizione:** Le immagini og:image e twitter:image sono ancora placeholder, non sono state sostituite con immagini reali di 1200x630.
**Perché rimandato:** Nessuna dipendenza esterna, semplice sostituzione.
**Impatto attuale:** Problema di presentazione nei social media.
**Risoluzione suggerita:** Sostituire i placeholder con immagini reali e verificare il caricamento corretto.

---

## Archiviato

<!-- Item risolti — non eliminare, servono come storico -->
