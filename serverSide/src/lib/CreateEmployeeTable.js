dynamodb = require('./DynamoDB');

var params = {
    TableName : "Employee",
    KeySchema: [
        { AttributeName: "Type", KeyType: "HASH"},  //Partition key
        { AttributeName: "EmplId", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "Type", AttributeType: "S" },
        { AttributeName: "EmplId", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});