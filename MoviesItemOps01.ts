import { DynamoDB } from 'aws-sdk';

const REGION = 'eu-west-1';
const dbConfig = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`
}
const docClient = new DynamoDB.DocumentClient(dbConfig);

// WRITE OPS
const table = 'Movies';
const year = 2021;
const title = 'Big Movie, Big Storage, Big Grumpy Bill.';

const params = {
    TableName: table,
    Item: {
        year,
        title,
        'info': {
            'plot': 'When you not work at all, but the bill is real.',
            'rating': 0
        }
    }
}

console.log('[docClient] Adding a single movie...');
docClient.put(params, (err, data) => {
    if (err) {
        console.error(`[docClient] Unable to add single movie ${title}. Error JSON: ${JSON.stringify(err, null, 2)}`);
    } else {
        console.log(`[docClient] PutItem succeeded for: ${title}.`);
    }
})