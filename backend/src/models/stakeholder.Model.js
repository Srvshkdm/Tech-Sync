import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const investorSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },

        organisationName: {
            type: String,
            required: true,
        },

        Interest: {
            type: String,
            required: true,
        },

        PhoneNumber: {
            type: Number,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        connectedStartups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Startups',
            },
        ],

        likedStartups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Startups',
            },
        ],

        applicationStatus: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'notification',
            },
        ],
    },
    { timestamps: true }
);

investorSchema.plugin(passportLocalMongoose);

export const Investor = mongoose.model('Investor', investorSchema);
