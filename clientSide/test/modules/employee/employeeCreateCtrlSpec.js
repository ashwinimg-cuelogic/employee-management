describe("employee controller tests", function() {

    var scope, employeeCreateCtrl, $q, EmployeeServiceMock;

    beforeEach(module("app"));

    beforeEach(inject(function(_$q_) {
        $q = _$q_;
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
                    EmployeeService: EmployeeServiceMock
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