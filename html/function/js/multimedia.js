/**
 *图片轮播
 */
function ImageFlipper() {
	/**
	 *普通打开方式
	 summer.openWin({
	 "id" : 'ImageFlipper',
	 "url" : 'html/function/ImageFlipper.html'
	 });
	 */
	/**
	 *添加原生头打开方式
	 */
	summer.openWin({
		id : 'ImageFlipper',
		url : 'html/function/multimedia/ImageFlipper.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "图片展示",
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
 *图片涂鸦
 */
function doodle() {
	summer.openWin({
		id : 'ImageFlipper',
		url : 'html/function/multimedia/doodle.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "图片涂鸦",
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
 *图片添加水印
 */
function watemark() {
	summer.openWin({
		id : 'ImageFlipper',
		url : 'html/function/multimedia/watermark.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "图片添加水印",
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
 *打开相机
 */
function openCamera() {
	var params = ["android.permission.CAMERA", "android.permission.READ_PHONE_STATE", "android.permission.WRITE_EXTERNAL_STORAGE", ""];
	summer.getPermission(params, function(args) {
	}, function(args) {

	})
	summer.openCamera({
		callback : function(args) {
			alert(args.imgPath);
			list[0].content = args.imgPath;
		}
	});
}

/**
 *打开相册
 */
function openPhotoAlbum() {
	summer.openPhotoAlbum({
		callback : function(args) {
			list[1].content = args.imgPath;
		}
	});
}

/**
 *视频直播
 */
function livecloud() {
	var args = {
		url : "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
		title : "aaaa"
	};
	LiveCloud.livecloud(args, function() {
		alert('shareNews success');
	}, function(failReason) {
		alert(failReason);
	});

}

function BackClick() {
	summer.closeWin();
} 