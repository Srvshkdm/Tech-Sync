import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
});

// pre hook to hash resetString before save
userVerificationSchema.pre('save', async function (next) {
    try {
        if (this.isModified('uniqueString')) {
            this.uniqueString = bcrypt.hashSync(this.uniqueString, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

export const UserVerification = mongoose.model(
    'UserVerifcation',
    userVerificationSchema
);
