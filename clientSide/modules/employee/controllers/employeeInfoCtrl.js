(function(){
    angular
        .module("app")
        .controller('employeeInfoCtrl', employeeInfoCtrl);

    employeeInfoCtrl.$inject = [
        '$scope',
        'EmployeeService',
        '$state',
        '$stateParams'
    ];

    function employeeInfoCtrl($scope, EmployeeService, $state, $stateParams) {
        var empId = ($stateParams.empId) ? $stateParams.empId : 0;

        if (empId) {
            EmployeeService
            .one(empId)
            .get()
            .then(function(employee) {
                $scope.emp = employee.Item ;
                $scope.emp.DateOfBirth = new Date($scope.emp.DateOfBirth);
                $scope.emp.DateOfJoining = new Date($scope.emp.DateOfJoining);
            })
            .catch(function(err){
                console.log(err);
            });
        }

        $scope.editEmployee = function(employee) {
            employee.DateOfBirth =new Date(employee.DateOfBirth).getTime();
            employee.DateOfJoining =new Date(employee.DateOfJoining).getTime();

            EmployeeService.one(employee.EmpId).customPUT({
                "Status" :employee.Status,
                "DateOfBirth" :parseInt(employee.DateOfBirth),
                "DateOfJoining" :parseInt(employee.DateOfJoining),
                "Experience" :employee.Experience
            }).then(function(employee) {
                $state.go("employees");
            });
        }

    };
})();
