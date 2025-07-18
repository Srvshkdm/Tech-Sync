import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const passwordResetSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    resetString: String,
    createdAt: Date,
    expiresAt: Date,
});

// pre hook to hash resetString before save
passwordResetSchema.pre('save', async function (next) {
    try {
        if (this.isModified('resetString')) {
            this.resetString = bcrypt.hashSync(this.resetString, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

export const PasswordReset = mongoose.model(
    'PasswordReset',
    passwordResetSchema
);
