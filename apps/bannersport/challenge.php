<?php /**/ ?><HTML>
<head>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<BODY bgcolor="white">
<?php
include("db.php"); 
$category = "highscores"; 
$name = mysql_real_escape_string($_GET["name"]);
$score = mysql_real_escape_string($_GET["runs"]);
$email = mysql_real_escape_string($_GET["email"]);
$wkts = mysql_real_escape_string($_GET["wkts"]);




?>
<form name="challengeform" enctype="multipart/form-data" method="post" 
action="mailchallenger.php">
<table>
<tr><td width="90"></td><td></td>
<td></td>
<td></tr>
<tr>
<td></td><td colspan="2" bgcolor="grey"><font face="arial" size="1" color="white"> RADARBOY BANNERSPORT CHALLENGE</font></td>
<td></tr>
<tr><td width="90"></td><td colspan="2"><br>
<?php
echo "<font face=\"arial\" size=\"1\" color=\"#666666\">So, ";
if ($name){
echo "$name, ";
}
echo "who do you want to challenge:<br></font>";
?>
</td>
<td></tr>
<tr><td width="90"></td><td><font face="arial" size="1" color="#666666">Name:</font><br></td>
<td><input type="text" name="name" size="30"></td>
<td></tr>
<tr><td width="90"></td><td><font face="arial" size="1" color="#666666">Email:</font><br></td>
<td><input type="text" name="email" size="30"></td>
<td></tr>
<tr><td width="90"></td><td colspan="2"><BR><BR>
<input type="hidden" name="challenger" value="<?php echo "$name"; ?>">
<input type="hidden" name="score" value="<?php echo "$score"; ?>">
<input type="hidden" name="wkts" value="<?php echo "$wkts"; ?>">
<input type="submit" name="submit" value="CHALLENGE"></td></tr>

</table>
</form>


</BODY></HTML>


