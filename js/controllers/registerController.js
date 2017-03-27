/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('registerController', []);
//注册
myControllers.controller('registerCtrl', ["$scope","$stateParams","registerService","$location","localStorageService",function ($scope, $stateParams, registerService, $location,localStorageService) {
    console.log("注册");
    //60秒倒计时
    var wait = 60;
    clearInterval(window.timeId);
    var codeObj = $location.search();
    $scope.returnType=$location.search().type;                   //要返回页面的路径
    $scope.openId = {};
    //获取opendId
    registerService.getOpenId(codeObj.code).success(function (req) {
        $scope.openId = req.openId;
    }).error(function () {
    });

    //注册提交
    $scope.register = function (phone, psw, phonecode) {
        if ($.helpTool().checkMobile(phone, psw)) {
            if (phonecode == "" || phonecode == undefined) {
                $.helpTool().errorWarning("", {"desc": "请输入验证码"});
                return false;
            }
            registerService.register(phone, psw, phonecode, $scope.openId).success(function (req) {
                console.log(req);
                if (req.errorNum != '0') {
                    $.helpTool().errorWarning('#error_show', {"desc": req.errorInfo});
                } else {

                    localStorageService.set('userWxOpenIdSixThree',$scope.openId);
                    localStorageService.set('userWxCustomerIdSixThree',req.customerId);
                    $scope.userWxOpenIdSixThree = localStorageService.get('userWxOpenIdSixThree');
                    $scope.userWxCustomerIdSixThree = localStorageService.get('userWxCustomerIdSixThree');


                    if($scope.returnType !="boxiang"){
                        if($scope.returnType =="temporary"){
                            //跳转到临停
                            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://www.p-share.com/wx_share/html5/templates/temporary.html");
                            window.location.href = $scope.encodeuri;
                        }else{
                            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/"+$scope.returnType);
                            window.location.href = $scope.encodeuri;
                        }
                    }else{
                        $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://www.p-share.com/wx_share/html5/templates/temporary.html");
                        window.location.href = $scope.encodeuri;
                    }



                }
            }).error(function (req) {
                console.log("注册失败");
                $.helpTool().errorWarning('#error_show', {"desc": req.errorInfo});
            })
        }

    }
    //获取验证码
    $scope.getCode = function (phone) {
        if ($.helpTool().checkMobile(phone, "123456")) {
            $(".get_yanm").attr("disabled", true);
            registerService.getCode(phone).success(function (req) {
                if (req.errorNum != '0') {
                    $.helpTool().errorWarning('#error_show', {"desc": '获取验证码失败'});
                }
                window.timeId = setInterval(function () {
                    if (wait == 0) {
                        $(".get_yanm").attr("disabled", false);
                        $(".get_yanm").text("获取验证码").css("background-color", "#3AD5B8");
                        clearInterval(window.timeId);
                        wait = 60;
                    } else {
                        $(".get_yanm").attr("disabled", true);
                        $(".get_yanm").text("重新获取(" + wait + ")").css("background-color", "#CBC9C9");
                        wait--;
                    }
                }, 1000);
                console.log(timeId);
            }).error(function () {
                $(".get_yanm").attr("disabled", false);
                $.helpTool().errorWarning('#error_show', {"desc": '获取验证码失败'});
            })
        }
    }
}]);
