<?php
/**
*   Classe qui implémente la DAO_TEAM, méthodes permettant de dialoguer avec le SGBD
*/
class Dao_Team_Implementation implements Dao_Team_Interface
{
   /**
   * Insert une équipe dans la BD
   */
   public function insertTeam(Team $team){

   }

   /**
   * Supprime une équipe d'un team
   */
   public function deleteTeam($id){

   }

   /**
   * Modifie un team
   */
   public function updateTeam($id){

   }

   /**
   * retourne le team dont l'id a été âssé en parametre
   */
   public function getTeam($id){

   }

   /**
   * Retourne toute la liste des team
   */
   public function getAllTeams(){

    $sql = 'SELECT * FROM team';
    $sqlQuery = new SqlQuery($sql);
    return $this->getList($sqlQuery);
/*
    $data = array(
               array('teamName' => 'équipe 1','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
               array('teamName' => 'équipe 2','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
               array('teamName' => 'équipe 3','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
               array('teamName' => 'équipe 4','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))),
               array('teamName' => 'équipe 5','members' => array( array('name' => 'nom1'),array('name' => 'nom2'),array('name' => 'nom3'))));

    return $data;
    */
   }

   /**
   * Ajout un membre a un team
   */
   public function addMember($idTeam,Member $Member){

   }

   /**
   * Supprime un membre de la team
   */
   public function removeMember($idTeam,Member $Member){

   }

    /**
     * Fonction qui créée un objet Team avec les données d'un record en BD de la table team
     *
     * @param
     * @return Team
     */
    protected function readRow($row){
        $team = new Team();

        $team->setId($row['id']);
        $team->setName($row['name']);

        return $team;
    }

    protected function getList($sqlQuery){
        $tab = QueryExecutor::execute($sqlQuery);
        $ret = array();
        for($i=0;$i<count($tab);$i++){
            $ret[$i] = $this->readRow($tab[$i]);
        }
        return $ret;
    }

    /**
     * Get row
     *
     * @return BannerfinishMySql
     */
    protected function getRow($sqlQuery){
        $tab = QueryExecutor::execute($sqlQuery);
        if(count($tab)==0){
            return null;
        }
        return $this->readRow($tab[0]);
    }

    /**
     * Execute sql query
     */
    protected function execute($sqlQuery){
        return QueryExecutor::execute($sqlQuery);
    }


    /**
     * Execute sql query
     */
    protected function executeUpdate($sqlQuery){
        return QueryExecutor::executeUpdate($sqlQuery);
    }

    /**
     * Query for one row and one column
     */
    protected function querySingleResult($sqlQuery){
        return QueryExecutor::queryForString($sqlQuery);
    }

    /**
     * Insert row to table
     */
    protected function executeInsert($sqlQuery){
        return QueryExecutor::executeInsert($sqlQuery);
    }
}
?>