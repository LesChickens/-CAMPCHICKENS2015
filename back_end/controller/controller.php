<?php

//On inclut les models
require_once('include_models.php');
//On inclut la dao
require_once('include_dao.php');


/**
* Controlleur principal, il check les $_POST que l'on envoie en parametre de notre requette http ajax
* pour savoir quel model appelé
*/




//start new transaction
//$transaction = new Transaction();

//load row where primary key equal 3
$module = DAOFactory::getTeamDAO()->getAllTeams();
echo "test";