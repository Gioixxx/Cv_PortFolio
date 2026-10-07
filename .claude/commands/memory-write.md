---
description: "Bozza guidata di una nota di memoria via Ollama, scritta solo dopo conferma"
argument-hint: <file di memoria> <istruzione>
disable-model-invocation: true
---
# /memory-write — Bozza guidata di una nota di memoria via Ollama, scritta solo dopo conferma

## Input

File di memoria target sotto `.claude/memory/` (es. `domain.md`, `decisions.md`) e istruzione
libera dell'utente su cosa aggiungere o modificare. Opzionale: righe `@ref` di contesto extra
(es. `@src/domain/Order.cs`) da passare al modello insieme al file.
`@.claude/memory/MEMORY.md` per contesto progetto.

## Regole

- Genera la bozza SOLO chiamando lo script dedicato — mai un tool MCP del sidecar Ollama (i suoi
  9 tool restituiscono JSON bounded, non full-file markdown, vedi
  `@.claude/libs/docs/promptops-ollama-arch.md`):
  `bash .claude/libs/scripts/memory/memory-write.sh --target <file.md> --instruction "<istruzione>" [--context "<righe @ref>"]`
- Se lo script esce con codice diverso da 0, fermati e segnalalo all'utente: non generare tu la
  bozza al posto del modello senza dichiararlo esplicitamente. Codici su stderr:
  `bad_input` (exit 2 — target fuori da `.claude/memory/`, oppure `sprint.md`/`tech-debt.md`, che
  sono riscritti dall'hook post-commit di `memory-sync.ps1`: per quelli usa `/sprint`),
  `ollama_unreachable_or_empty` / `empty_response` / `implausible_draft` (exit 1 — quest'ultimo
  significa che la bozza perdeva contenuto esistente ed è stata scartata prima di mostrartela).
- Mostra SEMPRE la bozza come diff rispetto al contenuto attuale del file (se esiste) e chiedi
  conferma esplicita prima di qualunque scrittura.
- **Non scrivere mai senza un sì esplicito dell'utente** (principio in
  `@.claude/libs/workflows/documentation.md`). Solo dopo la conferma, applica la bozza sul file
  reale in `.claude/memory/` con Edit/Write.
- **Non tocca mai** `scripts/memory/dream.ps1` né altro di `/dream` (il consolidamento a fine
  sessione), né `scripts/memory/memory-sync.ps1`/`.sh`: percorso separato, solo su richiesta
  esplicita dell'utente via questo comando, mai pianificato o schedulato.
- Rispetta le convenzioni del vault (frontmatter `type/tags/updated`, wikilink `[[nome]]`):
  `@.claude/libs/workflows/obsidian-vault.md`.
- Se la bozza sembra introdurre fatti non presenti nell'istruzione o nel contesto, segnalalo
  prima di chiedere conferma invece di scriverli silenziosamente.

## Output

Bozza mostrata come diff, esito della richiesta di conferma, e conferma finale di cosa è stato
scritto — oppure "nessuna modifica applicata" se l'utente rifiuta.
