'use strict';
var myControllers = angular.module('invitController', []);
myControllers.controller('invitCtrl', ['$scope','$stateParams','invitService','localStorageService','authorize',function ($scope, $stateParams,invitService,localStorageService,authorize) {
    console.log("invitCtrl");
    $scope.parklistShow=false;
    $scope.plot="";
    $scope.parkingId="";
    $scope.daoDate="";
    $scope.date=new Date();
    $scope.parkList="";
    $scope.name="";
    $scope.moblile="";
    $scope.carNumber="";

    $scope.historyData="";

    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');
    /*$scope.customerId="2016070800000717";  //2016070100000518*/
    $scope.parklist=false;

    //60秒倒计时
    var wait = 60;
    clearInterval(window.timeId);

    //邀请历史记录
    $scope.queryHistory=function(){
        invitService.queryHistory($scope.customerId,1,5).success(function(req){
            if(req.errorNum=="0"){
                console.log(req);
                if(req.data.length !=0){
                    angular.element('.no_car').css("display","none");
                    angular.element('.has_data').css("display","block");
                    $scope.historyData=req.data;
                }else{
                    angular.element('.no_car').css("display","block");
                    angular.element('.has_data').css("display","none");
                }
            }else{
                angular.element('.no_car').css("display","block");
                angular.element('.has_data').css("display","none");
                $.helpTool().errorWarning("",{"desc":req.errorInfo});
            }
        }).error(function(){
            $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
        })
    };
    $scope.queryHistory();
    if($scope.customerId=="" || $scope.customerId==null){
        /*$scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=invit");*/
        var p = authorize.path();
        $scope.encodeuri=encodeURI(""+p+"login&type=invit");
        window.location.href =$scope.encodeuri;
    }else{
        invitService.queryVillageOwner($scope.customerId).success(function(req){
            if(req.errorNum=="0"){
                if(req.data.length !=0){
                    $scope.parkList=req.data;
                    $scope.plot=req.data[0].parkingName;
                    $scope.parkingId=req.data[0].parkingId;
                }else{
                }
            }else if(req.errorNum=="1"){    //非业主
                layer.open({
                    content: '尊敬的用户，您尚未在我司服务的小区名单中，如有疑问可以通过以下电话进行反馈，谢谢<br><a style="color: #3AD5B8" href="tel://4000062637">400-006-2637 </a>',
                    btn: ['确定'],
                });
            }else
            {
                $.helpTool().errorWarning("",{'desc':req.errorInfo})
            }

        }).error(function(req){
            $.helpTool().errorWarning("",{'desc':'服务器繁忙'})
        })
    }

    $scope.CurentTime=function(){
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss=now.getSeconds();            //秒
        var clock = year + "";
        if(month < 10)
            clock += "0";
        clock += month + "";
        if(day < 10)
            clock += "0";
        clock += day + "";
        /*if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10)
            clock += '0';
        clock += mm +":";
        if(ss<10)
            clock +='0';
        clock +=ss;*/
        return(clock);
    }
    $scope.daoDate=$scope.CurentTime();

    $scope.selectReplacePark=function(){
        $scope.parklistShow=true;
    };
    $scope.closeList=function(){
        $scope.parklistShow=false;
    };
    $scope.selectPark=function(pram,parkingId){
        $scope.plot=pram;
        $scope.parkingId=parkingId;
    };
    //弹出日期插件
    angular.element('.how_take_time').mobiscroll().date({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        minDate: new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate()),
        maxDate: new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()+30),
        dateOrder: 'yymmdd',
        /* timeWheels: 'HHii',*/
        dateFormat:'yymmdd',
        /* timeFormat:'HH:ii:ss',*/
        onSelect: function (valueText, inst) {
            $scope.$apply(function() {
                $scope.daoDate=valueText;
            });
        }
    });

    //发送短信
    $scope.sendDx=function(){
        if($scope.plot=="" || $scope.parkingId==""){
            $.helpTool().errorWarning("",{"desc":"请选择小区"})
        }else if($scope.daoDate==""){
            $.helpTool().errorWarning("",{"desc":"请选择日期"})
        }else if ($scope.moblile == "" || $scope.moblile == undefined) {
            $.helpTool().errorWarning("", {"desc": '请输入手机号'});
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test($scope.moblile))) {
            $.helpTool().errorWarning('', {"desc": '请输入正确的手机号'});
        } else if($scope.carNumber!=""){
            if($scope.carNumber.length !=7){
                $.helpTool().errorWarning("",{"desc":"请输入正确的车牌号码"});
            }else{
                window.timeId = setInterval(function () {
                    if (wait == 0) {
                        $(".btn_replace_stop").attr("disabled", false);
                        $(".btn_replace_stop").text("发送邀请短信").css({'background':'#3AD5B8','color':'white','border':'none'});
                        clearInterval(window.timeId);
                        wait = 60;
                    } else {
                        $(".btn_replace_stop").attr("disabled", true);
                        $(".btn_replace_stop").text("发送邀请短信(" + wait + ")").css({'background':'#CBC9C9','color':'white','border':'2px solid #CBC9C9'});
                        wait--;
                    }
                }, 1000);
                console.log(timeId);
                invitService.add($scope.customerId,$scope.daoDate,$scope.parkingId,$scope.plot,$scope.name,$scope.moblile,$scope.carNumber).success(function(req){
                    if(req.errorNum=="0"){
                        console.log(req);
                        $scope.queryHistory();
                    }else{
                        clearInterval(window.timeId);
                        $.helpTool().errorWarning("",{"desc":req.errorInfo});
                    }
                }).error(function(){
                    clearInterval(window.timeId);
                    $.helpTool().errorWarning("",{"desc":"服务器请求失败"})
                });
            }
        }
        else{

            window.timeId = setInterval(function () {
                if (wait == 0) {
                    $(".btn_replace_stop").attr("disabled", false);
                    $(".btn_replace_stop").text("发送邀请短信").css({'background':'#3AD5B8','color':'white','border':'none'});
                    clearInterval(window.timeId);
                    wait = 60;
                } else {
                    $(".btn_replace_stop").attr("disabled", true);
                    $(".btn_replace_stop").text("发送邀请短信(" + wait + ")").css({'background':'#CBC9C9','color':'white','border':'2px solid #CBC9C9'});
                    wait--;
                }
            }, 1000);
            console.log(timeId);
            invitService.add($scope.customerId,$scope.daoDate,$scope.parkingId,$scope.plot,$scope.name,$scope.moblile,$scope.carNumber).success(function(req){
                if(req.errorNum=="0"){
                    console.log(req);
                    $scope.queryHistory();
                }else{
                    clearInterval(window.timeId);
                    $.helpTool().errorWarning("",{"desc":req.errorInfo});
                }
            }).error(function(){
                clearInterval(window.timeId);
                $.helpTool().errorWarning("",{"desc":"服务器请求失败"})
            });
        }
    };
    $scope.mySplit = function(string) {
        var array = string.split(',');
        return array;
    }
}]);