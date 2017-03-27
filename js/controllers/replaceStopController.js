/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('replaceStopController', []);
//代泊
myControllers.controller('replaceStopCtrl',['$scope','replaceStopService','$state','$location','localStorageService','$timeout','authorize',function($scope,replaceStopService,$state,$location,localStorageService,$timeout,authorize){

    $scope.openId = localStorageService.get('userWxOpenIdSixThree');
    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');

	 /*$scope.openId="12121";
	 $scope.customerId = "2016081700000731";*/     //用户的Id

    console.log("customerId:"+localStorageService.get('userWxCustomerIdSixThree')+";opendId:"+localStorageService.get('userWxOpenIdSixThree'));
    console.log("代泊");
    if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
       /* $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=replaceStop");*/
        var p = authorize.path();
        $scope.encodeuri=encodeURI(""+p+"login&type=replaceStop");
        window.location.href =$scope.encodeuri;
    }else{
        angular.element('.empty_page').css("display","none");
    }


    $scope.parklist=false;
    $scope.plate=localStorageService.get('userCarNumber');         //车牌号
    //模拟键盘 
    $scope.data = {};   
	$scope.data.num1="";
	$scope.data.num2="";
	$scope.data.num3="";
	$scope.data.num4="";
	$scope.data.num5="";
	$scope.data.num6="";
	$scope.data.num7="";
    //刚进页面判断$scope.plate = localStorageService是否有值
    console.log($scope.plate);
    if($scope.plate=="" || $scope.plate==null || $scope.plate==undefined){
    	
    }else if($scope.plate.length == 7){
    	var arr = $scope.plate.replace(/(.)(?=[^$])/g,"$1,").split(",");
    	$scope.data.num1=arr[0];
    	$scope.data.num2=arr[1];
    	$scope.data.num3=arr[2];
    	$scope.data.num4=arr[3];
    	$scope.data.num5=arr[4];
    	$scope.data.num6=arr[5];
    	$scope.data.num7=arr[6];
    }
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

    /*replaceStopService.getCanParkList("","").success(function(req){
        $.helpTool().loading().close();
        if(req.errorNum=="0"){
            $scope.parkList=req.data;
        }else{
            $.helpTool().errorWarning("",{"desc":req.errorInfo});
        }

    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
    });*/


    /**
     * 获取附近的停车场
     *根据经纬度在去获取菜单数据
     */
    $.helpTool().loading().open();
    var map, geolocation;
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
        replaceStopService.getCanParkList(data.position.lng, data.position.lat).success(function(req){
            $.helpTool().loading().close();
            if(req.errorNum=="0"){
                $scope.parkName=req.data[0].parkingName;      //停车场名称
                $scope.parkId=req.data[0].parkingId;        //停车场的Id
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
        replaceStopService.getCanParkList("","").success(function(req){
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
            replaceStopService.getTakeTimePrice($scope.parkId,$scope.date.getHour,valueText,'001').success(function(req){
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
        $timeout(function(){
            $scope.$apply(function(){
                $scope.parkName=parkName;
                $scope.parkId=parkId;
                $scope.takeTime="";
                $scope.price="0";
                $scope.parklist=false;

            });
        },100)
    };

    //确定订单
    $scope.nowReplace=function(){
        var agr = angular.element('.agreeCheck').attr('checked');
        if (agr == "checked") {    //选择了同意协议
            if($scope.plate=="" || $scope.plate==null){
                $.helpTool().errorWarning("",{"desc":"请输入车牌号"})
            }else if($scope.plate.length<7){
                $.helpTool().errorWarning("",{"desc":"请输入正确的车牌号"})
            }else if($scope.takeTime==""){
                $.helpTool().errorWarning("",{"desc":"请选择取车时间"})
            }else{
                localStorageService.set('userCarNumber',$scope.plate);     //车牌号记录到缓存里
                //创建代泊订单
                replaceStopService.getOrderC($scope.customerId,$scope.plate,$scope.parkId,$scope.date.getHour,$scope.takeTime,'0').success(function(req){
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
        }else{
            $.helpTool().errorWarning("",{"desc":"请同意协议"});
            return false;
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
                replaceStopService.getOrderC($scope.customerId,$scope.plate,$scope.parkId,$scope.date.getHour,$scope.takeTime,'1').success(function(req){
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
    //协议
    $scope.agree = function (elem) {
        var agr = angular.element('.' + elem).attr('checked');
        if (agr == "checked") {
            angular.element('.' + elem).attr('checked', false);
            angular.element('.checkImg').attr('src', '../images/disagree.png');
        } else if (agr == undefined) {
            angular.element('.' + elem).attr('checked', true);
            angular.element('.checkImg').attr('src', '../images/agree.png');
        }
    }   
	//获取省简称
	$scope.licensePlate = function(){
		replaceStopService.getProvince().success(function(req){
			$('.jianpan').show();
			num = 0;
			getNum=angular.element('.currnt').attr('data-val');
			$scope.name = req.licensePlate;
		});
		numAll=angular.element('.currnt').attr('data-val');
		$(this).css({
			'border':'1px solid #3AD5B8'
		});
	}
	
	//获取英文+数字
	$scope.EnglishNumber = function(){
		replaceStopService.getEnglishNumber().success(function(req){
			$('.jianpan').show();
			num = 0;
			getNum=angular.element('.currnt').attr('data-val');
			$scope.name  = req.EnglishNumber;
		});
		numAll=angular.element('.currnt').attr('data-val');
		$(this).css({
			'border':'1px solid #3AD5B8'
		});
	}
	
	$scope.focusEle = function(ele){
		$('#'+ele+'').focus();
		$('.button').css({
			'border':'1px solid #E5E5E5'
		});
		$('#'+ele+'').css({
			'border':'1px solid #3AD5B8'
		});
	}
	$scope.parseInt = parseInt;
	var num = '0';
	var getNum = '';//标识点击的是哪一个按钮
	var numAll ="";
//	var licensePlate = "";//车牌号码
	$scope.click = function($event,$click){
		$event.stopPropagation();//阻止事件向上冒泡
//		getNum=angular.element('.currnt').attr('data-val');
		numAll = ''+(parseInt(getNum)+parseInt(num))+'';
		console.log("getNum0 = " + getNum);
		console.log("numAll0 = " + numAll);
		switch(numAll){
			case '1':
				$scope.data.num1=$click;
			    $scope.focusEle(2);
			    replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 1;
					//判断是点击的是第几个按钮
					if(getNum == 1){
						num = 1;
					}else if(getNum == 2){
						num = 0;
					}else if(getNum == 3){
						num = -1;
					}else if(getNum == 4){
						num = -2;
					}else if(getNum == 5){
						num = -3;
					}else if(getNum == 6){
						num = -4;
					}else if(getNum == 7){
						num = -5;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '2':
				$scope.data.num2=$click;
				$scope.focusEle(3);
				replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 2;
					if(getNum == 1){
						num = 2;
					}else if(getNum == 2){
						num = 1;
					}else if(getNum == 3){
						num = 0;
					}else if(getNum == 4){
						num = -1;
					}else if(getNum == 5){
						num = -2;
					}else if(getNum == 6){
						num = -3;
					}else if(getNum == 7){
						num = -4;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '3':
				$scope.data.num3=$click;
				$scope.focusEle(4);
				replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 3;
					if(getNum == 1){
						num = 3;
					}else if(getNum == 2){
						num = 2;
					}else if(getNum == 3){
						num = 1;
					}else if(getNum == 4){
						num = 0;
					}else if(getNum == 5){
						num = -1;
					}else if(getNum == 6){
						num = -2;
					}else if(getNum == 7){
						num = -3;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '4':
				$scope.data.num4=$click;
				$scope.focusEle(5);
				replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 4;
					if(getNum == 1){
						num = 4;
					}else if(getNum == 2){
						num = 3;
					}else if(getNum == 3){
						num = 2;
					}else if(getNum == 4){
						num = 1;
					}else if(getNum == 5){
						num = 0;
					}else if(getNum == 6){
						num = -1;
					}else if(getNum == 7){
						num = -2;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '5':
				$scope.data.num5=$click;
				$scope.focusEle(6);
				replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 5;
					if(getNum == 1){
						num = 5;
					}else if(getNum == 2){
						num = 4;
					}else if(getNum == 3){
						num = 3;
					}else if(getNum == 4){
						num = 2;
					}else if(getNum == 5){
						num = 1;
					}else if(getNum == 6){
						num = 0;
					}else if(getNum == 7){
						num = -1;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '6':
				$scope.data.num6=$click;
				$scope.focusEle(7);
				replaceStopService.getEnglishNumber().success(function(req){
					$scope.name  = req.EnglishNumber;
					getNum = 6;
					if(getNum == 1){
						num = 6;
					}else if(getNum == 2){
						num = 5;
					}else if(getNum == 3){
						num = 4;
					}else if(getNum == 4){
						num = 3;
					}else if(getNum == 5){
						num = 2;
					}else if(getNum == 6){
						num = 1;
					}else if(getNum == 7){
						num = 0;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			case '7':
				$scope.data.num7=$click;
				$scope.focusEle(1);
				replaceStopService.getProvince().success(function(req){
					$scope.name = req.licensePlate;
					getNum = 7;
					if(getNum == 1){
						num = 0;
					}else if(getNum == 2){
						num = -1;
					}else if(getNum == 3){
						num = -2;
					}else if(getNum == 4){
						num = -3;
					}else if(getNum == 5){
						num = -4;
					}else if(getNum == 6){
						num = -5;
					}else if(getNum == 7){
						num = -6;
					}
					//判断7个空是否都有值，有值的情况下隐藏键盘,并且将值传到 $scope.()里
					if($("#1")[0].innerHTML != ""&&$("#2")[0].innerHTML != ""&&$("#3")[0].innerHTML != ""&&$("#4")[0].innerHTML != ""&&$("#5")[0].innerHTML != ""&&$("#6")[0].innerHTML != ""&&$("#7")[0].innerHTML != ""){
						$('.button').css({
							'border':'1px solid #E5E5E5'
						});
						
						$('.jianpan').hide();
						$scope.plate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
					}
				});
			break;
			default:break;
		}
//		$scope.data.num6=angular.element($event.currentTarget).text();
	}
	var indexId;
    $scope.clear = function($event){
    	$event.stopPropagation();//阻止事件向上冒泡
    	indexId = numAll--;
    	if(indexId == 1){
			$scope.data.num1="";
			getNum = 1;
		}else if(indexId == 2){
			$scope.data.num2="";
			getNum = 2;
		}else if(indexId == 3){
			$scope.data.num3="";
			getNum = 3;
		}else if(indexId ==4){
			$scope.data.num4="";
			getNum = 4;
		}else if(indexId == 5){
			$scope.data.num5="";
			getNum = 5;
		}else if(indexId == 6){
			$scope.data.num6="";
			getNum = 6;
		}else if(indexId == 7){
			$scope.data.num7="";
			getNum = 7;
		}else{
			numAll = 0;
    		getNum = 1;
		}
    	/*if(numAll>0){
//    		numAll--;
    		
//    		$('#'+(numAll--)+'')[0].innerHTML="";
    		getNum = numAll+1;
    	}else{
    		numAll = 0;
    		getNum = 1;
    	}*/
    	console.log("numAll="+numAll);
    	console.log("getNum="+getNum);
    	/*
    	if(getNum >=1){
    		getNum-- ;
    	}else{
    		getNum = 1;
    	}*/
    	$('.button').css({
			'border':'1px solid #E5E5E5'
		});
    	if(numAll == 0){
    		replaceStopService.getProvince().success(function(req){
    			$('.jianpan').show();
    			num = 0;
    			$scope.name = req.licensePlate;
    		});
    	}else{
    		replaceStopService.getEnglishNumber().success(function(req){
    			$('.jianpan').show();
    			num = 0;
    			$scope.name  = req.EnglishNumber;
    		});
    	}
    }
    //点击除键盘其他区域就将键盘关闭
    $('body').click(function(){
    	$('.jianpan').hide();
    });
   
}]);

