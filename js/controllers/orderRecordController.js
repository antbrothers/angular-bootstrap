/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers=angular.module('orderRecordControllers',[]);
//洗车订单记录
myControllers.controller('orderRecordCtrl',['$scope','$stateParams','orderRecordService',function ($scope, $stateParams, orderRecordService) {
    console.log("洗车订单记录");
    // 10 表示未付款 11 已付款    1表示 分页的第一页
    //初始化调用显示未付款
    $scope.init = function (ele) {
        $(".washOrderformList").css("display", 'none');
        $("." + ele).css("display", "block");
        $('.comm_pay').removeClass('current');
        $(".noPay").addClass('current');
        orderRecordService.getCarwashList("d49ae0bc976f4cb18833326dca3d62e3", "10", "1").success(function (req) {
            console.log(req);
            if (req.errorNum == "0") {
                $scope.carwashList = req.carwashList;
            }
            else {
                $.helpTool().errorWarning('', {"desc": req.errorInfo});
            }
        }).error(function () {
            $.helpTool().errorWarning('', {"desc": '服务器繁忙'});
        })
    }
    $scope.init('no_pay');
    //已付款
    $scope.donePrice = function (ele) {
        $(".washOrderformList").css("display", 'none');
        $("." + ele).css("display", "block");
        $('.comm_pay').removeClass('current');
        $(".pay").addClass('current');
        orderRecordService.getCarwashList("d49ae0bc976f4cb18833326dca3d62e3", "11", "1").success(function (req) {
            console.log(req);
            if (req.errorNum == "0") {
                $scope.carwashListDone = req.carwashList;
            }
            else {
                $.helpTool().errorWarning('', {"desc": req.errorInfo});
            }
        }).error(function () {
            $.helpTool().errorWarning('', {"desc": '服务器繁忙'});
        })
    }
    //未付款
    $scope.noPrice = function (ele) {
        $scope.init(ele);
    }
    //取消洗车订单
    $scope.cancelOrder = function (orderId, orderType) {
        orderRecordService.cancelCarwashList(orderId, orderType).success(function (req) {
            console.log(req);
            if (req.errorNum == "0") {
                location.reload();
            }
            else {
                $.helpTool().errorWarning('', {"desc": req.errorInfo});
            }
        }).error(function () {
            $.helpTool().errorWarning('', {"desc": '服务器繁忙'});
        })

    }
}]);