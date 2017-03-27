/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/8
 */
'use strict';
var myService=angular.module('scanParkServices',[]);
myService.factory('scanParkService',['$http',function($http){
    return{
        //可代泊车场
        getCanParkList:function(lng,lat){
            return $http.get('/wx_share/ReplaceStop/canParkList?lng='+lng+"&lat="+lat+"&version="+'1.3.6');
        },
        //代泊 预计取车
        getTakeTimePrice:function(parkingId,startTime,endTime,version){
            return $http.post('/wx_share/ReplaceStop/calcParkPrice?parkingId='+parkingId+'&startTime='+startTime+'&endTime='+endTime+'&version='+version)
        },
        /**
         * 立即代泊 创建代泊订单
         * @param customerId      用户Id
         * @param carNumber       车牌号
         * @param parkingId       车场Id
         * @param startTime       开始时间
         * @param endTime         取车时间
         * @param isContinue      是否继续  初始为0,继续为1
         * @returns {HttpPromise}
         */
        getOrderC:function(customerId,carNumber,parkingId,startTime,endTime,isContinue){
            return $http.get('/wx_share/ReplaceStop/orderc?customerId='+customerId+"&carNumber="+carNumber+"&orderType="+'12'+"&parkingId="+parkingId+"&startTime="+startTime+"&endTime="+endTime+"&isContinue="+isContinue+"&version="+'1.3.7');
        }
    }
}]);
