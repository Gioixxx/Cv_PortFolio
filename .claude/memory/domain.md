# Dominio e Glossario

Termini, entità e regole di business specifici di questo progetto.
Usato da Claude per interpretare correttamente le richieste nel contesto del dominio.

---

## Entità principali

### Candidato
**Descrizione:** La persona proprietaria del CV e del Portfolio.
**Attributi chiave:** Nome, Cognome, Contatti (Email, Telefono), Residenza.
**Regole:** Un Candidato deve avere un nome e un contatto valido.
**Relazioni:** Ha N EsperienzeLavorative, N Formazioni, N Progetti, N Competenze.

### EsperienzaLavorativa
**Descrizione:** Un periodo di impiego o collaborazione del Candidato.
**Attributi chiave:** Titolo, Azienda, DataInizio, DataFine (opzionale), DescrizioneRuolo.
**Regole:** DataInizio deve essere precedente a DataFine se presente.
**Relazioni:** Appartiene a 1 Candidato.

### Formazione
**Descrizione:** Un percorso di studi o formazione accademica/professionale del Candidato.
**Attributi chiave:** Titolo, Istituto, DataInizio, DataFine (opzionale), DescrizioneCorso.
**Regole:** DataInizio deve essere precedente a DataFine se presente.
**Relazioni:** Appartiene a 1 Candidato.

### Progetto
**Descrizione:** Un progetto realizzato dal Candidato, incluso nel portfolio.
**Attributi chiave:** Nome, DescrizioneBreve, RuoloNelProgetto, Link (opzionale), Immagini (opzionale).
**Regole:** Ogni progetto deve avere un nome e una descrizione.
**Relazioni:** Appartiene a 1 Candidato.

### Competenza
**Descrizione:** Un'abilità o conoscenza specifica posseduta dal Candidato.
**Attributi chiave:** NomeCompetenza, Livello (es. Base, Intermedio, Avanzato), Categoria (es. Programmazione, Design, Lingue).
**Regole:** Ogni competenza deve avere un nome.
**Relazioni:** Appartiene a 1 Candidato.

## Glossario

<!-- Termini del dominio che potrebbero essere ambigui o specifici di questo progetto:
| Termine | Definizione nel contesto del progetto |
|---------|---------------------------------------|
| [termine] | [definizione precisa] |
-->

| Termine            | Definizione                                    |
|--------------------|------------------------------------------------|
| CV                 | Curriculum Vitae, documento riassuntivo del Candidato. |
| Portfolio          | Raccolta di lavori e progetti del Candidato.   |
| Utente             | Il visitatore che consulta il Cv_PortFolio.   |
| Admin              | L'utente proprietario che gestisce il Cv_PortFolio. |

## Regole di business

<!-- Regole che il codice deve rispettare, espresse in linguaggio di dominio:
- [Regola 1: es. "Un ordine può essere cancellato solo se è in stato PENDING"]
- [Regola 2]
-->

- Il Candidato deve poter modificare le proprie informazioni personali, esperienze, formazioni, progetti e competenze.
- Il Portfolio deve essere visualizzabile pubblicamente o tramite un link dedicato.
- Tutte le date di inizio devono essere precedenti o uguali alle date di fine (se presenti) per esperienze e formazioni.

## Flussi principali

### Gestione Profilo (Admin)
1. L'Admin accede al pannello di gestione.
2. L'Admin visualizza e modifica le proprie informazioni (Candidato).
3. L'Admin aggiunge, modifica o elimina Esperienze Lavorative.
4. L'Admin aggiunge, modifica o elimina Formazioni.
5. L'Admin aggiunge, modifica o elimina Progetti.
6. L'Admin aggiunge, modifica o elimina Competenze.

### Visualizzazione Portfolio (Utente)
1. L'Utente visita l'URL del Portfolio.
2. L'Utente visualizza le informazioni del Candidato.
3. L'Utente naviga tra Esperienze, Formazioni, Progetti e Competenze.
4. L'Utente può cliccare sui link dei progetti per maggiori dettagli (se presenti).
