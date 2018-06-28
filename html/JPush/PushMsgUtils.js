var appMsg = {
	options : {},
	registerID : null,
	initialize : function(settings) {
		this.options = settings || {};
		this.bindEvents();

	},
	bindEvents : function() {
		var self = this;
		document.addEventListener('deviceready', function() {
			self.receivedEvent('deviceready');
			self.initializeUI();
		}, false);
	},
	receivedEvent : function(id) {

		var that = this;
		if (! typeof (that.options) == 'object') {
			return;
		}
		var eventListeners = {
			'onDeviceReady' : 'deviceready',
			'onTagsWithAlias' : 'jpush.setTagsWithAlias"',
			'onOpenNotification' : 'jpush.openNotification',
			'onReceiveNotification' : 'jpush.receiveNotification',
			'onReceiveMessage' : 'jpush.receiveMessage'
		};
		var eventNames = Object.getOwnPropertyNames(that.options) || [];
		Array.prototype.forEach.call(eventNames, function(name) {
			var isMatch = eventListeners.hasOwnProperty(name) && typeof (that.options[name]) == 'function';
			if (isMatch) {
				console.log(eventListeners[name] + '-' + that.options[name]);
				document.addEventListener(eventListeners[name], that.options[name], false);
			}
		});
	},
	getRegistrationID : function(callback) {
		window.plugins.jPushPlugin.getRegistrationID(function(data) {
			try {
				if (!data || data.length == 0) {
					var timer = window.setTimeout(function() {
						appMsg.getRegistrationID(callback);
					}, 1000);
				} else {
					appMsg.registerID = data;
					console.log(data);
					callback(data);
				}
			} catch (exception) {
				console.dir(exception);
			}
		});
	},

	setAlias : function(alias) {//alias可以用来绑定uid，因此建议自行建立用户信息管理系统
		window.plugins.jPushPlugin.setAlias(alias);
	},
	setTags : function(tags) {//tags用来进行分组，这里的参数是数组，此方法会覆盖原来已经存在的tags，因此建议自行建立用户信息管理系统
		window.plugins.jPushPlugin.setTags(tags);
	}
};
appMsg.initializeUI = function() {
	try {
		//初始化
		window.plugins.jPushPlugin.init();
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
};
