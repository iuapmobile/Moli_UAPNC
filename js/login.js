var username;
var password;
var loginInfo = {};
summerready = function() {
	var maSettings = summer.getStorage("MA_HOST_PORT");
	if (!maSettings) {
		btnMASettings_Click();
	}

	var userinfo = summer.getStorage("userinfo");
	var isOpenFinger = summer.getStorage("isOpenFinger");
	isOpenFinger = isOpenFinger == undefined || isOpenFinger == "false" ? false : true;
	//判断是否已经登录过并且开启了指纹登录
	if (userinfo && isOpenFinger) {
		summer.require("cordova-plugin-summer-fingerprint.FingerPrint").fingerPrint({
			leftText : "取消",
			rightText : "输入密码"
		}, function(args) {
			if (args.code == 1) {
				summer.openWin({
					"id" : "root",
					"url" : "index.html"
				});
			}
		}, function(args) {
			if (args.code == -3) {
				//点击右侧按钮：“输入密码”，执行操作
				summer.toast({
					"msg" : args.error_msg
				});
			} else if (args.code == 0) {
				//点击取消、超过5次识别失败、手机设备不支持指纹或其他错误情况，均返回code == 0
				summer.toast({
					"msg" : args.error_msg
				});
			}
			return;
		});
	}
}
function login() {
	username = $("input[type='text']").val();
	password = $("input[type='password']").val();
	//loginLocal();
	loginAP();
	//loginNC65();
}

/**
 *本地登录
 */
function loginLocal() {
	if (username == "1" && password == "1") {
		var userinfo = {
			username : username,
			password : password
		};
		summer.setStorage("userinfo", userinfo);

		summer.openWin({
			"id" : "root",
			"url" : "index.html"
		});
	} else {
		summer.toast({
			"msg" : "用户名或密码错误"
		});
	}
}

/**
 *通过MA登录
 */
function loginMA() {
	if (username == "" || password == "") {
		UM.alert("用户名密码不能为空");
	} else {
		summer.callAction({
			"appid" : "Demonstration", //当前应用id，即config.xml配置文件中的应用ID
			"viewid" : "com.yonyou.demonstration.login", //后台带包名的Controller名
			"action" : "login_MA", //方法名
			"params" : {
				"user1" : username,
				"pwd" : password
			}, //自定义参数
			"callback" : "loginCallback()", //请求回来后执行的js方法
			"error" : "loginerror()" //失败回调的js方法
		})
	}
}

function loginCallback(args) {
	if (args.resultctx == "true") {
		//获取用户登录信息
		var userinfo = {
			username : Constant.username,
			password : Constant.password,
			autologin : $("#autoLogin")[0].checked, //.val(),//document.getElementById("autoLogin").checked, //获取是否自动登录
			name : "旭阳门户"
		};
		//存储用户登录信息
		localStorage.userinfo = JSON.stringify(userinfo);
		summer.openWin({
			"id" : "login",
			"url" : "index.html",
			"pageParam" : {
				"count" : 1
			}
		});
	} else {
		alert("登录失败");
	}

}

function loginerror(args) {
	alert(JSON.stringify(args));
}

/**
 *通过MA登录应用平台
 */
function loginAP() {
	UM.showLoadingBar({
		text : "登录中...",
		icons : 'ti-loading',
	});
	username = "admin";
	password = "123qwe";
	if (username == "" || password == "") {
		UM.alert("用户名密码不能为空");
	} else {
		summer.callAction({
			"appid" : "Demonstration", //当前应用id，即config.xml配置文件中的应用ID
			"viewid" : "com.yonyou.iuap.login_iuap_util", //固定
			"action" : "login_iuapAP", //固定
			"params" : {
				"username" : username,
				"password" : password
			}, //自定义参数
			"callback" : "loginAPcallback()", //请求回来后执行的js方法
			"error" : "loginAPerror()" //失败回调的js方法
		})
	}
}

function loginAPcallback(args) {
	UM.hideLoadingBar();
	alert($summer.jsonToStr(args));
	var status = args.body.status;

	if (status == "1") {
		//保存cookie到本地
		summer.setStorage("Authority", args.Authority);
		summer.openWin({
			"id" : "root",
			"url" : "index.html"
		});
	} else {

	}
}

function loginAPerror(args) {
	UM.hideLoadingBar();
	alert($summer.jsonToStr(args));
}

