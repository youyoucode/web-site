function isMobilePhone(str) {
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    return myreg.test(str)
}

document.getElementById("js-save-btn").onclick = function(e) {
	var mobile = $("#js-moblie-input").val();
	var sms = $("#input-text input-sms").val();
    var pwd = $("#js-reference-input").val();
    if(mobile.length>0){
    	if (isMobilePhone(mobile)) {
    		$("#msg-mobile").removeClass("show");
    		if(pwd.length<1) $("#msg-password").addClass("show");
    		else{
    			$("#msg-password").removeClass("show");
    			$.ajax({
			        url: "http://sso.malichina.com/api/users/sighup",
			        type: "post",
			        data: {username: mobile, email: "", password: pwd, mobilePhone: mobile, code: sms},
			        dataType:"json",
			        success: function (data) {
			            window.location.replace("/login/");
			        },
			        error:function(err){
			            if(err.responseJSON.error.statusCode==400){
			            	$("#msg-sms").addClass("show");
			            }
			        }
			    });
    		}
    	}else $("#msg-mobile").addClass("show");
    }else{
    	$("#msg-mobile").addClass("show");
    }

}

$('#js-moblie-input').bind('input propertychange', function() {
    var mobile = $("#js-moblie-input").val();
    if (isMobilePhone(mobile)) {
    	$("#msg-mobile").removeClass("show");
    	$("#js-sms-send-btn").addClass('active');
    }else{
    	$("#msg-mobile").addClass("show");
    	$("#js-sms-send-btn").removeClass('active');
    }
});

var wait = 60;
function countdown(o){
	if(wait==0){
		wait = 60;
		$("#js-sms-send-btn").text("重新获取");
		o.addClass('active');
	}else{
		$("#js-sms-send-btn").text(wait+"秒后重置");
		o.removeClass('active');
		wait--;
		setTimeout(function(){
			countdown(o);
		},1000);
	}
}

document.getElementById("js-sms-send-btn").onclick = function(e) {
	var mobile = $("#js-moblie-input").val();
    if (isMobilePhone(mobile)) {
		$.ajax({
	        url: "http://sso.malichina.com/api/VerifyCodes/create-for-sms",
	        type: "post",
	        data: {mobilePhone:mobile},
	        dataType:"json",
	        success: function (data) {
	            countdown($("#js-sms-send-btn"));
	        },
	        error:function(err){
	            $("#js-imgcode-maxtime").removeClass("hide");
	        }
	    });
	}
}


