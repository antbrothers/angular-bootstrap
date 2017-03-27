/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myService=angular.module('rentCarServices',[]);
myService.factory('rentCarServices',['$http',function($http){
    return{
        //租车
        rentCar:function() {
            return $http.get('/wx_share/Order/rentCar');
        },
    }
}]);
