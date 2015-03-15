<?php

/**
 * DAOFactory
 * @author: http://phpdao.com
 * @date: ${date}
 */
class DAOFactory{
	
	/*
	 * @return Dao_Team_Implementation
	 */
	public static function getTeamDAO(){
		return new Dao_Team_Implementation();
	}


}
?>