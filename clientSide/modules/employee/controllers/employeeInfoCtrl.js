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
                $scope.emp.DateOfBirth = employee.DateOfBirth;
                $scope.emp.DateOfJoining = employee.DateOfJoining;
                console.log($scope.emp);
            })
            .catch(function(err){
                console.log(err);
            });
        }

        $scope.editEmp = function(employee) {
            EmployeeService.one(employee.EmpId).customPUT({
                "Status" :employee.Status,
                "DateOfBirth" :employee.DateOfBirth,
                "DateOfJoining" :employee.DateOfJoining,
                "Experience" :employee.Experience,
                "Username" : employee.Username
            }).then(function(employee) {
                $state.go("employees");
            });
        }

    };
})();
