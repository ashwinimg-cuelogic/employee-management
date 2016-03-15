(function(){
    angular
    .module("app")
    .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = [
        '$scope',
        'Authentication'
    ];

    function loginCtrl($scope, Authentication) {
       $scope.username = "test";
        $scope.login = function() {
            Authentication.login($scope.user);
        };
    };
})();
