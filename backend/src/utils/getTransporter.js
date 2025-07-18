import nodemailer from 'nodemailer';

export const getTransporter = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        //testing success
        await transporter.verify();
        console.log('Ready for messages.');

        return transporter;
    } catch (err) {
        throw new Error(`Error in generating transporter: ${err.message}`);
    }
};
