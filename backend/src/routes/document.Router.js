import express from 'express';
export const documentRouter = express.Router();
import multer from 'multer';
import {
    uploadDocument,
    deleteFileController,
    getfileController,
} from '../controllers/documentcontroller.js';

import { verifyJWT } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

documentRouter.use(verifyJWT);
documentRouter.post('/upload', upload.single('image'), uploadDocument);
documentRouter.post('/delete', deleteFileController);
documentRouter.get('/retrieve/:fileName', getfileController);
