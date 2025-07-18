import { OK, SERVER_ERROR } from '../constants/statusCodes.js';
import { Investor } from '../models/investorPersonal.Model.js';
import { User } from '../models/index.js';

// Get all investors
export const getAllInvestors = async (req, res) => {
    try {
        // Fetch all investors with populated user data and government ID
        const investors = await Investor.find()
            .populate({
                path: 'userId',
                select: 'name email phoneNumber isApproved',
            })
            .populate('governmentId')
            .sort({ createdAt: -1 }); // Sort by newest first

        // Format the response to match frontend expectations
        const formattedInvestors = investors.map((investor) => {
            return {
                _id: investor._id,
                userId: investor.userId?._id,
                name: investor.organisationName || investor.userId?.name || 'N/A',
                email: investor.userId?.email || 'N/A',
                phoneNumber: investor.userId?.phoneNumber || 'N/A',
                investorType: investor.investorType,
                organisationName: investor.organisationName,
                dateOfBirth: investor.dateOfBirth,
                address: investor.address,
                nationality: investor.nationality,
                linkedInURL: investor.linkedInURL,
                revenue: investor.revenue,
                netWorth: investor.netWorth,
                taxId: investor.taxId,
                businessLicenseNumber: investor.businessLicenseNumber,
                governmentId: {
                    idType: investor.governmentId?.idType,
                    idValue: investor.governmentId?.idValue,
                },
                isApproved: investor.userId?.isApproved || false,
                createdAt: investor.createdAt,
                updatedAt: investor.updatedAt,
            };
        });

        return res.status(OK).json({
            success: true,
            count: formattedInvestors.length,
            investors: formattedInvestors,
        });
    } catch (error) {
        console.error('Error fetching all investors:', error);
        return res.status(SERVER_ERROR).json({
            success: false,
            message: 'Error fetching investors',
            error: error.message,
        });
    }
};

// Get investors with pagination and filters
export const getInvestorsPaginated = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            investorType,
            nationality,
            minRevenue,
            maxRevenue,
            minNetWorth,
            maxNetWorth,
            search,
        } = req.query;

        // Build query
        const query = {};

        // Add filters
        if (investorType) {
            query.investorType = investorType;
        }

        if (nationality) {
            query.nationality = new RegExp(nationality, 'i');
        }

        if (minRevenue || maxRevenue) {
            query.revenue = {};
            if (minRevenue) query.revenue.$gte = Number(minRevenue);
            if (maxRevenue) query.revenue.$lte = Number(maxRevenue);
        }

        if (minNetWorth || maxNetWorth) {
            query.netWorth = {};
            if (minNetWorth) query.netWorth.$gte = Number(minNetWorth);
            if (maxNetWorth) query.netWorth.$lte = Number(maxNetWorth);
        }

        // If search is provided, we need to search in user data
        let userIds = [];
        if (search) {
            const users = await User.find({
                $or: [
                    { name: new RegExp(search, 'i') },
                    { email: new RegExp(search, 'i') },
                ],
            }).select('_id');
            userIds = users.map((user) => user._id);

            // Add search conditions
            query.$or = [
                { organisationName: new RegExp(search, 'i') },
                { address: new RegExp(search, 'i') },
            ];

            if (userIds.length > 0) {
                query.$or.push({ userId: { $in: userIds } });
            }
        }

        // Calculate pagination
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Execute query with pagination
        const [investors, totalCount] = await Promise.all([
            Investor.find(query)
                .populate({
                    path: 'userId',
                    select: 'name email phoneNumber isApproved',
                })
                .populate('governmentId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber),
            Investor.countDocuments(query),
        ]);

        // Format the response
        const formattedInvestors = investors.map((investor) => {
            return {
                _id: investor._id,
                userId: investor.userId?._id,
                name: investor.organisationName || investor.userId?.name || 'N/A',
                email: investor.userId?.email || 'N/A',
                phoneNumber: investor.userId?.phoneNumber || 'N/A',
                investorType: investor.investorType,
                organisationName: investor.organisationName,
                dateOfBirth: investor.dateOfBirth,
                address: investor.address,
                nationality: investor.nationality,
                linkedInURL: investor.linkedInURL,
                revenue: investor.revenue,
                netWorth: investor.netWorth,
                taxId: investor.taxId,
                businessLicenseNumber: investor.businessLicenseNumber,
                governmentId: {
                    idType: investor.governmentId?.idType,
                    idValue: investor.governmentId?.idValue,
                },
                isApproved: investor.userId?.isApproved || false,
                createdAt: investor.createdAt,
                updatedAt: investor.updatedAt,
            };
        });

        return res.status(OK).json({
            success: true,
            investors: formattedInvestors,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
                totalItems: totalCount,
                itemsPerPage: limitNumber,
                hasNextPage: pageNumber < Math.ceil(totalCount / limitNumber),
                hasPrevPage: pageNumber > 1,
            },
        });
    } catch (error) {
        console.error('Error fetching paginated investors:', error);
        return res.status(SERVER_ERROR).json({
            success: false,
            message: 'Error fetching investors',
            error: error.message,
        });
    }
};
