summerready = function() {
	//设置获取定位需要的权限
	var params = [ 
	"android.permission.READ_PHONE_STATE", 
	"android.permission.READ_EXTERNAL_STORAGE", 
	"android.permission.WRITE_EXTERNAL_STORAGE",
	"android.permission.ACCESS_FINE_LOCATION",
	"android.permission.ACCESS_COARSE_LOCATION"];
	summer.getPermission(params, function(args) {
	}, function(args) {
		alert(args);
	})
	var data = [{
		"name" : "新闻",
		"id" : 1
	}, {
		"name" : "消息",
		"id" : 2
	}, {
		"name" : "军事",
		"id" : 3
	}, {
		"name" : "娱乐",
		"id" : 4
	}, {
		"name" : "时事",
		"id" : 5
	}, {
		"name" : "餐饮娱乐",
		"id" : 6
	}, {
		"name" : "环球时报",
		"id" : 7
	}];
	showList(data);
}
function showList(data) {
	for (var i = 0; i < data.length; i++) {
		var $li = $('<li onclick="liclick(' + data[i].id + ')"> <span>' + data[i].name + '</span> </li>');
		$('.category').append($li);
	}
}

function liclick(args) {
	alert(args);
}

/**
 *弹窗
 */
function TestClick() {
	summer.openWin({
		id : 'alertTest',
		url : 'html/function/other/alertTest.html',
		type : "actionBar",
		create : false, //设置保留原生header
		//orientation : "landscape", //横屏
		actionBar : {
			title : "弹窗测试",
			titleColor : "#ffffff",
			backgroundColor : "#00a1ea",
			leftItem : {
				image : "img/back.png",
				method : "BackClick()", //返回按钮自定义事件
				text : "返回",
				textColor : "#ffffff" //返回文字颜色
			}
		}
	});
}

/**
 *地图
 */
function GDmap() {
	/**
	 *普通打开方式

	 summer.openWin({
	 "id" : 'GDmap',
	 "url" : 'html/function/GDmap.html'
	 });
	 */
	/**
	 *添加原声头
	 */
	summer.openWin({
		id : 'GDmap',
		url : 'html/function/other/GDmap.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "高德地图",
			titleColor : "#ffffff",
			backgroundColor : "#00a1ea",
			leftItem : {
				image : "img/back.png",
				method : "BackClick()", //返回按钮自定义事件
				text : "返回",
				textColor : "#ffffff" //返回文字颜色
			}
		}
	});
}

/**
 *输入框
 */
function inputClick() {
	summer.openWin({
		id : 'GDmap',
		url : 'html/function/other/InputTest.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "输入框测试",
			titleColor : "#ffffff",
			backgroundColor : "#00a1ea",
			leftItem : {
				image : "img/back.png",
				method : "BackClick()", //返回按钮自定义事件
				text : "返回",
				textColor : "#ffffff" //返回文字颜色
			},
			rightItems : [{
				type : "image",
				image : "img/back.png",
				method : "function()"
			}, {
				type : "text",
				text : "右侧",
				textColor : "#ffffff",
				method : "right()"
			}]
		}
	});
}

/**
 *图表统计分析
 */
function chartClick() {
	summer.openWin({
		id : 'chart',
		url : 'html/function/other/chart.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "图表统计分析",
			titleColor : "#ffffff",
			backgroundColor : "#00a1ea",
			leftItem : {
				image : "img/back.png",
				method : "BackClick()", //返回按钮自定义事件
				text : "返回",
				textColor : "#ffffff" //返回文字颜色
			},
			rightItems : [{
				type : "image",
				image : "img/back.png",
				method : "function()"
			}, {
				type : "text",
				text : "折线图",
				textColor : "#ffffff",
				method : "lineForm()"
			}]
		}
	});
}

/**
 *获取定位
 */
function locationClick() {
	summer.getNativeLocation({
		"single" : "true"
	}, function successFn(args) {
		//$summer.alert(args);
		$("#location_input").val(args.address);
		
	}, function failFn(args) {
		$summer.alert(args);
	});
}

/**
 *获取浏览器类型
 */
function getBrowser() {
	alert(navigator.userAgent);
}

function myCenterClick() {
	summer.openWin({
		"id" : "center",
		"url" : "html/function/other/center.html"
	});
}

function BackClick() {
	summer.closeWin();
}