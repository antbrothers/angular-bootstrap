/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('loginController', []);
//登录
myControllers.controller('loginCtrl',['$scope','$stateParams','loginService','$location','localStorageService','$timeout',function ($scope, $stateParams, loginService, $location,localStorageService,$timeout) {
    console.log("登录");
    $scope.userCode = $location.search();
    $scope.openId = {};
    $scope.returnType=$location.search().type;           //要返回的页面的路径

    //获取opendId
    loginService.getOpenId($scope.userCode.code).success(function (req) {
        $scope.openId = req.openId;
    }).error(function () {
    });
   
    $scope.login = function (phone, pwd) {
        if ($.helpTool().checkMobile(phone, pwd))
            loginService.login(phone, pwd, $scope.openId).success(function (req) {
                if (req.errorNum == "0") {
                    $scope.userWxOpenIdSixThree = localStorageService.get('userWxOpenIdSixThree');
                    $scope.userWxCustomerIdSixThree = localStorageService.get('userWxCustomerIdSixThree');
                    console.log("customerId:"+localStorageService.get('userWxCustomerIdSixThree')+";opendId:"+$scope.userWxOpenIdSixThree);
                    $timeout(function(){
                        $scope.$apply(function(){
                            localStorageService.set('userWxOpenIdSixThree',req.customer.wxpayOpenid);
                            localStorageService.set('userWxCustomerIdSixThree',req.customer.customerId);
                            $scope.userWxOpenIdSixThree = localStorageService.get('userWxOpenIdSixThree');
                            $scope.userWxCustomerIdSixThree = localStorageService.get('userWxCustomerIdSixThree');
                            if($scope.returnType !="boxiang"){
                                if($scope.returnType =="temporary"){
                                    //跳转到临停
                                    $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/templates/temporary.html");
                                    window.location.href = $scope.encodeuri;
                                }else{
                                    /*alert($scope.userWxCustomerIdSixThree);*/
                                    //跳转到其他页面
                                    /*$scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/"+$scope.returnType);*/
                                    $scope.encodeuri="/home/"+$scope.returnType;
                                    $location.path($scope.encodeuri);
                                }

                            }
                        })
                    },0);
                } else {
                    $.helpTool().errorWarning('#error_show', {"desc": req.errorInfo});
                }
            }).error(function (req) {
                $.helpTool().errorWarning('#error_show', {"desc": "服务器繁忙"});
            })
    }
    //验证手机号码
    $scope.checkPhone = function (phone) {
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            $.helpTool().errorWarning('#error_show', {"desc": '请输入正确手机号'});
            return false;
        } else {
            return true;
        }
    }
    $scope.zhuChe = function () {
        if($scope.returnType !="boxiang"){
            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/register&type="+$scope.returnType);
            window.location.href = $scope.encodeuri;
        }else{
            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/register");
            window.location.href = $scope.encodeuri;
        }

    }
}]);

//免密登录
myControllers.controller('loginFreeCtrl',['$scope','$stateParams','registerService','loginService','$location','localStorageService','$timeout',function($scope, $stateParams,registerService,loginService, $location,localStorageService,$timeout){
    console.log("免密登录");
    console.log("登录");
    $scope.userCode = $location.search();
    $scope.openId = {};
    $scope.returnType=$location.search().type;           //要返回的页面的路径

    //获取opendId
    loginService.getOpenId($scope.userCode.code).success(function (req) {
        $scope.openId = req.openId;
    }).error(function () {
    });
    var wait = 60;
    clearInterval(window.timeId);
    //获取验证码
    $scope.getCode = function (phone) {
        if ($.helpTool().checkMobile(phone, "123456")) {
            $(".code_txt").attr("disabled", true);
            window.timeId = setInterval(function () {
                if (wait == 0) {
                    $(".code_txt").attr("disabled", false);
                    $(".code_txt").text("获取验证码").css({'background':'white','color':'#3AD5B8','border':'2px solid #3AD5B8'});
                    clearInterval(window.timeId);
                    wait = 60;
                } else {
                    $(".code_txt").attr("disabled", true);
                    $(".code_txt").text("重新获取(" + wait + ")").css({'background':'#CBC9C9','color':'white','border':'2px solid #CBC9C9'});
                    wait--;
                }
            }, 1000);
            console.log(timeId);
            registerService.getCode(phone).success(function (req) {
                _czc.push(["_trackEvent", "获取验证码", "请求", "发送",, "code"]);
                if (req.errorNum != '0') {
                    $.helpTool().errorWarning('#error_show', {"desc": '获取验证码失败'});
                }
            }).error(function () {
                $(".code_txt").attr("disabled", false);
                $(".code_txt").text("获取验证码").css({'background':'white','color':'#3AD5B8','border':'2px solid #3AD5B8'});
                clearInterval(window.timeId);
                $.helpTool().errorWarning('#error_show', {"desc": '获取验证码失败'});
            })
        }
    };
    //登录
    $scope.login=function(phone,code){
        if ($.helpTool().checkMobile(phone, "123456")) {
            loginService.login(phone,code, $scope.openId).success(function (req) {
                if (req.errorNum == "0") {

                    _czc.push(["_trackEvent", "免密登录", "跳转", "链接",, "loginFree"]);

                    $scope.userWxOpenIdSixThree = localStorageService.get('userWxOpenIdSixThree');
                    $scope.userWxCustomerIdSixThree = localStorageService.get('userWxCustomerIdSixThree');
                    console.log("customerId:"+localStorageService.get('userWxCustomerIdSixThree')+";opendId:"+$scope.userWxOpenIdSixThree);
                    $timeout(function(){
                        $scope.$apply(function(){
                            localStorageService.set('userWxOpenIdSixThree',req.customer.wxpayOpenid);
                            localStorageService.set('userWxCustomerIdSixThree',req.customer.customerId);
                            $scope.userWxOpenIdSixThree = localStorageService.get('userWxOpenIdSixThree');
                            $scope.userWxCustomerIdSixThree = localStorageService.get('userWxCustomerIdSixThree');
                            if($scope.returnType !="boxiang"){
                                if($scope.returnType =="temporary"){
                                    //跳转到临停
                                    $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/templates/temporary.html");
                                    window.location.href = $scope.encodeuri;
                                }else{
                                    /*alert($scope.userWxCustomerIdSixThree);*/
                                    //跳转到其他页面
                                    /*$scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/"+$scope.returnType);*/
                                    $scope.encodeuri="/home/"+$scope.returnType;
                                    $location.path($scope.encodeuri);
                                }

                            }
                        })
                    },0);
                } else {
                    $.helpTool().errorWarning('#error_show', {"desc": req.errorInfo});
                }
            }).error(function (req) {
                $.helpTool().errorWarning('#error_show', {"desc": "服务器繁忙"});
            })
        }
    };
    $scope.zhuChe = function () {
        if($scope.returnType !="boxiang"){
            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/register&type="+$scope.returnType);
            window.location.href = $scope.encodeuri;
        }else{
            $scope.encodeuri = encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/register");
            window.location.href = $scope.encodeuri;
        }

    };
}]);