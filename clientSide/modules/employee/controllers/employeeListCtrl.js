(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        '$rootScope',
        'EmployeeService',
        '$state'
    ];

    function employeeListCtrl($scope, $rootScope, EmployeeService, $state) {

        $rootScope.currentUser = "user";

        $scope.update = function() {
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


        EmployeeService.getList().then(function(employees) {
            $scope.employees = employees;
        });

        ////$scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        ////    var defer = $q.defer();
        ////    EmployeeService.getList().then(function(employees) {
        ////        defer.resolve(employees);
        ////    });
        ////    return defer.promise;
        ////    //return $resource('data.json').query().$promise;
        ////})
        ////.withPaginationType('full_numbers');
        //
        //$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        //
        //$scope.dtColumnDefs = [
        //    DTColumnDefBuilder.newColumnDef(0),
        //    DTColumnDefBuilder.newColumnDef(1),
        //    DTColumnDefBuilder.newColumnDef(2),
        //    DTColumnDefBuilder.newColumnDef(3),
        //    DTColumnDefBuilder.newColumnDef(4),
        //    DTColumnDefBuilder.newColumnDef(5).notSortable()
        //];

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
