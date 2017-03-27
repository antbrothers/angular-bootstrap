/**
 * Created by Admini on 2016/8/24.
 */
var activeParkModuble = angular.module('activePark', []);

activeParkModuble.controller('activeParkCtrl',["$scope","$location",function($scope,$location){

    if($location.search().parkName != undefined){
        _czc.push(['_trackEvent',"扫车场二维码进入活动页领取优惠券", "车场名称", ""+$location.search().parkName+"" ,, "boxiang"]);
    };
     $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/activeParkReg&type=activeParkReg");
     window.location.href =$scope.encodeuri;
}]);