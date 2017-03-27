'use strict';
var myControllers = angular.module('testController', []);
myControllers.controller('testCtrl',["$scope","$stateParams","localStorageService",function($scope, $stateParams,localStorageService){
    console.log('测试页清除缓存');
    $scope.localStorageusername = localStorageService.get('username');
    $scope.localStorageupsw = localStorageService.get('psw');
    console.log("username:"+$scope.localStorageusername+";;;;;psw:"+$scope.localStorageupsw);

    $scope.localBtn=function(username,psw){
        localStorageService.set('username',username);
        localStorageService.set('psw',psw);
        $scope.localStorageusername = localStorageService.get('username');
        $scope.localStorageupsw = localStorageService.get('psw');
        console.log("username:"+$scope.localStorageusername+";;;;;psw:"+$scope.localStorageupsw);
    }
    //清除缓存
    $scope.clean=function(){
        console.log(localStorageService.get('emoPrefix'));
        localStorageService.remove('userWxOpenIdSixThree','userWxCustomerIdSixThree');
    }
}])