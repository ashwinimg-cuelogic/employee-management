(function(){
    angular
    .module("app")
    .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = [
        '$scope'
    ];

    function loginCtrl($scope) {
       $scope.username = "test";
    };
})();
