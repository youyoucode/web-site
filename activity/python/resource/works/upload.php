<?php
header("Access-Control-Allow-Origin: *");
if(isset($_POST['data'])) $data = $_POST['data'];
if(isset($_POST['key'])) $key = $_POST['key'];
$base64 = str_replace(' ', '+', $data);
$url = explode(',',$base64);
file_put_contents('work_'.$key.'.png', base64_decode($url[1]));
//echo $a;
?>
