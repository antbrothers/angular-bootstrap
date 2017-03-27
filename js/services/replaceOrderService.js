'use strict';
var myService=angular.module('replaceOrderServices',[]);
myService.factory('replaceOrderService',['$http',function($http){
    return {
        //代泊订单列表
        getQueryParkerById:function(customerId,carNumber){
            return $http.get('/wx_share/ReplaceOrder/queryParkerById?customerId='+customerId+"&carNumber="+carNumber+"&version="+"1.3.7");
        },
        //代泊订单 取消代泊
        getCancelOrder:function(orderId){
            return $http.get('/wx_share/ReplaceOrder/cancelOrder?orderId='+orderId);
        },
        //代泊订单取车
        gettingCar:function(orderId){
            return $http.get('/wx_share/ReplaceOrder/gettingCar?orderId='+orderId+"&version="+'1.3.7');
        },
        //获取授权配置
        getWxConfig:function(){
            return $http.get('/wx_share/wxpay/getWxConfig');
        },
    }
}]);