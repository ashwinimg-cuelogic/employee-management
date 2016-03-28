describe("employee controller tests", function() {

    var scope, employeeCreateCtrl, $q, EmployeeServiceMock, $state;

    beforeEach(module("app"));

    beforeEach(inject(function(_$q_, _$state_) {
        $q = _$q_;
        $state = _$state_;
    }));

    // define the mock EmployeeService
    beforeEach(function() {
        EmployeeServiceMock = {
            post: function(emp) {
                queryDeferred = $q.defer();
                //return  queryDeferred.promise;
                return {
                    then: function(callback) {
                        return callback([{}]);
                    }
                }
            }
        };
        spyOn(EmployeeServiceMock, "post").and.callThrough();
    });

    beforeEach(
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            employeeCreateCtrl = $controller(
                "employeeCreateCtrl",
                {
                    $scope : scope,
                    EmployeeService: EmployeeServiceMock,
                    $state: $state
                }
            );
        })
    );

    it("check for existing function of creating employee", function() {
        expect(typeof scope.createEmp).toBe("function");
    });

    it("should call EmployeeService's post method to create the new employee", function() {
        var emp = {
            "Username": "test",
            "Email": "test@test.com",
            "DateOfBirth": "today",
            "DateOfJoining": "today",
            "Status": "active"
        };
        scope.createEmp(emp);
        expect(EmployeeServiceMock.post).toHaveBeenCalled();
    });

    it("should not call EmployeeService's post method when empty emp object is passed", function() {
        scope.createEmp();
        expect(EmployeeServiceMock.post).not.toHaveBeenCalled();
    });

});

//xdescribe("a spec which wont be executed", function() {
//    var foo;
//    beforeEach(function(){
//        foo = 0;
//        foo +=1
//    });
//
//    it("is just a function, so it can contain any code", function() {
//        expect(foo).toEqual(1);
//    });
//
//    it("is just a function, so it can contain any code", function() {
//        expect(true).toEqual(true);
//    });
//});
//
//
//describe("pending specs, which do not run, but their results will show up in the results as pending", function(){
//    xit("can be declared as xit", function(){
//        expect(true).toEqual(true);
//    });
//
//    it("can be declared by calling 'pending' in the spec body", function() {
//        expect(true).toBe(false);
//        pending();
//    });
//});

