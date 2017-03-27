/**
 * Created by Administrator on 2016/5/25.
 */
'use strict';
var myControllers = angular.module('illegaQueryController', []);
//违章查询
myControllers.controller('illegaQueryCtrl',['$scope','$stateParams','illegaQuery','$rootScope',function ($scope, $stateParams, illegaQuery, $rootScope) {
    console.log('违章查询');
    var area = new LArea();
    area.init({
        'trigger': '#address',
        'valueTo': '#addressValue',
        'keys': {
            id: 'province_code',
            name: 'province',
        },
        'type': 1,
        'data': LAreaData
    });
    area.value = [1, 13, 2];
    $scope.illegaSelect = function (hphm, engineno, classno) {
        var city = $("#addressValue").val();
        if (city == "" || city == undefined) {
            $.helpTool().errorWarning('#error_show', {"desc": '请选择省、市'});
            return false;
        } else if (hphm == "" || hphm == undefined) {
            $.helpTool().errorWarning('#error_show', {"desc": '请填写车辆车牌号'});
            return false;
        } else if (engineno == "" || engineno == undefined || engineno.length < 6) {
            $.helpTool().errorWarning('#error_show', {"desc": '请输入发动机号后6位'});
            return false;
        }
        //显示加载状态
        $.helpTool().loading().open();
        illegaQuery.getIllegaData(city, hphm, engineno, classno).success(function (req) {
            $.helpTool().loading().close();
            if (req.resultcode == "200") {
                $rootScope.showIllegaData = req.result.lists;
                window.location.href = '#/home/illegaDetail';
            } else {
                $.helpTool().errorWarning('#error_show', {"desc": req.reason});
            }
        }).error(function (req) {
            //关闭加载状态
            $.helpTool().loading().close();
            $.helpTool().errorWarning('#error_show', {"desc": req.reason});
        })
    }
}]);
