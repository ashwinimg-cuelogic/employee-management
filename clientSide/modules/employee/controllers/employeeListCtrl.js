(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        '$rootScope',
        'EmployeeService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'
    ];

    function employeeListCtrl($scope, $rootScope, EmployeeService, DTOptionsBuilder, DTColumnDefBuilder) {

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
            console.log("called modify");

        }
        function removeEmp(index) {
            EmployeeService.one(index).customPUT({"Status" : "Inactive"}).then(function(employee) {
                console.log(employee);
            });
        }
    };
})();
