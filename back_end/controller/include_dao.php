<?php
	// Include all DAO files
	require_once('../dao/sql/Connection.class.php');
	require_once('../dao/sql/ConnectionFactory.class.php');
	require_once('../dao/sql/ConnectionProperty.class.php');
	require_once('../dao/sql/QueryExecutor.class.php');
	require_once('../dao/sql/Transaction.class.php');
	require_once('../dao/sql/SqlQuery.class.php');
	require_once('../dao/core/ArrayList.class.php');
	require_once('../dao/DAOFactory.php');

	// On inclut toutes les interfaces et leur implémentation

	// Dao team
	require_once('../dao/interfaces/dao_team_interface.php');
	require_once('../dao/mysql/dao_team_implementation.php');

	// Dao member
	require_once('../dao/interfaces/dao_member_interface.php');
	require_once('../dao/mysql/dao_member_implementation.php');
