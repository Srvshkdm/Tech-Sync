import mongoose from 'mongoose';

const govOfficialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'govOfficial',
        },
    },
    { timestamps: true }
);

export const GovOfficial = mongoose.model('GovOfficial', govOfficialSchema);
