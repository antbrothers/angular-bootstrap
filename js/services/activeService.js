'use strict';
var myService=angular.module('activeServices',[]);
myService.factory('activeService',['$http',function($http){
    return {
        postData:function(section_1,section_2,section_3,section_4,section_5,section_6,section_7,phone,neededService,channel){
            return $http.get("/wx_share/share/postQuestionnaire/"+section_1+"/"+section_2+"/"+section_3+"/"+section_4+"/"+section_5+"/"+section_6+"/"+section_7+"/"+phone+"/"+neededService+"/"+channel)
        },
        //获取授权配置
        getWxConfig:function(){
            return $http.get('/wx_share/wxpay/getWxConfig');
        },
    }
}]);