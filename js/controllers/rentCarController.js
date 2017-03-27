/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('rentCarController', []);
//租车
myControllers.controller('rentCarCtrl', ["$scope","$stateParams","rentCarServices",function ($scope, $stateParams, rentCarServices) {
    console.log("租车");
    $.helpTool().loading().open();

    rentCarServices.rentCar().success(function (req) {
        $.helpTool().loading().close();
        console.log(req);
        if (req.errorNum == "0") {
            $scope.message = req.data.commonRent;
            $scope.timeRent = req.data.timeRent;
            console.log($scope.message);
//            $scope.carArr = req.data.carList;
//            console.log($scope.carList);

        } else {
            $.helpTool().errorWarning("", {"desc": req.errorInfo});
        }
    }).error(function () {
        $.helpTool().loading().close();
        $.helpTool().errorWarning("", {"desc": "服务器繁忙"})
    })

}])