import { v4 as uuid } from 'uuid';
import { PasswordReset } from '../models/index.js';
import { getTransporter } from './index.js';
import { PENDING, SERVER_ERROR } from '../constants/statusCodes.js';
import { getPasswordResetMailLayout } from '../constants/mails.js';

export const sendPasswordResetEmail = async (user, redirectURL, res) => {
    try {
        const { _id, email } = user;
        const resetString = uuid() + _id;
        const url = `${redirectURL}/${_id}/${resetString}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Reset Password',
            html: getPasswordResetMailLayout(url),
        };

        const newPasswordResetRecord = await PasswordReset.create({
            userId: _id,
            resetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        if (newPasswordResetRecord) {
            // send the email
            const transporter = await getTransporter();
            await transporter.sendMail(mailOptions);
            //reset email sent and password reset record saved
            res.status(PENDING).json({
                message: 'password reset email sent',
            });
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'error occured while sending password reset email',
            error: err.message,
        });
    }
};
