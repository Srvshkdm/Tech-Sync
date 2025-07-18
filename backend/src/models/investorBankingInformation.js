import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const investorBankInfoSchema = new mongoose.Schema(
    {
        investorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
            required: true,
            unique: true,
            index: true,
        },
        bankName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        accountType: { type: String, required: true },
        IFSC: { type: String, required: true },
        branchName: { type: String, required: true },
        swiftCode: { type: String, required: true },
    },
    { timestamps: true }
);

// pre hooks to hash fields before save
investorBankInfoSchema.pre('save', async function (next) {
    try {
        if (this.isModified('IFSC')) {
            this.IFSC = bcrypt.hashSync(this.IFSC, 10);
        }
        if (this.isModified('swiftCode')) {
            this.swiftCode = bcrypt.hashSync(this.swiftCode, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

export const InvestorBankInfo = new mongoose.model(
    'InvestorBankInfo',
    investorBankInfoSchema
);
