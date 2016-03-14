
var AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_DYNAMODB_END_POINT
});

var dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports = dynamoDB;