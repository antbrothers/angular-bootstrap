var myController=angular.module("monthPayController",[]);myController.controller("monthPayCtrl",["$scope","monthService","$timeout","$location","localStorageService","authorize",function(e,n,t,r,a,i){if(console.log("月租缴费"),e.openId=a.get("userWxOpenIdSixThree"),e.customerId=a.get("userWxCustomerIdSixThree"),""==e.openId||null==e.openId||""==e.customerId||null==e.customerId){var o=i.path();e.encodeuri=encodeURI(""+o+"login&type=monthPay"),window.location.href=e.encodeuri}else angular.element(".empty_page").css("display","none");void 0!=r.search().parkName&&_czc.push(["_trackEvent","扫描二维码微信缴费","车场名称",""+r.search().parkName,,"boxiang"]),e.parklist=!1,e.parkName="",e.parkingId="",e.monthJf="1",e.plate="",e.data={},e.data.num1="",e.data.num2="",e.data.num3="",e.data.num4="",e.data.num5="",e.data.num6="",e.data.num7="";var l="0",c="",s="";e.licensePlate=function(){n.getProvince().success(function(n){$(".jianpan").show(),l=0,c=angular.element(".currnt").attr("data-val"),e.name=n.licensePlate}),s=angular.element(".currnt").attr("data-val"),$(this).css({border:"1px solid #3AD5B8"})},e.EnglishNumber=function(){n.getEnglishNumber().success(function(n){$(".jianpan").show(),l=0,c=angular.element(".currnt").attr("data-val"),e.name=n.EnglishNumber}),s=angular.element(".currnt").attr("data-val"),$(this).css({border:"1px solid #3AD5B8"})},e.focusEle=function(e){$("#"+e).focus(),$(".button").css({border:"1px solid #E5E5E5"}),$("#"+e).css({border:"1px solid #3AD5B8"})},e.parseInt=parseInt,e.click=function(t,r){switch(t.stopPropagation(),s=""+(parseInt(c)+parseInt(l)),console.log("getNum0 = "+c),console.log("numAll0 = "+s),s){case"1":e.data.num1=r,e.focusEle(2),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=1,1==c?l=1:2==c?l=0:3==c?l=-1:4==c?l=-2:5==c?l=-3:6==c?l=-4:7==c&&(l=-5),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"2":e.data.num2=r,e.focusEle(3),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=2,1==c?l=2:2==c?l=1:3==c?l=0:4==c?l=-1:5==c?l=-2:6==c?l=-3:7==c&&(l=-4),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"3":e.data.num3=r,e.focusEle(4),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=3,1==c?l=3:2==c?l=2:3==c?l=1:4==c?l=0:5==c?l=-1:6==c?l=-2:7==c&&(l=-3),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"4":e.data.num4=r,e.focusEle(5),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=4,1==c?l=4:2==c?l=3:3==c?l=2:4==c?l=1:5==c?l=0:6==c?l=-1:7==c&&(l=-2),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"5":e.data.num5=r,e.focusEle(6),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=5,1==c?l=5:2==c?l=4:3==c?l=3:4==c?l=2:5==c?l=1:6==c?l=0:7==c&&(l=-1),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"6":e.data.num6=r,e.focusEle(7),n.getEnglishNumber().success(function(n){e.name=n.EnglishNumber,c=6,1==c?l=6:2==c?l=5:3==c?l=4:4==c?l=3:5==c?l=2:6==c?l=1:7==c&&(l=0),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))});break;case"7":e.data.num7=r,e.focusEle(1),n.getProvince().success(function(n){e.name=n.licensePlate,c=7,1==c?l=0:2==c?l=-1:3==c?l=-2:4==c?l=-3:5==c?l=-4:6==c?l=-5:7==c&&(l=-6),""!=$("#1")[0].innerHTML&&""!=$("#2")[0].innerHTML&&""!=$("#3")[0].innerHTML&&""!=$("#4")[0].innerHTML&&""!=$("#5")[0].innerHTML&&""!=$("#6")[0].innerHTML&&""!=$("#7")[0].innerHTML&&($(".button").css({border:"1px solid #E5E5E5"}),$(".jianpan").hide(),e.plate=$("#1")[0].innerHTML+$("#2")[0].innerHTML+$("#3")[0].innerHTML+$("#4")[0].innerHTML+$("#5")[0].innerHTML+$("#6")[0].innerHTML+$("#7")[0].innerHTML,e.getCarList(e.plate))})}};var d;e.clear=function(t){t.stopPropagation(),e.parkName="",e.parkLists="",e.effectEndTime="",e.price="",e.totalPrice="",e.monthJf="1",e.effectEndTime="",e.addValidTime="",d=s--,1==d?(e.data.num1="",c=1):2==d?(e.data.num2="",c=2):3==d?(e.data.num3="",c=3):4==d?(e.data.num4="",c=4):5==d?(e.data.num5="",c=5):6==d?(e.data.num6="",c=6):7==d?(e.data.num7="",c=7):(s=0,c=1),console.log("numAll="+s),console.log("getNum="+c),$(".button").css({border:"1px solid #E5E5E5"}),0==s?n.getProvince().success(function(n){$(".jianpan").show(),l=0,e.name=n.licensePlate}):n.getEnglishNumber().success(function(n){$(".jianpan").show(),l=0,e.name=n.EnglishNumber})},$("body").click(function(){$(".jianpan").hide()}),e.dateToDate=function(e){var n=new Date(e);if("object"==typeof e&&"function"==typeof(new Date).getMonth)n=e;else if("string"==typeof e){var t=e.split("-");3==t.length&&(n=new Date(t[0]+"-"+t[1]+"-"+t[2]))}return n},e.addMonth=function(n,t){function r(e,n){var t=e,r=n++;n>12&&(r-=12,t++);var a=new Date(t,r,1);return new Date(a.getTime()-864e5).getDate()}t=parseInt(t);for(var a=e.dateToDate(n),i=a.getFullYear(),o=a.getMonth()+1,l=r(i,o+t),c=i,s=o+t,d=l;s>12;)c++,s-=12;for(var u=new Date(c,s-1,d);u.getMonth()!=s-1;)d--,u=new Date(c,s-1,d);return u},e.getPay=function(t,r,a){n.getOrderData(t,r,a).success(function(n){if($.helpTool().loading().close(),"0"==n.errorNum){if(e.effectEndTime=n.data.effectEndTime,e.price=n.data.price,e.totalPrice=n.data.price,void 0!=e.effectEndTime&&""!=e.effectEndTime){var t=e.effectEndTime,r=e.monthJf,a=e.addMonth(t,r);console.log(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()),e.addValidTime=a.getFullYear()+"/"+(a.getMonth()+1)+"/"+a.getDate()}}else"1"==n.errorNum?(e.effectEndTime="",e.price="",e.totalPrice="",e.monthJf="1"):$.helpTool().errorWarning("",{desc:n.errorInfo})}).error(function(e){$.helpTool().loading().close(),$.helpTool().errorWarning("",{desc:"请求服务器失败"})})},e.getCarList=function(t){$.helpTool().loading().open(),n.getDataByScanOrMenu(e.customerId,t).success(function(n){$.helpTool().loading().close(),"0"==n.errorNum?(1==n.data.length?(e.parkName=n.data[0].parkingName,e.parkingId=n.data[0].parkingId,e.getPay(n.data[0].parkingId,e.customerId,e.plate)):layer.open({content:'<h5 style="font-weight: bold">提示</h5>当前车辆在多个车场有月租订单,请选择正确车场查询',style:"width:100%;text-align:center",btn:["确认"]}),e.parkLists=n.data):"1"==n.errorNum?(e.parkName="",e.parkLists="",e.effectEndTime="",e.price="",e.totalPrice="",e.monthJf="1",e.effectEndTime="",e.addValidTime=""):$.helpTool().errorWarning("",{desc:n.errorInfo})}).error(function(e){$.helpTool().loading().close(),$.helpTool().errorWarning("",{desc:"请求服务器失败"})})},e.selectReplacePark=function(){e.parklist=!0},e.closeList=function(){e.parklist=!1},e.selectPark=function(n,t){$.helpTool().loading().open(),e.parklist=!1,e.parkName=n,e.parkingId=t,e.monthJf="1",e.getPay(t,e.customerId,e.plate)},e.reduceMonth=function(n){return 1==parseInt(n)||void 0==e.effectEndTime?!1:void t(function(){e.$apply(function(){e.monthJf=parseInt(n)-1;var t=e.effectEndTime,r=e.monthJf,a=e.addMonth(t,r);console.log(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()),e.addValidTime=a.getFullYear()+"/"+(a.getMonth()+1)+"/"+a.getDate(),e.totalPrice=parseInt(e.price)*e.monthJf})},0)},e.plusMonth=function(n){return parseInt(n)>=12||void 0==e.effectEndTime?!1:void t(function(){e.$apply(function(){e.monthJf=parseInt(n)+1;var t=e.effectEndTime,r=e.monthJf,a=e.addMonth(t,r);console.log(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()),e.addValidTime=a.getFullYear()+"/"+(a.getMonth()+1)+"/"+a.getDate(),e.totalPrice=parseInt(e.price)*e.monthJf})},0)},e.agree=function(e){var n=angular.element("."+e).attr("checked");"checked"==n?(angular.element("."+e).attr("checked",!1),angular.element(".checkImg").attr("src","../images/disagree.png")):void 0==n&&(angular.element("."+e).attr("checked",!0),angular.element(".checkImg").attr("src","../images/agree.png"))},e.nowReplace=function(){var t=angular.element(".agreeCheck").attr("checked");if("checked"==t){var r=e.plate;if("7"!=r.length)return layer.open({content:'<h5 style="font-weight: bold">提示!</h5>车牌号码不正确',style:"width:100%;text-align:center",btn:["确认"]}),!1;if(console.log("缴费类型:"+e.enterType),e.enterType!=angular.element(".typeCheck").attr("data_val"))return layer.open({content:'<h5 style="font-weight: bold">请检查缴费类型!</h5>请检查缴费类型选择是否正确',style:"width:100%;text-align:center",btn:["确认"]}),!1;$.helpTool().loading().open(),n.orderc(e.parkingId,e.customerId,e.plate,13,e.effectEndTime,e.monthJf).success(function(t){$.helpTool().loading().close(),"0"==t.errorNum?(console.log("创建订单:"+t),n.getWxConfig().success(function(n){wx.config({appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["chooseWXPay"]}),wx.ready(function(){$.ajax({url:"/wx_share/wxpay/towxPay",type:"POST",dataType:"json",data:{money:t.order.amountPaid,body:"口袋停月租",openId:e.openId,orderNo:t.order.orderId,notify_url:"http://www.p-share.com/share/payment/wechat/backpay_"+t.order.orderType},success:function(e){wx.chooseWXPay({timestamp:e.timeStamp,nonceStr:e.nonceStr,"package":e["package"],signType:"MD5",paySign:e.sign,success:function(){window.location.href="http://p-share.cn/wx_share/html5/views/index.html#/home/paySuccess?orderId="+t.order.orderId+"&orderType=13"},fail:function(){}})},complete:function(){},error:function(){}})}),wx.error(function(){})})):$.helpTool().errorWarning("",{desc:t.errorInfo})}).error(function(){$.helpTool().loading().close(),$.helpTool().errorWarning("",{desc:"请求服务失败"})})}else void 0==t&&layer.open({content:'<h5 style="font-weight: bold">请同意协议!</h5>请对我们的协议进行阅读',style:"width:100%;text-align:center",btn:["确认"]})}}]);