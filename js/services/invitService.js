'use strict';
var myService=angular.module('invitServices',[]);
myService.factory('invitService',['$http',function($http){
    return{
        //获取业主信息
        queryVillageOwner:function(customerId){
            return $http.get("/wx_share/Invit/queryVillageOwner/"+customerId);
        },
        //发起访客邀请
        add:function(customerId,inviteDate,parkingId,parkingName,name,mobile,carNumber){
            return $http.get("/wx_share/Invit/add?customerId="+customerId+"&inviteDate="+inviteDate+"&parkingId="+parkingId+"&parkingName="+parkingName+"&name="+name+"&mobile="+mobile+"&carNumber="+carNumber);
        },
        //查询邀请历史记录
        queryHistory:function(customerId,pageIndex,pageSize){
            return $http.get("/wx_share/Invit/queryHistory/"+customerId+"/"+pageIndex+"/"+pageSize);
        }
    }
}]);
