import { DynamoDB } from 'aws-sdk';

const REGION = 'eu-west-1';
const dbConfig = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`,
};
const docClient = new DynamoDB.DocumentClient(dbConfig);

// READ OPS
const table = 'Movies';
const year = 2021;
const title = 'Big Movie, Big Storage, Big Grumpy Bill.';

const params = {
    TableName: table,
    Key: {
        title,
        year
    }
}

docClient.get(params, (err, data) => {
    if (err) {
        console.error(`[docClient] Movie "${title}" not found. Error JSON: ${JSON.stringify(err, null, 2)}`);
    } else {
        console.log(`[docClient] GetItem succeeded: ${JSON.stringify(data, null, 2)}`);
    }
})