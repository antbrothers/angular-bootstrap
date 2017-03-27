/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('illegaInforCtrlController', []);
//违章详情页面
myControllers.controller('illegaInforCtrl',['$scope','$stateParams',function ($scope, $stateParams) {
    console.log("违章详情页面");
    $scope.data = $stateParams;
}]);
