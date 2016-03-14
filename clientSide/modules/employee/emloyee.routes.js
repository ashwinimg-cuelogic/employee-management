(function(){
    angular.module('app')
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('employees', {
                    url:'/employees',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employees/templates/list.html',
                            controller: 'employeeListCtrl'
                        }
                    }
                })
                .state('employees_create', {
                    url:'/employees/create',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employees/templates/create.html',
                            controller: 'employeeCreateCtrl'
                        }
                    }
                })
                .state('employees_details', {
                    url:'/employees/:empId',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employees/templates/info.html',
                            controller: 'employeeInfoCtrl'
                        }
                    }
                })
        }]);
})()