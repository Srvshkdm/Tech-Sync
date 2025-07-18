import mongoose from 'mongoose';

const financialInfoSchema = new mongoose.Schema(
    {
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
            required: true,
            unique: true,
            index: true,
        },
        revenue: { type: Number, required: true, default: 0 },
        profitMargin: { type: Number, required: true, default: 0 },
        fundingReceived: { type: Number, required: true, default: 0 },
        valuation: { type: Number, required: true, default: 0 },
        financialYear: {
            type: String,
            required: true,
            trim: true,
        },
        balanceSheet: { type: String },
    },
    { timestamps: true }
);

export const FinancialInfo = new mongoose.model(
    'FinancialInfo',
    financialInfoSchema
);
