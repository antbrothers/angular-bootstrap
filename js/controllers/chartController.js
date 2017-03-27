/**
 * Created by Administrator on 2016/5/26.
 */
"use strict"
var myControllers = angular.module('chartController', []);
myControllers.controller('chartCtrl', ['$scope','chartService','$location',function($scope,chartService,$location){
    console.log("chartCtrl");

    $scope.date=new Date();
    $scope.year=$scope.date.getFullYear();
    $scope.mouth=$scope.date.getMonth()+1;
    $scope.carNumber="";
    $scope.param=$location.search();
  	$scope.userId=$scope.param.userId;
   /* $scope.userId="2016060100000097";*/


   /* $scope.loaded=function(){
        var myScroll,
            upIcon = $("#up-icon"),
            downIcon = $("#down-icon");

        myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true,click:true });
        myScroll.on("scroll",function(){
            //scroll事件，可以用来控制上拉和下拉之后显示的模块中，
            //样式和内容展示的部分的改变。
            var y = this.y,
                maxY = this.maxScrollY - y,
                downHasClass = downIcon.hasClass("reverse_icon"),
                upHasClass = upIcon.hasClass("reverse_icon");

            if(y >= 40){
                !downHasClass && downIcon.addClass("reverse_icon");
                return "";
            }else if(y < 40 && y > 0){
                downHasClass && downIcon.removeClass("reverse_icon");
                return "";
            }

            if(maxY >= 40){
                !upHasClass && upIcon.addClass("reverse_icon");
                return "";
            }else if(maxY < 40 && maxY >=0){
                upHasClass && upIcon.removeClass("reverse_icon");
                return "";
            }
        });
        myScroll.on("slideDown",function(){
            //当下拉，使得边界超出时，如果手指从屏幕移开，则会触发该事件
            if(this.y > 40){
                //获取内容于屏幕拉开的距离
                //可以在该部分中，修改样式，并且仅限ajax或者其他的一些操作
                //此时只是为了能演示该功能，只添加了一个alert功能。
                //并且，由于alert会阻塞后续的动画效果，所以，
                //添加了后面的一行代码，移除之前添加上的一个样式
                alert("slideDown");
                upIcon.removeClass("reverse_icon");
            }
        });

    }
    $scope.loaded();*/



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
        tooltip: {
            headerFormat: '<span style="font-size:11px;display: none"></span>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ￥<b>{point.y:.2f}<br/>'
        },
        credits: {
            enabled: false
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
    //柱状图
    var column_option={
        /*chart: {
            renderTo: 'container',
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [
                /!*'月租', '产权', '临停'*!/
            ],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                animation: false
            }
        },
        tooltip: {
            pointFormat: '{series.name}:￥<b>{point.y:.1f}</b>',
        },
        series: [{
            name: '预期',
            data: [/!*29.9, 71.5, 106.4*!/],
        }, {
            name: '实际',
            data: [/!*50, 20, 50*!/],
        }
        ]*/

        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [

            ]
        },
        yAxis: [{
            min: 0,
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            opposite: true
        }],
        credits: {
            enabled: false
        },
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true,
            pointFormat: '{series.name}:￥<b>{point.y:.1f}</b>',
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: '预期',
            color: '#fed978',
            data: [],
            pointPadding: 0.3,
            pointPlacement: -0.2
        }, {
            name: '实际',
            color: '#88daf6',
            data: [],
            pointPadding: 0.4,
            pointPlacement: -0.2
        }]
    }
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
    })
    //获取折线图
    chartService.getLineData($scope.userId).success(function(json){
        if(json.errorNum=="0"){
            $scope.weekDesc=json.data.weekDesc;
            /*json.data.weekDate*/
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
    //获取柱状图
    chartService.getColumnData($scope.year,$scope.mouth,$scope.userId).success(function(json){
        if(json.errorNum=="0"){
            $scope.monthly=json.data.monthly;
            $scope.monthtime=json.data.monthtime;
            for(var i=0;i<json.data.xAxis.length;i++){
                column_option.xAxis.categories.push(json.data.xAxis[i]);
            }
            for(var j=0;j<json.data.dayStatisticsMap.length;j++){
                column_option.series[0].data.push(json.data.dayStatisticsMap[j]);  //预期
            }
            for(var k=0;k<json.data.factPrice.length;k++){
                column_option.series[1].data.push(json.data.factPrice[k]);  //实际
            }
        }
        $("#column_container").highcharts(column_option);
    }).error(function(){
        $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
    })
    //临时放行
    $scope.fangXing=function(){
        if($scope.carNumber==""){
            $.helpTool().errorWarning("",{"desc":"请输入车牌号"})
        }else if($scope.carNumber.length !=7){
            $.helpTool().errorWarning("",{"desc":"请输入正确的车牌号"})
        }else{
            chartService.getClearance($scope.userId,$scope.carNumber).success(function(req){
                if(req.errorNum=="0"){
                    layer.open({
                        content: req.errorInfo,
                        btn: ['确认']
                    });
                }else{
                    layer.open({
                        content: req.errorInfo,
                        btn: ['确认']
                    });
                }
            }).error(function(){
                $.helpTool().errorWarning("",{"desc":"服务器繁忙"})
            })
        }

    };


}]);
