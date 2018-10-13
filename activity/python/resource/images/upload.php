<?php
header("Access-Control-Allow-Origin: *");
if(isset($_POST['url'])) $url = $_POST['url'];
$strings = explode("/",$url);
$imgname = $strings[sizeof($strings)-1];
$img = file_get_contents($url);
file_put_contents($imgname,$img); 
?>
