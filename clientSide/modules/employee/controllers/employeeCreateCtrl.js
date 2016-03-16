(function(){
    angular
        .module("app")
        .controller('employeeCreateCtrl', employeeCreateCtrl);

    employeeCreateCtrl.$inject = [
        '$scope',
        'EmployeeService',
        '$state'
    ];

    function employeeCreateCtrl($scope, EmployeeService, $state) {
        console.log($scope.user);

        $scope.createEmp = function(emp) {
            console.log(emp.DateOfBirth);
            console.log(new Date(emp.DateOfBirth));
            if(emp) {
                EmployeeService
                .post(emp)
                .then(function(newResource) {
                    $scope.emp = {};
                    $state.go('employees');
                });
            }
        }

    };
})();
