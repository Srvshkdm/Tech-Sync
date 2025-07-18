import mongoose from 'mongoose';

const investorApplicationSchema = new mongoose.Schema(
    {
        InvestorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
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

export const InvestorApplication = mongoose.model(
    'InvestorApplication',
    investorApplicationSchema
);
