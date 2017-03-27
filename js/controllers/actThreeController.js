'use strict';
var myControllers = angular.module('actThreeController', []);
myControllers.controller('actThreeCtrl',["$scope","$stateParams",function($scope, $stateParams){
    console.log('活动3');
}]);