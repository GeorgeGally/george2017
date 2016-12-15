<?php /**/ ?><HTML>
<head>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<BODY bgcolor="white">
<table cellpadding="1">
<tr><td width="20"></td><td colspan="3" bgcolor="#cccccc"><font face="arial" size="1" color="#666666">BANNERSPORT ALL SCORES</font><br></td><td></td></tr>

<?php
include("db.php"); 
$$bb=0;
$category = "highscores"; 
$SQL  = "SELECT * FROM highscores ORDER by score DESC" ;
$result = @ mysql_query ($SQL) or die( "<span class=\"txthead\">...Connecting...</span>" ); 
while( $row = @ mysql_fetch_array ($result )) { 
$id = $row ["id" ]; 
$name = $row ["name" ]; 
$score = $row ["score" ]; 
$x=$x+1;
$bb++;
if ($bb==2){
$bb=0;
echo "<tr bgcolor=\"#f8f8f8\">";
}
else

{
echo "<tr bgcolor=\"#eeeeee\">";
}
echo "<td bgcolor=\"white\"></td>
<td><font face=\"arial\" size=\"1\" color=\"#666666\"> $x </font></td><td><font face=\"arial\" size=\"1\" color=\"#666666\"> $score </font></td><td><font face=\"arial\" size=\"1\" color=\"#666666\">$name</font></td><td bgcolor=\"white\"></td></tr>";

}
?>
<tr><td width="20"></td><td colspan="3"><font face="arial" size="1" color="#666666"><br><br><br>Bannersport (c) Radarboy</font><br><br><br></td><td></td></tr>
</table>



</BODY></HTML>


