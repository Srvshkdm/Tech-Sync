import mongoose from 'mongoose';

const dpiitSchema = new mongoose.Schema(
    {
        DPIITid: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        DPIITpassword: {
            type: String,
            required: true,
        },
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
            required: true,
            unique: true,
            index: true,
        },
        startupType: {
            type: String,
            enum: ['ayurvedic', ''],
        },
        bankName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        accountType: { type: String, required: true },
        IFSC: { type: String, required: true },
        branchName: { type: String, required: true },
        swiftCode: { type: String, required: true },
        balanceStatement: { type: String },

        // Personal Details
        firstName: {
            type: String,
            required: true,
            match: /^[A-Za-z. ]{1,50}$/, // Only alphabets, dot, and space allowed
        },
        middleName: {
            type: String,
            match: /^[A-Za-z. ]{1,50}$/, // Only alphabets, dot, and space allowed
        },
        lastName: {
            type: String,
            required: true,
            match: /^[A-Za-z. ]{1,50}$/, // Only alphabets, dot, and space allowed
        },
        emailAddress: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
            maxlength: 256,
        },
        confirmEmailAddress: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
            maxlength: 256,
        },
        phoneNumber: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{9}$/, // 10 digit phone number without +91 or 0
            maxlength: 10,
        },
        mobile: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{9}$/, // 10 digit mobile number without +91 or 0
            maxlength: 10,
        },
        confirmMobile: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{9}$/, // 10 digit mobile number without +91 or 0
            maxlength: 10,
        },
        fax: {
            type: String,
            match: /^[1-9][0-9]{9}$/, // Optional, validate fax as phone number format
            maxlength: 10,
        },

        // Address Information
        address: {
            type: String,
            required: true,
            maxlength: 200,
        },
        country: {
            type: String,
            default: 'India',
        },
        state: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        taluka: {
            type: String,
            maxlength: 50,
        },
        pinCode: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{5}$/, // 6 digit pin code
            maxlength: 6,
        },
    },
    { timestamps: true }
);

export const Dpiit = mongoose.model('Dpiit', dpiitSchema);
