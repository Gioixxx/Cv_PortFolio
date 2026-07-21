# /review — Code review

## Input
Codice selezionato o file corrente. `@.claude/memory/conventions.md`.
Se la review parte da un diff, chiama sempre `review_diff` come primo passaggio, prima di scrivere
tu i finding: **verifica** ogni finding sul codice prima di riportarlo, mai riportarlo cieco. Salta
solo se il tool non è disponibile in sessione o la risposta segnala `ollama_unavailable: true`: in
tal caso procedi con la review diretta.

## Regole
- Max 10 punti totali — prioritizza
- Mostra sempre codice corretto, non solo critica
- Sii diretto — no commenti vaghi
- Se codice corretto, dillo chiaramente

## Output
✅ Cosa va bene, ⚠️ Miglioramenti (con fix), ❌ Bloccanti, 💡 Suggerimenti opzionali
