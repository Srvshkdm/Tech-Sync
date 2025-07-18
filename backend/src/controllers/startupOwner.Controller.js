import { StartupOwner } from '../models/index.js';
import { validateRegex } from '../utils/index.js';
import {
    OK,
    SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
} from '../constants/statusCodes.js';
import { User } from '../models/user.Model.js';

const register = async (req, res) => {
    try {
        let { dateOfBirth, address, nationality, linkedInURL } = req.body;

        const { _id } = req.user._id;
        dateOfBirth = dateOfBirth.trim();
        nationality = nationality.trim();

        if (!dateOfBirth || !address || !nationality) {
            return res.status(BAD_REQUEST).json({
                message: 'Empty input fields!',
            });
        }

        const isValid = validateRegex('dateOfBirth', dateOfBirth);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid DOB entered',
            });
        }

        // check if user is present in users table
        const user = await User.findById(_id);
        if (!user.verified) {
            return res.status(BAD_REQUEST).json({
                message:
                    'your email is not verified yet, please login or sign up',
            });
        }
        //create new user
        //password hashing ( auto done using pre hook )
        const newUser = await StartupOwner.create({
            userId: user._id,
            dateOfBirth,
            address,
            nationality,
            linkedInURL,
        });

        // send mail
        if (newUser) {
            return res
                .status(OK)
                .json({ message: 'personal info saved successfully' });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occured while registering owner.',
            error: err.message,
        });
    }
};

const updateOwnerDetails = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const { updates } = req.body;

        const owner = await StartupOwner.find({ userId: ownerId });

        if (!owner) {
            return res.status(NOT_FOUND).json({
                message: 'owner not found',
            });
        }
        console.log(updates);
        // Update the owner details
        const updatedOwner = await StartupOwner.findOneAndUpdate(
            { userId: ownerId },
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(OK).json(updatedOwner);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occured while updating owner.',
            error: err.message,
        });
    }
};

const getOwnerById = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const user = await StartupOwner.findOne({ userId: ownerId });
        if (!user) {
            return res.status(BAD_REQUEST).json({ message: 'owner not found' });
        }

        return res.status(OK).json(user);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'error occured while fetching the current logged in startup owner',
            err: err.message,
        });
    }
};

export { register, getOwnerById, updateOwnerDetails };
