(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        'EmployeeService',
        '$rootScope',
        '$state'
    ];

    function employeeListCtrl($scope, EmployeeService, $rootScope, $state) {

        $rootScope.currentUser = "user";

        EmployeeService.getList().then(function(employees) {
            $scope.employees = employees;
        });


        $scope.modifyEmp = modifyEmp;
        $scope.removeEmp = removeEmp;
        $scope.update = update()

        function modifyEmp(index) {
            empId = $scope.employees[index].EmpId;
            $state.go("employees_details", {'empId':empId });
        }

        function removeEmp(index) {
            EmployeeService.one($scope.employees[index].EmpId).customPUT({"Status" : "Inactive"}).then(function(employee) {
               $scope.employees.splice(index, 1);
            });
        }

        function update() {
            var params = {};
            if ($scope.search) {
                params.search = $scope.search;
            }
            if ($scope.sortBy) {
                params.sortBy = $scope.sortBy;
            }
            if ($scope.orderBy) {
                params.orderBy = $scope.orderBy;
            }
            if ($scope.rangeField && $scope.start_pos && $scope.end_pos) {
                params.rangeField = $scope.rangeField;
                params.start_pos = (params.rangeField == 'Experience') ? $scope.start_pos : new Date($scope.start_pos).getTime();
                params.end_pos = (params.rangeField == 'Experience') ? $scope.end_pos : new Date($scope.end_pos).getTime();
            }
            EmployeeService.getList(params).then(function(employees) {
                $scope.employees = employees;
            });
        }
    };
})();
