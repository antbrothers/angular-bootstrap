/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myService=angular.module('loginServices',[]);
myService.factory('loginService',['$http',function($http){
    return{
        //微信支付获取openId
        getOpenId:function(code){
            return $http.get("/wx_share/wxpay/getOpenId?code="+code);
        },
        //登录
        login:function(phone,code,openId){
            return $http.post("/wx_share/Register/postLogin/"+phone+'/'+code+'/'+openId);
        },
    }
}]);
