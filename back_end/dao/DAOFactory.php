<?php

/**
 * DAOFactory
 * @author: http://phpdao.com
 * @date: ${date}
 */
class DAOFactory{
	
	/*
	 * @return dao_team_implementation
	 */
	public static function getTeamDAO(){
		return new dao_team_implementation();
	}

    /*
	 * @return dao_member_implementation
	 */
    public static function getMemberDAO(){
        return new dao_member_implementation();
    }


}
?>