import express from 'express';
export const userRouter = express.Router();
import {
    register,
    login,
    logout,
    deleteAccount,
    updateRole,
    verifyEmail,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
} from '../controllers/user.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/verify-email/:userId/:uniqueString').get(verifyEmail);

userRouter.route('/request-reset-password').post(requestResetPassword);

userRouter.use(verifyJWT);

userRouter.route('/logout').patch(logout);
userRouter.route('/role').patch(updateRole);
userRouter.route('/reset-password').post(resetPassword);
userRouter.route('/').get(getCurrentUser).delete(deleteAccount);
