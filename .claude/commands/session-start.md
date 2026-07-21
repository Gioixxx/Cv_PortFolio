# /session-start — Briefing sessione

## Input
1. `@.claude/memory/MEMORY.md` (sempre)
2. `@.claude/memory/sprint.md` (sempre, per stato sprint corrente)
3. `decisions.md`, `tech-debt.md` (su richiesta o se citati in MEMORY.md)
4. `git log --oneline -10`, `git status`, `git diff --stat`

## Sidecar Ollama

Chiama sempre `summarize_session` con la concatenazione di `git log --oneline -10`, `git status`,
`git diff --stat` ed eventuale ultima entry di `.claude/memory/session-log.md`, prima di
sintetizzare tu stesso: usa `summary` come bozza per "ultimo lavoro" e `open_points`/`next_steps`
come bozza per "dove ripartire" — integra la bozza con MEMORY.md e sprint.md. Salta solo se il
tool non è disponibile in sessione o la risposta segnala `ollama_unavailable: true`: in tal caso
**non** bloccare il briefing — sintetizza direttamente da git log e memoria.

## Regole
- Solo lettura — non modificare
- Sintetizza — leggibile in 30 secondi
- Evidenzia modifiche non committate
- Se memoria vuota, suggerisci `/remember`

## Output
Progetto, ultimo lavoro, stato working tree, sprint, tech debt, dove ripartire
