/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/4
 */
'use strict';
var myService=angular.module('payOrderServices',[]);
myService.factory('payOrderService',['$http',function($http){
    return {
        //支付成功凭证
        getCarwashList:function(customerId, orderStatus, pageIndex){
            return $http.get('/wx_share/Order/CarwashList/'+customerId+'/' + orderStatus + '/' + pageIndex);
        },
    }
}]);