function btnLoginNC_Click() {
	UM.showLoadingBar({
		text : "登录中...",
		icons : 'ti-loading',
	});
	username = $summer.byId("user").value;
	//sh
	password = $summer.byId("psw").value;
	//"yonyou@1";
	loginInfo = {
		"username" : username,
		"password" : password
	}
	if (username == "" || password == "") {
		UM.alert("用户名密码不能为空");
	} else {

		if (confirm("直接走IFWLogin登录？")) {
			callSSOLoginController(loginInfo);
		} else {
			summer.callService("UMService.login", //原生方法名字（类名+方法名）
			{
				"appid" : "moli_UAPNC", //必填，key值不可变
				"type" : "nc", //必填，key值不可变
				"user" : username, //必填，key值不可变
				"pass" : password, //必填，key值不可变
				"funcode" : "Moli01", //自定义参数，当type为nc时，必填，与NC有关
				"callback" : function(args) {//args是一个json对象
					UM.hideLoadingBar();
					if (args.resultcode == "1") {//表示正常登陆成功
						alert("使用UMService.login登陆NC成功,args为：\n " + $summer.jsonToStr(args));
						if (confirm("是否进行IFWLogin登录")) {

							callSSOLoginController(loginInfo);
						} else {
							summer.openWin({
								"id" : "root",
								"url" : "index.html",
								"pageParam" : {
									"nctoken" : args.token
								}
							});
						}
					} else {
						alert("使用UMService.login登陆NC成功回调,\n args.resultcode=" + args.resultcode + ",\n args为：" + $summer.jsonToStr(args));
					}
				},
				"error" : function(args) {
					UM.hideLoadingBar();
					alert("第一次登录UMService.login失败：" + $summer.jsonToStr(args));
				}
			}, //参数
			false//异步（true 同步）
			);
		}
	}
}

function callSSOLoginController(loginInfo) {
	UM.showLoadingBar({
		text : "登录中...",
		icons : 'ti-loading',
	});
	summer.callAction({
		"appid" : "Moli_UAPNC", //必填参数，当前应用id，即config.xml配置文件中的应用ID
		"viewid" : "com.yonyou.moli.nc65.IFWLoginController", //必填参数，后台带包名的Controller名
		"action" : "login", //必填参数，方法名
		"params" : loginInfo, //非必填参数，param可用来向MA传递自定义参数，Controller的args中可以获取
		"callback" : function(args) {
			UM.hideLoadingBar();
			alert("IFWLogin登录成功，返回值：" + $summer.jsonToStr(args));
			//console.log(JSON.stringify(args));

			//传递参数的方式很多，可以使用setStorage，也可以通过openWin的pageParam传递
			//summer.setStorage("nctoken", args.nctoken);
			summer.openWin({
				"id" : "index",
				"url" : "index.html",
				"pageParam" : {
					//"ncurl" : "http://172.20.15.37:8899",//可以不传递，也可以可以MA通过datasource.xml获取
					"nctoken" : args.nctoken,
					"accountcode" : "dev",
					"usercode" : loginInfo.username
				}
			});
		},
		"error" : function(args) {
			UM.hideLoadingBar();
			alert("第二次登录IFWLoginController失败：" + $summer.jsonToStr(args));
		}
	})
}

function btnMASettings_Click() {

	var curHost = summer.readConfig("host");
	var curPort = summer.readConfig("port");
	var defaultHost = "172.25.208.1";
	if (!curHost) {
		curHost = prompt("输入MA的ip", defaultHost);
	}

	var defaultPort = "8080";
	if (!curPort) {
		curPort = prompt("输入MA的port", defaultPort);
	}

	summer.writeConfig({
		"host" : curHost, //MA主机地址
		"port" : curPort //MA主机端口
	});
	summer.setStorage("MA_HOST_PORT", {
		"host" : curHost, //MA主机地址
		"port" : curPort //MA主机端口
	});
	alert("当前MA的ip为" + curHost + ", port为" + curPort);
}

function btnSSOLoginNC_Click() {
	username = $summer.byId("user").value;
	//sh
	password = $summer.byId("psw").value;
	//"yonyou@1";
	loginInfo = {
		"username" : username,
		"password" : password
	}
	if (username == "" || password == "") {
		UM.alert("用户名密码不能为空");
	} else {
		summer.callService("UMService.login", //原生方法名字（类名+方法名）
		{
			"appid" : "moli_UAPNC", //必填，key值不可变
			"type" : "ua", //必填，key值不可变
			"user" : username, //必填，key值不可变
			"pass" : password, //必填，key值不可变
			"funcode" : "Moli01", //自定义参数，当type为nc时，必填，与NC有关
			"callback" : function(args) {//args是一个json对象
				UM.hideLoadingBar();
				alert("SSO Login登录成功，返回值：" + $summer.jsonToStr(args));
				//console.log(JSON.stringify(args));

				//传递参数的方式很多，可以使用setStorage，也可以通过openWin的pageParam传递
				//summer.setStorage("nctoken", args.nctoken);
				summer.openWin({
					"id" : "index",
					"url" : "index.html",
					"pageParam" : {
						"ncurl" : "http://172.20.15.37:8899",
						"nctoken" : args.nctoken,
						"accountcode" : "dev",
						"usercode" : loginInfo.username
					}
				});
			},
			"error" : function(args) {
				UM.hideLoadingBar();
				alert("第一次登录UMService.login失败：" + $summer.jsonToStr(args));
			}
		}, //参数
		false//异步（true 同步）
		);
	}
}
