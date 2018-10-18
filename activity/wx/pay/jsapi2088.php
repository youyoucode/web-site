<?php 
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody("码力编程 常规班");
$input->SetAttach("test");
$Out_trade_no = WxPayConfig::MCHID.date("YmdHis");
$input->SetOut_trade_no($Out_trade_no);
$input->SetTotal_fee("208800");
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("test");
$input->SetNotify_url("http://www.youyoucode.cn/wx/pay/notify.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);

$jsApiParameters = $tools->GetJsApiParameters($order);

//获取共享收货地址js函数参数
$editAddress = $tools->GetEditAddressParameters();
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>码力编程-常规班</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript">
    var phoneNumber = "";
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $jsApiParameters; ?>,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				if(res.err_msg=="get_brand_wcpay_request:ok"){
					alert("支付成功,我们将尽快联系您。");
					var params = {
		                name: "2088",
		                phone: phoneNumber
		            };
					$.ajax({
			            url : 'http://115.29.112.82/tool/addCell.php',
			            type : "POST",
			            dataType : "json",
			            data : params
			        }).done(function(msg) {
			        	history.go(-1);
			        });
				}else{
					alert("支付失败,请重试，或可关注公众号'码力青少儿编程'获取更多帮助");
				}
			}
		);
	}

	function show_prompt(){  
	    var value = prompt('为方便联系,请输入您的手机和姓名:', '');  
	    if(value == null){  
	        alert('您取消了输入！');  
	    }else if(value == ''){  
	        alert('手机姓名输入为空，请重新输入！');  
	        show_prompt();  
	    }else{  
	    	phoneNumber = value;
	        callpay();
	    }  
	}  

	function callpay()
	{
		var value = "2088";
		phoneNumber = value;
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>
</head>
<body style="background-color: #f0eff5;">
	<div style="position:absolute; top:0px; left:0px; width:100%; height:32px; padding-top:7px; text-align: center; color:#83868a; font-size:13px;">订单号:<?php echo $Out_trade_no?></div>
	<div style="position:absolute; left:0px; top:32px; width:100%; height: 130px; background-color: #ffffff;">
		<div align="center" style="font-size:18px; line-height:12px">
			<br/><font color="#60706f"><b>选择课程</b></font><br/><br/><br/>
			<font color="#60706f">青少儿趣味编程 - <b>2018常规班 48课时</b></font><br/><br/>
			<font color="#60706f" style="font-size:18px;">付款后课程老师会立即联系您</font>
		</div>
	</div>
	<div style="position:absolute; left:0px; top:162px; width:100%;">
		<div align="center">
			<br/><font color="#000">本次订单需支付 ￥<b><span style="font-size:47px">2088</span></b>元</font><br/><br/>
			<button style="width:250px; height:55px; border-radius: 6px;background-color:#0bbc0a; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:19px;" type="button" onclick="callpay()">
				立即支付
			</button>
		</div>
	</div>
</body>
</html>