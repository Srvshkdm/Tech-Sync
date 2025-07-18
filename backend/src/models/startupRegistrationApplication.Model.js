import mongoose from 'mongoose';

const startupRegistrationApplicationSchema = new mongoose.Schema(
    {
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        completedSteps: {
            type: [String],
            required: true,
            default: [],
        },
        expireAt: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        status: {
            type: String,
            enum: ['pending', 'complete'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export const StartupRegistrationApplication = mongoose.model(
    'StartupRegisterationApplication',
    startupRegistrationApplicationSchema
);
