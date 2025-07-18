import express from 'express';
export const govOfficialrouter = express.Router();

import {
    getAllInvestorsForGov,
    getAllStartupsForGov,
    approveOrRejectStartup,
} from '../controllers/govOfficial.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

govOfficialrouter.route('/startups').get(verifyJWT, getAllStartupsForGov);
govOfficialrouter.route('/investors').get(verifyJWT, getAllInvestorsForGov);
govOfficialrouter.route('/:startupId').put(verifyJWT, approveOrRejectStartup);
