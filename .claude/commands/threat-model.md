---
description: "Threat modeling STRIDE"
argument-hint: <feature>
disable-model-invocation: true
---
# /threat-model — Threat modeling STRIDE

## Input
Descrizione feature. `@.claude/memory/decisions.md`, `domain.md`.

## Regole
- 5 step: Asset → Attori/Trust boundary → Data flow → Minacce STRIDE → Contromisure
- Minacce realistiche con scenario — no teoria
- Priorità = probabilità × impatto
- Contromisure specifiche per stack
- Se la feature integra LLM o agenti, aggiungi le minacce proprie (Top 10 for Agentic Applications 2026): goal hijack da testo di terzi, tool misuse, abuso di identità e privilegi, memory/context poisoning, comunicazione tra agenti, rogue agent
- Proponi salvataggio in decisions.md o docs/security/

## Output
Asset, attori, data flow, tabella STRIDE, contromisure per priorità, residual risk
