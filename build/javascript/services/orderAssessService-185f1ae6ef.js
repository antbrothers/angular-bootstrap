"use strict";var myService=angular.module("orderAssessServices",[]);myService.factory("orderAssessService",["$http",function(e){return{orderAssess:function(r,s,o,t,c){return e.post("/wx_share/daibo/orderAssess?customerId="+r+"&orderId="+s+"&commentType="+o+"&commentLevel="+t+"&commentContent="+c)}}}]);