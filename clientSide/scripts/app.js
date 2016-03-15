angular.module('app', ['ui.router', 'restangular'])

//setting data for restangular
.config(["RestangularProvider", function(RestangularProvider){
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
    //  set the base url for restangular api calls
    RestangularProvider.setBaseUrl("http://localhost:3000/")

    RestangularProvider.setResponseExtractor(function(response, operation) {
        if (operation == "getList") {
            return response.Items;
        }
        return response;
    });

}])