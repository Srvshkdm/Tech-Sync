import mongoose from 'mongoose';
import { stringify } from 'uuid';
const InvestorDocumentschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    documentType: {
        type: String,
        required: true,
        enum: [
            'identity_proof',
            'address_proof',
            'bank_statement',
            'tax_return',
            'financial_statement',
            'business_license',
            'other',
        ],
    },
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    fileSize: {
        type: Number,
    },
    mimeType: {
        type: String,
        default: 'application/pdf',
    },
    createddate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedate: {
        type: Date,
    },
    isapproved: {
        type: Boolean,
        require: true,
        default: false,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    approvalDate: {
        type: Date,
    },
    rejectionReason: {
        type: String,
    },
});

InvestorDocumentschema.pre('save', function (next) {
    if (!this.isNew) {
        this.updatedate = Date.now();
    }
    next();
});

export const InvestorDocumentData = mongoose.model(
    'InvestorDocument',
    InvestorDocumentschema
);
