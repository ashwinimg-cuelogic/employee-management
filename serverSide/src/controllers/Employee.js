Boom = require("boom");
var Promise = require('bluebird');
var EmployeeModel =  Promise.promisifyAll(require("./../models/Employee"));

var showAll = function(req, reply) {

    EmployeeModel.getAll({})
    .then(function(data) {
        reply(data);
    })
    .error(function(e) {
        reply(Boom.badData(err));
    })
    .catch(function (err) {
        reply(Boom.badData(err));
    });
};


var addEmployee = function(req, reply) {
    var EmployeeObject = {};
    if (req.payload.Username){
        EmployeeObject.Username = req.payload.Username;
    }
    if (req.payload.Email) {
        EmployeeObject.Email = req.payload.Email;
    }
    if (req.payload.Status) {
        EmployeeObject.Status = req.payload.Status;
    } else {
        EmployeeObject.Status = 'active';
    }
    if (req.payload.Name) {
        EmployeeObject.Name = req.payload.Name;
    }
    if (req.payload.Designation) {
        EmployeeObject.Designation = req.payload.Designation;
    }
    if (req.payload.DateOfBirth) {
        EmployeeObject.DateOfBirth = req.payload.DateOfBirth;
    }
    if (req.payload.DateOfJoining) {
        EmployeeObject.DateOfJoining = req.payload.DateOfJoining;
    }
    if (req.payload.Experience) {
        EmployeeObject.Experience = req.payload.Experience;
    }
    EmployeeObject.EmpId = new Date().getTime();
    EmployeeObject.Type = "Employee";

    EmployeeModel.createEmployee(EmployeeObject)
    .then(function(data) {
        reply({"success": "success"});
    })
    .error(function(e) {
        reply(Boom.badData(err));
    })
    .catch(function (err) {
        reply(Boom.badData(err));
    });


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
