var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	receivedEvent : function(id) {
		// 监听加载完成事件
		document.addEventListener("deviceready", onDeviceReady, false);
		// 设置标签和别名
		document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
		// 打开通知
		document.addEventListener("jpush.openNotification", onOpenNotification, false);
		// 获取通知内容
		document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
		// 获取自定义消息推送内容
		document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
	}
};
// 开始
function onDeviceReady() {
	alert("JPushPlugin:Device ready!");
	initiateUI();
};
function initiateUI() {
	try {
		//初始化
		window.plugins.jPushPlugin.init();
		getRegistrationID();
		if (device.platform != "Android") {
			window.plugins.jPushPlugin.setDebugModeFromIos();
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		} else {
			window.plugins.jPushPlugin.setDebugMode(true);
			window.plugins.jPushPlugin.setStatisticsOpen(true);
		}
	} catch (exception) {
		console.log(exception);
	}
	$("#setTagWithAliasButton").click(function(ev) {
		alert("点击了按钮");
		try {
			var tag1 = $("#tagText1").val();
			var tag2 = $("#tagText2").val();
			var tag3 = $("#tagText3").val();
			var alias = $("#aliasText").val();
			var tags = [];
			if (tag1 != "") {
				tags.push(tag1);
			}
			if (tag2 != "") {
				tags.push(tag2);
			}
			if (tag3 != "") {
				tags.push(tag3);
			}
			alert(tags[0] + '...' + tags[1] + "....");
			alert(alias);
			window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
		} catch (exception) {
			alert(exception);
		}
	})
};
//获取注册ID
function getRegistrationID() {
	window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
};
// 赋值ID给Dom
function onGetRegistrationID(data) {
	try {
		if (data.length == 0) {
			var t1 = window.setTimeout(getRegistrationID, 1000);
		}
		//将注册ID赋值给DOM上
		console.log("即将给最上边的label赋值ID");
		$("#registrationId").html(data);
	} catch (exception) {
		alert(exception);
	}
};
// 设置标签和别名
function onTagsWithAlias(event) {
	try {
		var result = "result code:" + event.resultCode + " ";
		result += "tags:" + event.tags + " ";
		result += "alias:" + event.alias + " ";
		alert("即将把tags和alias显示在页面上");
		$("#tagAliasResult").html(result);
	} catch (exception) {
		alert(exception)
	}
};
// 打开通知
function onOpenNotification(event) {
	try {
		alert(JSON.stringify(event));
		var alertContent;
		if (device.platform == "Android") {
			alertContent = event.alert;
		} else {
			alertContent = event.aps.alert;
		}
		alert("open Notification:" + alertContent);
		if (event.extras.count == 3) {
			alert("即将打开百度");
			location.href = "http://www.baidu.com"
		}
	} catch (exception) {
		alert("JPushPlugin:onOpenNotification" + exception);
	}
};
//获取通知内容
function onReceiveNotification(event) {
	try {
		var alertContent;
		if (device.platform == "Android") {
			alertContent = event.alert;
		} else {
			alertContent = event.aps.alert;
		}
		alert("把接受的通知显示在页面上");
		$("#notificationResult").html(alertContent);
	} catch (exception) {
		alert(exception)
	}
};
// 获取自定义消息推送内容
function onReceiveMessage(event) {
	try {
		var message;
		if (device.platform == "Android") {
			message = event.message;
		} else {
			message = event.content;
		}
		alert("把自定义的消息显示在页面上");
		$("#messageResult").html(message);
	} catch (exception) {
		alert("JPushPlugin:onReceiveMessage-->" + exception);
	}
};
