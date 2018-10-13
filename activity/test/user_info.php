<?php

//1.建立连接
$connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

//2.定义sql语句
$sql='SELECT `name` FROM `user_info` WHERE `id`=1';
mysqli_query($connect,'set names utf8');
//3.发送SQL语句
$result=mysqli_query($connect,$sql);

var_dump($result);
    //4.关闭连接
mysqli_close($connect);
?>
