"use strict";var myControllers=angular.module("actOneController",[]);myControllers.controller("actOneCtrl",["$scope","$stateParams","activeService","$location",function(e,n,c,o){console.log("活动1"),e.section_1="",e.section_2="",e.section_3="",e.section_4="",e.section_5="",e.section_6="",e.section_7="",e.neededService="无",e.phone="",e.section_8="",e.channel=o.search().channel,e.che="",e.changeOne=function(n){e.section_1=n,console.log("活动1:"+e.section_1),angular.element(".act").css("display","none"),angular.element("#actTwo").css("display","block"),_czc.push(["_trackEvent","第一页","第一页跳转","链接",,"actOne"])},e.changeTwo=function(n){e.section_2=n,console.log("活动2:"+e.section_2),angular.element(".act").css("display","none"),angular.element("#actThree").css("display","block"),_czc.push(["_trackEvent","第二页","第二页跳转","链接",,"actTwo"])},e.changeThree=function(n){e.section_3=n,console.log("活动3:"+e.section_3),angular.element(".act").css("display","none"),angular.element("#actFour").css("display","block"),_czc.push(["_trackEvent","第三页","第三页跳转","链接",,"actThree"])},e.changeFour=function(n){e.section_4=n,console.log("活动4:"+e.section_4),angular.element(".act").css("display","none"),angular.element("#actFive").css("display","block"),_czc.push(["_trackEvent","第四页","第四页跳转","链接",,"actFour"])},e.changeFive=function(n){e.section_5=n,console.log("活动5:"+e.section_5),angular.element(".act").css("display","none"),angular.element("#actSix").css("display","block"),_czc.push(["_trackEvent","第五页","第五页跳转","链接",,"actFive"])},e.changeSix=function(n){e.section_6=n,console.log("活动6:"+e.section_6),angular.element(".act").css("display","none"),angular.element("#actSeven").css("display","block"),_czc.push(["_trackEvent","第六页","第六页跳转","链接",,"actSix"])},e.changeSeven=function(e,n,c,o,t){console.log(e);var a=$("#"+e).attr("checked");console.log(a);var i=c.target;"checked"==a?($("#"+e).attr("checked",!1),$(i).attr("src",o),$("#"+e).val("0")):($("#"+e).attr("checked","checked"),$(i).attr("src",t),$("#"+e).val(n))},e.ChangeSevenTj=function(){for(var n=$(".checkSheQu"),c=0;c<n.length;c++)if("checked"==$($(".checkSheQu")[c]).attr("checked")){e.che="1";break}if(console.log("跳出:"+e.che),"1"==e.che){e.section_7="";for(var o=$(".commCheck"),t=0;t<o.length;t++)if("checked"==$($(".commCheck")[t]).attr("checked")){var a=$($(".commCheck")[t]).val();""==e.section_7?e.section_7=a:e.section_7=e.section_7+","+a}""!=$(".service").val()&&(e.neededService=$(".service").val()),console.log(e.section_7),console.log("活动7:"+e.section_7),angular.element("#actSeven .tangchu").css("display","block"),_czc.push(["_trackEvent","第7页","提交多选","事件",,"actSeven"])}else $.helpTool().errorWarning("",{desc:"请选择社区"})},e.tiJiaoMobile=function(){e.phone=$(".mobile").val(),""==e.phone?$.helpTool().errorWarning("",{desc:"请输入手机号码"}):11!=e.phone.length?$.helpTool().errorWarning("",{desc:"请输入正确的手机号码"}):c.postData(e.section_1,e.section_2,e.section_3,e.section_4,e.section_5,e.section_6,e.section_7,e.phone,e.neededService,e.channel).success(function(e){"0"==e.errorNum?(angular.element(".phone_cont").css("display","none"),angular.element(".tip").css("display","block"),angular.element(".tc_bt").css("display","block"),_czc.push(["_trackEvent","第7页","提交手机号","事件",,"tangchu"])):$.helpTool().errorWarning("",{desc:e.errorInfo})}).error(function(e){})},e.changeEight=function(e,n,c,o,t){console.log(e);var a=$("#"+e).attr("checked");console.log(a);var i=c.target;"checked"==a?($("#"+e).attr("checked",!1),$(i).attr("src",o),$("#"+e).val("0")):($("#"+e).attr("checked","checked"),$(i).attr("src",t),$("#"+e).val(n))},e.btn_tj=function(){if(e.phone=$(".mobile").val(),""==e.phone)$.helpTool().errorWarning("",{desc:"请输入手机号码"});else if(11!=e.phone.length)$.helpTool().errorWarning("",{desc:"请输入正确的手机号码"});else{""==e.section_8;for(var n=$(".commCheckEight"),o=0;o<n.length;o++)if("checked"==$($(".commCheckEight")[o]).attr("checked")){var t=$($(".commCheckEight")[o]).val();""==e.section_8?e.section_8=t:e.section_8=e.section_8+","+t}console.log("活动8:"+e.section_8),c.postData(e.section_1,e.section_2,e.section_3,e.section_4,e.section_5,e.section_6,e.section_7,e.section_8,e.phone,e.neededService).success(function(e){if("0"==e.errorNum){var n={versions:function(){var e=navigator.userAgent,n=(navigator.appVersion,navigator.userAgent.toLowerCase());return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/)||!!e.match(/AppleWebKit/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),wechat:"micromessenger"==n.match(/MicroMessenger/i),weibo:"weibo"==n.match(/WeiBo/i),qq:"qq"==n.match(/QQ/i)}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()};n.versions.ios||n.versions.iPhone||n.versions.iPad?window.location.href="https://itunes.apple.com/cn/app/kou-dai-ting/id1049233050?mt=8":n.versions.android&&(window.location.href="http://url.cn/2BpT4QC")}else $.helpTool().errorWarning("",{desc:e.errorInfo})}).error(function(e){})}}}]);