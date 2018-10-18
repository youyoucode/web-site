<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxaeb7991edf137f2d", "9c23937af0b81c40412d33a2e48a3390");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta content="width=device-width, minimum-scale=1, maximum-scale=1" name="viewport">
  <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
  <script src="./resource/web.js"></script>
  <script src="http://sdk.talkingdata.com/app/h5/v1?appid=1D451590A3384A7F850D3716B6255229&vn=mali_201801&vc=1.0.0"></script>
  <link rel="stylesheet" media="all" href="./resource/web2.css">
  <title>码力青少儿编程-限时折扣</title>
</head>
<body data-no-turbolink="" id="web-general-dm4">
  <div class="dm">
    <div class="top-container">
      <img width="100%" class="top-back" src="./resource/2088/2088yuan.png" alt="Top bg">
    </div>
    <div id="fixed-bottom-nav">
      <div class="fixed-box" style="display: block;">
        <a href="http://www.youyoucode.cn/wx/pay/jsapi2088.php" target="_blank">
          <img  width="100%" height="100%" src="./resource/2088/jiage2088.jpg">
        </a>
      </div>
    </div>
  </div>
  <script>
  wx.config({
    debug: false,
    appId:'<?php echo $signPackage["appId"];?>',
    timestamp:<?php echo $signPackage["timestamp"];?>,
    nonceStr:'<?php echo $signPackage["nonceStr"];?>',
    signature:'<?php echo $signPackage["signature"];?>',
    jsApiList: [
      'onMenuShareTimeline','onMenuShareAppMessage'
    ]
  });
  wx.ready(function () {
    document.getElementById('fixed-bottom-nav').style.display = "block";
    wx.onMenuShareTimeline({
        title: "码力青少儿编程-常规班",  
        link: "http://www.youyoucode.cn/wx/2088.php",  
        imgUrl: "http://www.youyoucode.cn/wx/resource/apple-touch-icon.png",  
        success: function () {
            
        },
        cancel: function () { 
              
        }
    });
 
    wx.onMenuShareAppMessage({
        desc: "8-15岁适用，零基础班， 严选专属老师在线授课，让孩子在家入门真正的编程",  
        title: "码力编程暑假特惠|￥2088元48节，在家学人工智能语言",
        link: "http://www.youyoucode.cn/wx/2088.php",
        imgUrl: "http://www.youyoucode.cn/wx/resource/apple-touch-icon.png",  
        type: 'link',  
        dataUrl: '',  
        success: function () { 

        },
        cancel: function () { 
             
        }
    });

  });
  wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });

</script>
</body>
</html>
