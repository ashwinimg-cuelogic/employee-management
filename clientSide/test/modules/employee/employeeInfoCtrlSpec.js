describe("employee Info controller tests", function() {

    var scope, employeeInfoCtrl, $q, EmployeeServiceMock, $state, $stateParams, rootScope;
    var emp = {
        "Username": "test",
        "Email": "test@test.com",
        "DateOfBirth": "2/3/2015",
        "DateOfJoining": "2/3/2015",
        "Status": "active",
        "EmpId": 1
    };

    beforeEach(module("app"));

    beforeEach(inject(function(_$q_, _$state_) {
        $q = _$q_;
        $state = _$state_;
    }));

    // define the mock EmployeeService
    beforeEach(function() {
        EmployeeServiceMock = {
            getList: function() {
                return {
                    then: function (callback) {
                        return callback([emp]);
                    }
                }
            },
            one: function(params) {
                return {
                    customPUT : function(params) {
                        return {
                            then: function(callback) {
                                return callback(emp);
                            }
                        }
                    },
                    get: function() {
                        return {
                            then: function(callback) {
                                callback({"Item" : emp});
                            },
                            catch : function(err) {
                                return err;
                            }
                        }
                    }
                }
            }
        };

    });



    beforeEach(
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            employeeInfoCtrl = function(params){
                return $controller(
                    "employeeInfoCtrl",
                    {
                        $scope : scope,
                        EmployeeService: EmployeeServiceMock,
                        $state: $state,
                        $stateParams: params
                    }
                );
            }
        })
    );

    it("should not call EmployeeService's getList method to get the the info of employees when no stateparams specifed", function() {
        spyOn(EmployeeServiceMock, "one").and.callThrough();
        employeeInfoCtrl({});
        expect(EmployeeServiceMock.one).not.toHaveBeenCalled();
    });

    it("should call EmployeeService's getList method to get the the info of employees when stateparams are specifed", function() {
        spyOn(EmployeeServiceMock, "one").and.callThrough();
        employeeInfoCtrl({"empId" : 1});
        expect(EmployeeServiceMock.one).toHaveBeenCalledWith(1);
    });

    it("should call editEmployee function", function() {
        spyOn(EmployeeServiceMock, "one").and.callThrough();
        spyOn($state, 'go');

        employeeInfoCtrl({"empId" : 1});
        scope.editEmployee(emp);
        expect(EmployeeServiceMock.one).toHaveBeenCalledWith(1);
        expect($state.go).toHaveBeenCalledWith("employees");
    })

});