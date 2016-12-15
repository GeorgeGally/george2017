<?php /**/ ?><HTML>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<head>
<title>getscores</title>
</head>
<body bgcolor="#cccccc">
<?php
include("db.php"); 
$x=0;
//$SQL  ="SELECT * FROM `highscores` LIMIT 0 , 30";
$SQL  = "SELECT * FROM highscores ORDER by score DESC" ;
$result = @ mysql_query ($SQL) or die( "<span class=\"txthead\">...Connecting...</span>" ); 
while( $row = @ mysql_fetch_array ($result )) { 
$id = $row ["id" ]; 
$name = $row ["name" ]; 
$score = $row ["score" ]; 
if ($score < 10) $score = "0".$score; 
$x=$x+1;
echo "&p$x=$score    $name";
}
echo "&xxx&";
?> 

</body></HTML>

