# `Règles métier`

# `Objectifs du projet (page 1)`

-   ✅ Un administrateur peut maintenir la liste officielle des jours fériés et la liste des RTT employeurs (jours de RTT imposées par l’employeur)
-   ✅ Un salarié peut saisir une demande de congé (congé payé, RTT employé ou congé sans solde)
-   ✅ Un manager peut valider la demande de congé de l’un de ses collaborateurs
-   ❌ Un salarié peut voir la liste de ses congés futurs et passés sur un composant type calendrier
-   ❌ Un manager peut voir pour une semaine donnée, la liste des collaborateurs présents et absents

# `Vocabulaire (page 1)`

-   Un jour férié est imposé par le gouvernement et correspond à une journée non travaillée.
-   ❌ Les congés payés sont au nombre de 25. Les salariés sont libres de les poser lorsqu’ils le souhaitent entre le lundi et le vendredi inclus.
-   ✅ Les RTT sont au nombre de 11 et sont des jours non travaillés supplémentaires. Il en existe 2 types :

    -   ✅ Les RTT employées, au nombre de 6, sont choisies par l’employé
    -   ✅ Les RTT employeurs, au nombre de 5, sont choisies par l’employeur.

# Ifn

-   Congés payés : 25 par salarié
    -   Disponible du lundi au vendredi
-   RTT : 11
    -   Employés : 6
    -   Employeurs : 5

# `Demande d'absence (page 4)`

-   ✅ une fois créée, ma demande est au statut INITIALE
-   ✅ La date de début, la date de fin et le type de congés sont obligatoires
-   ✅ _React_ : La date de fin est supérieure ou égale à la date de début
-   ✅ _React_ : Le motif est obligatoire si le type de congés est « Sans solde ».
-   ✅ _React_ : Une demande de congés ne doit pas chevaucher une autre demande de congés existante.
-   ✅ La date de début ne peut pas être un jour férié, une RTT employeur ou un week-end
-   ✅ La date de fin ne peut pas être un jour férié, une RTT employeur ou un week-end
-   ❌ Une demande d'absence ne modifie pas le solde des compteurs de congés. Cette opération est effectuée par le traitement de nuit.

# `Modification d'absence (page 5)`

-   ✅ On ne peut modifier que les demandes au statut INITIALE et REJETEE
-   ✅ Le motif n'est obligatoire que si le type de demande est "congés sans solde"
-   ✅ Une fois modifiée la demande revient au statut INITIALE

# `Suppression d'absence (page 6)`

OK
