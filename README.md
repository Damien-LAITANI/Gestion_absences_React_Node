# `Projet final Diginamic`

[Trello](https://trello.com/b/n3ftyVDE/projet-final)

## `Documentation`

-   [Mongoose](https://mongoosejs.com/docs/guide.html)

-   [Icônes Bootstrap](https://icons.getbootstrap.com/)

-   [React](https://reactjs.org/docs/getting-started.html)

-   [React Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

## `Dévellopeurs`

-   `Damien` : d.laitani@gmail.com

-   `Otmane` : otmane.boujlam@gmail.com

-   `Valentin` : valentin.silvestre@hotmail.com

## `Entitées`

-   User :

    -   firstname: string
    -   lastname: string
    -   email: string
    -   password: string
    -   userRoles: 'Admin'| 'Manager'| 'Employee'
    -   position ?: string
    -   profilPicture: string
    -   superiorId: string // ID
    -   employeesId: string[] // ID[]
    -   absences: Absence[]

-   Absence :
    -   startDate: Date
    -   endDate: Date
    -   types: 'congé payé'| 'RTT' |'congé sans solde'
    -   motif: string
    -   status: 'INITIALE'| 'EN_ATTENTE_VALIDATION'| 'VALIDEE'| 'REJETEE'
