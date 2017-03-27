/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/22
 */
'use strict';
var myService=angular.module('propertyPayServices',[]);
myService.factory('propertyPayService',['$http',function($http){
    return{
        //车场列表
        getDataByScanOrMenu:function(customerId,carNumber){
            return $http.get("/wx_share/weixinPayment/getDataByScanOrMenu?orderType=14"+"&customerId="+customerId+"&carNumber="+carNumber);
        },
        //获取缴费数据
        getOrderData:function(parkingId,customerId,carNumber){
            return $http.get("/wx_share/weixinPayment/getOrderData?parkingId="+parkingId+"&orderType=14"+"&customerId="+customerId+"&carNumber="+carNumber);
        },
        /*获取键盘内容*/
        //获取省简称
        getProvince:function(){
            return $http.get('../jianPan.json');
        },
        //获取英文+数字
        getEnglishNumber:function(){
            return $http.get('../jianPan.json');
        },

        //获取授权配置
        getWxConfig:function(){
            return $http.get('/wx_share/wxpay/getWxConfig');
        },
        //创建订单
        orderc:function(parkingId,customerId,carNumber,orderType,beginDate,monthNum){
            return $http.get('/wx_share/order/orderc?parkingId='+parkingId+"&customerId="+customerId+"&carNumber="+carNumber+"&orderType="+orderType+"&beginDate="+beginDate+"&monthNum="+monthNum);
        },
    }
}]);

