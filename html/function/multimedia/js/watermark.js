//设置水印文字，
var textgroup = [{
	    text:"左上角文字",
	    style:{"left":"10","top":"10","right":"0","bottom":"0","font-size":"16"}
	},{
	    text:"右上角文字",
	    style:{"left":"0","top":"10","right":"10","bottom":"0","font-size":"16"}
	},{
	    text:"左下角文字",
	    style:{"left":"10","top":"0","right":"0","bottom":"10","font-size":"16"}
	},{
	    text:"右下角文字",
	    style:{"left":"0","top":"0","right":"10","bottom":"10","font-size":"16"}
	},{
	    text:"中间文字",
	    style:{"left":"80","top":"80","right":"0","bottom":"0","font-size":"16"}
	}];
summerready = function(){
	//申请相机权限
	var params = ["android.permission.CAMERA",
				"android.permission.READ_EXTERNAL_STORAGE",
				"android.permission.READ_PHONE_STATE",
				"android.permission.WRITE_EXTERNAL_STORAGE"];
	summer.getPermission(params, function(ret){
		
	}, function(err){
		summer.toast({msg:'权限申请被拒绝'});
	});
}

/*
 * 场景1：水印图片来自相机拍照
 */
function fromCamera(){
	summer.openCamera({
        "callback" : function(ret){
        	var sourcePath = ret.imgPath;
        	var targetPath = sourcePath.substring(0, sourcePath.lastIndexOf('/')); 
        	var data = {
        		"src": sourcePath,
        		"target": targetPath + "/" + new Date().getTime() + ".jpg",
        		"textGroup":textgroup,
        		"callback":"water(sender,args)"
        	};
        	summer.callService("UMGraphics.watermark", data, false);
        }
    });
}

/*
 * 场景2：水印图片来自相机相册
 */
function fromPhotots(){
	summer.openPhotoAlbum({
    	callback : function (ret){
    		var sourcePath = ret.imgPath;
			var targetPath = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
			var data = {										
				"src": sourcePath,
				"target": targetPath + "/" + new Date().getTime() + ".jpg",
				"textGroup": textgroup,
				"callback":"water(sender, args)"
			};
			summer.callService("UMGraphics.watermark", data, false);
    	}
	});
}

function water(sender,args){
	$summer.alert(args.watermarkFile);
    $("#imageWatermark").attr('src', args.watermarkFile);
}

function BackClick() {
	summer.closeWin();
}