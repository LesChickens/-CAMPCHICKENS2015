<?php
/**
 * User: Cesar Jeanroy
 * Date: 15-03-15
 * Time: 01:44
 */

interface dao_member_interface {

    /**
     * méthode qui retourne la liste des membres de la team dont l'id est passé en parametre
     */
    public function getTeamMembers($idTeam);

    /**
     * méthode qui retourne la liste des membres appartenant à une team
     */
    public function getAllTeamMembers();

}