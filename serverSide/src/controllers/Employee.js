Boom = require("boom");
var Promise = require('bluebird');
var EmployeeModel =  Promise.promisifyAll(require("./../models/Employee"));

var showAll = function(req, reply) {

    EmployeeModel.getAll({})
    .then(function(data) {
        reply(data);
    })
    .error(function(e) {
        console.log("error is" + e);
        reply(Boom.badImplementation(e));
    })
        .catch(function (err) {
        reply(Boom.badData(err));
    });
};


var addEmployee = function(req, reply) {
    reply("inside add blog");
};


var getEmployeeById = function(req, reply) {
    reply("inside get blog details");
};


var updateEmployee = function(req, reply) {
    reply(Boom.badData('your data is bad and you should feel bad'));
}


module.exports = {
    showAll    : showAll,
    addEmployee    : addEmployee,
    getEmployeeById: getEmployeeById,
    updateEmployee : updateEmployee
};
