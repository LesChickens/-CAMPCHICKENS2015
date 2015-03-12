<?php

$data = array(
        array('teamName' => 'équipe 1','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 2','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 3','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 4','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
        array('teamName' => 'équipe 5','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))));

$json = json_encode($data);

 echo $json;

 ?>
