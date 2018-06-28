summerready = function() {
	if (summer.getStorage("data")) {
		//将json串转换为对应的JavaScript对象
		var data = summer.getStorage("data");
		$("#CardNumber").val(data.CardNumber);
		$("#CardValidThru").val(data.CardValidThru);
		$("#CardInsName").val(data.CardInsName);
		if (data.BankCardType == 1) {
			$("#BankCardType").val("信用卡");
		} else if (data.BankCardType == 2) {
			$("#BankCardType").val("储蓄卡");
		}
		$("#cardImagePath").attr("src", data.cardImagePath);
	} else {
		alert("数据为空");
	}
}
function BackClick() {
	summer.closeWin();
}