
document.getElementById("js-submit-btn").onclick = function(e) {
    var mobile = $("#js-user-name .login-input").val();
    var password = $("#js-password .login-input").val();
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        return reg.test(str)
    }

    function isMobilePhone(str) {
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        return myreg.test(str)
    }

    if(mobile.length>0){
    	$("#js-user-name .message").css('visibility',"hidden");
    	if(password.length>0)
    	{
    		var user = {password: password,email:mobile};
    		if (isEmail(mobile)) {
	            user.email = mobile;
	        } else if (isMobilePhone(mobile)) {
	            user.email = mobile;
	        }else {
            	user.username = mobile
        	}
    		$("#js-submit-btn").val("登录中...").addClass("btn-disabled").attr("disabled","disabled");
    		$.ajax({
	            url: "http://sso.malichina.com/api/users/login",
	            type: "post",
	            data: user,
	            dataType:"json",
	            success: function (data) {
	                if (data.userId) {
	                	$("#js-password .message").css('visibility',"hidden");
	                	if(window.location.href.indexOf("redirect=")>=0){
	                		var vals = window.location.href.split("redirect=");
	                		window.location.replace("http://"+vals[1]);
	                	}else window.location.replace("http://code.codeweilai.com");
	                } else {
	                    $("#js-password .message").css('visibility',"visible");
	                }
	            },
	            error:function(err){
	                $("#js-password .message").css('visibility',"visible");
	            }
	        });
    	}else{
    		$("#js-password .message").css('visibility',"visible");
    	}
    }else{
    	$("#js-user-name .message").css('visibility',"visible");
    	$("#js-password .message").css('visibility',"hidden");
    }
}