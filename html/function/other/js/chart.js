summerready = function() {

}
function lineForm() {
	summer.openWin({
		id : 'lineForm',
		url : 'html/function/other/lineForm.html',
		type : "actionBar",
		create : false, //设置保留原生header
		actionBar : {
			title : "线性分析",
			titleColor : "#ffffff", //注意必须是6位数的颜色值。（3位数颜色值会不正常）
			backgroundColor : "#00a1ea",
			bottomLineColor : "#ffffff",
			leftItem : {
				image : "../../../../img/search.png",
				method : "backClick()", //返回按钮自定义事件，不传方法时默认点击返回后关闭当前页面，也可在打开的window中自定义事件
				text : "返回",
				textColor : "#ffffff" //返回文字颜色，注意必须是6位数的颜色值。（3位数颜色值会不正常）
			}
		}
	});

}


function backClick() {
	summer.closeWin();
}