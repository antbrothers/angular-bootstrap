"use strict";var myService=angular.module("carButlerServices",[]);myService.factory("carButlerService",["$http",function(e){return{getCarButlerImage:function(){return e.get("/wx_share/CarButler/getCarButlerImage")},getMenu:function(){return e.get("/wx_share/CarButler/getMenu")},getNearPark:function(r,t){return e.get("/wx_share/CarButler/getNearPark/"+r+"/"+t)},getServeInfo:function(r,t){return e.get("/wx_share/CarButler/serveInstruc/"+r+"/"+t)}}}]);