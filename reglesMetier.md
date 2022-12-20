# `Règles métier`

# `Objectifs du projet (page 1)`

-   ✅ Un administrateur peut maintenir la liste officielle des jours fériés et la liste des RTT employeurs (jours de RTT imposées par l’employeur)
-   ✅ Un salarié peut saisir une demande de congé (congé payé, RTT employé ou congé sans solde)
-   ✅ Un manager peut valider la demande de congé de l’un de ses collaborateurs
-   ✅ Un salarié peut voir la liste de ses congés futurs et passés sur un composant type calendrier
-   ❌ Un manager peut voir pour une semaine donnée, la liste des collaborateurs présents et absents

# `Vocabulaire (page 1)`

-   Un jour férié est imposé par le gouvernement et correspond à une journée non travaillée.
-   ✅ Les congés payés sont au nombre de 25. Les salariés sont libres de les poser lorsqu’ils le souhaitent entre le lundi et le vendredi inclus.
-   ✅ Les RTT sont au nombre de 11 et sont des jours non travaillés supplémentaires. Il en existe 2 types :

    -   ✅ Les RTT employées, au nombre de 6, sont choisies par l’employé
    -   ❌ Les RTT employeurs, au nombre de 5, sont choisies par l’employeur.

# `Demande d'absence (page 4)`

-   ✅ une fois créée, ma demande est au statut INITIALE
-   ✅ La date de début, la date de fin et le type de congés sont obligatoires
-   ✅ _React_ : La date de fin est supérieure ou égale à la date de début
-   ✅ _React_ : Le motif est obligatoire si le type de congés est « Sans solde ».
-   ✅ _React_ : Une demande de congés ne doit pas chevaucher une autre demande de congés existante.
-   ✅ La date de début ne peut pas être un jour férié, une RTT employeur ou un week-end
-   ✅ La date de fin ne peut pas être un jour férié, une RTT employeur ou un week-end
-   ✅ Une demande d'absence ne modifie pas le solde des compteurs de congés. Cette opération est effectuée par le traitement de nuit.

# `Modification d'absence (page 5)`

-   ✅ On ne peut modifier que les demandes au statut INITIALE et REJETEE
-   ✅ Le motif n'est obligatoire que si le type de demande est "congés sans solde"
-   ✅ Une fois modifiée la demande revient au statut INITIALE

# `Suppression d'absence (page 6)`

-   ✅ On (employé) ne peut supprimer que les demandes au statut INITIALE et REJETEE

# `Visualiser les jours fériés et RTT employeur (page 7)`

-   ❌ En tant que collaborateur, quel que soit le profil, j'ai accès à la liste des jours fériés et RTT employeur.
-   ✅ Un admin peut ajouter, modifier et supprimer, un jour férié ou une RTT employeur

# `Ajouter un jour férié ou RTT employeur (page 8)`

-   ✅ Un jour férié, ou RTT employeur, ne peut pas être saisi dans le passé
-   ✅ Il est interdit de saisir un jour férié ou RTT employeur à la même date qu'un autre jour férié
-   ✅ Il est autorisé de saisir un jour férié un samedi ou un dimanche
-   ✅ Il est interdit de saisir une RTT employeur un samedi ou un dimanche
-   ✅ Si une RTT employeur est créée alors le système créé une demande d'absence au statut INITIALE. Cette demande sera traitée lors du passage du batch de nuit.

# `Modifier un jour férié ou RTT employeur (page 8)`

-   ✅ Il n'est pas possible de modifier une RTT employeur VALIDEE

# `Supprimer un jour férié ou RTT employeur (page 8 - 9)`

-   ✅ Il n'est pas possible de supprimer un jour férié ou une RTT employeur dans le passé
-   ❌ Si on supprime une RTT employeur validée, il faut recréditer une journée de RTT à tous les salariés.

# `Traitement de nuit (page 10)`

-   [?] S'il reste assez de jours pour le type d'absence demandé, la demande passe au statut EN_ATTENTE_VALIDATION et le compteur du collaborateur est décrémenté du nb de jours correspondant (ou au moment de la validation par le manager). Un mail de demande de validation est envoyé au manager de l'employé.
-   [?] S'il ne reste pas assez de jours alors la demande est rejetée: elle passe au statut REJETEE.

# `Valider ou Refuser une demande d’absence (page 10)`

-   ✅ Je (manager) peut valider une demande. Dans ce cas la demande correspondante passe au statut VALIDEE
-   ✅ Je (manager) peut rejeter une demande. Dans ce cas la demande correspondante passe au statut REJETEE. ❌ Le compteur du collaborateur est incrémenté du nombre de jours correspondant.

# `Visualiser mon planning des absences (page 11)`

## Règles métier:

-   ✅ Le planning affiche les absences pour un mois donné
-   ✅ Les jours fériés apparaissent dans une couleur différente des absences gérées par l'utilisateur
-   ❌ Le solde des congés payés et des RTT est affiché.

## Je peux effectuer les actions suivantes:

-   ✅ Changer d'année dans le futur ou le passé
-   ✅ Changer de mois dans le futur ou le passé

# `Vue par département et par jour: (page 12)`

En tant que manager j'ai la possibilité de visualiser 2 rapports différents:

-   ❌ La vue par département et par jour
-   ❌ Histogramme par département et par jour

# `Vue par département et par jour: (page 12)`

-   ❌ En tant que manager j'ai la possibilité de visualiser le rapport « vue par département et par jour »

# `Histogramme par département et par jour: (page 13)`

-   ❌ En tant que manager j'ai la possibilité de visualiser le rapport "Histogramme par département et par jour".
-   ❌ Règles métier
