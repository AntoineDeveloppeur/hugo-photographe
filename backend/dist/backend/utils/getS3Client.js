import { S3Client } from "@aws-sdk/client-s3";
const getS3Client = () => {
    if (!process.env.AWS_REGION ||
        !process.env.AWS_ACCESS_KEY_ID ||
        !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error("aws region or credentials in .env are undefined");
    }
    return new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
};
export default getS3Client;
