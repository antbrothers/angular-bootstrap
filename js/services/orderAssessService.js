/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myService=angular.module('orderAssessServices',[]);
myService.factory('orderAssessService',['$http',function($http){
    return{
        //代泊订单评价
        orderAssess:function(customerId,orderId,commentType,commentLevel,commentContent) {
            return $http.post('/wx_share/daibo/orderAssess?customerId='+customerId+'&orderId='+orderId+'&commentType='+commentType+'&commentLevel='+commentLevel+'&commentContent='+commentContent);
        }
    }
}]);


