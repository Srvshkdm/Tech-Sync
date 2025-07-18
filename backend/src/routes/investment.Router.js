import express from 'express';
export const investmentRouter = express.Router();

import { verifyJWT } from '../middlewares/index.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

import {
    registerInvestor,
    applyStartup,
    getAppliedStartups,
    getInvesters,
    uploadInvestorDocuments,
    getInvestorDocuments,
    updateDocumentStatus,
    getInvestorApplication,
    checkInvestorExists,
} from '../controllers/investment.Controller.js';

import { getInvestorDetailsById } from '../controllers/investorDetailsController.js';
import {
    listAllInvestors,
    findInvestorByAnyId,
} from '../controllers/investorTestController.js';

// Put specific routes BEFORE parameterized routes
investmentRouter
    .route('/check-investor-exists')
    .get(verifyJWT, checkInvestorExists);

// Route to get investor details by investorId
investmentRouter
    .route('/investors/:investorId/details')
    .get(getInvestorDetailsById);
investmentRouter.route('/become-a-investor').post(verifyJWT, registerInvestor);
investmentRouter
    .route('/investor-application/:userId')
    .get(verifyJWT, getInvestorApplication);

// Test endpoints for debugging
investmentRouter.route('/test/list').get(listAllInvestors);
investmentRouter.route('/test/find/:id').get(findInvestorByAnyId);

// Test endpoint to check if request is reaching
investmentRouter.route('/test-investor').post(verifyJWT, (req, res) => {
    console.log('Test endpoint hit');
    console.log('User:', req.user);
    console.log('Body:', req.body);
    res.json({ message: 'Test successful', user: req.user, body: req.body });
});

// Document related routes
investmentRouter.route('/documents').get(verifyJWT, getInvestorDocuments);

investmentRouter.route('/').get(verifyJWT, getAppliedStartups);

// Put parameterized routes LAST
investmentRouter
    .route('/:startupId')
    .post(verifyJWT, applyStartup)
    .get(verifyJWT, getInvesters);

investmentRouter
    .route('/documents/upload')
    .post(
        verifyJWT,
        uploadMiddleware.single('document'),
        uploadInvestorDocuments
    );

investmentRouter
    .route('/documents/:documentId/status')
    .put(verifyJWT, updateDocumentStatus);
