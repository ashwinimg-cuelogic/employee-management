(function(){
    angular.module('app')
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('employees', {
                    url:'/employees',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employee/templates/list.html',
                            controller: 'employeeListCtrl'
                        },
                        "sidebar": {
                            templateUrl: '/modules/common/templates/sidebar.html',
                            controller: 'employeeListCtrl'
                        }
                    }
                })
                .state('employees_create', {
                    url:'/employees/create',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employee/templates/create.html',
                            controller: 'employeeCreateCtrl'
                        },
                        "sidebar": {
                            templateUrl: '/modules/common/templates/sidebar.html',
                            controller: 'employeeListCtrl'
                        }
                    }
                })
                .state('employees_details', {
                    url:'/employees/:empId',
                    views :{
                        "parent" : {
                            templateUrl: '/modules/employee/templates/info.html',
                            controller: 'employeeInfoCtrl'
                        }
                    }
                })
        }]);
})()