---
description: "Verifica sicurezza OWASP Top 10:2025"
disable-model-invocation: true
disallowed-tools: Edit Write NotebookEdit
---
# /security-check — Verifica sicurezza OWASP Top 10:2025

## Input
Codice selezionato. `@.claude/memory/decisions.md` per contesto. Stack detection.

## Regole
- Checklist A01–A10 (2025): A01 Broken Access Control (include SSRF), A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging & Alerting Failures, A10 Mishandling of Exceptional Conditions
- A03, A06 e A09 si vedono solo in parte da un frammento di codice: scrivi "non verificabile qui" invece di inventare
- Se il codice integra LLM o agenti: aggiungi OWASP Top 10 for LLM Applications 2025 (prompt injection, output non validato, excessive agency, consumo illimitato) e Top 10 for Agentic Applications 2026 (goal hijack, tool misuse, privilegi eccessivi, memory poisoning) — vedi `stacks/ai-integration.md`
- Solo problemi reali — no ipotesi teoriche
- Distingui Alta/Media/Bassa
- Mostra sempre il fix

## Output
Problema + codice vulnerabile + fix per categoria, ✅ se nessun problema
