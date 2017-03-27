'use strict';
var myService=angular.module('invitCredServices',[]);
myService.factory('invitCredService',['$http',function($http){
    return{
        //查看凭证
        queryById:function(id){
            return $http.get("/wx_share/invitation/queryById/"+id);
        },
        //提交车牌号
        update:function(id,carNumber){
            return $http.get("/wx_share/invitation/update/"+id+"/"+carNumber);
        }
    }
}]);
