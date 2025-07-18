import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CREATED,
    SERVER_ERROR,
    FORBIDDEN,
} from '../constants/statusCodes.js';
import { v4 as uuid } from 'uuid';
import {
    Startup,
    FinancialInfo,
    BankInfo,
    Dpiit,
    User,
    StartupOwner,
    StartupRegistrationApplication,
} from '../models/index.js';
import { validateRegex } from '../utils/index.js';

// pending
const getAllStartups = async (req, res) => {
    try {
        const { keyword = '' } = req.query;
        const query = {
            $or: [
                { startupName: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        };
        const startups = await Startup.find(query)
            .populate({
                path: 'owner',
            })
            .sort({ createdAt: -1 });

        console.log(startups);

        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'no startup found',
            });
        }
        return res.status(OK).json(startups);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startups.',
            error: err.message,
        });
    }
};

const registerStartupUsingDPIITid = async (req, res) => {
    try {
        const { DPIITid } = req.params;
        const { password } = req.body;

        // get data from dpiit website and create its record in db and send the data to the frontend
        const data = await Dpiit.findOne({
            DPIITid,
        });
        if (!data) {
            return res.status(NOT_FOUND).json({
                message: 'startup not found',
            });
        }
        if (data.DPIITpassword !== password) {
            return res
                .status(BAD_REQUEST)
                .json({ message: 'invalid password' });
        }

        return res.status(OK).json(data);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'Error occurred while registering the startup using DPIIT.',
            error: err.message,
        });
    }
};

const getStartupById = async (req, res) => {
    try {
        const { startupId } = req.params;
        const startup = await Startup.findById(startupId);
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'startup not found.',
            });
        }
        return res.status(OK).json(startup);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startup.',
            error: err.message,
        });
    }
};

const getStartupsByOwnerId = async (req, res) => {
    try {
        const { userId } = req.params;
        const startups = await Startup.find({ owner: userId });
        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'no startups found',
            });
        }
        return res.status(OK).json(startups);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the user startups.',
            error: err.message,
        });
    }
};

const updateStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;
        const { updates } = req.body;

        const existingStartup = await Startup.findById(startupId);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the owner of the startup
        if (!existingStartup.owner.equals(userId)) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to update this startup',
            });
        }

        // Update the startup
        const updatedStartup = await Startup.findByIdAndUpdate(
            startupId,
            { $set: { updates } },
            {
                new: true, // Return the updated document
                runValidators: true,
            }
        );

        return res.status(OK).json(updatedStartup);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while updating the startup',
            error: err.message,
        });
    }
};

const deleteStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;

        // Find the startup by ID
        const existingStartup = await Startup.findById(startupId);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the creator of the startup
        if (!existingStartup.owner.equals(userId)) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to delete this startup',
            });
        }

        // Delete the startup
        await Startup.findByIdAndDelete(startupId);

        await BankInfo.findByIdAndDelete(startupId);

        await FinancialInfo.findByIdAndDelete(startupId);

        return res.status(OK).json({
            message: 'Startup deleted successfully',
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while deleting the startup',
            error: err.message,
        });
    }
};

const addStartup = async (req, res) => {
    try {
        let { dateOfBirth, address, nationality, linkedInURL, applicationId } =
            req.body;
        const { _id } = req.user;
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
        if (user && !user.verified) {
            return res.status(BAD_REQUEST).json({
                message:
                    'your email is not verified yet, please login or sign up',
            });
        }

        if (user) {
            // check if owner record already exist
            const owner = await StartupOwner.findOne({ userId: _id });
            if (!owner) {
                await StartupOwner.create({
                    userId: _id,
                    dateOfBirth,
                    address,
                    nationality,
                    linkedInURL,
                });
                user.designation = 'owner';
                await user.save();
            }
        }

        let {
            startupName,
            description,
            businessType,
            industry,
            country,
            website,
            valuation,
            dateOfEstablishment,
        } = req.body;
        address = req.body.address;

        valuation = Number(valuation);

        if (
            !startupName ||
            !description ||
            !businessType ||
            !industry ||
            !address ||
            !country ||
            !website ||
            !valuation ||
            !dateOfEstablishment
        ) {
            return res.status(BAD_REQUEST).json({
                message: 'missing fields',
            });
        }
        const startup = await Startup.create({
            startupName,
            description,
            businessType,
            industry,
            address,
            country,
            website,
            valuation,
            dateOfEstablishment,
            owner: _id,
            startupId: uuid(),
            documents: req.body.documents,
        });
        if (startup) {
            const {
                bankName,
                accountNumber,
                accountType,
                IFSC,
                branchName,
                swiftCode,
            } = req.body;
            if (
                !bankName ||
                !accountNumber ||
                !accountType ||
                !IFSC ||
                !branchName ||
                !swiftCode
            ) {
                return res
                    .status(BAD_REQUEST)
                    .json({ message: 'missing fields' });
            }
            const addedBankInfo = await BankInfo.create({
                bankName,
                accountNumber,
                accountType,
                IFSC,
                branchName,
                swiftCode,
                startupId: startup._id,
            });
            if (addedBankInfo) {
                const {
                    revenue,
                    profitMargin,
                    fundingReceived,
                    valuation,
                    financialYear,
                } = req.body;
                if (
                    !revenue ||
                    !profitMargin ||
                    !fundingReceived ||
                    !valuation ||
                    !financialYear
                ) {
                    return res
                        .status(BAD_REQUEST)
                        .json({ message: 'missing fields' });
                }

                const addedFinancialInfo = await FinancialInfo.create({
                    revenue,
                    profitMargin,
                    fundingReceived,
                    valuation,
                    financialYear,
                    startupId: startup._id,
                });
                if (addedFinancialInfo) {
                    // Update the startup registration application if applicationId is provided
                    if (applicationId) {
                        const application =
                            await StartupRegistrationApplication.findById(
                                applicationId
                            );
                        if (application && application.owner.equals(_id)) {
                            application.startupId = startup._id;
                            application.status = 'complete';
                            await application.save();
                        }
                    }

                    return res.status(OK).json({
                        message: 'startup has been registered successfully',
                        startupId: startup._id,
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(SERVER_ERROR).json({
            message: 'error occured while adding the startup.',
            error: err.message,
        });
    }
};

export {
    addStartup,
    updateStartup,
    deleteStartup,
    getStartupById,
    getAllStartups,
    getStartupsByOwnerId,
    registerStartupUsingDPIITid,
};
