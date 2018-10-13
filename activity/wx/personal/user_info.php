<?php
//header('conten-type:text/html;charset=utf-8');
$hostip='39.104.85.140';
$username='frank';
$password='frank';
$db = 'mali_frank_test';
//getUsername(18616661600);

function getUsername($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=0){
        $sql="SELECT `name` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `name` FROM `user_info` WHERE `id`='$id'";
        
    }
    
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

function getTeacher($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `teacher` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `teacher` FROM `user_info` WHERE `id`='$id'";
    }
    
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


function getLevel($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `level` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `level` FROM `user_info` WHERE `id`='$id'";
    }

    
    
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

function getRestless($mobile,$id){

    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `restLesson` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `restLesson` FROM `user_info` WHERE `id`='$id'";
    }

    
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

function getOrderLess($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `orderLesson` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `orderLesson` FROM `user_info` WHERE `id`='$id'";
    }

    
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

function getCodenum($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `codeline` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `codeline` FROM `user_info` WHERE `id`='$id'";
    }

    
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo $row["codeline"];
        }
    } 
        //4.关闭连接
    mysqli_close($connect);
}

function getNextdate($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `nextDate` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `nextDate` FROM `user_info` WHERE `id`='$id'";
    }


    
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
function getCoupon($mobile,$id){
    //1.建立连接
    $connect=mysqli_connect('39.104.85.140','frank','frank','mali_frank_test','3306');

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo $mobile;

    //2.定义sql语句
    if($mobile!=null){
        $sql="SELECT `coupon` FROM `user_info` WHERE `mobile`=$mobile";
    } else{
        $sql="SELECT `coupon` FROM `user_info` WHERE `id`='$id'";
    }

    
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
