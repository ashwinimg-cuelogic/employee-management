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

        $scope.createEmp = function(emp) {
            if(emp) {
                emp.DateOfBirth =new Date(emp.DateOfBirth).getTime();
                emp.DateOfJoining =new Date(emp.DateOfJoining).getTime();

                EmployeeService
                .post(emp)
                .then(function(newResource) {
                    $scope.emp = {};
                    emp ={};
                    $state.go('employees');
                });
            }
        }

    };
})();
