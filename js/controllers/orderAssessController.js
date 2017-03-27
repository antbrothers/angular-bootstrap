/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('orderAssessController', []);
//代泊订单评价
myControllers.controller('orderAssessCtrl',['$scope','orderAssessService','$location','$state','localStorageService',function ($scope,orderAssessService,$location,$state,localStorageService) {
    console.log('代泊订单评价');
    /*$scope.customerId="1212121212112";
     $scope.orderId="1212122222";*/

    /*$scope.customerId=$location.search().customerId;*/
    $scope.orderId =$location.search().orderId;

    $scope.customerId = localStorageService.get('userCustomerId');

    $scope.submitAssess=function (radioContent,content) {
        //因为html界面中单选按钮在没有被手动点击时  获取到的数据是 undefined  发送服务器的数据必须为 1，2,3
        var check = "1";
        //评论内容默认为"",如果有数据则赋值
        var string = "tap";
        if(radioContent != undefined)
        {
            check = radioContent
        }
        if(content==undefined){
            content="";
        }
        orderAssessService.orderAssess( $scope.customerId,$scope.orderId,"1",check,content).success(function (req) {
            console.log(req);
            if (req.errorNum == "0") {
                $state.go('home.replaceOrder');
                //成功对话框提示
                /* angular.element('.cancleOrder').showDialog().open({
                 'dialogHead': '提示',
                 'dialogDesc': '',
                 'dialogHeadCorlor': '',
                 'dialogEndTimeTxt': '',
                 'dialogEndTimeValue': '',
                 'preTxt': '',
                 'PrePrice': '',
                 'relate': '',
                 'relateTel': '评价成功，是否查看订单',
                 'status': "",
                 'btn': ['取消', '确定'],
                 'cancelCallBack': function () {
                 angular.element(".dialog_box_content").remove();
                 $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/replaceOrder");
                 window.location.href =$scope.encodeuri;
                 },
                 'checkOrder': function () {
                 angular.element(".dialog_box_content").remove();
                 $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/replaceOrder");
                 window.location.href =$scope.encodeuri;
                 }
                 })*/
            } else {
                //失败对话框
                $.helpTool().errorWarning("", {"desc": req.errorInfo});
            }
        })
    }
}]);

