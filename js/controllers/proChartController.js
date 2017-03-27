/**
 * Created by Administrator on 2016/5/26.
 */
"use strict"
var myControllers = angular.module('proChartController', []);
myControllers.controller('proChartCtrl',["$scope","proChartService","$location","$timeout",function($scope,proChartService,$location,$timeout){
       console.log("proChartCtrl");

    $scope.param=$location.search();
    /*$scope.userId=$scope.param.userId;*/
   
    $scope.userId="2016060100000097";
   
    $scope.date=new Date();
    $scope.year=$scope.date.getFullYear();
    $scope.mouth=$scope.date.getMonth()+1;
    $scope.carStop="";
    $scope.parkingId="";

    $scope.myScroll="";
    $scope.loaded=function(){
        $scope.myScroll=new  IScroll("#wrapper",{
            scrollX:true,
            scrollY:false,
            mouseWheel:true,
            click:true
        })
    }
    $scope.loaded();


    //动态绑定月份
    $scope.mouthArr=[];
    $scope.P={
        y:'',
        m:''
    };

    var i=$scope.mouth;
    var j=1;
    var m=12;
    for(i;i>=j;i--){
        $scope.P={
            y:$scope.year,
            m:i
        }
        $scope.mouthArr.push($scope.P);
        if(i==1){
            for(m;m>$scope.mouth;m--){
                $scope.P={
                    y:$scope.year-1,
                    m:m
                }
                $scope.mouthArr.push($scope.P);
            }

        }
    }
    console.log($scope.mouthArr);

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
        credits: {
            enabled: false
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
        plotOptions: {
            column: {
                stacking: 'normal',
                animation: false
            }
        },
        tooltip: {
            pointFormat: '{series.name}:￥<b>{point.y:.1f}</b>',
        },
        credits: {
            enabled: false
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
        credits: {
            enabled: false
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

    $scope.getData=function(year,mouth,userId,pakingId){
        //获取日流水折线图
        proChartService.getLineData(year,mouth,userId,pakingId).success(function(json){
            if(json.errorNum=="0"){
                $scope.weekDesc=json.data.weekDesc;
                $scope.weekDate=json.data.weekDate;
                line_options.xAxis.categories.splice(0,line_options.xAxis.categories.length);
                for(var i=0;i<json.data.xAxis.length;i++){
                    line_options.xAxis.categories.push(json.data.xAxis[i]);
                }
                line_options.series.splice(0,line_options.series.length);
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
        proChartService.getColumnData(year,mouth,userId,pakingId).success(function(json){
            if(json.errorNum=="0"){
                $scope.monthly=json.data.monthly;
                $scope.monthtime=json.data.monthtime;
                column_option.xAxis.categories.splice(0,column_option.xAxis.categories.length);
                column_option.series[0].data.splice(0,column_option.series[0].data.length);
                column_option.series[1].data.splice(0,column_option.series[1].data.length);
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
    };
    //获取停车场
    proChartService.getParking($scope.userId).success(function(req){
        if(req.errorNum=="0"){
            $scope.carStop=req.parkingList[0].parkingName;
            $scope.parkingId=req.parkingList[0].parkingId;
            $scope.carList=req.parkingList;
            $scope.getData($scope.year,$scope.mouth,$scope.userId,$scope.parkingId);
        }else{
            $.helpTool().errorWarning("",{"desc":req.errorInfo});
        }
    })
    $scope.selectMouth=function(event,year,mouth){
        $timeout(function(){
            $scope.$apply(function(){
                $scope.year=year;
                $scope.mouth=mouth;
            })
        },0);
        $("#scroller ul li").removeClass('active');
        angular.element(event.target).closest('li').addClass("active");
        console.log(mouth);
        $scope.getData(year,mouth,$scope.userId,$scope.parkingId);
    };

    $scope.openCarStop=function(){
        console.log("openCarstop");
        angular.element(".pro_car_cont").css("display","block");
        angular.element(".chart_cont").css({"position":"fixed","overflow-y":"hidden"});
    }
    $scope.selectCar=function(porking,parkingId){
        console.log("212");
        $scope.carStop=porking;
        $scope.parkingId=parkingId;
        angular.element(".pro_car_cont").css("display","none");
        angular.element(".chart_cont").css({"position":"relative","overflow-y":"scroll"});
        $scope.getData($scope.year,$scope.mouth,$scope.userId,$scope.parkingId);
    }
    $scope.closeCarlist=function(){
        angular.element(".pro_car_cont").css("display","none");
        angular.element(".chart_cont").css({"position":"relative","overflow-y":"scroll"});
    }

    $scope.defaultMonth=function(){
       for(var i=0;i<$("#scroller ul li").length;i++){
           if($($("#scroller ul li")[i]).attr("dataVuel")==$scope.mouth){
               $($("#scroller ul li")[i]).addClass("active");
           }
       }
    }
    $scope.defaultMonth();
}])
