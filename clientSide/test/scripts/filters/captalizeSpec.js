describe("capitalize filter", function() {

    var filter;
    beforeEach(module("app"));

    beforeEach(
        inject(function($filter) {
            filter = function() {
                return $filter("Capitalize");
            }
        })
    );

    it("should return empty string when no input is provided", function() {
        var capfilter = filter();
        expect(capfilter()).toBe("");
    });

    it("should return capitalize word", function() {
        var capfilter = filter();
        expect(capfilter("hello")).toBe("Hello");
    });

});