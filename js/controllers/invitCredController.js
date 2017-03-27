'use strict';
var myControllers = angular.module('invitCredController', []);
myControllers.controller('invitCredCtrl', ['$scope','$location','$stateParams','invitCredService',function ($scope,$location,$stateParams,invitCredService) {
    console.log("invitCred");
    $scope.id=$location.search().id;

    $scope.data="";
    $scope.dateIntime=";"
    $scope.carNumberStr="";


    $scope.bindData=function(){
        invitCredService.queryById($scope.id).success(function(req){
            if(req.errorNum=="0"){
                console.log(req);
                if(req.data.carNumber!=""){
                    angular.element('.pz_dis').css("display","none");
                    angular.element('.pz_y').css("display","block");
                    angular.element('.pz_main').css("display","block");
                    angular.element('.pz_tip').css("display","block");
                    $scope.data=req.data;

                    $scope.carNumberStr=[req.data.carNumber.substring(0,2),req.data.carNumber.substring(2,7)];




                    $scope.dateIntime=req.data.inTime.split(" ");
                    if(req.data.inTime==""){
                        angular.element('.pz_sj').css("display","none");
                    }

                }else{
                    angular.element('.pz_dis').css("display","none");
                    angular.element('.pz_y').css("display","block");
                    angular.element('.pz_xs_cp').css("display","block");
                    $scope.data=req.data;
                    $scope.dateIntime=req.data.inTime.split(" ");
                    if(req.data.inTime==""){
                        angular.element('.pz_sj').css("display","none");
                    }
                }

            }else if(req.errorNum=="1"){
                angular.element('.pz_dis').css("display","none");
                angular.element('.pz_n').css("display","block");
                angular.element('.pz_mian_desc').css("display","block");
            }
        }).error(function(){
            $.helpTool().errorWarning("",{"desc":"请求服务器失败"})
        });
    };
    $scope.bindData();

    //提交车牌号
    $scope.tijcp=function(carnumber){
        if(carnumber==""||carnumber ==undefined){
            $.helpTool().errorWarning("",{"desc":"请输入车牌号"})
        }else if(carnumber.length!=7){
            $.helpTool().errorWarning("",{"desc":"请输入正确的车牌号"})
        }else{
            invitCredService.update($scope.id,carnumber).success(function(req){
                if(req.errorNum=="0"){
                    console.log(req);
                    $scope.bindData();
                }else{
                    $.helpTool().errorWarning("",{"desc":req.errorInfo});
                }
            }).error(function(){
                $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
            })
        }

    }
}]);