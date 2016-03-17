dynamodb = require('./DynamoDB');

var params = {
    TableName : "Employee",
    KeySchema: [
        { AttributeName: "Type", KeyType: "HASH"},  //Partition key
        { AttributeName: "EmpId", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "Type", AttributeType: "S" },
        { AttributeName: "EmpId", AttributeType: "N" },
        { AttributeName: "DateOfBirth", AttributeType: "N" },
        {AttributeName: "DateOfJoining", AttributeType: "N"},
        {AttributeName: "Experience", AttributeType: "N"},
        {AttributeName: "Email", AttributeType: "S"}
    ],
    LocalSecondaryIndexes:[
        {
            IndexName: "EmployeeAndEmailIndex",
            KeySchema: [
                {AttributeName: "Type", KeyType: "HASH"},  //Partition key
                {AttributeName: "Email", KeyType: "RANGE"},  //Sort key
            ],
            Projection: {
                "ProjectionType": "ALL"
            }
        },
        {
            IndexName: "EmployeeAndDateOfBirthIndex",
            KeySchema: [
                {AttributeName: "Type", KeyType: "HASH"},  //Partition key
                {AttributeName: "DateOfBirth", KeyType: "RANGE"},  //Sort key
            ],
            Projection: {
                "ProjectionType": "ALL"
            }
        },
        {
            IndexName: "EmployeeAndDateOfJoiningIndex",
            KeySchema: [
                {AttributeName: "Type", KeyType: "HASH"},  //Partition key
                {AttributeName: "DateOfJoining", KeyType: "RANGE"},  //Sort key
            ],
            Projection: {
                "ProjectionType": "ALL"
            }
        },
        {
            IndexName: "EmployeeAndExperienceIndex",
            KeySchema: [
                {AttributeName: "Type", KeyType: "HASH"},  //Partition key
                {AttributeName: "Experience", KeyType: "RANGE"},  //Sort key
            ],
            Projection: {
                "ProjectionType": "ALL"
            }
        }
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