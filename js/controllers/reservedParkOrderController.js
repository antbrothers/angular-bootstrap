/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/3
 */

var myController= angular.module('reservedParkOrderController',[]);
myController.controller("reservedParkOrderCtrl",["$scope","$location","reservedParkOrderService","$timeout","localStorageService",function($scope,$location,reservedParkOrderService,$timeout,localStorageService){
   console.log("预约停车订单");

    $scope.openId = localStorageService.get('userWxOpenIdSixThree');
    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');
    if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
        $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=reservedParkOrder");
        window.location.href =$scope.encodeuri;
    }

    /*$scope.customerId="2016072100000720";*/
    $scope.parkingId=$location.search().parkingId;

    $scope.packageId="";    //套餐Id
    $scope.parice="";       //优惠价格
    $scope.chushiPrice="";  //初始价格
    $scope.TCS=true;
   var myScroll;
    $scope.loaded=function(){
        myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
    }
    $scope.loaded();


    $.helpTool().loading().open();
    reservedParkOrderService.getReservedDate($scope.parkingId).success(function(req){
        $.helpTool().loading().close();
        if(req.errorNum=="0"){
            console.log(req);
            $scope.sharePriceComment=req.data.sharePriceComment;
            $scope.weeks=req.data.week;
        }
    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"请求服务失败"});
    });

    //选择日期
    $scope.checkDate=function(week,event,price){

        $.helpTool().loading().open();
        //清除套餐
        $timeout(function(){
            $scope.$apply(function(){
                $scope.packageId="";
                $scope.price=price;
                $scope.chushiPrice=price;
            })
        },0);

        console.log(week);
        console.log(event.currentTarget);
        angular.element(event.currentTarget).closest('.data_ul').find("li").children().addClass('unselect');
        angular.element(event.currentTarget).children().removeClass('unselect');
        $scope.wk='';
        switch (week){
            case "周一":
                $scope.wk="1";
                break;
            case '周二':
                $scope.wk="2";
                break;
            case "周三":
                $scope.wk="3";
                break;
            case "周四":
                $scope.wk="4";
                break;
            case "周五":
                $scope.wk="5";
                break;
            case "周六":
                $scope.wk="6";
                break;
            case "周日":
                $scope.wk="7";
                break;
            default :
                break;
        }
        reservedParkOrderService.getTaoCan($scope.wk,$scope.parkingId).success(function(req){
            $.helpTool().loading().close();
            if(req.errorNum=="0"){
                console.log("套餐"+req.data);
                if(req.data.length=="0"){
                    $scope.TCS=true;
                }else{
                    $scope.TCS=false;
                    $scope.TaoCanData=req.data;
                    $timeout(function(){
                        angular.element(".dengyu").prev().children().filter('.jia').css("display","none");
                    },0)

                }

            }
        }).error(function(){
            $.helpTool().errorWarning('',{"desc":"请求服务器失败"});
        })
    }

    //选择套餐
    $scope.checkTc=function(event,ele,packageId,price){
        /*angular.element('.tcraio').attr("checked",false);
        $timeout(function(){
            $scope.$apply(function(){
                $scope.packageId=packageId;
                $scope.price=price;
                console.log("套餐Id:"+$scope.packageId);
            })
        },0);
        angular.element(event.currentTarget).next().attr("checked",true);
        angular.element('.selec_comm').attr("src",'../images/unselect.png');
        var t=angular.element(event.currentTarget).next().attr("checked");
        if(t){
            angular.element(event.currentTarget).attr("src",'../images/selected_a.png');
        }*/


        var t=angular.element(event.currentTarget).next().attr("checked");
        if(t==undefined){
            angular.element('.tcraio').attr("checked",false);
            angular.element('.selec_comm').attr("src","../images/unselect.png");
            angular.element(event.currentTarget).next().attr("checked",true);
            angular.element(event.currentTarget).attr("src",'../images/selected_a.png');
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.packageId=packageId;
                    $scope.price=price;
                    console.log("套餐Id:"+$scope.packageId);
                })
            },0);
        }else{
            angular.element('.tcraio').attr("checked",false);
            angular.element('.selec_comm').attr("src","../images/unselect.png");
            angular.element(event.currentTarget).attr("src",'../images/unselect.png');
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.packageId="";
                    $scope.price=$scope.chushiPrice;
                    console.log("套餐Id:"+$scope.packageId);
                })
            },0);
        }

    }
    //确认提交 支付
    $scope.queRen=function(){

        var re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
        if(angular.element('.cn').val().toUpperCase().search(re)==-1)
        {
            $.helpTool().errorWarning("",{"desc":"输入的车牌号格式不正确"});
            $scope.removeError();
            return false;
        }else if($scope.price==""){
            $.helpTool().errorWarning("",{"desc":"请选择停车时间"});
            $scope.removeError();
            return false;
        }

        $.helpTool().loading().open();

        reservedParkOrderService.orderc($scope.parkingId,$scope.customerId,angular.element('.cn').val(),$scope.packageId,$scope.wk).success(function(req){
            $.helpTool().loading().close();
            if(req.errorNum=="0"){
                console.log(req);

                //获取授权配置参数
                reservedParkOrderService.getWxConfig().success(function (data) {
                    wx.config({
                        /* debug: true, // 开启调试模式*/
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['chooseWXPay']
                    });
                    //授权成功
                    wx.ready(function () {
                        $.ajax({
                            url: "/wx_share/wxpay/towxPay",
                            type: "POST",
                            dataType: "json",
                            data: {
                                money: req.order.amountPaid,
                                body: "口袋停临停",
                                openId: $scope.openId,
                                orderNo: req.order.orderId,
                                notify_url: "http://www.p-share.com/share/payment/wechat/backpay_" + req.order.orderType
                            },
                            success: function (data) {
                                wx.chooseWXPay({
                                    timestamp: data.timeStamp,
                                    nonceStr: data.nonceStr,
                                    package: data.package,
                                    signType: 'MD5',
                                    paySign: data.sign,
                                    success: function () {
                                        $.helpTool().loading().open();
                                        reservedParkOrderService.paidOrder(req.order.orderId,10,$scope.wk,$scope.packageId).success(function(res){
                                            $.helpTool().loading().close();
                                            if(res.errorNum=="0"){
                                                window.location.href = "http://p-share.cn/wx_share/html5/views/index.html#/home/paySuccess?orderId=" + req.order.orderId + "&orderType=" + req.order.orderType;
                                            }
                                        }).error(function(req){

                                        });
                                    },
                                    fail: function () {
                                    }
                                });
                            },
                            complete: function () {
                            },
                            error: function () {
                            }
                        });
                    });
                    //授权失败
                    wx.error(function () {
                    })
                })
            }else{
                $.helpTool().errorWarning("",{"desc":req.errorInfo});
            }

        }).error(function(){
            $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
        });



    };
    //销毁错误提示
    $scope.removeError = function () {
        $timeout(function () {
            angular.element('#error_waring').remove();
        }, 1000)
    }
}]);