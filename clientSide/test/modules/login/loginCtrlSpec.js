describe("login controller test", function(){

    var loginCtrl;
    var scope;
    var rootScope;
    beforeEach(module("app"));

    beforeEach(
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            loginCtrl = $controller("loginCtrl", { $scope : scope});
            rootScope = $rootScope;
        })
    );

    it("Check the default username", function(){
        expect(scope.username).toEqual("test");
    });

    it("check the login mechanism when valid credentials are given", function() {
        var user = {
            "email": "ashwini.gawade27@gmail.com",
            "password": "ashwini"
        };
        scope.user = user;
        scope.login();
        expect(rootScope.currentUser).toEqual(user);
    });

    it("check the login mechanism when invalid credentials are given", function() {
        var user = {
            "email": "ashwini1.gawade27@gmail.com",
            "password": "ashwini1"
        }
        scope.user = user;
        scope.login();
        expect(rootScope.message).toEqual("Invalid Email or Password");
    })
});