import { BAD_REQUEST } from '../constants/statusCodes.js';

export const validateStartupQuery = (req, res, next) => {
    try {
        const { page, limit, status, sortBy, sortOrder } = req.query;

        // Validate page number
        if (page) {
            const pageNum = parseInt(page);
            if (isNaN(pageNum) || pageNum < 1) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    message: 'Page must be a positive integer'
                });
            }
        }

        // Validate limit
        if (limit) {
            const limitNum = parseInt(limit);
            if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    message: 'Limit must be between 1 and 100'
                });
            }
        }

        // Validate status
        if (status && !['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(BAD_REQUEST).json({
                success: false,
                message: 'Status must be one of: pending, approved, rejected'
            });
        }

        // Validate sortBy
        const validSortFields = ['createdAt', 'updatedAt', 'startupName', 'valuation', 'dateOfEstablishment'];
        if (sortBy && !validSortFields.includes(sortBy)) {
            return res.status(BAD_REQUEST).json({
                success: false,
                message: `Sort field must be one of: ${validSortFields.join(', ')}`
            });
        }

        // Validate sortOrder
        if (sortOrder && !['asc', 'desc'].includes(sortOrder)) {
            return res.status(BAD_REQUEST).json({
                success: false,
                message: 'Sort order must be either asc or desc'
            });
        }

        next();
    } catch (err) {
        return res.status(BAD_REQUEST).json({
            success: false,
            message: 'Invalid query parameters',
            error: err.message
        });
    }
};
