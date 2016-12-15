<HTML>
<head>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<BODY bgcolor="white">
<?php
include("db.php"); 
$category = "highscores"; 
$name = mysql_real_escape_string($_POST["name"]);
$email = mysql_real_escape_string($_POST["email"]);
$challenger = mysql_real_escape_string($_POST["challenger"]);
$score = mysql_real_escape_string($_POST["score"]);
$wkts = mysql_real_escape_string($_POST["wkts"]);


 $to = " $name < $email >"; 
 $subject = "I spit in your general direction"; 
 $message = "Dear $name<br>$challenger says you are a ninny and will never beat his score";
 if ($score){
 $message = "$message of $score"; 
 }
  if ($wkts>0)  $message .= " with $wkts wickets in hand"; 
$message .= ". He be da cricket master";
$message = "$message in Bannersport.<br><br>Visit <a href=\"http://www.radarboy.com/museum/bannersport\">Bannersport</a> to prove him wrong.<br><br>Bannersport (c) radarboy<br>http://www.radarboy.com/museum/bannersport"; 
 
 $headers = "MIME-Version: 1.0\r\n"; 
 $headers .= "Content-type: text/html; utf-8\r\n"; 
// $headers = "From: $Sender_name <bob@bob.com>\CRLF"; // I suggest you try using only \n 
 //$headers .= "MIME-Version: 1.0\CRLF"; 
 $headers .= "Content-type: text/html; charset=iso-8859-9\CRLF"; 
 $headers .= "Reply-To: DAUMED <info@radarboy.com>\CRLF"; 
 $headers .= "X-Priority: 1\CRLF"; 
 $headers .= "X-MSmail-Priority: High\CRLF"; 
 $headers .= "X-mailer: DAUMED"; 

mail ($to, $subject, $message, $headers); 
 //mb_send_mail ($to, $subject, $message, $headers); 
?>

<table>
<tr><td width="20"></td>
<td><font face="arial" size="1" color="#666666"><br><br>BANNERSPORT:<br><br>Challenge has been made to <?php echo "$name <$email>"; ?><br><br>(c) radarboy</font><br></td><td></td>
</tr>


</table>



</BODY></HTML>


