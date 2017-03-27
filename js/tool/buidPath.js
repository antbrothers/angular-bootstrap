/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/9/1
 */

'use strict';
var myService = angular.module('authorize', []);
myService.factory('authorize', ['$http', function ($http) {
    return {
        // 正式的授权
        path: function (){
            return "http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/"
        }
        // 测试的授权
        /*path:function(){
            return "http://wxtest.i-ubo.com/wx_share/wxpay/getAuthor?backUri=http://wxtest.i-ubo.com/wx_share/wxpay/getCode?directUrl=http://wxtest.i-ubo.com/wx_share/html5/views/index.html%23/home/"
        }*/
    }
}]);
