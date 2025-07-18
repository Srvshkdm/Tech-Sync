import mongoose from 'mongoose';

const investorIdSchema = new mongoose.Schema({
    investorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    idType: {
        type: String,
        required: true, // Ensure the type of government ID is mandatory
        trim: true, // Trim whitespace
        enum: [
            'passport',
            'driver_license',
            'national_id',
            'aadhaarCard',
            'drivingLicense',
            'other',
        ], // You can adjust the allowed types as needed
        default: 'other',
    },
    idValue: {
        type: String,
        required: true, // Ensure the ID value is mandatory
        trim: true, // Trim whitespace
    },
});

const investorSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        investorType: {
            type: String,
            required: true,
        },
        organisationName: {
            type: String,
            default: '',
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        address: { type: String, required: true },
        nationality: { type: String, required: true, trim: true },
        linkedInURL: { type: String, default: '' },
        revenue: {
            type: Number,
            required: true,
        },
        netWorth: {
            type: Number,
            required: true,
        },
        taxId: {
            type: String,
            required: true,
        },
        businessLicenseNumber: {
            type: String,
            default: '',
        },
        documents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InvestorDocument',
            },
        ],
        governmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InvestorId',
        },
    },
    { timestamps: true }
);

export const InvestorId = new mongoose.model('InvestorId', investorIdSchema);
export const Investor = new mongoose.model('Investor', investorSchema);
