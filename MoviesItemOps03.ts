import { DynamoDB } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

const REGION = 'eu-west-1';
const dbConfig: DynamoDB.DocumentClient.DocumentClientOptions & ServiceConfigurationOptions = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`
}
const docClient = new DynamoDB.DocumentClient(dbConfig);

// UPDATE OPS
const table = 'Movies';
const year: number = 2021;
const title = 'Big Movie, Big Storage, Big Grumpy Bill.';

const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: table,
    Key: {
        year,
        title
    },
    UpdateExpression: 'set info.rating=:r, info.plot=:p, info.actors=:a',
    ExpressionAttributeValues: {
        ':r': 5.5,
        ':p': 'When you not work at all, but the bill is real. Now you know you must do something.',
        ':a': ['Chuong', 'Chuong', 'Chuong'],
    },
    ReturnValues: 'ALL_NEW'
}

console.log(`[docClient] Updating one item ${title}...`);
docClient.update(params, (err, data) => {
    if (err) {
        console.error(`[docClient] Unable to update movie "${title}". Error JSON: ${JSON.stringify(err, null, 2)}`);
    } else {
        console.log(`[docClient] UpdateItem succeeded. ${JSON.stringify(data, null, 2)}`);
    }
})