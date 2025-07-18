import { Docmetadata } from '../models/Documentmodel.js'; // Ensure the path and file extension are correct
import { uploadFile } from '../utils/s3utils.js'; // Ensure the path and file extension are correct
import { User } from '../models/user.Model.js';
import { deleteFile } from '../utils/s3utils.js';
import { getObjectSignedUrl } from '../utils/s3utils.js';
import {
    BAD_REQUEST,
    CREATED,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from '../constants/statusCodes.js';

const uploadDocument = async (req, res) => {
    const { userId, Documentname } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
        return res.status(BAD_REQUEST).json({ message: 'No file uploaded' });
    }

    // Validate the file type
    const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(BAD_REQUEST).json({
            message:
                'Invalid file type. Allowed types: PDF, JPEG, PNG, GIF, DOC, DOCX',
        });
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
        return res.status(NOT_FOUND).json({ message: 'User not found' });
    }

    // Generate a unique filename for each document
    const timestamp = Date.now();
    const fileExtension = req.file.originalname.split('.').pop();
    const FileName = `${userId.toString()}_${Documentname}_${timestamp}.${fileExtension}`;

    try {
        // Upload the file to S3 or desired storage location
        const doc = await uploadFile(
            req.file.buffer,
            FileName,
            req.file.mimetype
        );

        const signedUrl = await getObjectSignedUrl(FileName);

        // Save document metadata in the database
        const document = new Docmetadata({
            name: Documentname,
            id: userId,
            fileName: FileName,
            createdDate: new Date(),
        });

        await document.save();

        return res.status(CREATED).json({
            message: 'Document uploaded successfully',
            document,
            signedUrl,
            FileName,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Failed to upload document',
            error: error.message,
        });
    }
};

const deleteFileController = async (req, res) => {
    const { s3Name, fileName } = req.body;

    if (!fileName) {
        return res
            .status(BAD_REQUEST)
            .json({ message: 'File name is required' });
    }

    try {
        // Check if the file belongs to the authenticated user
        const document = await Docmetadata.findOne({
            id: req.user._id,
        });

        if (!document) {
            return res.status(NOT_FOUND).json({
                message: 'File not found or not authorized to delete',
            });
        }

        // Delete file from S3
        console.log('Attempting to delete file from S3:', s3Name);
        try {
            await deleteFile(s3Name);
            console.log('File deleted successfully from S3:', s3Name);
        } catch (error) {
            console.error('Error deleting file from S3:', error);
            return res
                .status(SERVER_ERROR)
                .json({ message: 'Failed to delete file from S3' });
        }

        // Remove file metadata from the database
        await Docmetadata.deleteOne({ id: req.user.id, name: fileName });
        console.log('File metadata removed successfully from database');

        return res.status(OK).json({
            message: `File ${fileName} deleted successfully`,
        });
    } catch (error) {
        return res
            .status(SERVER_ERROR)
            .json({ message: 'Internal Server Error' });
    }
};

const getfileController = async (req, res) => {
    const { fileName } = req.params; // Assuming fileName is passed as a URL parameter

    if (!fileName) {
        return res
            .status(BAD_REQUEST)
            .json({ message: 'File name is required' });
    }

    try {
        // Generate signed URL to access the object from S3
        const signedUrl = await getObjectSignedUrl(fileName);

        return res.status(OK).json({
            message: 'Signed URL generated successfully',
            signedUrl,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Error generating signed URL',
        });
    }
};
export { uploadDocument, deleteFileController, getfileController };
