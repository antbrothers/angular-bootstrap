/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/1
 */
var myController=angular.module('reservedParkController',[]);
myController.controller('reservedParkCtrl',["$scope","reservedParkService","$timeout","localStorageService","authorize",function($scope,reservedParkService,$timeout,localStorageService,authorize){
    console.log("预约停车");


     $scope.openId = localStorageService.get('userWxOpenIdSixThree');
     $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');
       
    /* $scope.openId="12121";
    $scope.customerId = "2016072100000720"; */    //用户的Id

    if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
       /* $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=reservedPark");*/
        var p = authorize.path();
        $scope.encodeuri=encodeURI(""+p+"login&type=reservedPark");
        window.location.href =$scope.encodeuri;
    }

    $.helpTool().loading().open();
    $scope.pageIndex="1";
    $scope.pageSize="8";
    $scope.parkData=[];
    $scope.more=false;


    $scope.dataBind=function(lat,lng,page,size){
        reservedParkService.getCanParkList(lat,lng,page,size).success(function (req) {
            angular.element(".empty").css("display","none");
            $.helpTool().loading().close();
            console.log(req);
            if (req.errorNum == '0') {

                $scope.parkData=$scope.parkData.concat(req.data);

                if(req.data.length<8){
                    $scope.more=true;
                    $scope.imgSrc="../images/bg_pic_1.png";
                    $scope.desc="更多停车场敬请期待";
                }

                //上拉刷新
                $timeout(function(){
                    $scope.$watch('$viewContentLoaded',function(){
                        var myScroll,
                            upIcon = $("#up-icon"),
                            downIcon = $("#down-icon");

                        myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true,click:true });
                        myScroll.on("scroll",function(){
                            var y = this.y,
                                maxY = this.maxScrollY - y,
                                downHasClass = downIcon.hasClass("reverse_icon"),
                                upHasClass = upIcon.hasClass("reverse_icon");

                            if(y >= 40){
                                !downHasClass && downIcon.addClass("reverse_icon");
                                return "";
                            }else if(y < 40 && y > 0){
                                downHasClass && downIcon.removeClass("reverse_icon");
                                return "";
                            }

                            if(maxY >= 40){
                                !upHasClass && upIcon.addClass("reverse_icon");
                                return "";
                            }else if(maxY < 40 && maxY >=0){
                                upHasClass && upIcon.removeClass("reverse_icon");
                                return "";
                            }
                        });
                        myScroll.on("slideUp",function(){
                            if(this.maxScrollY - this.y > 40){
                                console.log("长度:"+req.data.length);
                                $.helpTool().loading().open();
                                console.log("slideUp");
                                $scope.$apply(function () {
                                    $scope.pageIndex =parseInt($scope.pageIndex)+1;
                                    console.log("第"+$scope.pageIndex+"页");
                                    $scope.dataBind(lat,lng,$scope.pageIndex,$scope.pageSize);
                                });
                                upIcon.removeClass("reverse_icon");

                            }
                        });
                    });
                },500);



            }else if(req.errorNum=="1"){
                $scope.more=true;
                var myScroll;
                myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });
            } else {
                $.helpTool().errorWarning('', {"desc": req.errorInfo});
            }
        }).error(function (req) {
            angular.element(".empty").css("display","none");
            $.helpTool().loading().close();
            $.helpTool().errorWarning('', {"desc": "服务繁忙"});
        })
    }
    /**
     * 获取附近的停车场
     *根据经纬度在去获取菜单数据
     */
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('mapcontainer', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 5000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        //获取周边停车场
        $scope.dataBind(data.position.lat,data.position.lng,$scope.pageIndex,$scope.pageSize);
    }
    //解析定位错误信息
    function onError(data) {
        angular.element(".empty").css("display","none");
        $.helpTool().loading().close();
        $.helpTool().errorWarning('', {"desc": '定位失败'});
    }

    $scope.goTo=function(parkingid){
        alert(parkingid);
    }
}]);
