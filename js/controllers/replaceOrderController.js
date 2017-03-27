/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('replaceOrderController', []);
//代泊订单
myControllers.controller('replaceOrderCtrl', ["$scope","$state","replaceOrderService","$timeout","$location","localStorageService","authorize",function ($scope,$state, replaceOrderService, $timeout,$location,localStorageService,authorize) {
    $scope.openId = localStorageService.get('userWxOpenIdSixThree');
    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');

    /*$scope.openId="ow_yBwufcdKVMRAJBU8WT1n3E4ZA";
     $scope.customerId="2016081700000731";*/

    console.log("customerId:"+localStorageService.get('userWxCustomerIdSixThree')+";opendId:"+localStorageService.get('userWxOpenIdSixThree'));
    console.log("代泊订单");
    $.helpTool().loading().open();
    $scope.userCode=$location.search().code;

    $scope.viewIndex = 0;                                //活动页默认为0
    $scope.viewIndexCarNumber = "";                      //活动页的车牌号
    $scope.plateList = "";                               //代泊车辆列表
    $scope.viewIndexActiveCar = "";                      //活动页车辆数据绑定
    $scope.orderId = "";                                 //订单的Id
    var carTimeout = false;
    $scope.date = "";                                    //当前时间
    $scope.orderBeginDate = "";                          //订单开始时间
    $scope.orderEndDate = "";                            //订单结束时间
    $scope.differDate = "";                              // 时间相差,停车时长
    $scope.overDate="";                                  //超出预约取车时长
    $scope.over="";                                      //超出时长是否为负数

    $scope.parkingImageStr = "";                         //字符串拼接车辆图片
    $scope.hasCarImg = false;                            //是否有车辆图片
    $scope.parkingImageArr = [];                         //数组存放车辆图片
    $scope.parkingImageArrFilter = [];                   //过滤掉空数据重新存放车辆图片


    //计算时间差
    $scope.dateDiffer = function (nowDate, importDate) {
        $scope.importDate = Date.parse(new Date(importDate.replace(/-/g, "/")));
        $scope.TDOA = nowDate.getTime() - $scope.importDate;
        //计算出相差的天数
        $scope.days = Math.floor($scope.TDOA / (24 * 3600 * 1000));
        /*console.log("相差的天数:"+$scope.days);*/
        //计算出小时数
        $scope.level1 = $scope.TDOA % (24 * 3600 * 1000);
        $scope.hours = Math.floor($scope.level1 / (3600 * 1000));
        /* console.log("相差的小时:"+$scope.hours);*/
        //计算相差的分钟数
        $scope.level2 = $scope.level1 % (3600 * 1000);
        $scope.minutes = Math.floor($scope.level2 / (60 * 1000));
        /*console.log("相差分钟数:"+$scope.minutes);*/
        //计算相差的秒数
        $scope.level3 = $scope.level2 % (60 * 1000);
        $scope.seconds = Math.round($scope.level3 / 1000);
        /* console.log("相差秒数:"+$scope.seconds);*/
        return $scope.days + ":" + $scope.hours + ":" + $scope.minutes + ":" + $scope.seconds
    };
    //判断超出预约时长是否为负数
    $scope.minusOver=function(dateStr){
        var dateArr=dateStr.split(":").pop();
        if(dateArr<=0){
            return false;
        }else{
            return true;
        }
    };

    //过滤空数组
    $scope.ArrFilt = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length == 0) arr.splice(i, 1);
        }
        return arr;
    }
    //绑定车牌号列表
    $scope.getCarList = function () {
        replaceOrderService.getQueryParkerById($scope.customerId, '').success(function (req) {
            $.helpTool().loading().close();
            if (req.errorNum == "0") {
                if(req.parkerList.length!=0){
                    angular.element('.no_data').css("display","none");
                    $scope.plateList = req.parkerList;
                    $scope.viewIndexActiveCar = req.parkerList[0];
                    $scope.viewIndexCarNumber = req.parkerList[0].carNumber;
                    $scope.orderId = req.parkerList[0].orderId;
                    $scope.date = new Date();
                    $scope.orderBeginDate = req.parkerList[0].orderBeginDate;
                    $scope.orderEndDate=req.parkerList[0].orderEndDate;
                    $scope.differDate = $scope.dateDiffer($scope.date, $scope.orderBeginDate);
                    console.log("1停车时长:" + $scope.differDate);

                    $scope.overDate=$scope.dateDiffer($scope.date,$scope.orderEndDate);
                    $scope.over=$scope.minusOver($scope.overDate);
                    console.log("1超出预约取车时长:"+$scope.overDate+";"+$scope.over);

                    $scope.parkingImageStr = req.parkerList[0].parkingImagePath + "," + req.parkerList[0].validateImagePath;
                    $scope.parkingImageArr = $scope.parkingImageStr.split(",");
                    $scope.parkingImageArrFilter = $scope.ArrFilt($scope.parkingImageArr);

                    if ($scope.parkingImageArrFilter[0].length == 0) {
                        $scope.hasCarImg = false;
                    } else {
                        $scope.hasCarImg = true;

                    }
                    console.log($scope.plateList);
                    console.log($scope.viewIndexActiveCar);
                    $timeout(function () {
                        $scope.mySwiper = new Swiper('.car_swiper', {
                            prevButton: '.swiper-button-prev',
                            nextButton: '.swiper-button-next',
                        });
                        var swiper = new Swiper('.img_swiper', {
                            pagination: '.img_swiper_paginatioin',
                            prevButton: '.img_swiper_prev',
                            nextButton: '.img_swiper_next',
                            slidesPerView: 3,
                            spaceBetween: 10,
                            slidesPerGroup: 1,
                        });
                        POP.pic('.pic_content',{item:'div.img-con',dataSrc:'load-src'});
                        //切换车牌号
                        $scope.mySwiper.on('slideChangeStart', function (index) {
                            $scope.$apply(function () {
                                /* $scope.plateList = req.parkerList;*/
                                $scope.viewIndex = index.activeIndex;
                                $scope.viewIndexCarNumber = $scope.plateList[$scope.viewIndex].carNumber;
                                $scope.customerId = $scope.plateList[$scope.viewIndex].customerId;
                                $scope.viewIndexActiveCar = $scope.plateList[$scope.viewIndex];
                                $scope.orderId = $scope.plateList[$scope.viewIndex].orderId;

                                $scope.date = new Date();
                                $scope.orderBeginDate = $scope.plateList[$scope.viewIndex].orderBeginDate;
                                $scope.differDate = $scope.dateDiffer($scope.date, $scope.orderBeginDate);
                                console.log("2停车时长:" + $scope.differDate);
                                $scope.orderEndDate=$scope.plateList[$scope.viewIndex].orderEndDate;
                                $scope.overDate=$scope.dateDiffer($scope.date,$scope.orderEndDate);
                                $scope.over=$scope.minusOver($scope.overDate);
                                console.log("2超出预约取车时长:"+$scope.overDate);


                                $scope.parkingImageStr = $scope.plateList[$scope.viewIndex].parkingImagePath + "," + $scope.plateList[$scope.viewIndex].validateImagePath;
                                $scope.parkingImageArr = $scope.parkingImageStr.split(",");
                                $scope.parkingImageArrFilter = $scope.ArrFilt($scope.parkingImageArr);
                                if ($scope.parkingImageArrFilter[0].length == 0) {
                                    $scope.hasCarImg = false;
                                } else {
                                    $scope.hasCarImg = true;
                                }
                                $timeout(function () {
                                    var swiper = new Swiper('.img_swiper', {
                                        pagination: '.img_swiper_paginatioin',
                                        prevButton: '.img_swiper_prev',
                                        nextButton: '.img_swiper_next',
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                        slidesPerGroup: 1,
                                    });
                                    POP.pic('.pic_content',{item:'div.img-con',dataSrc:'load-src'});
                                }, 0);

                                console.log($scope.viewIndexActiveCar);
                            });
                        });
                    }, 0);
                }else{
                    angular.element('.no_data').css("display","block");
                    $timeout.cancel(carTimeout);
                    $timeout(function(){
                        $scope.$apply(function(){
                            $scope.viewIndex = 0;                                //活动页默认为0
                            $scope.viewIndexCarNumber = "";                      //活动页的车牌号
                            $scope.plateList = "";                               //代泊车辆列表
                            $scope.viewIndexActiveCar = "";                      //活动页车辆数据绑定
                            $scope.orderId = "";                                 //订单的Id
                            var carTimeout = false;
                            $scope.date = "";                                    //当前时间
                            $scope.orderBeginDate = "";                          //订单开始时间
                            $scope.orderEndDate = "";                            //订单结束时间
                            $scope.differDate = "";                              // 时间相差,停车时长
                            $scope.overDate="";                                  //超出预约取车时长
                            $scope.over="";                                      //超出时长是否为负数

                            $scope.parkingImageStr = "";                         //字符串拼接车辆图片
                            $scope.hasCarImg = false;                            //是否有车辆图片
                            $scope.parkingImageArr = [];                         //数组存放车辆图片
                            $scope.parkingImageArrFilter = [];                   //过滤掉空数据重新存放车辆图片
                        })
                    },0);
                    /* $state.reload();*/
                }
            } else {
                $.helpTool().errorWarning("", {"desc": req.errorInfo});
            }
        }).error(function () {
            $.helpTool().loading().close();
            $.helpTool().errorWarning("", {"desc": "服务器繁忙"})
        });
    };

    // 1秒钟刷新一次列表
    $scope.getMessage = function () {
        $timeout.cancel(carTimeout);
        $scope.$apply(function () {
            /*$scope.viewIndexCarNumber*/
            replaceOrderService.getQueryParkerById($scope.customerId,$scope.viewIndexCarNumber).success(function (req) {
                if(req.parkerList.length !=0){
                    angular.element('.no_data').css("display","none");
                    $scope.viewIndexActiveCar = req.parkerList[0];
                    $scope.date = new Date();
                    $scope.orderBeginDate = req.parkerList[0].orderBeginDate;
                    $scope.differDate = $scope.dateDiffer($scope.date, $scope.orderBeginDate);
                    $scope.orderEndDate=req.parkerList[0].orderEndDate;
                    $scope.overDate=$scope.dateDiffer($scope.date,$scope.orderEndDate);
                    $scope.over=$scope.minusOver($scope.overDate);

                    $scope.parkingImageStr = req.parkerList[0].parkingImagePath + "," + req.parkerList[0].validateImagePath;
                    $scope.parkingImageArr = $scope.parkingImageStr.split(",");
                    $scope.parkingImageArrFilter = $scope.ArrFilt($scope.parkingImageArr);


                    if ($scope.parkingImageArrFilter[0].length == 0) {
                        $scope.hasCarImg = false;
                    } else {
                        $scope.hasCarImg = true;
                        /*POP.pic('.pic_content',{item:'div.img-con',dataSrc:'load-src'});*/
                    }
                    $timeout(function () {
                        var swiper = new Swiper('.img_swiper', {
                            pagination: '.img_swiper_paginatioin',
                            prevButton: '.img_swiper_prev',
                            nextButton: '.img_swiper_next',
                            slidesPerView: 3,
                            spaceBetween: 10,
                            slidesPerGroup: 1,
                        });
                    }, 3);
                    /* console.log("3超出预约取车时长:"+$scope.overDate);*/
                    /*console.log("3停车时长:"+$scope.differDate);*/
                    /*  console.log($scope.viewIndexActiveCar);*/
                    /* console.log($scope.orderEndDate);*/
                }else{
                    angular.element('.no_data').css("display","block");
                    $scope.mySwiper = new Swiper('.car_swiper', {
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                    });
                    $scope.mySwiper.removeSlide($scope.viewIndex);
                    $scope.getCarList();
                }
            })
        })
        carTimeout = $timeout($scope.getMessage, 5000);
    }

    if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
       /* $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=replaceOrder");*/
        var p = authorize.path();
        $scope.encodeuri=encodeURI(""+p+"login&type=replaceOrder");
        window.location.href =$scope.encodeuri;
    }else{
        angular.element('.empty_page').css("display","none");
        $scope.getCarList();
        carTimeout = $timeout($scope.getMessage, 5000);
    }

    //取消代泊
    $scope.cancelReplace = function () {
        angular.element('.cancleOrder').showDialog().open({
            'dialogHead': '提示',
            'dialogDesc': '',
            'dialogHeadCorlor': '',
            'dialogEndTimeTxt': '',
            'dialogEndTimeValue': '',
            'preTxt': '',
            'PrePrice': '',
            'relate': '',
            'relateTel': '您是否要取消代泊',
            'status': "",
            'btn': ['取消', '确定'],
            'cancelCallBack': function () {
                angular.element(".dialog_box_content").remove();
            },
            'checkOrder': function () {
                replaceOrderService.getCancelOrder($scope.orderId).success(function (req) {
                    if (req.errorNum == "0") {
                        console.log(req);
                        angular.element(".dialog_box_content").remove();
                        $scope.mySwiper.removeSlide($scope.viewIndex);
                        $scope.getCarList();
                    } else {
                        $.helpTool().errorWarning("", {"desc": req.errorInfo});
                    }
                }).error(function () {
                    $.helpTool().errorWarning("", {"desc": "服务器繁忙"});
                })
            }
        })
    };

    //我要取车
    $scope.getCar=function(){
        replaceOrderService.gettingCar($scope.orderId).success(function(req){
            console.log(req);
            if(req.errorNum=="0"){
                //获取授权配置参数
                replaceOrderService.getWxConfig().success(function(data){
                    wx.config({
                        /* debug: true, // 开启调试模式*/
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['chooseWXPay']
                    });
                    //授权成功
                    wx.ready(function(){
                        $.ajax({
                            url: "/wx_share/wxpay/towxPay",
                            type: "POST",
                            dataType: "json",
                            data : {
                                money:req.data.amountPaid,
                                body: "口袋停临停",
                                openId: $scope.openId,
                                orderNo:req.data.orderId,
                                notify_url:"http://www.p-share.com/share/payment/wechat/backpay_12"
                            },
                            success: function(data){
                                wx.chooseWXPay({
                                    timestamp: data.timeStamp,
                                    nonceStr: data.nonceStr,
                                    package: data.package,
                                    signType: 'MD5',
                                    paySign: data.sign,
                                    success: function (res) {
                                        /*PaySuccess();
                                         $.MsgBox.Alert("提醒", "支付成功");*/
                                        // 支付成功后的回调函数
                                        $location.path("/home/orderAssess").search({customerId: $scope.customerId,orderId:$scope.orderId});
                                        /*$scope.getCarList();
                                         carTimeout = $timeout($scope.getMessage, 1000);*/
                                    },
                                    fail: function() {
                                        /*$.MsgBox.Alert("提醒", "支付失败");*/
                                    }
                                });
                            },
                            complete: function() {
                                /* hideLoader();*/
                            },
                            error:function(){
                                /* alert(error);*/
                            }
                        });
                    });
                    //授权失败
                    wx.error(function() {
                    })
                })
            }else{
                $.helpTool().errorWarning("",{"desc":req.errorInfo});
            }
        }).error(function(){
            $.helpTool().errorWarning("",{"desc":"服务器繁忙"});
        });
    }
}])
