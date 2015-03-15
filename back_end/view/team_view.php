<?php
/**
* Vue teams qui parse les infos de la BD en JSON et qui fait un echo du JSON généré
*/

$teams_array=array();
foreach ($teams as $team){
    $var=array('teamId' => $team->getId(),'teamName' => $team->getName(),'teamMember' => '');
    array_push($teams_array,$var);
}

echo json_encode($teams_array);

?>