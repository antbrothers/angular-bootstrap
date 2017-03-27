/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myService=angular.module('illegaQueryServices',[]);
myService.factory('illegaQuery',['$http',function($http){
    return {
        //违章记录查询 调用聚合数据接口
        getIllegaData:function(city,hphm,engineno,classno){
            /*return $http.jsonp('http://v.juhe.cn/wz/query?dtype=jsonp&callback=JSON_CALLBACK&city=SH&hphm=%E8%8B%8FL50A11&hpzl=02&engineno=123456&classno=&key=909110fd7305195902079f9e48057e42')*/
            return $http.jsonp('http://v.juhe.cn/wz/query?dtype=jsonp&callback=JSON_CALLBACK&city='+city+'&hphm='+encodeURI(hphm)+'&hpzl=02&engineno='+engineno+'&classno='+classno+'&key=909110fd7305195902079f9e48057e42')
        },
    }
}]);