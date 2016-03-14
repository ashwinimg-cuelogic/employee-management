dynamodb = require('./../lib/DynamoDB');
var Promise = require('bluebird');

var getAll = function(params) {
    var params = { TableName: "Employee" };

    return new Promise(function(resolve, reject) {
        dynamodb.scan(params, function(err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log(JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    });
}


var createEmployee = function(Employee) {

    var params = {
        TableName: "Employee",
        Item : Employee,
        ConditionExpression: "attribute_not_exists(#t) and attribute_not_exists(EmpId) " +
        "and attribute_not_exists(Username) and attribute_not_exists(Email)",
        ExpressionAttributeNames: {"#t": "Type"}
    };

    return new Promise(function(resolve, reject) {
        dynamodb.put(params, function(err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log(JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    })
}

var updateEmployee = function(Employee) {

    var params = {
        TableName: "Employee",
        Key:{
            "Type": Employee.Type,
            "EmpId": Employee.EmpId
        },
        UpdateExpression: "set Status = :s, " +
        "Experience=:e, DateOfBirth=:dob, DateOfJoining = :doj",
        ExpressionAttributeValues:{
            ":s":Employee.Status,
            ":e":Employee.Experience,
            ":dob": Employee.DateOfBirth,
            ":doj": Employee.DateOfJoining
        },
        UpdateExpression: "remove info.actors[0]",
        ConditionExpression: "Username = :Username and Email = :Email",
        ExpressionAttributeValues:{
            ":Username":Employee.Username
            ":Email":Employee.Email
        },
        ReturnValues:"UPDATED_NEW"
    };


    return new Promise(function(resolve, reject) {
        dynamodb.update(params, function(err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log(JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    })
}

module.exports = {
    getAll : getAll,
    createEmployee : createEmployee,
    updateEmployee : updateEmployee
};