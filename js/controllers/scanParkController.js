/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/8
 */
var myController=angular.module('scanParkController',[]);
myController.controller('scanParkCtrl',["$scope","scanParkService","$state","$location","localStorageService","authorize",function($scope,scanParkService,$state,$location,localStorageService,authorize){

    $scope.openId = localStorageService.get('userWxOpenIdSixThree');
    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');

    /*$scope.customerId='2016053100000764';
    $scope.openId='ow_yBwufcdKVMRAJBU8WT1n3E4ZA';*/


    console.log("customerId:"+localStorageService.get('userWxCustomerIdSixThree')+";opendId:"+localStorageService.get('userWxOpenIdSixThree'));
    console.log("扫码代泊");

    if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
        /*$scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=replaceStop");*/
        var p = authorize.path();
        $scope.encodeuri=encodeURI(""+p+"login&type=scanPark");
        window.location.href =$scope.encodeuri;
    }else{
        angular.element('.empty_page').css("display","none");
    }


    $scope.parklist=false;
    $scope.plate=localStorageService.get('userCarNumber');         //车牌号
    $scope.parkName="";      //停车场名称
    $scope.parkId="";        //停车场的Id
    $scope.price="0";        //预计费用
    $scope.takeTime="";      //预计取车时间
    $scope.date=new Date();
    $scope.CurentTime=function(){
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss=now.getSeconds();            //秒
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10)
            clock += '0';
        clock += mm +":";
        if(ss<10)
            clock +='0';
        clock +=ss;
        return(clock);
    }
    $scope.date.getHour=$scope.CurentTime();

    scanParkService.getCanParkList("","").success(function(req){
        $.helpTool().loading().close();
        angular.element('.processOrder').css("display","none");
        if(req.errorNum=="0"){
            $scope.parkList=req.data;
        }else{
            $.helpTool().errorWarning("",{"desc":req.errorInfo});
        }

    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
    });
    /**
     * 获取附近的停车场
     *根据经纬度在去获取菜单数据
     */
    /*var map, geolocation;
     //加载地图，调用浏览器定位服务
     map = new AMap.Map('mapcontainer', {
     resizeEnable: true
     });
     map.plugin('AMap.Geolocation', function () {
     geolocation = new AMap.Geolocation({
     enableHighAccuracy: true,//是否使用高精度定位，默认:true
     timeout: 10000,          //超过10秒后停止定位，默认：无穷大
     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
     zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
     buttonPosition: 'RB'
     });
     map.addControl(geolocation);
     geolocation.getCurrentPosition();
     AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
     AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
     });
     //解析定位结果
     function onComplete(data) {
     //绑定可代泊的车场
     scanParkService.getCanParkList(data.position.lng, data.position.lat).success(function(req){
     $.helpTool().loading().close();
     if(req.errorNum=="0"){
     $scope.parkList=req.data;
     }else{
     $.helpTool().errorWarning("",{"desc":req.errorInfo});
     }

     }).error(function(){
     $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
     });
     }
     //解析定位错误信息
     function onError(data) {
     $.helpTool().loading().close();
     scanParkService.getCanParkList("","").success(function(req){
     $.helpTool().loading().close();
     if(req.errorNum=="0"){
     $scope.parkList=req.data;
     }else{
     $.helpTool().errorWarning("",{"desc":req.errorInfo});
     }

     }).error(function(){
     $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
     });
     }*/
    //弹出日期插件
    angular.element('.how_take_time').mobiscroll().datetime({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        minDate: new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(),$scope.date.getHours(),$scope.date.getMinutes()),
        maxDate: new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()+1,23,59),
        /* invalid: [
         { start: '00:00', end: '08:30' },
         ],*/
        dateOrder: 'yymmdd',
        timeWheels: 'HHii',
        dateFormat:'yy-mm-dd',
        timeFormat:'HH:ii:ss',
        onSelect: function (valueText, inst) {
            // 获取预计停车的费用
            scanParkService.getTakeTimePrice($scope.parkId,$scope.date.getHour,valueText,'001').success(function(req){
                console.log(req);
                if(req.errorNum=="0"){
                    angular.element(".btn_replace_stop").attr("disabled",false).css("background-color","#3AD5B8");
                    $scope.description=req.data.description;
                    $scope.price=req.data.price;
                }else{
                    $.helpTool().errorWarning("",{"desc":req.errorInfo});
                    angular.element(".btn_replace_stop").attr("disabled",true).css("background-color","#909090");
                }
            }).error(function(req){
                $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
            })
        }
    });

    //选择代泊车场
    $scope.selectReplacePark=function(){
        $scope.parklist=true;
    }
    //选择车场
    $scope.selectPark=function(parkName,parkId){
        $scope.parkName=parkName;
        $scope.parkId=parkId;
        $scope.parklist=false;
    }

    //立即代泊
    $scope.nowReplace=function(){
        if($scope.plate=="" || $scope.plate==null){
            $.helpTool().errorWarning("",{"desc":"请输入车牌号"})
        }else if($scope.plate.length<7){
            $.helpTool().errorWarning("",{"desc":"请输入正确的车牌号"})
        }else if($scope.takeTime==""){
            $.helpTool().errorWarning("",{"desc":"请选择取车时间"})
        }
        else{
            localStorageService.set('userCarNumber',$scope.plate);     //车牌号记录到缓存里
            //创建代泊订单
            scanParkService.getOrderC($scope.customerId,$scope.plate,$scope.parkId,$scope.date.getHour,$scope.takeTime,'0').success(function(req){
                if(req.errorNum=="0"){         //下单成功
                    $scope.dialogBox(req);
                }else if(req.errorNum=="1"){    //下单忙碌中
                    $scope.busyDialoBox(req);
                }else{
                    $.helpTool().errorWarning("",{"desc":req.errorInfo});
                }
            }).error(function(){
                $.helpTool().errorWarning("",{"desc":"服务器繁忙"});
            })
        }

    };
    //下单成功呼出插件
    $scope.dialogBox=function(req){
        angular.element('.dialog_btn_right').showDialog().open({
            'dialogHead':'恭喜您',
            'dialogDesc':'成功订购口袋停代泊业务！',
            'dialogEndTimeTxt':'取车时间为:',            //取车时间描述
            'dialogEndTimeValue':req.data.endTime,      //取车时间
            'preTxt':'预计费用:',                        //预计费用描述
            'PrePrice':req.data.price+'元',             //预计费用
            'relate':'您的车管家联系电话为:',             //联系方式
            'relateTel':req.data.parkerMobile,          //联系电话
            'status':"",                                //状态
            'btn':['取消','查看订单'],                    //按钮
            cancelCallBack:function(){
                angular.element(".dialog_box_content").remove();
            },
            checkOrder:function(status){
                console.log("查看订单");
                angular.element(".dialog_box_content").remove();
                /*$scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/replaceOrder");
                 window.location.href =$scope.encodeuri;*/
                /*$location.path("/home/replaceOrder");*/
                $state.go('home.replaceOrder');
            }
        })
    }
    //下单忙碌中呼出插件
    $scope.busyDialoBox=function(req){
        angular.element('.dialog_btn_right').showDialog().open({
            'dialogHeadCorlor':'#B1B1B1',
            'dialogHead':'现在车管家都在忙碌中',
            'dialogDesc':'<div style="color: #5F5F5F">前面等待<span style="color:rgb(58, 213, 184);font-size: 18px">'+req.data.count+'</span>辆车</div>',
            'dialogEndTimeTxt':'预计代泊时间为:',                 //取车时间描述
            'dialogEndTimeValue':'',                             //取车时间
            'preTxt':req.data.startTime,                         //预计费用描述
            'PrePrice':'',                                      //预计费用
            'relate':'请问是否继续下单?',                          //联系方式
            'relateTel':'',                                     //联系电话
            'status':"",                                        //状态
            'btn':['取消','继续'],                               //按钮
            cancelCallBack:function(){
                angular.element(".dialog_box_content").remove();
            },
            checkOrder:function(status){
                console.log("忙碌中");
                scanParkService.getOrderC($scope.customerId,$scope.plate,$scope.parkId,$scope.date.getHour,$scope.takeTime,'1').success(function(req){
                    if(req.errorNum=="0"){
                        $scope.dialogBox(req);
                    }else{
                        $.helpTool().errorWarning("",{"desc":req.errorInfo});
                    }
                }).error(function(){
                    $.helpTool().errorWarning("",{"desc":"服务器繁忙"});
                })
            }
        })
    };
    //关闭停车场列表
    $scope.closeList=function(){
        $scope.parklist=false;
    }
}]);