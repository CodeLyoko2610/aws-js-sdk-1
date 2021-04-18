import { DynamoDB } from '@aws-sdk/client-dynamodb';

const REGION = 'eu-west-1';
const dbConfig = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`
}

console.log("[MoviesCreateTable]", { dbConfig });
const dbClient = new DynamoDB(dbConfig);

// Building the table
const params = {
    TableName: 'Movies',
    KeySchema: [
        { AttributeName: 'year', KeyType: 'HASH' }, // partition key
        { AttributeName: 'title', KeyType: 'RANGE' } // sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'year', AttributeType: 'N' },
        { AttributeName: 'title', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dbClient.createTable(params, (err, data) => {
    if (err) {
        console.error('[dbClient] Unable to create the table. error JSON', JSON.stringify(err, null, 2));
    } else {
        console.log('[dbClient] Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});