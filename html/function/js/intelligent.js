 /**
 *身份证 
 */
function IDCradClick() {
	//身份证插件调用
	/**
	 * 合合信息插件
	 
	cordova.require("cordova-plugin-scancard.CardScanner").scanIdCard({}, function(args) {
		//alert(JSON.stringify(args));
		//正面
		if (args.CardItemInfo.CardType == 0) {
			var Name = args.CardItemInfo.Name;
			var Sex = args.CardItemInfo.Sex;
			var Nation = args.CardItemInfo.Nation;
			var Birthday = args.CardItemInfo.Birthday;
			var Address = args.CardItemInfo.Address;
			var IDNumber = args.CardItemInfo.IDNumber;
			var OriginImage = args.OriginImage;
			var data = {
				Name : Name,
				Sex : Sex,
				Nation : Nation,
				Birthday : Birthday,
				Address : Address,
				IDNumber : IDNumber,
				OriginImage : OriginImage
			}
			//存储扫描信息
			summer.setStorage("data", data);
			summer.openWin({
				"id" : 'IDCradZ',
				"url" : 'html/function/scan/IDCradZ.html'
			});

		} else {//反面
			var IssueAuthority = args.CardItemInfo.IssueAuthority;
			var Validity = args.CardItemInfo.Validity;
			var OriginImage = args.OriginImage;
			var data = {
				IssueAuthority : IssueAuthority,
				Validity : Validity,
				OriginImage : OriginImage,
			}
			//存储扫描信息
			summer.setStorage("data", data);
			summer.openWin({
				"id" : 'IDCradF',
				"url" : 'html/function/scan/IDCradF.html'
			});
		}
	}, function(reason) {
		alert("reason");
	});*/
	
	//新插件识别
	PersonScan.scan({}, function(args) {
		//alert(JSON.stringify(args));
			var Name = args.name;
			var Sex = args.sex;
			var Nation = args.nation;
			var Birthday = args.birth_date;
			var Address = args.address;
			var IDNumber = args.id;
			var OriginImage = args.imagePath;
			var data = {
				Name : Name,
				Sex : Sex,
				Nation : Nation,
				Birthday : Birthday,
				Address : Address,
				IDNumber : IDNumber,
				OriginImage : OriginImage
			}
			//存储扫描信息
			summer.setStorage("data", data);
			summer.openWin({
				"id" : 'IDCradZ',
				"url" : 'html/function/intelligent/IDCradZ.html'
			});
	}, function(args) {
		alert(args);
	}); 


}

/**
 *银行卡 
 */
function ICCradClick() {
	//银行卡插件调用
	/**
	 *合合信息插件 
	 
	cordova.require("cordova-plugin-scancard.CardScanner").scanBankCard({}, function(args) {
		//alert(JSON.stringify(args));
		var CardNumber = args.CardNumber;
		var CardValidThru = args.CardValidThru;
		var CardInsName = args.CardInsName;
		var BankCardType = args.BankCardType;
		var cardImagePath = args.cardImagePath;
		var data = {
			CardNumber : CardNumber,
			CardValidThru : CardValidThru,
			CardInsName : CardInsName,
			BankCardType : BankCardType,
			cardImagePath : cardImagePath
		}
		//存储扫描信息
		summer.setStorage("data", data);
		summer.openWin({
			"id" : 'ICCrad',
			"url" : 'html/function/scan/ICCrad.html'
		});
	}, function(reason) {
		alert("reason");
	});*/
	
	//新插件
	BankScan.scan({}, function(args) {
		alert(JSON.stringify(args));
	}, function(args) {
		alert(args);
	}); 

}

/**
 *打开指纹识别页面 
 */
function fingerprintClick() {
	summer.openWin({
		id : 'ImageFlipper',
		url : 'html/function/intelligent/fingerprint.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "指纹识别",
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
 *扫描
 */
function TestScanner() {
	summer.openScanner({
		"callback" : function(args) {
			alert(args.umdcode)
		} // 返回值 object类型 key值为result
	})
}

function BackClick() {
	summer.closeWin();
}