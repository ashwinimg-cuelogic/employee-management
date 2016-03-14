Boom = require("boom");

var showAll = function(req, reply) {
   reply("inside the show all method");
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
