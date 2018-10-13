<?php
$mysql_conf = array(
    'host'    => '39.104.85.140:3306', 
    'db'      => 'mali_frank_test', 
    'db_user' => 'frank', 
    'db_pwd'  => 'frank', 
    );

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "SELECT `name` FROM `user_info` WHERE id=1";
$res = $mysqli->query($sql);
if (!$res) {
    die("sql error:\n" . $mysqli->error);
}
 while ($row = $res->fetch_assoc()) {
        var_dump($row);
    }

$res->free();
$mysqli->close();
?>
