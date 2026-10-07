---
description: "Avvia la console web dei Dot nel progetto corrente"
argument-hint: [id del Dot | stop]
disable-model-invocation: true
---
# /dot — Avvia la console web dei Dot nel progetto corrente

## Input

Argomento opzionale: l'id di un Dot (`coordinatore`, `ricercatore`, `pianificatore`, `sviluppatore`, `revisore`, `documentalista`, o un Dot di questo progetto) oppure `stop`. La guida dei Dot è `dots/README.md` della libreria: leggila solo se l'utente chiede cosa sono, non importarla.

## Regole

- Non scrivere codice né file: lancia un solo comando e riporta l'esito.
- Dalla radice del progetto, con il tool Bash (anche su Windows) e **senza** `run_in_background`: il server si stacca da solo, apre il browser ed esce.
- Nessun argomento: `node .claude/libs/scripts/console/server.js --background --project .`
- Un id (solo `a-z`, `0-9` e `-`): aggiungi `--dot <id>`. La console apre subito una sessione con quel Dot nel progetto corrente.
- `stop`: `node .claude/libs/scripts/console/server.js --stop` (ferma la console e le sue sessioni).
- Se la console è già attiva la riusa e riapre il browser: ne esiste una sola per utente. Se non conosce il progetto corrente e non ha sessioni aperte, riparte da sola con quel progetto; se ha sessioni aperte lo segnala con ⚠ e non cambia progetto.
- Se `scripts/console/server.js` non esiste in `.claude/libs`, la libreria installata è troppo vecchia: dillo e suggerisci di aggiornarla (`/lib-doctor`). Se `node` manca o il comando fallisce, riporta l'errore così com'è, senza riprovare in altri modi.
- Non salvare l'indirizzo (contiene il token) in file, memoria o commit.

## Output

Una riga: console avviata o riusata, indirizzo (serve se il browser non si apre), Dot aperto e come fermarla (`/dot stop`). ⚠️ se il progetto non è tra quelli che la console attiva conosce.
