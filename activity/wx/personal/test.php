<?php

require_once "user_info.php";

echo 'mobile:'.$_GET['mobile'];

echo 'id:'.$_GET['id'];

$mobile =$_GET['mobile'];

echo '<br>';
$id = $_GET['id'];
echo '<br>';
echo getUsername($mobile,0);

echo '<br>';

echo getUsername(0,$id);

?>
