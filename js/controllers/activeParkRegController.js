var activeParkModuble = angular.module('activeParkRegController', []);

activeParkModuble.controller('activeParkRegCtrl', ['$scope', '$location', '$state', '$stateParams', 'activeParkService', 'localStorageService', '$interval','loginService', function($scope, $location, $state, $stateParmas, activeParkService, localStorageService, $interval,loginService){
    $scope.userCode = $location.search();
    $scope.openId = {};
    var appVersion = '2.0.1';
    $scope.activeParkVo = {
        appVersion: appVersion
    };

    $scope.activeParkHelper = {
        phoneText: '获取验证码',
        phoneUnSend: true
    };

    /*$scope.activeParkVo.wxpayOpenid="12121";
    $scope.customerId = "2016042200000010";     //用户的Id*/

    $scope.activeParkVo.wxpayOpenid = localStorageService.get('userWxOpenIdSixThree');
    $scope.customerId = localStorageService.get('userWxCustomerIdSixThree');

    if($scope.activeParkVo.wxpayOpenid =="" || $scope.activeParkVo.wxpayOpenid==null ||  $scope.customerId == "" || $scope.customerId ==null){
        /* $scope.encodeuri=encodeURI("http://p-share.cn/wx_share/wxpay/getAuthor?backUri=http://p-share.cn/wx_share/wxpay/getCode?directUrl=http://p-share.cn/wx_share/html5/views/index.html%23/home/activeParkReg&type=activeParkReg");
         window.location.href =$scope.encodeuri;*/

        //获取opendId
        loginService.getOpenId($scope.userCode.code).success(function (req) {
            $scope.openId = req.openId;
            $scope.activeParkVo.wxpayOpenid=req.openId;
        }).error(function(){

        });
    }else{
        $state.go('home.activeParkfail');
    };

    if($location.search().parkName != undefined){
        _czc.push(['_trackEvent',"扫描二维码", "车场名称", ""+$location.search().parkName+"" ,, "boxiang"]);
    };

    /*
     * 检查手机号码
     * */
    $scope.checkMobileReg = function(){
        var regResult= $.helpTool().checkOnlyMobile($scope.activeParkVo.mobile);
        if(regResult){
            $scope.activeParkForm.apPhone.$setValidity('phoneReg', true, 'apPhone');
        }else{
            $scope.activeParkForm.apPhone.$setValidity('phoneReg', false, 'apPhone');
        }
    };

    /*
     * 发送验证码
     * */
    $scope.sendCheckCode = function(){
        if($scope.activeParkHelper.phoneUnSend == false){
            return;
        };

        if($scope.activeParkForm.apPhone.$error.phoneReg == true){
            $.helpTool().errorWarning(null, {desc: "请输入正确手机号",ver:"2"}).open();
            $.helpTool().errorWarning("",{desc: "",ver:"2"}).remove();
            return;
        };

        var showMsg = function(msg){
            $.helpTool().errorWarning(null, {desc: msg});
        };
        activeParkService.checkPhoneCode($scope.activeParkVo.mobile).success(function(response){
            if(response.errorNum == 0){
                $.helpTool().errorWarning(null, {desc: "发送成功",ver:"2"}).open();
                $.helpTool().errorWarning("",{desc: "",ver:"2"}).remove();

                $scope.activeParkHelper.phoneUnSend = false;
                var waitTime = 60;
                var sendCodeCountDown = $interval(function(){
                    waitTime--;
                    if(waitTime == 0){
                        $scope.activeParkHelper.phoneText = '获取验证码';
                        $scope.activeParkHelper.phoneUnSend = true;
                        $interval.cancel(sendCodeCountDown);
                        clearInterval(sendCodeCountDown);
                        return;
                    };
                    $scope.activeParkHelper.phoneText = '重新发送(' + waitTime + ')';
                }, 1000);
            };
        }).error(function(errorMsg){
            $.helpTool().loading().close();
            $.helpTool().errorWarning("",{"desc":"请求服务器失败"});
        });
        //activeParkService.request.send('checkPhoneCode', {params: {phone: }}, true, showMsg);
    };

    /*
     * 注册新用户
     * */
    $scope.registerActive = function(){
        var registerActPromise = activeParkService.request.send('registerActive', {params: $scope.activeParkVo}, false);
        registerActPromise.then(function(response){
            if(response.data.errorNum == 0){
                localStorageService.set('userWxOpenIdSixThree',response.data.customer.wxpayOpenid);
                localStorageService.set('userWxCustomerIdSixThree',response.data.customer.customerId);
                $state.go('home.activeParkSuccess', {'phoneNum': $scope.activeParkVo.mobile});
            }else if(response.data.errorNum == 1){
                $.helpTool().errorWarning(null, {desc: response.data.errorInfo,ver:"2"}).open();
                $.helpTool().errorWarning("",{desc: "",ver:"2"}).remove();
            }else{
                $state.go('home.activeParkfail');
            };
        });
    };
}]);

activeParkModuble.controller('activeParkSucCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
    $scope.activeParkSucVo = {
        phoneNum: $stateParams.phoneNum
    };
}]);