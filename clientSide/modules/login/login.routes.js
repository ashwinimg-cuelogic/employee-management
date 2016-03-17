(function(){
    angular.module('app')
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url:'/login',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/login/templates/login.html',
                            controller: 'loginCtrl'
                        }
                    }
                })
        }]);
})()