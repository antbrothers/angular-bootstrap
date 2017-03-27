'use strict';
var myService=angular.module('proChartServices',[]);
myService.factory('proChartService',['$http',function($http){
    return {
        //获取日流水折线图数据
        getLineData:function(year,month,userId,pakingId){
            /*  return $http.get("../js/data/line.json")*/
            return $http.get("/wx_share/Chart/getMonthStream/"+year+"/"+month+"/"+userId+"/"+pakingId+"/"+'1.3.8')
        },
        //获取柱状图数据
        getColumnData:function(year,month,userId,pakingId){
            /*return $http.get("../js/data/column.json")*/
            return $http.get("/wx_share/Chart/getMonthSale?year="+year+"&month="+month+"&userId="+userId+"&parkingId="+pakingId+"&version="+'1.3.8');
        },
        //获取停车场
        getParking:function(userId){
            return $http.get("/wx_share/Chart/getParking/"+userId+"/"+'1.3.8')
        }
    }
}]);