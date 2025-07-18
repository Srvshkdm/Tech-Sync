import { OK, SERVER_ERROR } from '../constants/statusCodes.js';
import { Investor } from '../models/investorPersonal.Model.js';
import { User } from '../models/user.Model.js';

// Test endpoint to list all investors and their IDs
export const listAllInvestors = async (req, res) => {
    try {
        console.log('===== LIST ALL INVESTORS TEST =====');

        const investors = await Investor.find()
            .populate('userId', 'name email')
            .limit(10);

        const investorCount = await Investor.countDocuments();

        const investorList = investors.map((investor) => ({
            _id: investor._id.toString(),
            userId:
                investor.userId?._id?.toString() || investor.userId?.toString(),
            userName: investor.userId?.name || 'N/A',
            userEmail: investor.userId?.email || 'N/A',
            investorType: investor.investorType,
            organisationName: investor.organisationName || 'N/A',
            createdAt: investor.createdAt,
        }));

        return res.status(OK).json({
            message: 'Investors list',
            totalCount: investorCount,
            displayedCount: investorList.length,
            investors: investorList,
        });
    } catch (error) {
        console.error('Error in listAllInvestors:', error);
        return res.status(SERVER_ERROR).json({
            message: 'Error fetching investors list',
            error: error.message,
        });
    }
};

// Test endpoint to find investor by various methods
export const findInvestorByAnyId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('===== FIND INVESTOR BY ANY ID =====');
        console.log('Searching for ID:', id);

        let investor = null;
        let searchMethod = '';

        // Try finding by _id
        try {
            investor = await Investor.findById(id).populate('userId');
            if (investor) searchMethod = 'Found by _id';
        } catch (e) {
            console.log('Not a valid _id format');
        }

        // Try finding by userId
        if (!investor) {
            investor = await Investor.findOne({ userId: id }).populate(
                'userId'
            );
            if (investor) searchMethod = 'Found by userId';
        }

        // Try finding user first, then investor
        if (!investor) {
            const user = await User.findById(id);
            if (user) {
                investor = await Investor.findOne({
                    userId: user._id,
                }).populate('userId');
                if (investor)
                    searchMethod = 'Found user first, then investor by userId';
            }
        }

        if (investor) {
            return res.status(OK).json({
                message: searchMethod,
                investor: {
                    _id: investor._id.toString(),
                    userId:
                        investor.userId?._id?.toString() ||
                        investor.userId?.toString(),
                    userName: investor.userId?.name || 'N/A',
                    userEmail: investor.userId?.email || 'N/A',
                    investorType: investor.investorType,
                    organisationName: investor.organisationName || 'N/A',
                },
            });
        } else {
            return res.status(OK).json({
                message: 'No investor found',
                searchedId: id,
                suggestion:
                    'Use /api/v1/investments/test/list to see available investors',
            });
        }
    } catch (error) {
        console.error('Error in findInvestorByAnyId:', error);
        return res.status(SERVER_ERROR).json({
            message: 'Error searching for investor',
            error: error.message,
        });
    }
};
