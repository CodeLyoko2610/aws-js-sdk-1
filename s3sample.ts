import { S3Client, PutObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3'

const REGION = 'eu-west-1';

const bucketName = `s3-sample-${new Date().valueOf()}`; // name must be unique across the globe
const bucketParams = { Bucket: bucketName };

const keyName = "hello_world.txt";
const objectParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: 'Hello world in text!'
}

// Create S3 client object
const s3 = new S3Client({ region: REGION });

const run = async () => {
    // Create s3 bucket
    try {
        const data = await s3.send(new CreateBucketCommand(bucketParams));
        console.log("[run] Success. Bucket created.");
    } catch (error) {
        console.error("[run] Bucket not created.", error);
    }

    // Upload object to bucket
    try {
        const results = await s3.send(new PutObjectCommand(objectParams));
        console.log(`[run] Successfully uploaded data to ${bucketName}/${keyName}`);
    } catch (error) {
        console.error("[run] Uploading object to bucket failed.", error);
    }
}

run();
// REMEMBER TO DELETE THE BUCKET AFTER TESTING