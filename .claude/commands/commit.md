---
description: "Genera messaggio di commit"
disable-model-invocation: true
triggers: messaggio commit | conventional commit | genera commit
---
# /commit — Genera messaggio di commit

## Input
`git diff --staged` o `git diff`. `@.claude/memory/conventions.md` per convenzioni commit.
Chiama sempre `draft_commit_message` con il diff per una bozza conventional-commit, prima di
scriverla tu, poi rifiniscila rispetto a `conventions.md`. Salta solo se il tool non è disponibile
in sessione o la risposta segnala `ollama_unavailable: true`: in tal caso genera il messaggio
direttamente dal diff.

## Regole
- Solo output — non eseguire commit
- Formato Conventional Commits (type(scope): descrizione)
- Spiega il PERCHÉ, non il COSA
- Suggerisci split se modifiche eccessive

## Output
Messaggio pronto per copia/incolla, multipli se necessario
