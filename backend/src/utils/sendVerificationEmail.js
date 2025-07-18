import { v4 as uuid } from 'uuid';
import { UserVerification } from '../models/index.js';
import { getTransporter } from './index.js';
import { PENDING, SERVER_ERROR } from '../constants/statusCodes.js';
import { getEmailVerificationMailLayout } from '../constants/mails.js';

export const sendVerificationEmail = async (user, redirectURL, res) => {
    try {
        const { _id, email } = user;
        const uniqueString = uuid() + _id;

        const url = `${redirectURL}/${_id}/${uniqueString}`; // frontend page

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify your Email',
            html: getEmailVerificationMailLayout(url),
        };

        //create userVerification record
        const newVerificaion = await UserVerification.create({
            userId: _id,
            uniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        if (newVerificaion) {
            const transporter = await getTransporter();
            await transporter.sendMail(mailOptions);

            //email sent & verification record saved
            return res.status(PENDING).json({
                message: 'verification email sent',
            });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occured while sending verification email.',
            error: err.message,
        });
    }
};
