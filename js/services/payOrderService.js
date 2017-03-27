/**
 * Created by Administrator on 2016/7/15.
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

