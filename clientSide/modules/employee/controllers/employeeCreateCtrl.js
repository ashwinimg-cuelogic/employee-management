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
