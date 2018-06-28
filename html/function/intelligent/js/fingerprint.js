summerready = function(){
	//检查指纹登录初始状态
	var isOpenFinger = summer.getStorage("isOpenFinger");
	isOpenFinger = isOpenFinger == undefined || isOpenFinger == "false" ? false : true;
	$('.um-switch1').find('input').attr('checked', isOpenFinger);
}

function changeFingerStatus(){
	/*
	 * 判断指纹登录是否开启：
	 * 1、如果已开启，则再次点击后置为关闭状态。
	 * 2、如果未开启，则验证指纹。验证通过后开启指纹登录状态，验证未通过提示错误信息，并将状态保持。
	 */
	if($('.um-switch1').find("input").attr('checked') == 'checked'){
		setFingerStatus(false);
	}else{
		var params = {leftText: "取消"};//或者params = {}
		summer.require("cordova-plugin-summer-fingerprint.FingerPrint").fingerPrint(params,function (args){
			if(args.code == 1){
				summer.toast({
                     "msg" : args.msg
                });
				setFingerStatus(true);
			}	
		}, function(args){
			//点击取消、超过5次识别失败、手机设备不支持指纹或其他错误情况，均返回code == 0
			if(args.code == 0){
				summer.toast({
                     "msg" : args.error_msg
                });	
			}
			setFingerStatus(false);
			return;
		});
	}	
}

//设置指纹状态
function setFingerStatus(status){
	$('.um-switch1').find('input').attr('checked', status);
	//存储指纹开关状态
	summer.setStorage("isOpenFinger", status);
}

function BackClick() {
	summer.closeWin();
}