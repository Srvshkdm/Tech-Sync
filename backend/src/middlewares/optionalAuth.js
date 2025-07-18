import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const optionalAuth = async (req, res, next) => {
    try {
        const accessToken =
            req.cookies?.accessToken ||
            req.headers['authorization']?.split(' ')[1];

        if (!accessToken) {
            // No token provided, continue without authentication
            req.user = null;
            return next();
        }

        // Try to verify the token
        const decodedToken = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (decodedToken && decodedToken.user?._id) {
            // Token is valid, fetch the user
            const user = await User.findById(decodedToken.user._id);
            req.user = user || null;
        } else {
            req.user = null;
        }

        next();
    } catch (err) {
        // Token verification failed, continue without authentication
        req.user = null;
        next();
    }
};
