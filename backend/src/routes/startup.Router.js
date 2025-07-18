import express from 'express';
export const startupRouter = express.Router();

import { verifyJWT, optionalAuth } from '../middlewares/index.js';
import { validateStartupQuery } from '../middlewares/validateStartupQuery.js';

import {
    addStartup,
    updateStartup,
    deleteStartup,
    getStartupById,
    getAllStartups,
    getStartupsByOwnerId,
    registerStartupUsingDPIITid,
} from '../controllers/startup.Controller.js';

// Public routes (no authentication required)
startupRouter.route('/').get(validateStartupQuery, getAllStartups);

// Protected routes (authentication required)
startupRouter.use(verifyJWT);

startupRouter.route('/add').post(addStartup);
startupRouter.route('/owner/:userId').get(getStartupsByOwnerId);

startupRouter
    .route('/:startupId')
    .get(getStartupById)
    .patch(updateStartup)
    .delete(deleteStartup);

startupRouter
    .route('/register-DPIIT/:DPIITid')
    .post(registerStartupUsingDPIITid);
