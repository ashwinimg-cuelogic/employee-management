(function(){
    angular
        .module("app")
        .controller('employeeCreateCtrl', employeeCreateCtrl);

    employeeCreateCtrl.$inject = [
        '$scope',
        'EmployeeService'
    ];

    function employeeCreateCtrl($scope) {
        console.log($scope.user);

        $scope.createEmp = function() {
            EmployeeService
        }

    };
})();
