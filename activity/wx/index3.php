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
  <link rel="stylesheet" media="all" href="./resource/web.css">
  <title>悠悠青少儿编程-暑假班</title>
</head>
<body data-no-turbolink="" id="web-general-dm4">
  <div class="dm">
    <div class="top-container">
      <img width="100%" class="top-back" src="./resource/top-bg.jpg" alt="Top bg">
      <div class="over">
        <div class="video-container">
          <video id="video_id" autoplay="" controls="1" id="mainPlayer" playsinline="" poster="./resource/dm-preview-14.jpg" src="./resource/videos/DM.mp4" webkit-playsinline="" width="auto"></video>
        </div>
      </div>
    </div>
    <div class="p1-container">
      <img width="100%" src="./resource/p1.jpg" alt="P1">
      <div class="over">
      <div class="gif-container" id="gif-container-id">
          <img width="100%" src="./resource/demos.gif" alt="Demos">
        </div>
      </div>
    </div>
    <img width="100%" src="./resource/p2.jpg" alt="P2">
    <img width="100%" src="./resource/p3.jpg" alt="P3">
    <img width="100%" src="./resource/p4.jpg" alt="P4">
    <img width="100%" src="./resource/p5.jpg" alt="P5">
    <div id="fixed-bottom-nav">
      <div class="fixed-box" style="display: block;">
        <a href="/wx/pay/jsapi.php" target="_blank">
          <img  width="100%" height="100%" src="./resource/yuanjia.jpg">
        </a>
      </div>
    </div>
  </div>
  <script>
  document.getElementById("gif-container-id").style.top = Math.floor(window.innerWidth*4368/750)+"px"; 
  document.getElementById("video_id").style.top = Math.floor(window.innerWidth*670/750)+"px";
  document.getElementById("video_id").style.left = Math.floor(window.innerWidth*90/750)+"px";
  
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
        title: "悠悠青少儿编程-暑假班",  
        link: "/wx/",  
        imgUrl: "/wx/resource/apple-touch-icon.png",  
        success: function () {
            
        },
        cancel: function () { 
              
        }
    });
 
    wx.onMenuShareAppMessage({
        desc: "8-15岁适用，零基础班， 严选专属老师在线授课，让孩子在家入门真正的编程",  
        title: "悠悠编程暑假营|￥199元8节，在家学人工智能语言",
        link: "/wx/",
        imgUrl: "/wx/resource/apple-touch-icon.png",  
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
