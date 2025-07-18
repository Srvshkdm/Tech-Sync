import express from 'express';
import { sendQueryEmail } from '../utils/index.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';
export const queryRouter = express.Router();

queryRouter.route('/send').post(verifyJWT, sendQueryEmail);
