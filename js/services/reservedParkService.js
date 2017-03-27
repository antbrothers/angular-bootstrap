/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/1
 */
var myService=angular.module('reservedParkService',[]);
myService.factory('reservedParkService',['$http',function($http){
    return {
        //车场列表
        getCanParkList:function(latitude,longitude,pageIndex,pageSize){
            return $http.get('/wx_share/parking/carLov/getAppoPkList?latitude='+latitude+"&longitude="+longitude+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
        },
    }
}]);
