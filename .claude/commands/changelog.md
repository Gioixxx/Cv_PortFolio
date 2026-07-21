# /changelog — Genera CHANGELOG

## Input
`git tag`, `git log [tag]..HEAD` o `--since="data"`. `@.claude/memory/MEMORY.md` per versione.
Chiama sempre `draft_changelog_entry` (commit log + diff) per la bozza già strutturata
Breaking/Aggiunto/Corretto/Modificato, prima di scriverla tu; `summarize_diff` resta un
arricchimento facoltativo per le voci complesse, da usare a discrezione. Salta `draft_changelog_entry`
solo se il tool non è disponibile in sessione o la risposta segnala `ollama_unavailable: true`: in
tal caso usa il messaggio di commit come fonte primaria.

## Regole
- Formato Keep a Changelog: Breaking Change → Aggiunto → Corretto → Modificato
- Riscrivi commit in linguaggio naturale (utente)
- Ometti merge, bump versione, dipendenze minori
- Non inventare versione — usa quella indicata

## Output
Sezione CHANGELOG pronta, chiedi conferma prima di scrivere
