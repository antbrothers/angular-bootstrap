/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('illegaDetailController', []);
//违章列表页面
myControllers.controller('illegaDetailCtrl',['$scope','$stateParams','$rootScope',function ($scope, $stateParams, $rootScope) {
    console.log("违章列表页面");
    /*  $scope.data=antService.showIllegaData().getVal();*/
    $scope.illeageArr = $rootScope.showIllegaData;
}]);
