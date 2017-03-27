/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/4
 */
'use strict';
var myControllers=angular.module('reservedPayOrderControllers',[]);
myControllers.controller('reservedPayOrderCtrl', ["$scope","$timeout","$stateParams","paySuccessService","$location",function ($scope,$timeout, $stateParams,paySuccessService,$location) {
    console.log("优惠停车凭证");
    $scope.orderId = $location.search().orderId;
    $scope.orderType = $location.search().orderType;
    var wait = 4;
    clearInterval(window.timeId);
    $scope.timeCount=function(){
        window.timeId=setInterval(function () {
            if (wait == 1) {
                angular.element('.useImg').attr('src','../images/unused_d.png');
                wait = 4;
            }else if(wait==2){
                angular.element('.useImg').attr('src','../images/unused_c.png');
                wait--;

            }else if(wait ==3){
                angular.element('.useImg').attr('src','../images/unused_b.png');
                wait--;

            }else if(wait ==4){
                angular.element('.useImg').attr('src','../images/unused_a.png');
                wait--;
            }
        }, 500);
    };
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
                if(req.order.voucherStatus=="0"){
                    $scope.timeCount();
                }
                var str = $scope.toUtf8(""+req.order.orderId);
                angular.element("#code").qrcode({
                    render: "canvas",
                    width: 80,
                    height:80,
                    text: str
                });
                var setting={
                    barWidth:1,
                    barHeight:60
                };
                angular.element("#barcodeTarget").barcode(str, "code128",setting);
            }
        }else
        {
            $.helpTool().errorWarning("",{"desc":req.errorInfo})
        }

    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
    });


     $scope.toUtf8=function(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    };
}]);

