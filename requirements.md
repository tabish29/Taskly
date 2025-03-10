## Descrizione Generale

Realizzare una to-do list avanzata che consenta agli utenti di:
- Creare, leggere, aggiornare e cancellare attività (CRUD).
- Organizzare le attività in categorie.
- Filtrare le attività per categoria o stato (completata/non completata).
- Salvare le attività in un database.

## Specifiche Tecniche

### Backend: Spring Boot

#### Tecnologie richieste:
- Java 21.
- Spring Boot (con Gradle).
- JPA/Hibernate per l'accesso ai dati.
- Un database relazionale (H2, PostgreSQL o MySQL).
- Spring Web per API REST.
- Spring Validation per la gestione della validazione degli input.

#### API richieste:
- `GET /tasks` - Restituisce tutte le attività.
- `POST /tasks` - Crea una nuova attività.
- `PUT /tasks/{id}` - Aggiorna un'attività esistente.
- `DELETE /tasks/{id}` - Elimina un'attività.
- `GET /categories` - Restituisce tutte le categorie.
- `POST /categories` - Aggiunge una nuova categoria.

#### Requisiti funzionali:
- Un'attività deve avere: `id`, `title`, `description`, `categoryId`, `completed` (boolean), `dueDate`.
- Una categoria deve avere: `id`, `name`.
- Validare che `title` sia obbligatorio e non vuoto.
- Gestire gli errori con risposte HTTP significative (ad esempio, `400` per input errati, `404` per risorse non trovate).

#### Persistenza:
- Utilizzare un database per salvare le attività e le categorie.
- Configurare una migrazione iniziale con uno schema predefinito usando Flyway o Liquibase (facoltativo).

### Frontend: Angular

#### Tecnologie richieste:
- Angular 16+.
- Angular Material o Bootstrap per la grafica (facoltativo).
- HttpClient per la comunicazione con il backend.
- Reactive Forms per la gestione dei moduli (facoltativo).

#### Funzionalità richieste:
- **Visualizzazione attività**: Una schermata che elenca tutte le attività con possibilità di filtrare per categoria o stato.
- **Creazione attività**: Un modulo per creare una nuova attività.
- **Aggiornamento attività**: Un modulo per aggiornare un'attività esistente.
- **Eliminazione attività**: Un pulsante che consente di eliminare un'attività.
- **Gestione categorie**: Una schermata separata per aggiungere nuove categorie e visualizzare quelle esistenti.

#### Requisiti visivi:
- Fornire feedback all'utente, come notifiche di successo o errori.
