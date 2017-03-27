'use strict';
var myService=angular.module('invitServices',[]);
myService.factory('invitService',['$http',function($http){
    return{
        //��ȡҵ����Ϣ
        queryVillageOwner:function(customerId){
            return $http.get("/wx_share/Invit/queryVillageOwner/"+customerId);
        },
        //����ÿ�����
        add:function(customerId,inviteDate,parkingId,parkingName,name,mobile,carNumber){
            return $http.get("/wx_share/Invit/add?customerId="+customerId+"&inviteDate="+inviteDate+"&parkingId="+parkingId+"&parkingName="+parkingName+"&name="+name+"&mobile="+mobile+"&carNumber="+carNumber);
        },
        //��ѯ������ʷ��¼
        queryHistory:function(customerId,pageIndex,pageSize){
            return $http.get("/wx_share/Invit/queryHistory/"+customerId+"/"+pageIndex+"/"+pageSize);
        }
    }
}]);
