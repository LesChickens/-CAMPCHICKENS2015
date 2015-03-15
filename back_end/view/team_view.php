<?php
/**
* Vue teams qui parse les infos de la BD en JSON et qui fait un echo du JSON généré
*/


//On parse les informations de la BD en JSON
var json = json_encode($data_from_db);
//On retourne le JSON
echo json;

?>