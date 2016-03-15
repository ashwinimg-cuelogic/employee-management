(function(){
    angular
        .module("app")
        .controller('employeeListCtrl', employeeListCtrl);

    employeeListCtrl.$inject = [
        '$scope',
        "$rootScope"
    ];

    function employeeListCtrl($scope, $rootScope) {

        $rootScope.currentUser = "user";

    };
})();
