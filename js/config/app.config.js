
/**
     * 模块注册及配置代码
     *
     */
"use strict";
var app=angular.module("MyApp",[
        "ui.router",
        "oc.lazyLoad",
        'truncate',
        'LocalStorageModule',
        'authorize'
    ]);
app.run(['$rootScope',function($rootScope){
        $rootScope
            .$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $("#ui-view").html("");
                $(".page-loading").removeClass("hidden");
                /* $(".load_js").css("display","block");*/

            });
        $rootScope
            .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                $(".page-loading").addClass("hidden");
                /* $(".load_js").css("display","none");*/
            });
    }]);
app.config(['localStorageServiceProvider',function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('demoPrefix');
    }]);
/*
     app.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
     function($provide,$compileProvider,$controllerProvider,$filterProvider){
     app.controller = $controllerProvider.register;
     app.directive = $compileProvider.directive;
     app.filter = $filterProvider.register;
     app.factory = $provide.factory;
     app.service  =$provide.service;
     app.constant = $provide.constant;
     }
     ]);*/





