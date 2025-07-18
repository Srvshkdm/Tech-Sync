import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const bankInfoSchema = new mongoose.Schema(
    {
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
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
        balanceStatement: { type: String },
    },
    { timestamps: true }
);

// pre hooks to hash fields before save
bankInfoSchema.pre('save', async function (next) {
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

export const BankInfo = new mongoose.model('BankInfo', bankInfoSchema);
