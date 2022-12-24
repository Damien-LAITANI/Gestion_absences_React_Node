# `Respire`

## `Informations`

Projet final de la formation [JS Fullstack](https://www.diginamic.fr/catalogue/developpement-web-et-mobile/formation-developpeur-fullstack-js/) à Diginamic.

Il fallait réaliser le projet en trinôme, grâce à ce que l'on avait appris avec React et Node.

On a beaucoup fait de <abbr title="Plusieurs développeurs travaillent ensemble sur un même poste de travail.">programmation par pairs</abbr>, environ 40% du temps. Le reste était du travail individuel mais dans la même pièce.

**Date** : 13 au 21 décembre 2022

**Durée** : 7 jours ouvrés

### `Objectif`

Réaliser une application de gestion des demandes de congés pour une société.

[Sujet complet](./sujet.pdf)

## `Outils`

-   Github
-   Trello
-   React
-   Node

## `Liens`

[Trello](https://trello.com/b/n3ftyVDE/projet-final)

[Github](https://github.com/ValentinSILVESTRE/Respire)

## `Participants`

-   **_`Damien LAITANI`_**

    -   Email : *d.laitani@gmail.com*
    -   [Linkedin](https://www.linkedin.com/in/damien-laitani/)

-   **_`Otmane BOUJLAM`_**

    -   Email : *otmane.boujlam@gmail.com*
    -   [Linkedin](https://www.linkedin.com/in/otmaneboujlam/)

-   **_`Valentin SILVESTRE`_**
    -   Email : *valentin.silvestre@hotmail.com*
    -   [Linkedin](https://www.linkedin.com/feed/)

## `Installation`

Pour utiliser le projet il faut tout d'abord installer [NodeJS](https://nodejs.org/en/).

Ensuite on installe les dépendances de React et de Node séparément:

-   `cd ~/.../Respire/app-react && npm install`
-   `cd ~/.../Respire/api-node && npm install`

Puis on lance le serveur node sur le port 3000 (choix par défaut) :

-   `cd ~/.../Respire/api-node && npm start`

On fait de même pour React :

-   `cd ~/.../Respire/app-react && npm start`

Le port 3000 étant utilisé il vous proposera le port 3001.

Pour accéder à l'application il faudra vous rendre depuis votre navigateur à l'addresse suivante : http://localhost:3001/

Enfin pour connecter l'application à une base de donnée, on a utilisé mongodb dans le fichier **_api-node/src/controllers/ConnectController.ts_**, il faudra donc créé une collection `absenceApp` qui tourne à cette addresse.

Pour finir il vous faudra vous connecter avec les utilisateurs que nous avons manuellement créé car il n'est pas possible de s'inscrire.
Voici leurs identifiants :
|Email|Mot de passe|Rôle|
| - | - | - |
| admin@gmail.com | admin | admin |
| manager@gmail.com | admin | manager |
| damien@gmail.com | admin | employé |
| otmane@gmail.com | admin | employé |
| valentin@gmail.com | admin | employé |
