var myService=angular.module("reservedParkService",[]);myService.factory("reservedParkService",["$http",function(e){return{getCanParkList:function(r,t,a,i){return e.get("/wx_share/parking/carLov/getAppoPkList?latitude="+r+"&longitude="+t+"&pageIndex="+a+"&pageSize="+i)}}}]);