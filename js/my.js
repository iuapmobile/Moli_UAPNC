summerready = function() {

}
function update() {

	//Android 6以上需要手动获取手机权限
	var params = ["android.permission.INTERNET", "android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.READ_PHONE_STATE"];
	summer.getPermission(params, function successFn(args) {
		//成功返回OK
		alert(args);
		//获取当前版本号
		var versionInfo = summer.getAppVersion();
		//转换为json
		var version = JSON.parse(versionInfo);
		//对于android,结果："3";对于ios，结果是1.0.3
		alert("versionCode:" + version.versionCode);
		alert("versionName:" + version.versionName);
	}, function errorFn(ret) {
		//失败返回illegal access
		alert(args);
	})
}