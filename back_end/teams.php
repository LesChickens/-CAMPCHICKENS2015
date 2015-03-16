<?php
/*
$data = array(
        array('teamName' => 'équipe 1','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 2','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 3','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 4','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 5','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))));*/

$team=array();
$team[1]=array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'));
$team[2]=array( array('name' => 'nom8'),array('name' => 'nom8'),array('name' => 'nom8'));

$data = array();
$data[]= array('teamName' => 'équipe 1','members' => $team[1]);
$data[]= array('teamName' => 'équipe 2','members' => $team[2]);

$json = json_encode($data);

echo $json;

?>
