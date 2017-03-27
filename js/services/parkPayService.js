/**
 * Created by Administrator on 2016/7/14.
 */
'use strict';
var myService=angular.module('parkPayServices',[]);
myService.factory('parkPayService',['$http',function($http){
    return {
        //获取车场列表和车牌号
        getDataByScanOrMenu:function(parkingId,customerId,type,carNumber){
            return $http.get('/wx_share/weixinPayment/getDataByScanOrMenu?parkingId='+parkingId+'&customerId=' + customerId + '&type=' + type + '&carNumber=' + carNumber);
        },
        //获取缴费类型
        getOrderData:function(parkingId,customerId,carNumber,orderType){
            return $http.get('/wx_share/weixinPayment/getOrderData?parkingId='+parkingId+'&customerId='+customerId+'&carNumber='+carNumber+"&orderType="+orderType);
        },
        //获取授权配置
        getWxConfig:function(){
            return $http.get('/wx_share/wxpay/getWxConfig');
        },
        //创建订单
        orderc:function(parkingId,customerId,carNumber,orderType,beginDate,monthNum){
            return $http.get('/wx_share/order/orderc?parkingId='+parkingId+"&customerId="+customerId+"&carNumber="+carNumber+"&orderType="+orderType+"&beginDate="+beginDate+"&monthNum="+monthNum);
        },
        /*获取键盘内容*/
        //获取省简称
		getProvince:function(){
			return $http.get('../jianPan.json');
		},
		//获取英文+数字
		getEnglishNumber:function(){
			return $http.get('../jianPan.json');
		}
    }
}]);
