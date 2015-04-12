<?php

/*Front door to redirect to the right back-end*/

header('Location: ' . '/controller/controller.php', true, '303');
die();

?>
