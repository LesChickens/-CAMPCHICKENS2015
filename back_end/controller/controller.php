<?php

//On inclut les models
require_once('include_models.php');
//On inclut la dao
require_once('include_dao.php');

//start new transaction
$transaction = new Transaction();

/**
* Controlleur principal, il check les $_POST que l'on envoie en parametre de notre requette http ajax
* pour savoir quel model appelé
*/

if (isset($_POST["team"]) && !empty($_POST["team"])) {

    if ($_POST["team"] == "all") {
        //On va chercher la liste de toutes les équipes
        $teams = DAOFactory::getTeamDAO()->getAllTeams();
        //On charge la vue qui se charge de générer le JSON pour le front end
        require_once('../view/team_view.php');
    }
}






