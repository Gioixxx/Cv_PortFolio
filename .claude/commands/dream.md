---
description: "Consolida la memoria dalle sessioni recenti (look-back → clean-up → tell-me → apply)"
argument-hint: [apply | discard]
disable-model-invocation: true
triggers: dream | consolida la memoria | rivedi la proposta di memoria
---
# /dream — Consolida la memoria dalle sessioni recenti (look-back → clean-up → tell-me → apply)

## Input

Sottocomando opzionale: nessuno (mostra e verifica la proposta), `refresh` (la rigenera),
`apply` (applica le voci spuntate), `discard` (la scarta).
File: `.claude/memory/dream-proposal.md` (proposta), `.claude/memory/.dream/signals.json`
(segnali del look-back), `.claude/memory/.dream/state.json` (stato).

Il lavoro pesante lo fa `dream.ps1` col modello **locale**: look-back sui transcript e
clean-up. A fine sessione parte da solo (hook SessionEnd, feature `memoryDream`). Qui Claude
fa soltanto il **check** della proposta e l'**apply** delle voci che l'utente ha spuntato.

## Regole

- **Generare la proposta** (`/dream` senza proposta, con `status` diverso da `ok` o più vecchia
  di 24 ore, oppure `/dream refresh`):
  `powershell -NoProfile -ExecutionPolicy Bypass -File .claude/libs/scripts/memory/dream.ps1 -Force`
  (fuori da Windows: `bash .claude/libs/scripts/memory/dream.sh --force`). Può richiedere
  qualche minuto: timeout di 10 minuti. Exit 3 = c'è già una proposta con voci spuntate →
  proponi `/dream apply` o `/dream discard`, non rigenerare. Se lo stato è
  `llm_unavailable`, dillo: la proposta contiene solo segnali e note orfane. Non scrivere tu
  le voci al posto del modello locale.
- **Check di Claude** (sempre, dopo aver ottenuto la proposta). Per ogni voce `### D<n>`:
  1. leggi in `signals.json` le sole evidenze citate e, del file bersaglio, solo la sezione
     pertinente (Grep, non il file intero se è grande). **Mai** rileggere i transcript;
  2. verdetto: ✅ confermata · ⚠️ da rivedere · ❌ scartata. Si scarta se l'evidenza non
     sostiene una regola **durevole** (richiesta una tantum), se la memoria dice già la stessa
     cosa (cerca anche nelle altre note e nell'indice `MEMORY.md`), se una "risoluzione" fa
     prevalere l'affermazione più vecchia, o se il testo aggiunge fatti che non stanno né
     nelle evidenze né nel file;
  3. scrivi il verdetto con il motivo **nella proposta**, sostituendo la riga
     `- Check di Claude: _da fare_`. Se la voce è giusta ma il testo è debole, riscrivi il
     blocco `Testo proposto` e segnalalo nel verdetto ("testo riscritto da Claude");
  4. aggiorna la riga del Tell-me `Check di Claude: …` con i conteggi (es. `2 ✅, 1 ⚠️, 3 ❌`).
  Non spuntare caselle e non toccare nessun altro file: la proposta è l'unica cosa che il
  check modifica.
- **Apply** (`/dream apply`): solo le voci `- [x]`. Rifiuta quelle ❌ (a meno che l'utente
  insista), e i bersagli `sprint.md`, `tech-debt.md`, `MEMORY.md`, `session-log.md` di
  progetto: `sprint.md` e `tech-debt.md` li riscrive l'hook post-commit di `memory-sync`
  (per quelli c'è `/sprint`). Mappa dei bersagli:
  - `progetto:<file>.md` → `.claude/memory/<file>.md`; rispetta frontmatter e wikilink
    `[[...]]` del vault (`@.claude/libs/workflows/obsidian-vault.md`), aggiorna `updated:`;
  - `auto:<file>.md` → auto-memory di Claude Code (`~/.claude/projects/<slug>/memory/`,
    slug = path del progetto con i non-alfanumerici sostituiti da `-`). Una nota nuova ha
    frontmatter `name` (nome del file senza `.md`), `description` (una riga) e
    `metadata.type` (il `Tipo` della voce, `feedback` se manca), e nel `MEMORY.md` della
    stessa cartella una riga di indice nel formato delle altre (titolo linkato al file, poi
    ` — ` e la descrizione).
  Azioni: `recupera` aggiunge il testo nella sezione pertinente; `aggiorna`, `unisci` e
  `risolvi` sostituiscono il `Testo attuale` con il `Testo proposto`; `rimuovi` elimina il
  `Testo attuale`. Il testo attuale è citato con spazi ed enfasi normalizzati: individua il
  passo reale nel file prima di modificarlo.
- **Una sola conferma**: mostra tutte le modifiche come diff in un unico messaggio e chiedi
  un sì esplicito prima di scrivere (`@.claude/libs/workflows/documentation.md`). Poi applica
  con Edit/Write e chiudi con
  `powershell -NoProfile -ExecutionPolicy Bypass -File .claude/libs/scripts/memory/dream.ps1 -MarkApplied`
  (archivia la proposta in `.dream/archive/` e fissa la finestra del prossimo look-back).
- **Discard** (`/dream discard`): dopo conferma, solo `dream.ps1 -MarkApplied`.
- `dream.ps1` non scrive mai la memoria e non va modificato da questo comando.

## Output

Tell-me di al massimo 10 righe con il path della proposta e i conteggi del check; in `apply`,
l'elenco dei file modificati. Se l'utente rifiuta: "nessuna modifica applicata".
