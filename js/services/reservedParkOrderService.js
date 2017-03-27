/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/3
 */
var myService=angular.module('reservedParkOrderService',[]);
myService.factory('reservedParkOrderService',['$http',function($http){
    return {
        //车场列表
        getReservedDate:function(parkingId){
            return $http.get('/wx_share/parking/reservedParking?parkingId='+parkingId+'&version=1.3.8');
        },
        //套餐
        getTaoCan:function(week,parkingId){
            return $http.get('/wx_share/parking/choseWeek?parkingId='+parkingId+'&week='+week+'&version=1.3.8');
        },
        //获取授权配置
        getWxConfig:function(){
            return $http.get('/wx_share/wxpay/getWxConfig');
        },
        //创建订单
        orderc:function(parkingId,customerId,carNumber,packageId,appointmentDate){
            return $http.get('/wx_share/order/orderc?parkingId='+parkingId+"&customerId="+customerId+"&carNumber="+carNumber+"&packageId="+packageId+"&appointmentDate="+appointmentDate+"&orderType=10");
        },
        //生成停车码，预约时间
        paidOrder:function(orderId,orderType,appointmentDate,packageId){
            return $http.get('/wx_share/order/paidOrder?orderId='+orderId+"&orderType="+orderType+"&appointmentDate="+appointmentDate+"&packageId="+packageId);
        },
        // 验证是否已经下过订单
        queryVoucherPage:function(customerId,carNumber,parkingId){
            return $http.get('/wx_share/order/queryVoucherPage?customerId='+customerId+"&voucherStatus="+'0'+"&pageIndex="+'1'+"&carNumber="+carNumber+"&version=1.3.7"+"&parkingId="+parkingId);
        }

    }
}]);
