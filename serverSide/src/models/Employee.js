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
        ConditionExpression: "attribute_not_exists(#t) and attribute_not_exists(EmpId) and attribute_not_exists(Username)",
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

module.exports = {
    getAll : getAll,
    createEmployee : createEmployee
};