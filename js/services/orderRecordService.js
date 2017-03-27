/**
 * Created by Administrator on 2016/4/13.
 */
'use strict';
var myService=angular.module('orderRecordServices',[]);
myService.factory('orderRecordService',['$http',function($http){
    return {
        //洗车订单记录
        getCarwashList:function(customerId, orderStatus, pageIndex){
            return $http.get('/wx_share/Order/CarwashList/'+customerId+'/' + orderStatus + '/' + pageIndex);
        },
        //取消洗车订单
        cancelCarwashList:function(orderId, orderType){
            return $http.get('/wx_share/Order/Cancel/'+orderId+'/' + orderType);
        }
    }
}]);