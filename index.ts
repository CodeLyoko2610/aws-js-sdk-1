import { DynamoDB } from '@aws-sdk/client-dynamodb';

// Create DynamoDB client
(async () => {
    const dbClient = new DynamoDB({ region: 'eu-west-1' });

    try {
        const results = await dbClient.listTables({});
        console.log('[dbClient]', { tables: results.TableNames?.join('\n') });
    } catch (error) {
        console.error('[dbClient]', error);
    }
})()