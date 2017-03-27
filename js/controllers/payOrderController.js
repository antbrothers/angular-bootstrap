/**
 * Created by Administrator on 2016/7/15.
 */
'use strict';
var myControllers=angular.module('payOrderControllers',[]);
myControllers.controller('payOrderCtrl',["$scope","$timeout","$stateParams","paySuccessService","$location",function ($scope,$timeout, $stateParams,paySuccessService,$location) {
    console.log("支付凭证");
    $scope.orderId = $location.search().orderId;
    $scope.orderType = $location.search().orderType;
    var wait = 4;
    clearInterval(window.timeId);

    paySuccessService.orderdetail($scope.orderId,$scope.orderType).success(function(req){
        if(req.errorNum=="0"){
            console.log(req);
            if($scope.orderType=="13" || $scope.orderType=="14"){
                $scope.lt=true;
                $scope.data=req.order;
                $scope.carNumberStr=[req.order.carNumber.substring(0,2),req.order.carNumber.substring(2,7)];
            }else{
                $scope.lt=false;
                $scope.data=req.order;
                $scope.carNumberStr=[req.order.carNumber.substring(0,2),req.order.carNumber.substring(2,7)];
            }
        }else
        {
            $.helpTool().errorWarning("",{"desc":req.errorInfo})
        }

    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
    });

    $scope.timeCount=function(){
        window.timeId=setInterval(function () {
            if (wait == 1) {
                angular.element('.useImg').attr('src','../images/paidd.png');
                wait = 4;
            }else if(wait==2){
                angular.element('.useImg').attr('src','../images/paidc.png');
                wait--;

            }else if(wait ==3){
                angular.element('.useImg').attr('src','../images/paidb.png');
                wait--;

            }else if(wait ==4){
                angular.element('.useImg').attr('src','../images/paida.png');
                wait--;
            }
        }, 500);
    }
    $scope.timeCount();
}]);
