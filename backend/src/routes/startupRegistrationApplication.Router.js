import express from 'express';
export const startupRegistrationApplicationRouter = express.Router();
import {
    completeApplication,
    startApplication,
    getApplication,
    getApplications,
} from '../controllers/startupRegisterationApplication.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

startupRegistrationApplicationRouter.use(verifyJWT);

startupRegistrationApplicationRouter.route('/start').get(startApplication);
startupRegistrationApplicationRouter
    .route('/complete/:applicationId')
    .patch(completeApplication);
startupRegistrationApplicationRouter.route('/:userId').get(getApplications);
startupRegistrationApplicationRouter
    .route('/application/:userId/:appId')
    .get(getApplication);
