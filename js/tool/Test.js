//根据经纬度在去获取菜单数据
var map,geolocation;
//加载地图，调用浏览器定位服务
map = new AMap.Map('mapcontainer', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
//解析定位结果
function onComplete(data) {
    //获取周边停车场
    antService.getNearPark(data.position.lng,data.position.lat).success(function(req){
        $.helpTool().loading().close();
        console.log(req);
        if(req.errorNum =='0'){

        }else{
            $.helpTool().errorWarning('', {"desc": req.errorInfo});
        }
    }).error(function(req){
        $.helpTool().loading().close();
        $.helpTool().errorWarning('', {"desc": "服务繁忙"});
    })
}
//解析定位错误信息
function onError(data) {
    $.helpTool().loading().close();
    $.helpTool().errorWarning('', {"desc": '定位失败'});
}