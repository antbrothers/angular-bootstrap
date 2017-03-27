'use strict';
var myService=angular.module('carButlerServices',[]);
myService.factory('carButlerService',['$http',function($http){
    return {
        //获取车管家轮播图
        getCarButlerImage:function(){
            return $http.get('/wx_share/CarButler/getCarButlerImage')
        },
        //车管家获取菜单
        getMenu:function(){
            return $http.get('/wx_share/CarButler/getMenu');
        },
        /**
         * 根据地理位置获取附近的停车场
         * @param lng
         * @param lat
         * @returns {HttpPromise}
         */
        getNearPark:function(lng,lat){
            return $http.get('/wx_share/CarButler/getNearPark/'+lng+'/'+lat);
        },
        /**
         * 汽车内清洗、汽车打蜡、充电
         * @param parkingId  停车场的Id
         * @param srvId      类别的Id
         * @returns {HttpPromise}
         */
        getServeInfo:function(parkingId,srvId){
            return $http.get('/wx_share/CarButler/serveInstruc/'+parkingId+'/'+srvId);
        }
    }
}]);