# Convenzioni Locali

Pattern e regole specifiche di questo progetto che divergono o integrano le librerie globali.
Caricate da Claude durante review e generazione di codice.

---

<!-- TEMPLATE PER NUOVA CONVENZIONE:

### [Nome convenzione]
**Contesto:** [quando si applica]
**Regola:** [descrizione precisa]
**Esempio:**
```
[codice o pattern concreto]
```
**Perché diverge dalle libs globali:** [motivazione — es. vincolo legacy, decisione team, requisito cliente]

-->

## Struttura cartelle

Il progetto segue una Clean Architecture, con una separazione dei layer (Domain, Application, Infrastructure, Presentation) come definito in `arch/clean-arch.md`. Ogni modulo di feature all'interno di un layer avrà la sua cartella dedicata.

## Naming

- I nomi dei file e delle classi seguono il PascalCase.
- I nomi delle interfacce iniziano con 'I'.
- Le classi di Command e Query nel layer Application terminano rispettivamente con `Command` e `Query`.
- Gli handler associati terminano con `Handler`.

## Pattern ricorrenti

- **CQRS con MediatR:** Per la gestione delle operazioni nel layer Application, seguendo il pattern Command Query Responsibility Segregation.
- **Repository Pattern:** Per l'accesso ai dati, con un'implementazione generica nel layer Infrastructure.

## Vincoli noti

[Limitazioni tecniche, dipendenze legacy, o aree del codice da non toccare senza consenso]
