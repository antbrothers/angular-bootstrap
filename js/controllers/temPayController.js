/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/22
 */

var myController=angular.module('temPayControllers',[]);
myController.controller('temPayCtrl',["$scope","$timeout","$location","temPayService","localStorageService","authorize",function($scope,$timeout,$location,temPayService,localStorageService,authorize){
    console.log("临停缴费");

      $scope.openId = localStorageService.get('userWxOpenIdSixThree');
      $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');

      /*$scope.openId="12121";
      $scope.customerId = " 2016081700000731";*/     //用户的Id
      
      if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
          /*$scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=temPay");*/
          var p = authorize.path();
          $scope.encodeuri=encodeURI(""+p+"login&type=temPay");
          window.location.href =$scope.encodeuri;
      }else{
          angular.element('.empty_page').css("display","none");
      }
      if($location.search().parkName != undefined){
          _czc.push(['_trackEvent',"扫描二维码微信缴费", "车场名称", ""+$location.search().parkName+"" ,, "boxiang"]);
       }
    //模拟键盘
      $scope.data = {};
      $scope.data.num1="";
      $scope.data.num2="";
      $scope.data.num3="";
      $scope.data.num4="";
      $scope.data.num5="";
      $scope.data.num6="";
      
      $scope.datq = ""
      $scope.parklist = false;
      $scope.parkingId = "";
      $scope.parkName = "";
      $scope.amountPayable = "";        //临停 临停金额
      $scope.beginDate = "";            //临停 入场时间
      $scope.parkingTime = "";          //临停 停车时长



    var licensePlate = "";
    var num = '0';
    var getNum = '';//标识点击的是哪一个按钮
    var numAll ="";
      //自定义格式化日期
      $scope.dateToDate = function (date) {
          var sDate = new Date(date);
          if (typeof date == 'object'
              && typeof new Date().getMonth == "function"
          ) {
              sDate = date;
          }
          else if (typeof date == "string") {
              var arr = date.split('-')
              if (arr.length == 3) {
                  sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2]);
              }
          }

          return sDate;
      };
    
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
      //支付
      $scope.nowReplace = function () {
          var agr = angular.element('.agreeCheck').attr('checked');
          if (agr == "checked") {    //选择了同意协议

//              var carNumber_val = angular.element('.carNumber').val();
          	var carNumber_val = licensePlate;
              if (carNumber_val.length != "7") {
                  layer.open({
                      content: '<h5 style="font-weight: bold">提示!</h5>车牌号码不正确',
                      style: 'width:100%;text-align:center',
                      btn: ['确认']
                  });
                  return false;
              }

             /* console.log("缴费类型:" + $scope.enterType);
              if ($scope.enterType != angular.element('.typeCheck').attr('data_val')) {
                  layer.open({
                      content: '<h5 style="font-weight: bold">请检查缴费类型!</h5>请检查缴费类型选择是否正确',
                      style: 'width:100%;text-align:center',
                      btn: ['确认']
                  });
                  return false;
              }
*/
              var beginDate = "2016/01/01";
              if ($scope.enterType == "13") {
                  beginDate = $scope.effectEndTime;
              } else if ($scope.enterType == "14") {
                  beginDate = $scope.equityEffectEndTime;
              }
              $.helpTool().loading().open();
              temPayService.orderc($scope.parkingId, $scope.customerId, licensePlate, 11, "","").success(function (req) {
                  $.helpTool().loading().close();
                  if (req.errorNum == "0") {
                      console.log("创建订单:" + req);


                      //获取授权配置参数
                      temPayService.getWxConfig().success(function (data) {
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
                                              /* alert("支付成功");*/
                                              // 支付成功后的回调函数
                                              /* $location.path("/home/paySuccess").search({'orderId':req.order.orderId,'orderType':$scope.enterType});*/
                                              window.location.href = "http://p-share.cn/wx_share/html5/views/index.html#/home/paySuccess?orderId=" + req.order.orderId + "&orderType=" + 11;
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
                  } else {
                      $.helpTool().errorWarning("", {"desc": req.errorInfo});
                      $scope.removeError();
                  }
              }).error(function () {
                  $.helpTool().loading().close();
                  $.helpTool().errorWarning("", {"desc": "请求服务失败"});
                  $scope.removeError();
              });
          } else if (agr == undefined) {
              layer.open({
                  content: '<h5 style="font-weight: bold">请同意协议!</h5>请对我们的协议进行阅读',
                  style: 'width:100%;text-align:center',
                  btn: ['确认']
              });
          }
      }
      //输入车牌获取停车场列表
      $scope.onInputCarNumber = function(customerId,carNumber){
    	  $.helpTool().loading().open();
    	  temPayService.getDataByScanOrMenu(customerId,carNumber).success(function(req){
    		  console.log(req);
    		  //req.errorNum == "0" 表示有车牌的情况下
    		  if(req.errorNum == "0"){
    			  //车牌数据有一条的数据
    			  if(req.data.length == 1){
    				  $scope.parkingId = req.data[0].parkingId;
    				  temPayService.getOrderData($scope.parkingId,$scope.customerId,carNumber).success(function(rep){
    					  console.log(rep);
    					  $timeout(function () {
                              $scope.$apply(function () {
                                  $scope.datq = rep.data;
                              })
                          }, 0);
    					  $.helpTool().loading().close();
    	                  $timeout(function () {
    	                      $scope.$apply(function () {
    	                          $scope.carNumber = carNumber; 
    	                          $scope.parkName = rep.data.data.parkingName;
                                  $scope.parkingId = rep.data.data.parkingId;
    	                      })
    	                  }, 0);
    	                  $timeout(function () {
    	                      $scope.$apply(function () {
    	                          $scope.amountPayable = rep.data.data.amountPayable;        //临停 临停金额
    	                          $scope.beginDate = rep.data.data.beginDate;                //临停 入场时间
    	                          $scope.parkingTime = rep.data.data.parkingTime;            //临停 停车时长
    	                          $scope.parkName = rep.data.data.parkingName;
    	                      });
    	                  }, 0);
    				  });
    			  }else{
                      if (req.errorNum == "0") {
                          $timeout(function () {
                              $scope.$apply(function () {
                                  $scope.datq = req.data;
                              })
                          }, 0);
                          if (req.data.length != 0) {
                              //通过二维码扫描入口 进入页面
                              for (var i = 0; i < req.data.length; i++) {
                                  $timeout(function () {
                                      $scope.$apply(function () {
                                          $scope.parkName = req.data[i].parkingName;
                                          $scope.parkingId = req.data[i].parkingId;
                                          console.log(i);
                                      });
                                  }, 0);
                              }
                          }

                      }
                      layer.open({
                          content: '<h5 style="font-weight: bold">提示!</h5>当前车辆在多个车场有月租订单,请选择正确车场查询',
                          style: 'width:100%;text-align:center',
                          btn: ['确认']
                      });
    			  }
    		  }else{
    			  $.helpTool().loading().close();

                  $timeout(function () {
                      $scope.$apply(function () {
                          $scope.amountPayable = "";        //临停 临停金额
                          $scope.beginDate = "";            //临停 入场时间
                          $scope.parkingTime = "";          //临停 停车时长
                          $scope.parkName = "";          //临停 停车时长
                      });
                  }, 0);

                  /*layer.open({
                      content: '<h5 style="font-weight: bold">提示!</h5>' + req.errorInfo + '',
                      style: 'width:100%;text-align:center',
                      btn: ['确认']
                  });*/
    		  }
    		 
    	  });
      }
      //选择停车场
      $scope.selectPark = function (parkingName, parkingId) {
          $scope.parklist = false;
          $timeout(function () {
              $scope.$apply(function () {
                  $scope.parkName = parkingName;
                  $scope.parkingId = parkingId;
              });
          }, 0);
          var carNumber_val = licensePlate;
          if (carNumber_val.length == "7") {
        	  temPayService.getOrderData(parkingId,$scope.customerId,carNumber_val).success(function(req){
        		  console.log(req);
        		  $scope.amountPayable = req.data.data.amountPayable;        //临停 临停金额
                  $scope.beginDate = req.data.data.beginDate;                //临停 入场时间
                  $scope.parkingTime = req.data.data.parkingTime;            //临停 停车时长
                 
                 /* $scope.amountPayable = req.data.price;        //临停 临停金额
                  $scope.beginDate = req.data.effectEndTime;                //临停 入场时间
                  $scope.parkingTime = req.data.effectEndTime;            //临停 停车时长
*/                  
                 /* var arr = req.data.carNumber.replace(/(.)(?=[^$])/g,"$1,").split(",");
                  $scope.data.num1=arr[0];
                  $scope.data.num2=arr[1];
                  $scope.data.num3=arr[2];
                  $scope.data.num4=arr[3];
                  $scope.data.num5=arr[4];
                  $scope.data.num6=arr[5];
                  $scope.data.num7=arr[6];*/
        		 
			  }).error(function () {
		            angular.element('.empty_page').css("display", "none");
		            $.helpTool().loading().close();
		            $.helpTool().errorWarning("", {"desc": "请求服务器失败"});
		            $scope.removeError();
		        });
          }
      };
      $scope.selectReplacePark = function () {
          $scope.parklist = true;
      };
      $scope.closeList = function () {
          $scope.parklist = false;
      };
      //销毁错误提示
      $scope.removeError = function () {
          $timeout(function () {
              angular.element('#error_waring').remove();
          }, 1000)
      }
    //获取省简称
  	$scope.licensePlate = function(){
  		temPayService.getProvince().success(function(req){
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
  		temPayService.getEnglishNumber().success(function(req){
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

  	$scope.click = function($event,$click){
  		$event.stopPropagation();//阻止事件向上冒泡
//  		getNum=angular.element('.currnt').attr('data-val');
  		numAll = ''+(parseInt(getNum)+parseInt(num))+'';
  		console.log(getNum);
  		console.log(numAll);
  		switch(numAll){
  			case '1':
  				$scope.data.num1=$click;
  			    $scope.focusEle(2);
  			    temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '2':
  				$scope.data.num2=$click;
  				$scope.focusEle(3);
  				temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '3':
  				$scope.data.num3=$click;
  				$scope.focusEle(4);
  				temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '4':
  				$scope.data.num4=$click;
  				$scope.focusEle(5);
  				temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '5':
  				$scope.data.num5=$click;
  				$scope.focusEle(6);
  				temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '6':
  				$scope.data.num6=$click;
  				$scope.focusEle(7);
  				temPayService.getEnglishNumber().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			case '7':
  				$scope.data.num7=$click;
  				$scope.focusEle(1);
  				temPayService.getProvince().success(function(req){
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
  						licensePlate = $("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML;
  						$scope.onInputCarNumber($scope.customerId,licensePlate);
  					}
  				});
  			break;
  			default:break;
  		}
//  		$scope.data.num6=angular.element($event.currentTarget).text();
  	}
  	var indexId;
      $scope.clear = function($event){
      	$event.stopPropagation();//阻止事件向上冒泡
      	
      	$scope.parkingId = "";
      	$scope.parkName = "";
      	$scope.amountPayable = "";        //临停 临停金额
      	$scope.beginDate = "";            //临停 入场时间
      	$scope.parkingTime = "";          //临停 停车时长
      	
      	
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
//      		numAll--;
      		
//      		$('#'+(numAll--)+'')[0].innerHTML="";
      		getNum = numAll+1;
      	}else{
      		numAll = 0;
      		getNum = 1;
      	}*/
      	console.log("numAll+"+numAll);
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
      		temPayService.getProvince().success(function(req){
      			$('.jianpan').show();
      			num = 0;
      			$scope.name = req.licensePlate;
      		});
      	}else{
      		temPayService.getEnglishNumber().success(function(req){
      			$('.jianpan').show();
      			num = 0;
      			$scope.name  = req.EnglishNumber;
      		});
      	}
      	if($("#1")[0].innerHTML == ""&&$("#2")[0].innerHTML == ""&&$("#3")[0].innerHTML == ""&&$("#4")[0].innerHTML == ""&&$("#5")[0].innerHTML == ""&&$("#6")[0].innerHTML == ""&&$("#7")[0].innerHTML == ""){
      		$timeout(function () {
                  $scope.$apply(function () {
                      $scope.amountPayable = "";        //临停 临停金额
                      $scope.beginDate = "";            //临停 入场时间
                      $scope.parkingTime = "";          //临停 停车时长
                  });
              }, 0);
  		}
      }
      //点击除键盘其他区域就将键盘关闭
      $('body').click(function(){
      	$('.jianpan').hide();
      });
}]);
