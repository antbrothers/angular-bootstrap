/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myService=angular.module('registerServices',[]);
myService.factory('registerService',['$http',function($http){
    return{
        //微信支付获取openId
        getOpenId:function(code){
            return $http.get("/wx_share/wxpay/getOpenId?code="+code);
        },
        //注册
        register:function(phone,paw,code,openId){
            return $http.post('/wx_share/Register/postRegister/'+phone+'/'+paw+'/'+code+'/'+openId);
        },
        //获取验证码
        getCode:function(phone){
            return $http.get('/wx_share/Register/sendSmsCode/'+phone);
        },
    }
}]);
