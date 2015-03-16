<?php
/**
* Vue teams qui parse les infos de la BD en JSON et qui fait un echo du JSON généré
*/

$teams_array=array();
$members_by_team=array();
/**/
//On trie les membres par team dans une array
foreach ($members as $member){
    //On créé un array contenant toutes les infos du membre
    $var=array('id' => $member->getId(),'name' => $member->getName(),'firstName' => $member->getFirstName());
    //On ajoute le membre dans l'array à l'index correspondant à son id d'équipe
    $members_by_team[$member->getTeamId()]=$var;
}


//On construit un array contenant toutes les teams
foreach ($teams as $team){

   // print_r($team->getMembers());
    //On store chaque team dans un array contenant son id, nom et un array de membres
    $var=array('teamId' => $team->getId(),'teamName' => $team->getName());
   // $var= $var+array('teamMember' => $members_by_team[1]);
    array_merge($var,array('teamMember' => $members_by_team[1]));
    array_push($teams_array,$var);
    //$teams_array[]=$var;
}

echo json_encode($teams_array);

?>