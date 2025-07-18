import { StartupRegistrationApplication, User } from '../models/index.js';
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from '../constants/statusCodes.js';
import cron from 'node-cron';
import { getTransporter } from '../utils/getTransporter.js';
import mongoose from 'mongoose';

const startApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const app = await StartupRegistrationApplication.create({
            owner: userId,
        });

        return res.status(OK).json(app);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'error occured while starting the startup registeration application',
            error: err.message,
        });
    }
};

const completeApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const { applicationId } = req.params;
        const application =
            await StartupRegistrationApplication.findById(applicationId);

        if (!application) {
            return res
                .status(NOT_FOUND)
                .json({ message: 'Application not found' });
        }

        if (!application.owner.equals(userId)) {
            return res
                .status(BAD_REQUEST)
                .json({ message: 'You are not the owner of this application' });
        }

        application.status = 'complete';
        await application.save();

        return res.status(OK).json(application);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'Error occurred while completing the startup registration application',
            error: err.message,
        });
    }
};

const getApplications = async (req, res) => {
    try {
        const userId = req.user._id;

        //aggregation pipeline to populate the owner field
        const apps = await StartupRegistrationApplication.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'startups',
                    localField: 'startupId',
                    foreignField: '_id',
                    as: 'startupInfo',
                },
            },
            {
                $addFields: {
                    startup: { $first: '$startupInfo' },
                },
            },
        ]);

        if (apps.length > 0) {
            return res.status(OK).json(apps);
        } else {
            return res
                .status(NOT_FOUND)
                .json({ message: 'no applications found' });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startup application',
            error: err.message,
        });
    }
};

const getApplication = async (req, res) => {
    try {
        const { userId, appId } = req.params;

        //aggregation pipeline to populate the owner field
        const app = await StartupRegistrationApplication.aggregate([
            {
                $match: {
                    $and: [
                        { owner: new mongoose.Types.ObjectId(userId) },
                        { _id: new mongoose.Types.ObjectId(appId) },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'startupowners',
                    localField: 'owner',
                    foreignField: 'userId',
                    as: 'owner',
                },
            },
            {
                $addFields: {
                    ownerUserId: { $first: '$owner.userId' }, // Extract userId from owner
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'ownerUserId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $lookup: {
                    from: 'startups',
                    localField: 'startupId',
                    foreignField: '_id',
                    as: 'startupInfo',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'bankinfos',
                                localField: '_id',
                                foreignField: 'startupId',
                                as: 'bankInfo',
                            },
                        },
                        {
                            $lookup: {
                                from: 'financialinfos',
                                localField: '_id',
                                foreignField: 'startupId',
                                as: 'financialInfo',
                            },
                        },
                        {
                            $addFields: {
                                financialInfo: { $first: '$financialInfo' },
                                bankInfo: { $first: '$bankInfo' },
                            },
                        },
                        {
                            $project: {
                                financialInfo: 1,
                                bankInfo: 1,
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    owner: {
                        $mergeObjects: [
                            { $first: '$owner' },
                            { $first: '$user' },
                        ],
                    },
                    startup: { $first: '$startupInfo' }, // Assign the first element of startupInfo to startup
                },
            },
            {
                $project: {
                    user: 0, // Remove intermediate fields
                    ownerUserId: 0,
                    startupInfo: 0, // Exclude startupInfo from the output
                },
            },
        ]);

        if (!app) {
            return res
                .status(NOT_FOUND)
                .json({ message: 'application not found' });
        } else {
            return res.status(OK).json(app[0]);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startup application',
            error: err.message,
        });
    }
};

// Run the job every hour to check for expired applications
cron.schedule('0 * * * *', async () => {
    console.log('Running the conditional expiration job...');

    const now = new Date();

    try {
        // Find documents where `expireAt` is in the past and status is still pending
        const expiredApplications = await StartupRegistrationApplication.find({
            expireAt: { $lte: now },
            status: 'pending', // Only delete pending applications
        });

        if (expiredApplications.length > 0) {
            console.log(
                `Found ${expiredApplications.length} expired application.`
            );

            for (const app of expiredApplications) {
                // Send a notification email before deleting
                const transporter = await getTransporter();
                await transporter.sendMail({
                    from: process.env.AUTH_EMAIL,
                    to: app.owner.email,
                    subject: 'Your Application Has Expired',
                    text: `Your application has expired and will be deleted soon.`,
                });

                // Delete the expired application
                console.log(`Deleting application ${app._id}...`);
                await app.deleteOne();
            }
        } else {
            console.log('No applications to delete.');
        }
    } catch (error) {
        console.error('Error running the expiration job:', error);
    }
});

export {
    completeApplication,
    startApplication,
    getApplications,
    getApplication,
};
