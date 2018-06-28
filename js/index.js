//打开新frame之前的
var preFrame;
//即将打开的frame
var curFrame;

//存放已经打开过的frame集合
var frameArr = [];

summerready = function() {
	var pageParam = summer.pageParam;
	var curToken = pageParam.nctoken;
	alert("curToken is " + curToken);
	//初始化推送
	appMsg.initialize({
		onDeviceReady : function() {
			console.log('设置注册成功！');
		},
		onReceiveMessage : onReceiveMessage,
		onOpenNotification : onOpenNotification,
		onReceiveNotification : onReceiveNotification
	});

	//获取DOM元素
	var footer1 = $summer.byId("footer1");
	var footer2 = $summer.byId("footer2");
	var footer3 = $summer.byId("footer3");
	var footer4 = $summer.byId("footer4");
	//为DOM元素添加点击事件
	$summer.addEvt(footer1, "click", function() {
		//通过DOM ID设置标题文字
		$summer.text($summer.byId("title"), "功能测试");
		openframeTag("function");
	});
	$summer.addEvt(footer2, "click", function() {
		$summer.text($summer.byId("title"), "列表测试");
		openframeTag("message");
	});
	$summer.addEvt(footer3, "click", function() {
		$summer.text($summer.byId("title"), "应用测试");
		openframeTag("application");
	});
	$summer.addEvt(footer4, "click", function() {
		$summer.text($summer.byId("title"), "个人中心");
		openframeTag("my");
	});
	//设置默认打开的frame
	openframeTag("function");
}
/**
 *打开指定frame
 * @param {Object} Type
 */
function openframeTag(Type) {
	//通过DMO元素id获取DMO元素的高度
	var top = $summer.offset($summer.byId("header")).h;
	var bottom = $summer.offset($summer.byId("footer")).h;

	Type = Type || "function";
	preFrame = curFrame;
	curFrame = Type;

	//如果当前显示的页面与将要打开的不同
	if (preFrame != curFrame) {
		//判断即将打开的页面，之前是否打开过
		if (isOpend(curFrame)) {
			summer.setFrameAttr({
				"id" : curFrame,
				"hidden" : false
			}, null, null);
			summer.setFrameAttr({
				"id" : preFrame,
				"hidden" : true
			}, null, null);
		} else {
			summer.openFrame({
				"id" : curFrame,
				"url" : 'html/' + curFrame + '.html',
				"position" : {
					"left" : 0,
					"right" : 0,
					"top" : top,
					"bottom" : bottom
				},
				"pageParam":summer.pageParam//传递给frame
			});
			//将打开的frame添加到集合中
			frameArr.push(curFrame);
		}

	} else {
		//避免点击两次frame不显示
		if (preFrame == curFrame) {
			return;
		}
		if (preFrame) {
			summer.setFrameAttr({
				"id" : preFrame,
				"hidden" : true
			}, null, null);
		}
	}

}

/**
 *判断frame是否打开
 * @param {Object} type
 */
function isOpend(type) {
	for (var i = 0; i < frameArr.length; i++) {
		if (frameArr[i] === type) {
			return true;
		}
	}
	return false;
}

function onReceiveMessage(event) {
	try {
		var message = '';
		if ($summer.os == "android") {
			message = event.message;
		} else {
			message = event.content;
		}
		alert(message);
	} catch (exception) {
		console.dir("JPushPlugin:onReceiveMessage-->" + exception);
	}
};

function onReceiveNotification() {
	console.log('onReceiveNotification');
	console.dir(arguments);
}

function onOpenNotification(event) {
	console.log('onOpenNotification');
	console.dir(arguments);

	if (device.platform == "Android") {
		alertContent = event.alert;
	} else {
		alertContent = event.aps.alert;
	}

}

