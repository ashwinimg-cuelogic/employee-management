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

    var updateExpression =  [];
    ExpressionAttributeNames = {};
    ExpressionAttributeValues = {};

    if (typeof Employee.Status !== "undefined") {
        updateExpression.push("#st = :s");
        ExpressionAttributeNames = {"#st": "Status"};
        ExpressionAttributeValues[":s"] = Employee.Status;
    }

    if (typeof Employee.Experience !== "undefined") {
        updateExpression.push("Experience = :e");
        ExpressionAttributeValues[":e"] = Employee.Experience;
    };

    if (typeof Employee.DateOfBirth !== "undefined") {
        updateExpression.push("DateOfBirth = :dob");
        ExpressionAttributeValues[":dob"] = Employee.DateOfBirth;
    }

    if (typeof Employee.DateOfJoining !== "undefined") {
        updateExpression.push("DateOfJoining = :doj");
        ExpressionAttributeValues[":doj"] =  Employee.DateOfJoining;
    }

    var params = {
        TableName: "Employee",
        Key:{
            "Type": Employee.Type,
            "EmpId": parseInt(Employee.EmpId)
        },
        UpdateExpression: "set "+updateExpression.join(","),
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues,
        ReturnValues:"ALL_NEW"
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
    });
}

var getEmployeeById = function(Employee) {
    var params = {
        TableName: "Employee",
        Key:{
            "Type": Employee.Type,
            "EmpId": parseInt(Employee.EmpId)
        }
    };

    return new Promise(function(resolve, reject) {
        dynamodb.get(params, function(err, data) {
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

var deleteEmployee = function(Employee) {
    var params = {
        TableName: "Employee",
        Key:{
            "Type": Employee.Type,
            "EmpId": parseInt(Employee.EmpId)
        }
    };

    return new Promise(function(resolve, reject) {
        dynamodb.delete(params, function(err, data) {
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

module.exports = {
    getAll : getAll,
    createEmployee : createEmployee,
    updateEmployee : updateEmployee,
    getEmployeeById: getEmployeeById,
    deleteEmployee : deleteEmployee
};