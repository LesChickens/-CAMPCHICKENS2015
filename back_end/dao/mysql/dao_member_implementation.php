<?php
/**
 * User: César
 * Date: 15-03-15
 * Time: 01:48
 */

class dao_member_implementation {

    /**
     * méthode qui retourne la liste des membres de la team dont l'id est passé en parametre
     * @param id de l'équipe
     */
    public function getTeamMembers($idTeam){

        $sql = 'SELECT * FROM member WHERE idTeam = ?';
        $sqlQuery = new SqlQuery($sql);
        $sqlQuery->setNumber($idTeam);
        return $this->getList($sqlQuery);

    }

    /**
     * méthode qui retourne la liste des membres appartenant à une team
     */
    public function getAllTeamMembers(){

        $sql = 'SELECT * FROM member WHERE idTeam IS NOT NULL';
        $sqlQuery = new SqlQuery($sql);
        return $this->getList($sqlQuery);
    }



    /**
     * Fonction qui créée un objet Membre avec les données d'un record en BD de la table team
     *
     * @param
     * @return Membre
     */
    protected function readRow($row){
        $member = new Member();

        $member->setId($row['id']);
        $member->setName($row['name']);
        $member->setFirstName($row['firstname']);
        $member->setTeamId($row['idTeam']);
        $member->setEmail($row['email']);

        return $member;
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