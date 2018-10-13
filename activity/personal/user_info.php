<?php
//header('conten-type:text/html;charset=utf-8');
$hostip='39.104.85.140';
$username='frank';
$password='frank';
$db = 'mali_frank_test';
//getUsername(18616661600);

function getUsername($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `name` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["name"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);

}

function getTeacher($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `teacher` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["teacher"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);

}


function getLevel($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `level` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["level"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);

}

function getRestless($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `restLesson` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["restLesson"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);

}

function getOrderLess($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `orderLesson` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["orderLesson"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);
}

function getCodenum($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `codeNum` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["codeNum"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);
}

function getNextdate($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `nextDate` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["nextDate"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);
}
function getCoupon($mobile){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    $sql="SELECT `coupon` FROM `user_info` WHERE `mobile`=$mobile";
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["coupon"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);
}

?>
