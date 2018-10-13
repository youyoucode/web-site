(function($){
	var zp = {
		init:function(obj,pageinit){
			return (function(){
				zp.addhtml(obj,pageinit);
				zp.bindEvent(obj,pageinit);
			}());
		},
		addhtml:function(obj,pageinit){
			return (function(){
				obj.empty();
				if (pageinit.shownum<=5) {
					if(pageinit.pageNum>5 && (pageinit.current==1 || pageinit.current==2 || pageinit.current==3)){
						pageinit.shownum = 4;
					} else {
						pageinit.shownum = 5;
					}
				}
				if (pageinit.pageNum<pageinit.shownum) {
					pageinit.shownum = pageinit.pageNum;
				}
				var numshow = pageinit.shownum-3;
				var numbefore = parseInt((pageinit.shownum - 3)/2);
				if ((pageinit.shownum - 3)%2>0) {
					var numafter = numbefore + 2;
				} else{
					var numafter = numbefore;
				}
				/*上一页*/
				if (pageinit.current > 1) {
					obj.append('<a href="javascript:;" class="prebtn"><b class="left-transparent"></b></a>');
				} else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled"><b class="left-transparent"></b></span>');
				}
				/*中间页*/
				if (pageinit.current >3 && pageinit.pageNum > pageinit.shownum) {
					obj.append('<a href="javascript:;" class="zxfPagenum">'+1+'</a>');
					//obj.append('<a href="javascript:;" class="zxfPagenum">'+2+'</a>');
					obj.append('<span>...</span>');
				}
				if (pageinit.current >3 && pageinit.current < pageinit.pageNum-numshow && pageinit.pageNum > pageinit.shownum) {
					var start  = pageinit.current - numbefore,end = pageinit.current + numafter;
				}else if(pageinit.current >3 && pageinit.current >= pageinit.pageNum-numshow && pageinit.pageNum > pageinit.shownum){
					var start  = pageinit.pageNum - numshow,end = pageinit.pageNum;
				}else{
					if (pageinit.pageNum <= pageinit.shownum) {
						var start = 1,end = pageinit.shownum;
					} else{
						var start = 1,end = pageinit.shownum-1;
					}
				}
				for (;start <= end;start++) {
					if (start <= pageinit.pageNum && start >=1) {
						if (start == pageinit.current) {
							obj.append('<span class="zxfPagenum '+pageinit.activepage+'">'+ start +'</span>');
						} else if(start == pageinit.current+1){
							obj.append('<a href="javascript:;" class="zxfPagenum '+pageinit.activepaf+'">'+ start +'</a>');
						}else{
							obj.append('<a href="javascript:;" class="zxfPagenum">'+ start +'</a>');
						}
					}
				}
				if (end < pageinit.pageNum) {
					obj.append('<span>...</span>');
					obj.append('<a href="javascript:;" class="zxfPagenum">'+pageinit.pageNum+'</a>');
				}
				/*下一页*/
				if (pageinit.current >= pageinit.pageNum) {
					obj.remove('.nextbtn');
					obj.append('<span class="disabled"><b class="right-transparent"></b></span>');
				} else{
					obj.append('<a href="javascript:;" class="nextbtn"><b class="right-transparent"></b></a>');
				}
				/*尾部*/
				//obj.append('<span>'+'共'+'<b>'+pageinit.pageNum+'</b>'+'页，'+'</span>');
				obj.append('<span class="page-btt">Page</span>');
				obj.append('<input type="text" class="zxfinput" value="'+pageinit.current+'"/>');
				obj.append('<span class="zxfokbtn">'+'GO'+'</span>');
			}());
		},
		bindEvent:function(obj,pageinit){
			return (function(){
				obj.off("click","a.prebtn");
				obj.on("click","a.prebtn",function(){
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {"current":cur-1});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.off("click","a.zxfPagenum");
				obj.on("click","a.zxfPagenum",function(){
					var cur = parseInt($(this).text());
					var current = $.extend(pageinit, {"current":cur});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.off("click","a.nextbtn");
				obj.on("click","a.nextbtn",function(){
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {"current":cur+1});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.off("click","span.zxfokbtn");
				obj.on("click","span.zxfokbtn",function(){
					var cur = parseInt($("input.zxfinput").val());
					var current = $.extend(pageinit, {"current":cur});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.off("keydown","input.zxfinput");
				obj.on("keydown","input.zxfinput",function(){
					if (event.keyCode == "13") {
						$(".zxfokbtn").click();
					}
				});
			}());
		}
	}
	$.fn.createPage = function(options){
		var pageinit = $.extend({
			pageNum : 10,
			current : 1,
			shownum: 4,
			activepage: "current",
			activepaf: "nextpage",
			backfun : function(){}
		},options);
		zp.init(this,pageinit);
	}
}(jQuery));