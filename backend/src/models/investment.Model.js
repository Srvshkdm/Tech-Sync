import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
    {
        startup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup', //generating relation between inverster and startup which they have applied for
            required: true,
        },
        invester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
    },
    { timestamps: true }
);
export const Investment = mongoose.model('Investment', investmentSchema);
