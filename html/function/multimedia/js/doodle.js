summerready = function() {
	//申请相机权限
	var params = ["android.permission.CAMERA",
	 "android.permission.READ_EXTERNAL_STORAGE", 
	 "android.permission.READ_PHONE_STATE", 
	 "android.permission.WRITE_EXTERNAL_STORAGE"];
	summer.getPermission(params, function(ret) {

	}, function(err) {
		summer.toast({
			msg : '权限申请被拒绝'
		});
	});
}
/*
 * 场景1：涂鸦图片路径为相机拍照
 */
function fromCamera() {
	summer.openCamera({
		"callback" : function(args) {
			doodle(args.imgPath);
		}
	});
}

/*
 * 场景2：涂鸦图片路径为本地相册内图片
 */
function fromPhotots() {
	summer.openPhotoAlbum({
		callback : function(args) {
			doodle(args.imgPath);
		}
	});
}

/*
 * 场景3：涂鸦图片路径为网络地址，则需要先调用summer.download()进行下载保存到本地后再进行涂鸦
 */
function fromDownload() {
	var address = "http://img.taopic.com/uploads/allimg/140227/235111-14022F9410899.jpg";
	summer.download({
		"url" : address,
		"locate" : "download/image",
		"filename" : "newfile.png",
		"override" : "true",
		"callback" : "downloadCallback()"
	});
}

function downloadCallback(ret) {
	if (ret.isfinish) {
		doodle(ret.savePath);
	}
}

function doodle(path) {
	//涂鸦项目中的文件，如何设置文件路径？
	summer.doodle({
		"src" : path,
		"callback" : "doodleSuccess()",
		"error" : "doodleError()"
	});
}

function doodleSuccess(ret) {
	$("#doodleImg").attr("src", ret.out);
	//args.out为涂鸦图片保存后的图片路径
}

function doodleError(err) {
	$summer.alert(err);
}

function BackClick() {
	summer.closeWin();
}