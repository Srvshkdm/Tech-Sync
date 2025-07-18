import { OK, NOT_FOUND, SERVER_ERROR } from '../constants/statusCodes.js';
import { Investor } from '../models/investorPersonal.Model.js';
import { InvestorBankInfo } from '../models/investorBankingInformation.js';
import { InvestorDocumentData } from '../models/investorDocumentModel.js';
import { getObjectSignedUrl } from '../utils/s3utils.js';

// Get investor details by investorId
export const getInvestorDetailsById = async (req, res) => {
    try {
        const { investorId } = req.params;
        let investor = null;

        // First try to find by userId (since frontend often passes userId)
        investor = await Investor.findOne({ userId: investorId })
            .populate('governmentId')
            .populate('documents');

        // If not found by userId, try finding by _id
        if (!investor) {
            try {
                investor = await Investor.findById(investorId)
                    .populate('governmentId')
                    .populate('documents');
            } catch (e) {
                // Invalid ObjectId format, continue
            }
        }

        if (!investor) {
            return res.status(NOT_FOUND).json({
                message: 'Investor not found',
                searchedId: investorId,
            });
        }

        // Get bank info
        const bankInfo = await InvestorBankInfo.findOne({
            investorId: investor.userId,
        });

        // Get documents
        console.log('Looking for documents with investor._id:', investor._id);
        const investorDocuments = await InvestorDocumentData.find({
            id: investor._id,
        });
        console.log('Found documents:', investorDocuments.length);

        // Also check if documents are referenced in investor.documents
        if (investor.documents && investor.documents.length > 0) {
            console.log(
                'Investor has document references:',
                investor.documents
            );
            // If we have document references but no documents found, try to fetch by these IDs
            if (investorDocuments.length === 0) {
                console.log('Fetching documents by reference IDs...');
                for (const docRef of investor.documents) {
                    const doc = await InvestorDocumentData.findById(docRef);
                    if (doc) {
                        investorDocuments.push(doc);
                    }
                }
            }
        }

        // Generate signed URLs for documents
        const documentsWithUrls = {};
        for (const doc of investorDocuments) {
            if (doc.fileName) {
                try {
                    const signedUrl = await getObjectSignedUrl(doc.fileName);
                    documentsWithUrls[doc.documentType] = {
                        name: doc.name,
                        fileName: doc.fileName,
                        fileUrl: signedUrl,
                        uploadedAt: doc.createddate,
                        isApproved: doc.isapproved,
                    };
                } catch (error) {
                    console.error(
                        `Error generating signed URL for ${doc.fileName}:`,
                        error
                    );
                }
            }
        }

        // Format the response to match what the frontend expects
        const response = {
            personalInformation: {
                fullName:
                    investor.fullName || investor.organisationName || 'N/A',
                investorType: investor.investorType,
                organizationName: investor.organisationName,
                phoneNumber: investor.phoneNumber,
                email: investor.email,
                address: investor.address,
                dateOfBirth: investor.dateOfBirth,
                nationality: investor.nationality,
                linkedIn: investor.linkedInURL,
            },
            financialInformation: {
                revenue: investor.revenue,
                netWorth: investor.netWorth,
                businessLicenseNumber: investor.businessLicenseNumber,
                taxPayerIdentification: investor.taxId,
                idType: investor.governmentId?.idType,
                idValue: investor.governmentId?.idValue,
            },
            bankingInformation: bankInfo
                ? {
                      bankName: bankInfo.bankName,
                      accountNumber: bankInfo.accountNumber,
                      accountType: bankInfo.accountType,
                      ifscCode: bankInfo.ifscCode,
                      branchName: bankInfo.branchName,
                      swiftCode: bankInfo.swiftCode,
                  }
                : {},
            documents: documentsWithUrls,
        };

        return res.status(OK).json(response);
    } catch (error) {
        console.error('Error fetching investor details:', error);
        return res.status(SERVER_ERROR).json({
            message: 'Error fetching investor details',
            error: error.message,
        });
    }
};
