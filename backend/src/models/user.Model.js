import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: '',
        },
        designation: {
            type: String,
            enum: ['general', 'owner', 'investor', 'official'],
            default: 'general',
        },
    },
    { timestamps: true }
);

// pre hooks to hash password before save
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

// export is done after defining the hooks
export const User = mongoose.model('User', userSchema);
