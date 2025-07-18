import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export async function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    };
    console.log('file uploading with the name ', fileName);
    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`File uploaded successfully: ${fileName}`);
        return data;
    } catch (error) {
        console.error(`Error uploading file: ${fileName}`, error);
        throw new Error('Error uploading file');
    }
}

export async function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`File deleted successfully: ${fileName}`);
        return data;
    } catch (error) {
        console.error(`Error deleting file: ${fileName}`, error);
        throw new Error('Error deleting file');
    }
}

export async function getObjectSignedUrl(key) {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const command = new GetObjectCommand(params);
        const seconds = 604800; // 7 days
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: seconds,
        });
        console.log(`Generated signed URL: ${url}`);
        return url;
    } catch (error) {
        console.error(`Error generating signed URL for ${key}`, error);
        throw new Error('Error generating signed URL');
    }
}
