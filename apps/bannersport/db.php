<?php
 	$host = "mysql.radarboy.com";
 	$user = "bob_miyagi";
	$pass = "morrisgin17";
	// $host = "127.0.0.1";
 // 	$user = "root";
	// $pass = "";
	$database = "bannersport" ;
	$connect =@ mysql_connect ($host , $user , $pass ) or die( "oioi could not connect to server" ); 
	$db_select  = @ mysql_select_db ($database ) or die( "could not select the database" ); 
 ?>