<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxaeb7991edf137f2d", "9c23937af0b81c40412d33a2e48a3390");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>诺瓦青少儿编程</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />
    <link rel="stylesheet" href="css/show.css" type="text/css" />
    <link rel="shortcut icon" href="resource/ICON2.png" />
    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
    <script egret="lib" src="libs/modules/egret/egret.min.js" src-release="libs/modules/egret/egret.min.js"></script>
    <script egret="lib" src="libs/modules/egret/egret.web.min.js" src-release="libs/modules/egret/egret.web.min.js"></script>
    <script egret="lib" src="libs/modules/game/game.min.js" src-release="libs/modules/game/game.min.js"></script>
    <script egret="lib" src="libs/modules/res/res.min.js" src-release="libs/modules/res/res.min.js"></script>
    <script egret="lib" src="libs/modules/socket/socket.min.js" src-release="libs/modules/socket/socket.min.js"></script>
    <script egret="lib" src="libs/modules/greensock/greensock.min.js" src-release="libs/modules/greensock/greensock.min.js"></script>
    <script egret="lib" src="libs/modules/qrcode/qrcode.min.js" src-release="libs/modules/qrcode/qrcode.min.js"></script>
    <script egret="lib" src="libs/modules/pomelo/PomeloClient.js" src-release="libs/modules/pomelo/PomeloClient.js"></script>
    <script egret="lib" src="libs/modules/nimweb/NIM_Web_NIM.js" src-release="libs/modules/nimweb/NIM_Web_NIM.js"></script>
    <script egret="lib" src="libs/modules/nimweb/NIM_Web_Netcall.js" src-release="libs/modules/nimweb/NIM_Web_Netcall.js"></script>
    <!--modules_files_end-->
    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <script egret="lib" src="polyfill/promise.js" src-release="polyfill/promise.min.js"></script>
    <script egret="lib" src="libs/jweixin-1.2.0.js" src-release="libs/jweixin-1.2.0.js"></script>
    <!--other_libs_files_end-->
    <script type="text/javascript" id ="shows"></script>
</head>
<body>
    <div id="content">
        <iframe id="drawBoard" frameborder="0" style="pointer-events: none;width:300px;height: 600px;"></iframe>
        <div id='game-area' class="egret-player" data-entry-class="Main" data-orientation="auto" data-scale-mode="showAll" data-frame-rate="30" data-content-width="960" data-content-height="1400" data-show-paint-rect="false" data-multi-fingered="2" data-show-fps="false" data-show-log="false" data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0"></div>
        <div id="code-area"></div>
        <!-- 错误提示框 -->
        <div id='problem-alert-view'></div>
        <!-- 战斗中方法提示 -->
        <div id="codeTipData" class="hidden"></div>
        <textarea id="editor-pane-nav-snippets-menu-input" class="hidden"></textarea>
        <div id="splash-cover" style="display: none"><span style="position: absolute;top: 30%;left:43%"><img src="resource/assets/loading.gif"/></span></div>
    </div>
    <div id="showContent"></div>
    <script src="lib/ace/zatanna/zatanna.js"></script>
    <script src="lib/ace/ace.js"></script>
    <script src="lib/aether-plugin/lodash/lodash.min.js"></script>
    <script src="lib/aether-plugin/esper.min.js"></script>
    <script src="lib/aether-lib/commonjs-mode/aether.js"></script>
    <script src="dist/ide-bundle.js"></script>
    <script src="lib/worker.js"></script>
    <script src="libs/jquery.min.js"></script>
    <script src="libs/marked.min.js"></script>
    <script src="lib/show-resize.js"></script>
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
          //document.getElementById('fixed-bottom-nav').style.display = "block";
          wx.onMenuShareTimeline({
              title: "我正在学习人工智能语言，快来看看我的成果吧！",  
              link: location.href,  
              imgUrl: "http://www.youyoucode.cn/ide/resource/apple-touch-icon.png",  
              success: function () {
                
              },
              cancel: function () { 
                    
              }
          });
        
          wx.onMenuShareAppMessage({
              desc: "8-15岁适用，严选专属老师在线授课，让孩子在家入门真正的编程",  
              title: "我正在学习人工智能语言，快来看看我的成果吧！",
              link: location.href,
              imgUrl: "http://www.youyoucode.cn/ide/resource/apple-touch-icon.png",  
              type: 'link',  
              dataUrl: '',
              success: function () {
                  alert("分享朋友成功！！！");
      
              },
              cancel: function () { 
                   
              }
          });
      
        });
        wx.error(function(res){
        });
    </script>
</body>

</html>