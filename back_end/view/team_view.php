<?php
/**
* Vue teams qui parse les infos de la BD en JSON et qui fait un echo du JSON généré
*/

//array utilisé pour stoker la liste des teams
$teams_array=array();

//array utilisé comme une map, l'index correspond à l'id d'un team
$members_by_team=array();

//On ajoute chaque membre dans members_by_team à l'index de l'id de son team
//A chaque index on a un array contenant les membres du team. Chaque membre est stocké dans l'array de membres sous la forme d'un array contenant id, name et firstname.
foreach ($members as $member){

    //On créé un array contenant toutes les infos du membre
    $var=array('id' => $member->getId(),'name' => $member->getName(),'firstname' => $member->getFirstName() );//$member->getFirstName()

    //On ajoute le membre dans l'array à l'index correspondant à son id d'équipe
    if($members_by_team[$member->getTeamId()]==null){

        //si c'est le premier membre à être ajouter, on l'englobe dans un array afin de pouvoir ajouter d'autres membres par la suite
        $members_by_team[$member->getTeamId()]=array($var);
    }
    else{
        //s'il y a déja un/des membre(s), on ajoute notre membre à l'array de membres du team
        array_push($members_by_team[$member->getTeamId()],$var);
    }
}

//On construit un array contenant toutes les teams
foreach ($teams as $team){
    //On set au team sa liste de membre avant
    $team->setMembers($members_by_team[$team->getId()]);

    //On stoke chaque team dans un array contenant son id, nom et l'array de membres qu'on vient de lui setter
    $var=array('teamId' => $team->getId(),'teamName' => $team->getName(),'teamMembers' => $team->getMembers());

    //On ajoute le team courant à la liste des teams
    array_push($teams_array,$var);
}

//On transforme nos array imbriqués en JSON
$json=json_encode($teams_array);


echo $json;

