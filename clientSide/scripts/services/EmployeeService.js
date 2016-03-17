(function() {
    angular.module('app')
        .factory("EmployeeService", function(Restangular){
            return Restangular.service('employees');
        });
})();