summerready = function() {
	if (summer.getStorage("data")) {
		//将json串转换为对应的JavaScript对象
		var data = summer.getStorage("data");
		$("#Name").val(data.Name);
		$("#Sex").val(data.Sex);
		$("#Nation").val(data.Nation);
		$("#Birthday").val(data.Birthday);
		$("#Address").val(data.Address);
		$("#IDNumber").val(data.IDNumber);
		//alert(data.OriginImage);
		$("#image").attr("src", data.OriginImage);
	} else {
		alert("数据为空");
	}
}
function BackClick() {
	summer.closeWin();
}