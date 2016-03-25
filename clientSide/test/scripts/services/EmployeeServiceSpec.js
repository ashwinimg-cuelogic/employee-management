describe("Employee service test casers", function() {
    var EmployeeService;

    beforeEach(module("app"));

    beforeEach(inject(function(_EmployeeService_) {
        EmployeeService = _EmployeeService_;
    }));

    it("emplyee service returns the restangular object", function() {
        expect(EmployeeService).not.toBeNull();
        expect(typeof EmployeeService).toBe("object");
    })
})