/**
 * Created by Administrator on 2016/5/31.
 */
'use strict';
var myControllers = angular.module('reportController', []);
myControllers.controller('reportCtrl',["$scope","chartService","$location",function($scope,chartService,$location){
    console.log("report");
    $scope.param=$location.search();
    $scope.userId=$scope.param.userId;

    //饼图
    var options = {
        chart: {
            renderTo: 'Chart',
            defaultSeriesType: 'pie'
        },
        title: {
            text:''
        },
        colors: ['#fed978', '#f9c75d', '#88daf6', '#67c7ee', '#91ded0', '#5eccb6'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    format: '<b>{point.name}</b><br>￥{point.y:.2f}'
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px;display: none"></span>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ￥<b>{point.y:.2f}<br/>'
        },
        series: [{
            type: 'pie',
            name: '',
            data: [
                /*['Firefox',1000],
                 ['IE',1400],
                 ['Chrome',1500],
                 ['Safari',2000],
                 ['Opera',3000],
                 ['Others',3200]*/
            ]
        }]
    };
    //折线图
    var line_options = {
        title:{
            text:''
        },
        xAxis:{
            categories: [
                /* '5.16', '5.17', '5.18', '5.19', '5.20', '5.21', '5.22'*/
            ]
        },
        colors: ['#f9c75d', '#67c7ee', '#5eccb6'],
        yAxis:{
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip:{
            /*valuePrefix: '￥'*/
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>￥{point.y:.1f}</b></td></tr>',
        },
        legend:{
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            borderWidth: 0
        },
        credits: {
            enabled: false
        },
        series:[
            /*{
             name: '月租',
             data: [500,600, 700.5, 7500.5, 800.2, 700, 1000]
             },
             {
             name: '产权',
             data: [450, 500, 600, 650, 800,1100, 1111]
             },
             {
             name: '临停',
             data: [410, 540, 100, 550, 700,3100, 611]
             }*/
        ]
    };
    //获取饼图
    chartService.getChartPie($scope.userId).success(function(json){
        if(json.errorNum=="0"){
            $scope.todayDesc=json.data.todayDesc;
            $scope.todayIncome=json.data.todayIncome;
            $scope.freeRelease=json.data.freeRelease;
            $scope.remit=json.data.remit;
            for(var i=0;i<json.data.dayStatisticsMap.length;i++){
                //if(json.data.dayStatisticsMap[i].value !="0"){
                    var pieArr=[];
                    pieArr.push(""+json.data.dayStatisticsMap[i].desc+"",parseInt(json.data.dayStatisticsMap[i].value));
                    options.series[0].data.push(pieArr);
                //}
            }
            /*    console.log(options.series[0].data);*/
        }
        $("#container").highcharts(options);
    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
    });
    //获取折线图
    chartService.getLineData($scope.userId).success(function(json){
        if(json.errorNum=="0"){
            $scope.weekDesc=json.data.weekDesc;
            $scope.weekDate=json.data.weekDate;

            for(var i=0;i<json.data.xAxis.length;i++){
                line_options.xAxis.categories.push(json.data.xAxis[i]);
            }
            for(var j=0;j<json.data.dayStatisticsMap.length;j++){
                line_options.series.push(json.data.dayStatisticsMap[j]);
            }
        }
        console.log(line_options.xAxis.categories);
        $('#line_container').highcharts(line_options);
    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
    })
}])
