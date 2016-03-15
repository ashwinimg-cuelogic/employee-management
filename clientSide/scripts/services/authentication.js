angular.module('app')
.factory("Authentication", Authentication);

Authentication.$inject = [
    '$rootScope',
    '$state',
    '$location'
];

function Authentication($rootScope, $state, $location) {
    var login = function(user) {
        if (user.email == "ashwini.gawade27@gmail.com" && user.password == "ashwini") {
            $state.go("employees");
        } else {
            $rootScope.message = "Invalid Email or Password";
        }
    }
    return {
        login: login
    };
};