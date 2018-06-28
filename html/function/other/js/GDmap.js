var map,
    geolocation,
    scale,
    toolbar,
    marker;
summerready = function() {
	//加载地图，调用浏览器定位服务
	map = new AMap.Map('container', {
		resizeEnable : true,
		zoom : 11,
	});

	map.plugin(['AMap.Geolocation', 'AMap.Scale', 'AMap.ToolBar', 'AMap.MapType'], function() {//添加定位控件
		geolocation = new AMap.Geolocation({//定位设置
			enableHighAccuracy : true, //是否使用高精度定位，默认:true
			convert : true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			showCircle : true, //定位成功后用圆圈表示定位精度范围，默认：true
			timeout : 10000, //超过10秒后停止定位，默认：无穷大
			buttonOffset : new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			zoomToAccuracy : true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			buttonPosition : 'RB',
		});
		//添加比例尺控件
		scale = new AMap.Scale();
		//添加工具栏控件
		toolbar = new AMap.ToolBar();

		maptype = new AMap.MapType();
		map.addControl(geolocation);
		map.addControl(scale);
		map.addControl(toolbar);
		map.addControl(maptype);
		geolocation.getCurrentPosition();
	});
	getloactionTest();
	// 清除地图覆盖物
	map.clearMap();

	var markers = [{//标记位置
		icon : 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
		position : [116.205467, 39.907761]
	}, {
		icon : 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
		position : [116.368904, 39.913423]
	}, {
		icon : 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
		position : [116.305467, 39.807761]
	}];

	//添加新的坐标点
	var marker = new AMap.Marker({
		map : map,
		icon : "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
		position : [116.405467, 39.907761]
	});
	//给坐标点添加点击事件
	marker.on('click', function() {
		alert('您点击了点');
	});
	// 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
	var objMarker = [];
	markers.forEach(function(marker) {
		var marker = new AMap.Marker({
			map : map,
			icon : marker.icon,
			position : [marker.position[0], marker.position[1]],
			offset : new AMap.Pixel(-12, -36) //偏移位置
		});
		objMarker.push(marker);
	});
	AMap.event.addDomListener(document.getElementById('clearMarker'), 'click', function() {
		map.remove(objMarker);
	}, false);
}
function getloactionTest() {
	//为地图注册click事件获取鼠标点击出的经纬度坐标
	var clickEventListener = map.on('click', function(e) {
		alert(e.lnglat);
		//添加标记点
		addMarker(e.lnglat);
		regeocoder(e.lnglat);
	});

}

//逆地理编码
function regeocoder(lnglat) {
	var lnglatXY = lnglat;
	var geocoder = new AMap.Geocoder({
		radius : 1000,
		extensions : "base",
		city : "010"
	});
	geocoder.getAddress(lnglat, function(status, result) {
		if (status === 'complete' && result.info === 'OK') {
			geocoder_CallBack(result);
		}
	});
}

//逆地理编码回调方法
function geocoder_CallBack(data) {
	var address = data.regeocode.formattedAddress;
	//返回地址描述
	//给父窗口赋值--视情况决定
	alert(address);
}

// 实例化点标记
function addMarker(lnglat) {
	marker = new AMap.Marker({
		icon : "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
		position : lnglat
	});
	marker.setMap(map);
}

function BackClick() {
	summer.closeWin();
}

