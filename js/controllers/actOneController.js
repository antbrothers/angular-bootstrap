'use strict';
var myControllers = angular.module('actOneController', []);
myControllers.controller('actOneCtrl',["$scope","$stateParams","activeService","$location",function ($scope, $stateParams, activeService, $location) {
    console.log('活动1');
    $scope.section_1 = "";
    $scope.section_2 = "";
    $scope.section_3 = "";
    $scope.section_4 = "";
    $scope.section_5 = "";
    $scope.section_6 = "";
    $scope.section_7 = "";
    $scope.neededService = "无";
    $scope.phone = "";
    $scope.section_8 = "";
    $scope.channel = $location.search().channel;

    $scope.che = "";


    /*activeService.getWxConfig().success(function(data){
     wx.config({
     debug: true, // 开启调试模式
     appId: data.appId,
     timestamp: data.timestamp,
     nonceStr: data.nonceStr,
     signature: data.signature,
     jsApiList: ['chooseWXPay','showOptionMenu','showMenuItems']
     });
     wx.ready(function(){
     /!*wx.showOptionMenu();*!/
     wx.showMenuItems({
     menuList: ['menuItem:profile','menuItem:addContact','menuItem:refresh']
     });
     });
     wx.error(function(res){

     });
     });*/

    $scope.changeOne = function (pram) {
        $scope.section_1 = pram;
        console.log("活动1:" + $scope.section_1);
        angular.element(".act").css("display", "none");
        angular.element('#actTwo').css("display", "block");

        /*_czc.push(["_trackEvent",category,action,label,value,nodeid]);*/
        _czc.push(["_trackEvent", "第一页", "第一页跳转", "链接",, "actOne"]);

    }
    $scope.changeTwo = function (pram) {
        $scope.section_2 = pram;
        console.log("活动2:" + $scope.section_2);
        angular.element(".act").css("display", "none");
        angular.element('#actThree').css("display", "block");
        _czc.push(['_trackEvent', '第二页', '第二页跳转', '链接',,'actTwo']);
    }
    $scope.changeThree = function (pram) {
        $scope.section_3 = pram;
        console.log("活动3:" + $scope.section_3);
        angular.element(".act").css("display", "none");
        angular.element('#actFour').css("display", "block");
        _czc.push(['_trackEvent', '第三页', '第三页跳转', '链接',,'actThree']);
    }
    $scope.changeFour = function (pram) {
        $scope.section_4 = pram;
        console.log("活动4:" + $scope.section_4);
        angular.element(".act").css("display", "none");
        angular.element('#actFive').css("display", "block");

        _czc.push(['_trackEvent', '第四页', '第四页跳转', '链接',,'actFour']);
    }

    $scope.changeFive = function (pram) {
        $scope.section_5 = pram;
        console.log("活动5:" + $scope.section_5);
        angular.element(".act").css("display", "none");
        angular.element('#actSix').css("display", "block");
        _czc.push(['_trackEvent', '第五页', '第五页跳转', '链接',,'actFive']);
    }
    $scope.changeSix = function (pram) {
        $scope.section_6 = pram;
        console.log("活动6:" + $scope.section_6);
        angular.element(".act").css("display", "none");
        angular.element('#actSeven').css("display", "block");

        _czc.push(['_trackEvent', '第六页', '第六页跳转', '链接',,'actSix']);
    }


    /**
     *
     * @param pram
     * @param val
     * @param $event
     * @param imgsrc_f   原始路径
     * @param imgsrc_y   选择中路径
     */
    $scope.changeSeven = function (pram, val, $event, imgsrc_f, imgsrc_y) {
        console.log(pram);
        var check = $("#" + pram).attr("checked");
        console.log(check);

        var $_this = $event.target;
        if (check == "checked") {
            $("#" + pram).attr("checked", false);
            $($_this).attr('src', imgsrc_f)
            $("#" + pram).val('0');

        } else {
            $("#" + pram).attr("checked", "checked");
            $($_this).attr('src', imgsrc_y)
            $("#" + pram).val(val);
        }
    }
    $scope.ChangeSevenTj = function () {

        var sheq = $('.checkSheQu');
        for (var m = 0; m < sheq.length; m++) {
            if ($($(".checkSheQu")[m]).attr("checked") == "checked") {
                $scope.che = "1";
                break;
            }

        }
        console.log("跳出:" + $scope.che);
        if ($scope.che == "1") {
            $scope.section_7 = "";
            var len = $(".commCheck");
            for (var i = 0; i < len.length; i++) {
                if ($($(".commCheck")[i]).attr("checked") == "checked") {
                    var val = $($(".commCheck")[i]).val();
                    if ($scope.section_7 == "") {
                        $scope.section_7 = val;
                    } else {
                        $scope.section_7 = $scope.section_7 + ',' + val;
                    }

                }
            }
            if ($(".service").val() != "") {
                $scope.neededService = $(".service").val();
            }
            console.log($scope.section_7);

            console.log("活动7:" + $scope.section_7);
            angular.element('#actSeven .tangchu').css("display", "block");


            _czc.push(['_trackEvent', '第7页', '提交多选', '事件',,'actSeven']);
        }else{
            $.helpTool().errorWarning("",{"desc":'请选择社区'})
          /*  $("#error_waring").remove();*/
        }

    }

    $scope.tiJiaoMobile = function () {
        $scope.phone = $(".mobile").val()
        if ($scope.phone == "") {
            $.helpTool().errorWarning("", {'desc': '请输入手机号码'})
        } else if ($scope.phone.length != 11) {
            $.helpTool().errorWarning("", {'desc': '请输入正确的手机号码'})
        } else {
            activeService.postData($scope.section_1, $scope.section_2, $scope.section_3, $scope.section_4, $scope.section_5, $scope.section_6, $scope.section_7, $scope.phone, $scope.neededService, $scope.channel).success(function (req) {
                if (req.errorNum == "0") {
                    /*window.location.href="http://www.p-share.cn/p_share_weixin/About/download";*/
                    angular.element(".phone_cont").css("display", "none");
                    angular.element('.tip').css("display", "block");
                    angular.element('.tc_bt').css("display", "block");

                    _czc.push(['_trackEvent', '第7页', '提交手机号', '事件',,'tangchu']);
                } else {
                    $.helpTool().errorWarning("", {'desc': req.errorInfo})
                }
            }).error(function (req) {
            })
        }
    }


    $scope.changeEight = function (pram, val, $event, imgsrc_f, imgsrc_y) {
        console.log(pram);
        var check = $("#" + pram).attr("checked");
        console.log(check);

        var $_this = $event.target;
        if (check == "checked") {
            $("#" + pram).attr("checked", false);
            $($_this).attr('src', imgsrc_f)
            $("#" + pram).val('0');

        } else {
            $("#" + pram).attr("checked", "checked");
            $($_this).attr('src', imgsrc_y)
            $("#" + pram).val(val);
        }
    }

    $scope.btn_tj = function () {
        $scope.phone = $(".mobile").val()
        if ($scope.phone == "") {
            $.helpTool().errorWarning("", {'desc': '请输入手机号码'})
        } else if ($scope.phone.length != 11) {
            $.helpTool().errorWarning("", {'desc': '请输入正确的手机号码'})
        } else {
            $scope.section_8 == "";
            var len = $(".commCheckEight");
            for (var i = 0; i < len.length; i++) {
                if ($($(".commCheckEight")[i]).attr("checked") == "checked") {
                    var val = $($(".commCheckEight")[i]).val();
                    if ($scope.section_8 == "") {
                        $scope.section_8 = val;
                    } else {
                        $scope.section_8 = $scope.section_8 + ',' + val;
                    }

                }
            }
            console.log("活动8:" + $scope.section_8);
            activeService.postData($scope.section_1, $scope.section_2, $scope.section_3, $scope.section_4, $scope.section_5, $scope.section_6, $scope.section_7, $scope.section_8, $scope.phone, $scope.neededService).success(function (req) {
                if (req.errorNum == "0") {
                    var browser = {
                        versions: function () {
                            var u = navigator.userAgent,
                                app = navigator.appVersion,
                                ua = navigator.userAgent.toLowerCase();
                            ;
                            return {//移动终端浏览器版本信息
                                trident: u.indexOf('Trident') > -1, //IE内核
                                presto: u.indexOf('Presto') > -1, //opera内核
                                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                                /* || u.indexOf('Linux') > -1*/
                                android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                                iPad: u.indexOf('iPad') > -1, //是否iPad
                                webApp: u.indexOf('Safari') == -1,  //是否web应该程序，没有头部与底部
                                wechat: ua.match(/MicroMessenger/i) == "micromessenger",//微信
                                weibo: ua.match(/WeiBo/i) == "weibo",//微博
                                qq: ua.match(/QQ/i) == "qq"          //qq
                            };
                        }(),
                        language: (navigator.browserLanguage || navigator.language).toLowerCase()
                    }
                    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                        window.location.href = "https://itunes.apple.com/cn/app/kou-dai-ting/id1049233050?mt=8";
                    } else if (browser.versions.android) {
                        window.location.href = "http://url.cn/2BpT4QC";
                    }

                } else {
                    $.helpTool().errorWarning("", {'desc': req.errorInfo})
                }
            }).error(function (req) {
                /* $.helpTool().errorWarning("",{'desc':'请输入手机号码'})*/
            })
        }
    }

}]);