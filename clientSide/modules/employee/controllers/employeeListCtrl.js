(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        '$rootScope',
        'EmployeeService'
    ];

    function employeeListCtrl($scope, $rootScope, EmployeeService) {

        $rootScope.currentUser = "user";

        EmployeeService.getList().then(function(employees) {
            $scope.employees = employees;
        })

    };
})();
