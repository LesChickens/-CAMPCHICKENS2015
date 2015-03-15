<?php
/**
*   Classe qui implémente la DAO_TEAM, méthodes permettant de dialoguer avec le SGBD
*/
class dao_team_implementation implements dao_team_interface
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