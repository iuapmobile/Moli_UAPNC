summerready = function() {
	var list = [{
		content : "http://pic32.nipic.com/20130827/12906030_123121414000_2.png"
	}, {
		content : "http://img.taopic.com/uploads/allimg/130517/240392-13051H0530958.jpg"
	}, {
		content : "http://pic39.nipic.com/20140308/496038_210222044000_2.jpg"
	}];
	var islider = new iSlider({
		type : 'pic',
		data : list,
		dom : document.getElementById("iSlider-wrapper"),
		isLooping : true,
		animateType : 'default',
		onslideend : function(idx) {
			$("#nav").find("li").eq(idx).addClass("active").siblings("li").removeClass("active");
		},
	});
	islider.addBtn();
	$("#nav").find("li").on("click", function() {
		$(this).addClass("active").siblings("li").removeClass("active");
		var i = $(this).index();
		islider.slideTo(i);
	});
	$(islider.wrap).on("click", ".islider-btn-outer", function() {
		var i = islider.slideIndex;
		$("#nav").find("li").eq(i).addClass("active").siblings("li").removeClass("active");
	});
}

function right() {
	alert("右侧按钮点击事件");
}

function BackClick() {
	summer.closeWin();
}

