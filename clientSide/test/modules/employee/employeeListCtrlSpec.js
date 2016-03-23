describe("employee controller tests", function() {

    var scope, employeeListCtrl, $q, EmployeeServiceMock, $state;
    var emp = {
        "Username": "test",
        "Email": "test@test.com",
        "DateOfBirth": "today",
        "DateOfJoining": "today",
        "Status": "active"
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
                //return {
                //    then: function() {
                //        return [emp];
                //    }
                //}

                //deferred = $q.defer();
                //deferred.resolve([emp]);
                //var promise =  deferred.promise;
                //return promise;

                return {
                    then: function (callback) {
                        return callback([emp]);
                    }
                }
            }
        };

    });



    beforeEach(
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            employeeListCtrl = function(params){
                return $controller(
                    "employeeListCtrl",
                    {
                        $scope : scope,
                        EmployeeService: EmployeeServiceMock,
                        $state: $state
                    }
                );
            }
        })
    );

    it("should call EmployeeService's getList method to get the list of employees", function() {
        spyOn(EmployeeServiceMock, "getList").and.callThrough();
        employeeListCtrl();
        expect(EmployeeServiceMock.getList).toHaveBeenCalled();
    });

    it("should call EmployeeService's getList method to get the list of employees and change the scope value", function() {
        employeeListCtrl();
        expect(scope.employees).toEqual([emp]);
    });

});