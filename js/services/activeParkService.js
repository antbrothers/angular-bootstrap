/**
 * Created by Admini on 2016/8/24.
 */
var activeParkServiceModule = angular.module('activeParkSvc', []);

activeParkServiceModule.factory('activeParkService', ['$http', '$q', function($http, $q){
    var activeParkService  = {
        checkPhoneCode: function(phoneNumber){
            return $http.get('/wx_share/Register/sendSmsCode/'+phoneNumber);
        },
        request: {
            registerActive:{
                method: 'GET',
                url: '/wx_share/Register/wxRegist'
            },
            send:function(ajaxKey, otherOptions, defer, callback){
                var options = angular.copy(this[ajaxKey]);
                if(otherOptions){
                    $.extend(true, options, otherOptions);
                };
                var promise = $http(options);
                if(defer){
                    promise.then(function(response){
                        var deferred = $q.defer();
                        if(response.data.errorNum == 0){
                            deferred.resolve(response.data.data);
                        }else{
                            deferred.reject(response.data.errorInfo);
                        }
                        return deferred.promise;
                    }, function(errorMsg){
                        alert(errorMsg);
                    }).then(function(response){
                        callback(response);
                    }, function(errorMsg){
                        $.helpTool.errorWarning(null, {desc: errorMsg});
                    })
                }else{
                    return promise;
                }
            }
        }
    }
    return activeParkService;
}]);

activeParkServiceModule.factory('activeParkModelService')