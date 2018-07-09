summerready = function() {
	var permissions = ["android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.READ_PHONE_STATE"];
	summer.getPermission(permissions, //所需权限参数，多个权限用逗号分隔
	function(response) {//成功回调

	}, function(response) {//失败回调
		alert(response);
	});
}
/**
 *扫描识别
 */
function IntelligentClick() {
	summer.openWin({
		id : 'scan',
		url : 'html/function/intelligent.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "智能服务",
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
 *多媒体
 */
function MultimediaClick() {
	summer.openWin({
		id : 'multimedia',
		url : 'html/function/multimedia.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "多媒体",
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
 *其它
 */
function OtherClick() {
	summer.openWin({
		id : 'other',
		url : 'html/function/other.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "其它",
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
 * 通过MA调用应用平台业务测试接口
 */
function test_portAP() {
	UM.showLoadingBar({
		text : "加载中...",
		icons : 'ti-loading',
	});
	//获取cookie
	var Authority = summer.getStorage("Authority");
	summer.callAction({
		"appid" : "Moli_UAPNC", //当前应用id，即config.xml配置文件中的应用ID
		"viewid" : "com.yonyou.iuap.doRequestWithLimiter", //后台带包名的Controller名   com.yonyou.iuapMobile.doRequestWithLimiter
		"action" : "doRequestWithLimiter", //方法名
		"params" : {
			"Authority" : Authority
		},
		"callback" : function(args) {
			UM.hideLoadingBar();
			alert("通过MA调用应用平台业务测试接口成功", +$summer.jsonToStr(args));
		},
		"error" : function(args) {
			UM.hideLoadingBar();
			alert("通过MA调用应用平台业务测试接口成功", +$summer.jsonToStr(args));
		}
	})
}

/**
 *通过MA调用NC审批测试接口
 */
function test_getTaskList() {
	UM.showLoadingBar({
		text : "加载中...",
		icons : 'ti-loading',
	});
	var pageParam = summer.pageParam;
	var date = getNowFormatDate();
	var json = {
		date : date,
		statuskey : "ishandled",
		statuscode : "unhandled",
		startline : 1,
		count : 25,
		condition : "",
		//funcid:"Moli01",
	}
	summer.callAction({
		"appid" : "Moli_UAPNC", //"Demonstration", //当前应用id，即config.xml配置文件中的应用ID
		//"viewid" : "com.yonyou.NC65.MyTaskController", //后台带包名的Controller名
		"viewid" : "com.yonyou.moli.nc65.MobileApproveController", //后台带包名的Controller名
		"action" : "getTaskList", //方法名
		"params" : json, //自定义参数
		"callback" : function(args) {
			UM.hideLoadingBar();
			alert("调用com.yonyou.moli.nc65.MobileApproveController。getTaskList成功\n " + JSON.stringify(args));
			var result = args.result;
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof result));
			//app.tasks = result;
		},
		"error" : function(args) {
			UM.hideLoadingBar();
			alert("调用com.yonyou.moli.nc65.MobileApproveController。getTaskList失败\n " + JSON.stringify(args));
			var result = args.result;
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof result));
			//app.tasks = result;
		}
	})

}

/**
 *获取日期
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

var G_USERID = "";
var G_GROUDID = "";

function test_getUserVOTran() {

	UM.showLoadingBar({
		text : "加载中...",
		icons : 'ti-loading',
	});

	alert(JSON.stringify(summer.pageParam));
	var param = {};

	if (confirm("通过MA配置进行调用？")) {
		param = {

			"accountcode" : summer.pageParam.accountcode, //"dev"
			"usercode" : summer.pageParam.usercode,
			"nctoken" : summer.pageParam.nctoken
		};
	} else {

		param = {
			"ncurl" : summer.pageParam.ncurl, //"http://172.20.15.37:8899"
			"accountcode" : summer.pageParam.accountcode, //"dev"
			"usercode" : summer.pageParam.usercode,
			"nctoken" : summer.pageParam.nctoken
		};
	}

	summer.callAction({
		"appid" : "Moli_UAPNC", //"Demonstration", //当前应用id，即config.xml配置文件中的应用ID
		"viewid" : "com.yonyou.moli.nc65.UserVOController", //后台带包名的Controller名
		"action" : "GetUserVOTran", //方法名
		"params" : param, //自定义参数
		"callback" : function(args) {
			UM.hideLoadingBar();
			alert("调用 com.yonyou.moli.nc65.UserVOController.GetUserVOTran() 成功!返回值为:\n " + JSON.stringify(args));
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof args));

			G_USERID = args.cuserid;
			G_GROUDID = args.pk_group;
			alert("设置G_USERID=" + G_USERID + "\n" + "设置G_GROUDID=" + G_GROUDID);

		},
		"error" : function(args) {
			UM.hideLoadingBar();
			alert("调用 com.yonyou.moli.nc65.GetUserVOTranController.GetUserVOTran 失败!返回值为:\n " + JSON.stringify(args));
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof args));
		}
	})
}

function test_getTaskListNew() {
	UM.showLoadingBar({
		text : "加载中...",
		icons : 'ti-loading',
	});

	var jsonPageParam = summer.pageParam;

	var ncurl = jsonPageParam.ncurl;

	if (ncurl == null || ncurl == "") {
		alert("nc地址没有传递")
		//ncurl = "http://172.20.15.37:8899";
	}
	/*
	 var json = {
	 "ncurl" : ncurl,
	 "accountcode" : jsonPageParam.accountcode, //"dev"
	 "usercode" : jsonPageParam.usercode,
	 "nctoken" : jsonPageParam.nctoken,
	 "getTaskListParam" : {
	 "groupid" : G_GROUDID, //1
	 "userid" : G_USERID, //2
	 "date" : "2018-6-15", //3
	 "statuskey" : "ishandled", //4
	 "statuscode" : "unhandled", //5
	 "condition" : "", //6
	 "startline" : 1, //7
	 "count" : 25//8
	 }
	 };
	 */

	if (!G_GROUDID || !G_USERID) {
		if (confirm("没有groupid和userid，是否先先获取groudid和userid？")) {
			test_getUserVOTran();
		} else {
			alert("由于没有groudid和userid不能调用，点击确定后返回");
			return;
		}
	}

	//groupid、userid等加上nc_前缀，避免与MA参数冲突
	var param = {
		//"nc_url" : ncurl,
		//"nc_dataSource":"nc65",
		"nc_accountcode" : "dev",
		"nc_token" : jsonPageParam.nctoken,
		"nc_usercode" : jsonPageParam.usercode,

		"nc_groupid" : G_GROUDID, //1
		"nc_userid" : G_USERID, //2
		"date" : "2018-6-15", //3
		"statuskey" : "ishandled", //4
		"statuscode" : "unhandled", //5
		"condition" : "", //6
		"startline" : 1, //7
		"count" : 25//8

	};

	summer.callAction({
		"appid" : "Moli_UAPNC", //"Demonstration", //当前应用id，即config.xml配置文件中的应用ID
		"viewid" : "com.yonyou.moli.nc65.UMApproveController", //后台带包名的Controller名
		"action" : "GetTaskList", //方法名
		"params" : param, //自定义参数
		"callback" : function(args) {
			UM.hideLoadingBar();
			alert("调用com.yonyou.moli.nc65.MobileApproveController。getTaskList成功\n " + JSON.stringify(args));
			var result = args.result;
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof result));
			//app.tasks = result;
		},
		"error" : function(args) {
			UM.hideLoadingBar();
			alert("调用com.yonyou.moli.nc65.MobileApproveController。getTaskList失败\n " + JSON.stringify(args));
			var result = args.result;
			console.log(JSON.stringify(args) + "\n" + "返回值的类型为：" + ( typeof result));
			//app.tasks = result;
		}
	})

}
