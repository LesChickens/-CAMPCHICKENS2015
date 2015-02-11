<?php
	$server_name = "127.0.0.1";
	$username = "root";
	$password = "";
	$db_name = "acc";

	// Create connection
	$conn = new mysqli($server_name, $username, $password, $db_name);
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT id, title, short_description, long_description, start_date, end_date, author, category, level FROM events";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// Output data of each row
		while($row = $result->fetch_assoc()) {
			echo "id: " . $row["id"]. " - Name: " . $row["title"]. " " . $row["short_description"]. "<br />";
		}
	} else {
		echo "0 results";
	}
	
	$conn->close();
?>