<?php
/**
* Interface permetant de faire des opérations sur la table team
*/
interface dao_team_interface
{
   /**
   * Insert une équipe dans la BD
   */
   public function insertTeam(Team $team);

   /**
    * Supprime une équipe d'un team
    */
    public function deleteTeam($id);

    /**
    * Modifie un team
    */
    public function updateTeam($id);

    /**
    * retourne le team dont l'id a été âssé en parametre
    */
    public function getTeam($id);

    /**
    * Retourne toute la liste des team
    */
    public function getAllTeams();

    /**
    * Ajout un membre a un team
    */
    public function addMember($idTeam,Member $Member);

    /**
    * Supprime un membre de la team
    */
    public function removeMember($idTeam,Member $Member);

}
?>