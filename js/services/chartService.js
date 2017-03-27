'use strict';
var myService=angular.module('chartServices',[]);
myService.factory('chartService',['$http',function($http){
    return {
        //获取饼图数据数据
        getChartPie:function(userId){
            /*return $http.get("../js/data/pie.json");*/
            return $http.get("/wx_share/Chart/getDaySale/"+userId+"/"+'1.3.8')
        },
        //获取折线图数据
        getLineData:function(userId){
           /* return $http.get("../js/data/line.json");*/
             return $http.get("/wx_share/Chart/getWeekSale/"+userId+"/"+'1.3.8')
        },
        //获取柱状图数据
        getColumnData:function(year,month,userId){
           /* return $http.get("../js/data/column.json");*/
            return $http.get("/wx_share/Chart/getMonthSale?year="+year+"&month="+month+"&userId="+userId+"&parkingId="+''+"&version="+'1.3.8');
             /*return $http.get("/wx_share/Chart/getMonthSale/"+year+"/"+month+"/"+userId+"/"+'1.3.8')*/
        },
        getClearance:function(userId,carNumber){
            return $http.get("/wx_share/Chart/clearance/"+userId+"/"+carNumber+"/"+'1.3.8');
        }
    }
}]);