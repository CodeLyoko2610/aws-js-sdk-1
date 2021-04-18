import { DynamoDB } from 'aws-sdk';
import * as fs from 'fs';

const REGION = 'eu-west-1';
const dbConfig = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`
}
const docClient = new DynamoDB.DocumentClient(dbConfig);

console.log(`[docClient] Importing movies...`);
const movieDataFull = JSON.parse(fs.readFileSync('movieDataFull.json', 'utf8'));
const movieData = JSON.parse(fs.readFileSync('movieData.json', 'utf8'));
console.log(`[docClient] Movies imported.`);

// Put each movie into Movies table
movieData.forEach(movie => {
    const params = {
        TableName: 'Movies',
        Item: {
            'year': movie.year,
            'title': movie.title,
            'info': movie.info
        }
    }

    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`[docClient] Unable to add movie ${movie.title}. Error JSON: ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`[docClient] PutItem succeeded for: ${movie.title}.`);
        }
    })
})