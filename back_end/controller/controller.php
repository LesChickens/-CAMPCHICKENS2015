<?php

// On inclut les models
require_once('include_models.php');
// On inclut la dao
require_once('include_dao.php');

// Start new transaction
$transaction = new Transaction();

// Contrôleur principal, il check les $_POST que l'on envoie en parametre de notre requette http ajax pour savoir quel modèle appeler
$_POST["team"]="all";
if (isset($_POST["team"]) && !empty($_POST["team"])) {
	if ($_POST["team"] == "all") {
		// On va chercher la liste de toutes les équipes
		$teams = DAOFactory::getTeamDAO()->getAllTeams();

		// On récupère tous les membres appartenant à une team
		$members = DAOFactory::getMemberDAO()->getAllTeamMembers();
		
		//On charge la vue qui se charge de générer le JSON pour le front end
		require_once('../view/team_view.php');
	}
}
else {
	echo "error";
}
