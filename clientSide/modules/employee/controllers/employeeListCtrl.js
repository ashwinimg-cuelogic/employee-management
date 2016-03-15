(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope'
    ];

    function employeeListCtrl($scope) {
        $scope.username = "test";
        $scope.login = function() {
            Authentication.login($scope.user);
        };
    };
})();
