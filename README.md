# `Projet final Diginamic`

[Trello](https://trello.com/b/n3ftyVDE/projet-final)

## `Dévellopeurs`

-   `Damien` : d.laitani@gmail.com

-   `Otmane` : otmane.boujlam@gmail.com

-   `Valentin` : valentin.silvestre@hotmail.com


## `Entitées`

- User :
  - firstname: string
  - lastname: string
  - email: string
  - password: string
  - roles: 'Admin'| 'Manager'| 'Employee'
  - poste ?: string
  - avatar: string

- Absence :
  - startDate: Date
  - endDate: Date
  - types: 'congé payé', RTT, 'congé sans solde'
  - motif: string
  - status: 'INITIALE'| 'EN_ATTENTE_VALIDATION'| 'VALIDEE'| 'REJETEE'
