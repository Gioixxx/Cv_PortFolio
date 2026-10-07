---
description: "Debrief sessione"
disable-model-invocation: true
triggers: fine sessione | debrief sessione | session end
---
# /session-end — Debrief sessione

## Input
`git log --oneline --since="today"`, `git diff HEAD~5 HEAD`. `@.claude/memory/sprint.md`, `conventions.md`, `tech-debt.md`.
Chiama sempre `extract_tech_debt` con il diff per integrare item di tech debt nella proposta di
aggiornamento a `tech-debt.md`, e `summarize_session` (git log + status) come bozza per task
completati/in sospeso, prima di farlo tu a mano. Salta solo se il tool non è disponibile in
sessione o la risposta segnala `ollama_unavailable: true` (o `items: []` con `hint`): in tal caso
**non** bloccare il debrief — estrai eventuale tech debt a mano dal diff e continua.

## Regole
- Non scrivere senza conferma esplicita
- Non duplicare info esistenti
- Aggiorna "Ultimo aggiornamento" nei file
- Segnala se merita `/remember`

## Output
Task completati, in sospeso, aggiornamenti sprint.md/tech-debt.md/conventions.md proposti
