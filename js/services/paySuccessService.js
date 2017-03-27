/**
 * Created by Administrator on 2016/7/15.
 */
'use strict';
var myService=angular.module('paySuccessServices',[]);
myService.factory('paySuccessService',['$http',function($http){
    return {
        //支付成功
        orderdetail:function(orderId, orderType){
            return $http.get('/wx_share/order/myaccount/orderdetail?orderId='+orderId+'&orderType='+orderType);
        },
    }
}]);
