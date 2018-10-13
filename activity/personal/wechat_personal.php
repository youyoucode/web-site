<?php
require_once "user_info.php";

$mobile =$_GET['mobile'];
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>个人中心</title>
        <meta content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0" name="viewport">
        <meta content="notranslate" name="google">
        <meta content="telephone=no,email=no" name="format-detection">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="yes" name="apple-touch-fullscreen">
        <script src="./js/flexible_b5d6ba8.js"></script>
        <link href="./common/css/palfish-mobile_058909e.css" rel="stylesheet">
        <link href="./css/wechat_personal_e7dba46.css" rel="stylesheet">
    </head>

    <body>
        <div class="container">
            <div class="personal">
                <div class="personal-info">
                    <img alt="" class="personal-pic" src="./images/nick.png">
                    <div class="log-info">
                        <span class="name"><?php getUsername($mobile)?></span> <span class="log-out">退出登录</span>
                    </div>
                </div>
                <div class="star"><img alt="" class="star-pic" src="./images/wechat_star_e968453.png"></div>
            </div>
            <div class="lesson">
                <div class="usable-course">
                    <span class="course">可用课节数</span><?php getRestless($mobile)?>
                </div>
                <div class="add-up">
                    <span class="course">总价课时</span><?php getOrderLess($mobile)?>
                </div>
                <div class="add-up">
                    <span class="course">累计代码</span><?php getOrderLess($mobile)?>
                </div>
                <div class="add-up">
                    <span class="course">Level</span><?php getLevel($mobile)?>
                </div>
            </div>
            <div class="tacitly">
                <div class="tacitly-title">
                    <img alt="" class="" src="./images/wechat_order_80a008c.png"> <span>我的预约</span>
                </div>
                <div class="course-item">
                    <div class="time-line top-line">
                        <span class="time-periods"><?php getNextdate($mobile)?></span>
                        <p class='enTitle'>Level<?php getLevel($mobile)?>课程</p>
                        <span class="teacher-name">老师: <?php getTeacher($mobile)?></span>
                    </div>
                </div>


            </div>
            <!--div class="tacitly">
                <div class="tacitly-title">
                    <img alt="" class="" src="./images/wechat_order_80a008c.png"> <span>我的项目</span>
                </div>
                <ul class="tacitly-info"></ul>
                <div class="tacitly-no">
                    <div><img alt="" src="./images/fish_no_2dcd50f.png"></div>
                    <div>
                        为了保持孩子的语感，建议一周上2-3次课哦
                    </div>
                </div>
            </div-->
            <!--div class="tacitly-btn">
            预约课程
        </div>
        <div class="hint">
            <div class="hint-text">
                <div class="hint-content">
                    暂时不支持微信约课，请打开 APP 预约课程。
                </div>
                <div class="hint-btn">
                    <span class="download">去下载</span> <span class="cancel">好的</span>
                </div>
            </div>
        </div-->
        </div>
        <!--script src="/klian/web/dist/mobile/js/app_2f613f6.js"></script>
    <script src="/klian/web/dist/common/js/palfish-ui_dba85da.js"></script>
    <script src='./js/wechat_personal_4acf801.js'></script-->
    </body>

    </html>