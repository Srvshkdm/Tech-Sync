import jwt from 'jsonwebtoken';
import {
    FORBIDDEN,
    NOT_FOUND,
    SERVER_ERROR,
} from '../constants/statusCodes.js';
import { cookieOptions } from '../constants/cookie.js';
import { User } from '../models/index.js';

export const verifyJWT = async (req, res, next) => {
    try {
        const accessToken =
            req.cookies?.accessToken ||
            req.headers['authorization']?.split(' ')[1];

        if (!accessToken) {
            return res
                .status(NOT_FOUND)
                .json({ message: 'access token missing' }); //user was logged out
        }

        const decodedToken = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decodedToken) {
            return res
                .status(FORBIDDEN)
                .clearCookie('accessToken', cookieOptions)
                .json({ message: 'forged access token' });
        }

        //since token is valid but is this id user in oue db or not
        const user = await User.findById(decodedToken.user._id);

        if (!user) {
            return res
                .status(NOT_FOUND)
                .clearCookie('accessToken', cookieOptions)
                .json({ message: 'user with provided access token not found' });
        }

        req.user = user;

        next();
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .clearCookie('accessToken', cookieOptions)
            .json({ message: 'expired access token', error: err.message });
    }
};
