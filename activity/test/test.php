<?php
    //1.建立连接
        $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "ok";
    //2.定义sql语句
        $sql='SELECT `name` FROM `user_info` WHERE `id`=1';
        mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
        $result=mysqli_query($connect,$sql);
        $arr=array();//定义空数组
        while($row =mysqli_fetch_array($result)){
            //var_dump($row);
                //array_push(要存入的数组，要存的值)
            array_push($arr,$row);
        }
        var_dump($arr);
    //4.关闭连接
       mysqli_close($connect);
?>
