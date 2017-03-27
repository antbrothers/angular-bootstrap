/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/22
 */
var myController=angular.module('monthPayController',[]);
myController.controller('monthPayCtrl',["$scope","monthService","$timeout","$location","localStorageService","authorize",function($scope,monthService,$timeout,$location,localStorageService,authorize){
   console.log("月租缴费");

   $scope.openId = localStorageService.get('userWxOpenIdSixThree');
   $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');


   /*$scope.openId="12121";
    $scope.customerId = "2016042200000010";     //用户的Id*/

   if($scope.openId =="" || $scope.openId==null ||$scope.customerId=="" || $scope.customerId==null){
     /* $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/login&type=monthPay");*/
      var p = authorize.path();
      $scope.encodeuri=encodeURI(""+p+"login&type=monthPay");
      window.location.href =$scope.encodeuri;
   }else{
      angular.element('.empty_page').css("display","none");
   }
   if($location.search().parkName != undefined){
      _czc.push(['_trackEvent',"扫描二维码微信缴费", "车场名称", ""+$location.search().parkName+"" ,, "boxiang"]);
   }

   $scope.parklist=false;
   $scope.parkName ="";
   $scope.parkingId = "";
   $scope.monthJf = "1";       //  默认1个月


   $scope.plate=""; // 车牌号码
   //模拟键盘
   $scope.data = {};
   $scope.data.num1="";
   $scope.data.num2="";
   $scope.data.num3="";
   $scope.data.num4="";
   $scope.data.num5="";
   $scope.data.num6="";
   $scope.data.num7="";


   var num = '0';
   var getNum = '';//标识点击的是哪一个按钮
   var numAll ="";
   //获取省简称
   $scope.licensePlate = function(){
      monthService.getProvince().success(function(req){
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
      monthService.getEnglishNumber().success(function(req){
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
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '2':
            $scope.data.num2=$click;
            $scope.focusEle(3);
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '3':
            $scope.data.num3=$click;
            $scope.focusEle(4);
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '4':
            $scope.data.num4=$click;
            $scope.focusEle(5);
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '5':
            $scope.data.num5=$click;
            $scope.focusEle(6);
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '6':
            $scope.data.num6=$click;
            $scope.focusEle(7);
            monthService.getEnglishNumber().success(function(req){
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
                  $scope.getCarList($scope.plate);
               }
            });
            break;
         case '7':
            $scope.data.num7=$click;
            $scope.focusEle(1);
            monthService.getProvince().success(function(req){
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
                  $scope.getCarList($scope.plate);
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
      
      	$scope.parkName="";
        $scope.parkLists="";
        $scope.effectEndTime ="";                  // 月租 当前有效时间
        $scope.price = "";                         // 月租 单价
        $scope.totalPrice = "";                    // 月租 订单金额
        $scope.monthJf = "1";
        $scope.effectEndTime="";
        $scope.addValidTime="";
      
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
      console.log("numAll="+numAll);
      console.log("getNum="+getNum);
      $('.button').css({
         'border':'1px solid #E5E5E5'
      });
      if(numAll == 0){
         monthService.getProvince().success(function(req){
            $('.jianpan').show();
            num = 0;
            $scope.name = req.licensePlate;
         });
      }else{
         monthService.getEnglishNumber().success(function(req){
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
   //月份加加或者减减
   $scope.addMonth = function (date, num) {
      function getLastDay(year,month)
      {
         var new_year = year;  //取当前的年份  
         var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）  
         if(month>12)      //如果当前大于12月，则年份转到下一年  
         {
            new_month -=12;    //月份减  
            new_year++;      //年份增  
         }
         var thisMonthFirstDay = new Date(new_year,new_month,1);        //取当年当月中的第一天  
         return (new Date(thisMonthFirstDay.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期  
      }

      num = parseInt(num);
      var sDate = $scope.dateToDate(date);

      var sYear = sDate.getFullYear();
      var sMonth = sDate.getMonth() + 1;
      var sDay = getLastDay(sYear, sMonth + num);

      var eYear = sYear;
      var eMonth = sMonth + num;
      var eDay = sDay;
      while (eMonth > 12) {
         eYear++;
         eMonth -= 12;
      }
      var eDate = new Date(eYear, eMonth - 1, eDay);

      while (eDate.getMonth() != eMonth - 1) {
         eDay--;
         eDate = new Date(eYear, eMonth - 1, eDay);
      }
      return eDate;
   };


   //获取缴费
   $scope.getPay=function(parkingId,customerId,carNumber){
      monthService.getOrderData(parkingId,customerId,carNumber).success(function(req){
         $.helpTool().loading().close();
         if(req.errorNum=='0'){
            $scope.effectEndTime = req.data.effectEndTime;        // 月租 当前有效时间
            $scope.price = req.data.price;                        // 月租 单价
            $scope.totalPrice = req.data.price;                   // 月租 订单金额
            if ($scope.effectEndTime != undefined && $scope.effectEndTime != "") {
               var d = $scope.effectEndTime;
               var n = $scope.monthJf;
               var eDate = $scope.addMonth(d, n);
               console.log(eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate());
               $scope.addValidTime = eDate.getFullYear() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getDate();   //续费有效日期
            }
         }else if(req.errorNum=='1'){
            $scope.effectEndTime ="";                  // 月租 当前有效时间
            $scope.price = "";                         // 月租 单价
            $scope.totalPrice = "";                    // 月租 订单金额
            $scope.monthJf = "1";
         }else{
            $.helpTool().errorWarning("",{"desc":req.errorInfo});
         }
      }).error(function(req){
         $.helpTool().loading().close();
         $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
      })
   }
   // 获取车场
   $scope.getCarList=function(carNumber){
      $.helpTool().loading().open();
      monthService.getDataByScanOrMenu($scope.customerId,carNumber).success(function(req){
         $.helpTool().loading().close();
         if(req.errorNum=='0'){
            if(req.data.length==1){
               $scope.parkName =req.data[0].parkingName;
               $scope.parkingId =req.data[0].parkingId;
               $scope.getPay(req.data[0].parkingId,$scope.customerId,$scope.plate);
            }else{
               layer.open({
                  content: '<h5 style="font-weight: bold">提示</h5>当前车辆在多个车场有月租订单,请选择正确车场查询',
                  style: 'width:100%;text-align:center',
                  btn: ['确认']
               });
            }
            $scope.parkLists=req.data;
         }else if(req.errorNum =='1'){
            $scope.parkName="";
            $scope.parkLists="";
            $scope.effectEndTime ="";                  // 月租 当前有效时间
            $scope.price = "";                         // 月租 单价
            $scope.totalPrice = "";                    // 月租 订单金额
            $scope.monthJf = "1";
            $scope.effectEndTime="";
            $scope.addValidTime="";
         }else{
            $.helpTool().errorWarning('',{"desc":req.errorInfo});
         }
      }).error(function(req){
         $.helpTool().loading().close();
         $.helpTool().errorWarning('',{"desc":"请求服务器失败"});
      })
   };



   $scope.selectReplacePark = function () {
      $scope.parklist = true;
   };
   $scope.closeList = function () {
      $scope.parklist = false;
   };

   //选择停车场
   $scope.selectPark = function (parkingName, parkingId) {
      $.helpTool().loading().open();

      $scope.parklist = false;
      /*$timeout(function () {
         $scope.$apply(function () {
            $scope.parkName = parkingName;
            $scope.parkingId = parkingId;
         });
      }, 0);*/
      $scope.parkName = parkingName;
      $scope.parkingId = parkingId;
      $scope.monthJf="1";
      $scope.getPay(parkingId,$scope.customerId,$scope.plate);
   };


   //减
   $scope.reduceMonth = function (price) {

      if (parseInt(price) == 1 || $scope.effectEndTime == undefined ) {
         return false;
      } else {
         $timeout(function () {
            $scope.$apply(function () {
               $scope.monthJf = parseInt(price) - 1;
               var d = $scope.effectEndTime;
               var n = $scope.monthJf;
               var eDate = $scope.addMonth(d, n);
               console.log(eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate());
               $scope.addValidTime = eDate.getFullYear() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getDate();   //续费有效日期

               //订单金额随月份变化
               $scope.totalPrice = parseInt($scope.price) * $scope.monthJf;
            });
         }, 0);
      }
   };
   //加
   $scope.plusMonth = function (price) {
      if (parseInt(price) >= 12 || $scope.effectEndTime == undefined) {
         return false;
      } else {
         $timeout(function () {
            $scope.$apply(function () {
               $scope.monthJf = parseInt(price) + 1;
               var d = $scope.effectEndTime;
               var n = $scope.monthJf;
               var eDate = $scope.addMonth(d, n);
               console.log(eDate.getFullYear() + '-' + (eDate.getMonth() + 1) + '-' + eDate.getDate());
               $scope.addValidTime = eDate.getFullYear() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getDate();   //续费有效日期
               //订单金额随月份变化
               $scope.totalPrice = parseInt($scope.price) * $scope.monthJf;
            });
         }, 0);
      }
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

//            var carNumber_val = angular.element('.carNumber').val();
         var carNumber_val = $scope.plate;
         if (carNumber_val.length != "7") {
            layer.open({
               content: '<h5 style="font-weight: bold">提示!</h5>车牌号码不正确',
               style: 'width:100%;text-align:center',
               btn: ['确认']
            });
            return false;
         }

         console.log("缴费类型:" + $scope.enterType);
         if ($scope.enterType != angular.element('.typeCheck').attr('data_val')) {
            layer.open({
               content: '<h5 style="font-weight: bold">请检查缴费类型!</h5>请检查缴费类型选择是否正确',
               style: 'width:100%;text-align:center',
               btn: ['确认']
            });
            return false;
         }

         /*var beginDate = "2016/01/01";
         if ($scope.enterType == "13") {
            beginDate = $scope.effectEndTime;
         } else if ($scope.enterType == "14") {
            beginDate = $scope.equityEffectEndTime;
         }*/
         $.helpTool().loading().open();
         monthService.orderc($scope.parkingId, $scope.customerId, $scope.plate,13, $scope.effectEndTime, $scope.monthJf).success(function (req) {
            $.helpTool().loading().close();
            if (req.errorNum == "0") {
               console.log("创建订单:" + req);

               //获取授权配置参数
               monthService.getWxConfig().success(function (data) {
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
                           body: "口袋停月租",
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
                                 window.location.href = "http://p-share.cn/wx_share/html5/views/index.html#/home/paySuccess?orderId=" + req.order.orderId + "&orderType=" + 13;
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
            }
         }).error(function () {
            $.helpTool().loading().close();
            $.helpTool().errorWarning("", {"desc": "请求服务失败"});
         });
      } else if (agr == undefined) {
         layer.open({
            content: '<h5 style="font-weight: bold">请同意协议!</h5>请对我们的协议进行阅读',
            style: 'width:100%;text-align:center',
            btn: ['确认']
         });
      }
   }
}]);
