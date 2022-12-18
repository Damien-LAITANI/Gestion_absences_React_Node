# `Entitées`

-   **`User`** :

    -   **firstname** : string
    -   **lastname** : string
    -   **email** : string
    -   **password** : string
    -   **userRoles** : 'Admin' ou 'Manager' ou 'Employee'
    -   **position** : string ou null
    -   **profilPicture** : string
    -   **superiorId** : string
    -   **employeesId** : string[]
    -   **absences** : Absence[]

-   **`Absence`** :

    -   **startDate** : Date
    -   **endDate** : Date
    -   **type** : 'congé payé' ou 'RTT' ou 'congé sans solde'
    -   **motif** : string
    -   **status** : 'INITIALE' ou 'EN_ATTENTE_VALIDATION' ou 'VALIDEE' ou 'REJETEE'

-   **`Holiday`** :
    -   **date** : Date
    -   **type** : 'congé payé' ou 'RTT' ou 'congé sans solde'
    -   **weekday** : 'lundi' ou 'mardi' ou 'mercredi' ou 'jeudi' ou 'vendredi' ou 'samedi' ou 'dimanche'
    -   **comment** : 'INITIALE' ou 'EN_ATTENTE_VALIDATION' ou 'VALIDEE' ou 'REJETEE'
