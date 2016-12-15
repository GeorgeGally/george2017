<?php /**/ ?><HTML>
<head>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<BODY bgcolor="#cccccc">
<?php
include("db.php"); 
$category = "highscores"; 

$name = mysql_real_escape_string($_GET["name"]);
$score = mysql_real_escape_string($_GET["score"]);
$email = mysql_real_escape_string($_GET["email"]);


$sql = " INSERT INTO $category ( `name` , `score` , `email` ) VALUES ('$name', '$score', '$email');";
$result = mysql_query($sql); 
if (mysql_error()) { print "Database ERROR: $sql " . mysql_error(); } 

//print "<br><br><b><font face=verdana size=1>New Person Added<b><br><br></font>"; 
 //echo "<META http-equiv=\"refresh\" content=\"3; URL=view.php?category=$category\">";

?>

</BODY></HTML>


