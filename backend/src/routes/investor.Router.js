import express from 'express';
import { verifyJWT } from '../middlewares/index.js';
import {
    getAllInvestors,
    getInvestorsPaginated,
} from '../controllers/investorController.js';
import { getInvestorDetailsById } from '../controllers/investorDetailsController.js';

const investorRouter = express.Router();

// Routes requiring authentication
// GET /api/v1/investors - Get all investors (simple list)
investorRouter.get('/', verifyJWT, getAllInvestors);

// GET /api/v1/investors/paginated - Get investors with pagination and filters
investorRouter.get('/paginated', verifyJWT, getInvestorsPaginated);

// GET /api/v1/investors/:investorId - Get specific investor details
investorRouter.get('/:investorId', verifyJWT, getInvestorDetailsById);

export { investorRouter };
