describe("employee controller tests", function() {

    var scope, employeeListCtrl, $q, EmployeeServiceMock, $state;
    var emp = {
        "Username": "test",
        "Email": "test@test.com",
        "DateOfBirth": "today",
        "DateOfJoining": "today",
        "Status": "active",
        "EmpId":1
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
            },
            one: function() {
                return {
                    customPUT : function(params) {
                        return {
                            then: function(callback) {
                                return callback(emp[0]);
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

    it("should call the modify employee method and change state to the particular user info page", function() {
        spyOn($state, 'go');
        employeeListCtrl();
        scope.modifyEmp(0);
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith("employees_details", {'empId':emp.EmpId });

    });

    it("should not call the $state.go method when the emp index does not exist", function() {
        spyOn($state, 'go');
        employeeListCtrl();
        scope.modifyEmp(1);
        expect($state.go).not.toHaveBeenCalled();
    });

    it("should call the EmployeeServiceMock.one method when the emp index exist and removes employee through the emp list", function() {
        spyOn(EmployeeServiceMock, "one").and.callThrough();
        employeeListCtrl();
        scope.removeEmp(0);
        expect(EmployeeServiceMock.one).toHaveBeenCalled();
        expect(scope.employees).toEqual([]);
    });

    it("should not call the EmployeeServiceMock.one method when the emp index does not exist", function() {
        spyOn(EmployeeServiceMock, "one").and.callThrough();
        employeeListCtrl();
        scope.removeEmp(1);
        expect(EmployeeServiceMock.one).not.toHaveBeenCalled();
    });

    it("should call update method with specified params with experience as the rangeField", function(){
        spyOn(EmployeeServiceMock, "getList").and.callThrough();
        employeeListCtrl();
        scope.search = "t";
        scope.sortBy = "Email";
        scope.orderBy = "desc";
        scope.rangeField = "Experience";
        scope.start_pos = 1;
        scope.end_pos = 4;
        scope.update();
        expect(EmployeeServiceMock.getList).toHaveBeenCalled();
        expect(EmployeeServiceMock.getList).toHaveBeenCalledWith({
            search : 't',
            sortBy : "Email",
            orderBy : "desc",
            rangeField: "Experience",
            start_pos: 1,
            end_pos : 4
        });
    });

    it("should call update method with specified params with other than experience as the rangeField", function(){
        spyOn(EmployeeServiceMock, "getList").and.callThrough();
        employeeListCtrl();
        scope.search = "t";
        scope.sortBy = "Email";
        scope.orderBy = "desc";
        scope.rangeField = "DateOfBirth";
        scope.start_pos = 1;
        scope.end_pos = 4;
        scope.update();
        expect(EmployeeServiceMock.getList).toHaveBeenCalled();
        expect(EmployeeServiceMock.getList).toHaveBeenCalledWith({
            search : 't',
            sortBy : "Email",
            orderBy : "desc",
            rangeField: "DateOfBirth",
            start_pos: 1,
            end_pos : 4
        });
    })

});