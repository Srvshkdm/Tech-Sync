import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage for direct S3 upload
const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // Set the limit to 50MB
    },
});

export default uploadMiddleware;
