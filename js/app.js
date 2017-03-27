'use strict';
var app =angular.module('MyApp',[
    'ui.router',
    'truncate',
    'antControllers',
    'antServices',
    'birdControllers',
    'birdServices',
    'LocalStorageModule'
]);
app.run(function($rootScope){
    $rootScope
        .$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            $("#ui-view").html("");
            $(".page-loading").removeClass("hidden");
           /* $(".load_js").css("display","block");*/

        });
    $rootScope
        .$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $(".page-loading").addClass("hidden");
           /* $(".load_js").css("display","none");*/
        });
})
app.config(function($stateProvider, $urlRouterProvider,localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('demoPrefix');
    $urlRouterProvider.when('','/home');
    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'index.html',
            controller:'Maintrl'
        })
        /**
         * 红包邀请
         * @desc 给app的链接方式：http://localhost:9090/wx_sharecar/html5/views/index.html#/home/redPacket?customId=b1178d7feb3e4f62ae6830297a7b7380
         */
        .state('home.redPacket', {
            url: "/redPacket?customId",
            views: {
                'homeCont' :{
                    templateUrl: "../templates/redPacket.html",
                    controller: 'redPacketCtrl'
                }
            }
        })
         /**
     * 分享
     * @desc 给app的链接方式：http://localhost:9090/wx_sharecar/html5/views/index.html#/home/share?customId=b1178d7feb3e4f62ae6830297a7b7380
     */
        .state('home.share', {
            url: "/share?customId",
            views: {
                'homeCont' :{
                    templateUrl: "../templates/share.html",
                    controller: 'shareCtrl'
                }
            }
        })        
        //车管家
        .state('home.carButler',{
            url:'/carButler',
            views:{
                'homeCont':{
                    templateUrl:"../templates/carButler.html",
                    controller:'carButlerCtrl'
                }
            }
        })
        //找车位
        .state('home.mapLocation',{
            url:'/mapLocation',
            views:{
                'homeCont':{
                    templateUrl:'../templates/mapLocation.html',
                    controller:'mapCtrl'
                }
            }
        })
        //添加加油卡充值
        .state('home.gasCard',{
            url:'/gasCard',
            views:{
                'homeCont':{
                    templateUrl:'../templates/gasCard.html',
                    controller:'gasCardCtrl'
                }
            }
        })
        //添加加油卡类型
        .state('home.addCarType',{
            url:'/addCarType',
            views:{
                'homeCont':{
                    templateUrl:'../templates/addCarType.html',
                    controller:'addCarTypeCtrl'
                }
            }
        })
        //违章查询
        .state('home.illegalQuery',{
            url:'/illegaQuery',
            views:{
                'homeCont':{
                    templateUrl:'../templates/illegaQuery.html',
                    controller:'illegaQueryCtrl'
                }
            }
        })
        //违章列表页面
        .state('home.illegaDetail',{
            url:'/illegaDetail',
            views:{
                'homeCont':{
                    templateUrl:'../templates/illegaDetail.html',
                    controller:'illegaDetailCtrl'
                }
            }
        })
        //违章详情页面
        .state('home.illegaInfor',{
            url:'/illegaInfor/:date/:area/:act/:code/:fen/:money/:handled',
            views:{
                'homeCont':{
                    templateUrl:'../templates/illegaInfor.html',
                    controller:'illegaInforCtrl'
                }
            }
        })


        //车辆临停
        .state('temporary',{
            url:'/temporary?customerId',
            templateUrl:'../templates/temporary.html',
            controller:'temporaryCtrl'
        })


        //登录
        .state('home.login',{
            url:'/login',
            views:{
                'homeCont':{
                    templateUrl:'../templates/login.html',
                    controller:'loginCtrl'
                }
            }
        })
        //注册
        .state('home.register',{
            url:'/register',
            views:{
                'homeCont':{
                    templateUrl:'../templates/register.html',
                    controller:'registerCtrl'
                }
            }
        })
        //洗车
        .state('home.cleanCar',{
        	url:'/cleanCar',
        	views:{
        		'homeCont':{
        			templateUrl:'../templates/cleanCar.html',
        			controller:'cleanCarCtrl'
        		}
        	}
        })
         //洗车订单记录
        .state('home.orderRecord',{
        	url:'/orderRecord',
        	views:{
        		'homeCont':{
        			templateUrl:'../templates/orderRecord.html',
        			controller:'orderRecordCtrl'
        		}
        	}
        })
         //租车
        .state('home.rentCar',{
            url:'/rentCar',
            views:{
                'homeCont':{
                    templateUrl:'../templates/rentCar.html',
                    controller:'rentCarCtrl'
                }
            }
        })
        //代泊
        .state('home.replaceStop',{
            url:'/replaceStop',
            views:{
                'homeCont':{
                    templateUrl:'../templates/replaceStop.html',
                    controller: 'replaceStopCtrl'
                }
            }
        })
        //代泊订单
        .state('home.replaceOrder',{
            url:'/replaceOrder',
            views:{
                'homeCont':{
                    templateUrl:'../templates/replaceOrder.html',
                    controller:'replaceOrderCtrl'
                }
            }
        })

    //代泊订单评价
        .state('home.orderAssess',{
            url:'/orderAssess',
            views:{
                'homeCont':{
                    templateUrl:'../templates/orderAssess.html',
                    controller:'orderAssessCtrl'
                }
            }
        })
    //测试localstorage页面
        .state('home.test',{
            url:'/test',
            views:{
                'homeCont':{
                    templateUrl:'../templates/test.html',
                    controller:'testCtrl'
                }
            }
        })
})
