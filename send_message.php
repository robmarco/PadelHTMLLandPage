<?php
	$name 	= $_POST['name'];
	$email 	= $_POST['email'];
	$sugest = $_POST['sugest'];

	$destinatario = "info@padel.com";
	$titulo				= "Mensaje sugerencia de" + $name; 
	$contenido = $sugest + '<br>Mensaje de ' + $email;
	
	mail($destinatario, $titulo, $contenido);
	header('Location: localhost');
?>
