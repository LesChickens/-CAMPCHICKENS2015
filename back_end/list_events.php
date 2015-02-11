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
			echo "id: " . $row["id"] . " title: " . $row["title"] . " short_description: " . $row["short_description"] . " long_description: " . $row["long_description"] . " start_date: " . $row["start_date"] . " end_date: " . $row["end_date"] . " author: " . $row["author"] . " category: " . $row["category"] . " level " . $row["level"] . "<br />";
		}
	} else {
		echo "0 results";
	}
	
	$connection -> close();
?>