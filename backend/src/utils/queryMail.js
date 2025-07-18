import { getTransporter } from './index.js';
import { SERVER_ERROR, OK, BAD_REQUEST } from '../constants/statusCodes.js';

export const sendQueryEmail = async (req, res) => {
    try {
        const { subject, query } = req.body;
        const userEmail = req.user.email;

        if (!subject || !userEmail || !query) {
            return res.status(BAD_REQUEST).json({
                message: 'Missing fields',
            });
        }

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: process.env.MINISTRY_OF_AYUSH_EMAIL,
            subject: `Query: ${subject}`,
            html: `
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Issue:</strong> ${query}</p>
                <p>Sent by: ${userEmail}</p>
            `,
        };

        const transporter = await getTransporter();
        await transporter.sendMail(mailOptions);

        return res.status(OK).json({
            message: 'Query email sent successfully to the Ministry of Ayush.',
        });
    } catch (err) {
        console.error('Error while sending email:', err);
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while sending the query email.',
            error: err.message,
        });
    }
};
