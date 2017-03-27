'use strict';
var myControllers = angular.module('carButlerController', []);
//车管家
myControllers.controller('carButlerCtrl',['$scope','$timeout','$stateParams', 'carButlerService','$location',function ($scope,$timeout,$stateParams, carButlerService, $location) {
    console.log("车管家");
    $.helpTool().loading().open();
    $scope.imgLink = {};
    $scope.parkingId={};   //附近停车场的Id
    //获取轮播图片
    carButlerService.getCarButlerImage().success(function (req) {
        $scope.imgArr = req.eventPageList;
        $timeout(function(){
            $scope.swiper = new Swiper('.swiper-container', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false,
                spaceBetween: 30
            });
        },0)
    }).error(function () {
        console.log("Error");
    });
    //获取菜单列表
    carButlerService.getMenu().success(function (req) {
        /*$.helpTool().loading().close();*/
        //console.log(req)
        if (req.errorNum == "0") {
            $scope.menuArr = req.srvList;

        } else {
            $.helpTool().errorWarning("", {"desc": req.errorInfo});
        }
    }).error(function () {
        /* $.helpTool().loading().close();*/
        $.helpTool().errorWarning("", {"desc": "服务器繁忙"})
    });
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
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
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
        carButlerService.getNearPark(data.position.lng, data.position.lat).success(function (req) {
            $.helpTool().loading().close();
            console.log(req);
            if (req.errorNum == '0') {
                $scope.parkingId=req.parkingList[0].parking_id;
            } else {
                $.helpTool().errorWarning('', {"desc": req.errorInfo});
            }
        }).error(function (req) {
            $.helpTool().loading().close();
            $.helpTool().errorWarning('', {"desc": "服务繁忙"});
        })
    }
    //解析定位错误信息
    function onError(data) {
        $.helpTool().loading().close();
        $.helpTool().errorWarning('', {"desc": '定位失败'});
    }
    //菜单跳转
    $scope.selectMenu = function (srvId) {
        switch (srvId) {
            case 1:
                // 全国违章查询
                $location.path('/home/illegaQuery');
                break;
            case 2:
                //加油卡充值
                $location.path('/home/gasCard');
                break;
            case 3:
                //洗车
                $location.path('/home/cleanCar');
                break;
            case 4:
                //汽车内里清洁
                $scope.instructe($scope.parkingId,srvId);
                break;
            case 5:
                //汽车打蜡啦啦啦
                $scope.instructe($scope.parkingId,srvId);
                break;
            case 6:
                //新服务
                $.helpTool().errorWarning("",{"desc":"敬请期待"})
                break;
            case 7:
                //租车
                $location.path('/home/rentCar');
                break;
            case 8:
                //充电
                $scope.instructe($scope.parkingId,srvId);
                break;
            case 9:
                break;
            case -1:
                break;
            default :
                break;
        }

    }
    //弹出服务简介
    $scope.instructe = function (parkingId,srvId) {
        carButlerService.getServeInfo($scope.parkingId,srvId).success(function(req){
            if(req.errorNum =="0"){
                console.log(req);
                $.helpTool().instructe(req.srvInfo);
            }else if(req.errorNum =="1"){
                $.helpTool().errorWarning("",{"desc":"当前停车场服务暂未开通，敬请期待..."});
            }else{
                $.helpTool().errorWarning("",{"desc":req.errorInfo});
            }
        }).error(function(){
            $.helpTool().errorWarning("",{"desc":"服务器繁忙"});
        });
    }

}]);