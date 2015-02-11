<?php
	$server_name = "127.0.0.1";
	$username = "root";
	$password = "";
	$db_name = "acc";

	// Create connection
	$connection = new mysqli($server_name, $username, $password, $db_name);
	
	// Check connection
	if ($connection -> connect_error) {
		die("Connection failed: " . $connection -> connect_error);
	} 

	$select_events = "SELECT id, title, short_description, long_description, start_date, end_date, author, category, level FROM events";
	$results = $connection -> query($select_events);

	if ($results -> num_rows > 0) {
		// Output data of each row
		while($row = $results -> fetch_assoc()) {
			echo "id: " . $row["id"]. " - Name: " . $row["title"]. " " . $row["short_description"]. "<br />";
		}
	} else {
		echo "0 results";
	}
	
	$connection -> close();
?>