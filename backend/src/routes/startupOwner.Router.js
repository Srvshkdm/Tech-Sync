import express from 'express';
export const startupOwnerRouter = express.Router();
import {
    register,
    updateOwnerDetails,
    // deleteAccount,
    getOwnerById,
} from '../controllers/startupOwner.Controller.js';
import { updateRole } from '../controllers/user.Controller.js';

// import { deleteStartups } from '../controllers/startup.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

startupOwnerRouter.use(verifyJWT);

startupOwnerRouter.route('/register').post(updateRole, register);
startupOwnerRouter.route('/update').patch(updateRole, updateOwnerDetails);
startupOwnerRouter.route('/:ownerId').get(getOwnerById);

// .delete(verifyJWT, deleteAccount, deleteStartups, (req, res) => {
//     return res
//         .status(OK)
//         .clearCookie('accessToken', cookieOptions)
//         .clearCookie('refreshToken', cookieOptions)
//         .json({ message: 'user account deleted successfully' });
// });
