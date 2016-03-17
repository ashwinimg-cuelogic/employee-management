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

            emp.DateOfBirth =new Date(emp.DateOfBirth).getTime();
            emp.DateOfJoining =new Date(emp.DateOfJoining).getTime();
            if(emp) {
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
