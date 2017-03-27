/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/22
 */
'use strict';
var myService=angular.module('temPayServices',[]);
myService.factory('temPayService',['$http',function($http){
    return{
    	//根据车牌获取停车场列表
    	getDataByScanOrMenu:function(customerId,carNumber){
    		return $http.get('/wx_share/weixinPayment/getDataByScanOrMenu?customerId='+customerId+"&carNumber="+carNumber+"&orderType=11");
    	},
    	//获取缴费信息
    	getOrderData:function(parkingId,customerId,carNumber){
    		return $http.get('/wx_share/weixinPayment/getOrderData?parkingId='+parkingId+"&customerId="+customerId+"&carNumber="+carNumber+"&orderType=11");
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

