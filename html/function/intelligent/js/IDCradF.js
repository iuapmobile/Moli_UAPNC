summerready = function() {
	if (summer.getStorage("data")) {
		//将json串转换为对应的JavaScript对象
		var data = summer.getStorage("data");
		$("#IssueAuthority").val(data.IssueAuthority);
		$("#Validity").val(data.Validity);
		$("#OriginImage").attr("src",data.OriginImage);
	} else {
		alert("数据为空");
	}
}
function BackClick() {
	summer.closeWin();
}