import mongoose from 'mongoose';

const startupOwnerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        address: { type: String, required: true },
        nationality: { type: String, required: true, trim: true },
        linkedInURL: { type: String, default: '' },
    },
    { timestamps: true }
);

export const StartupOwner = mongoose.model('StartupOwner', startupOwnerSchema);
