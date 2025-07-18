import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from '../constants/statusCodes.js';
import { Startup, Investment } from '../models/index.js';

const getAllStartupsForGov = async (req, res) => {
    try {
        const startups = await Startup.find()
            .populate('user')
            .sort({ createdAt: -1 });
        return res.status(OK).json({
            startups,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while fetching startups',
            error: err.message,
        });
    }
};

const getAllInvestorsForGov = async (req, res) => {
    try {
        const investors = await Investment.find()
            .populate({
                path: 'startup',
                populate: { path: 'user' },
            })
            .populate('invester')
            .sort({ createdAt: -1 });

        return res.status(OK).json({
            investors,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while fetching investors',
            error: err.message,
        });
    }
};

const approveOrRejectStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const { status } = req.body; // New status: 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid status. Use "approved" or "rejected".',
            });
        }

        const startupToUpdate = await Startup.findById(startupId);
        if (!startupToUpdate) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        startupToUpdate.status = status;
        await startupToUpdate.save();

        return res.status(OK).json({
            message: `Startup ${status} successfully`,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while updating startup status',
            error: err.message,
        });
    }
};

export { getAllInvestorsForGov, getAllStartupsForGov, approveOrRejectStartup };
