<?php

/*Front door to redirect to the right back-end*/

function redirect($url, $statusCode = 303)
{
	header('Location: ' . $url, true, $statusCode);
	die();
}

?>
