<?php
/*
 * Connection properties
 *
 * @author: http://phpdao.com
 * @date: 27.11.2007
 */
class ConnectionProperty{

    //config césar
	private static $host = 'localhost';
	private static $user = 'root';
	private static $password = '';
	private static $database = 'aac';

	//config léo
//    private static $host = 'localhost';
//    private static $user = 'tomek';
//    private static $password = 'tomek';
//    private static $database = 'tomek2';

	public static function getHost(){
		return ConnectionProperty::$host;
	}

	public static function getUser(){
		return ConnectionProperty::$user;
	}

	public static function getPassword(){
		return ConnectionProperty::$password;
	}

	public static function getDatabase(){
		return ConnectionProperty::$database;
	}
}
?>