(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        '$rootScope',
        'EmployeeService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        '$state'
    ];

    function employeeListCtrl($scope, $rootScope, EmployeeService, DTOptionsBuilder, DTColumnDefBuilder, $state) {

        $rootScope.currentUser = "user";

        EmployeeService.getList().then(function(employees) {
            $scope.employees = employees;
        });

        //$scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        //    var defer = $q.defer();
        //    EmployeeService.getList().then(function(employees) {
        //        defer.resolve(employees);
        //    });
        //    return defer.promise;
        //    //return $resource('data.json').query().$promise;
        //})
        //.withPaginationType('full_numbers');

        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5).notSortable()
        ];

        $scope.modifyEmp = modifyEmp;
        $scope.removeEmp = removeEmp;

        function modifyEmp(index) {
            empId = $scope.employees[index].EmpId;
            $state.go("employees_details", {'empId':empId });
        }
        function removeEmp(index) {
            EmployeeService.one($scope.employees[index].EmpId).customPUT({"Status" : "Inactive"}).then(function(employee) {
               $scope.employees.splice(index, 1);
            });
        }
    };
})();
