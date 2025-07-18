import {
    BAD_REQUEST,
    CREATED,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from '../constants/statusCodes.js';
import { validateRegex } from '../utils/index.js';
import { Investment } from '../models/index.js';
import { Investor, InvestorId } from '../models/investorPersonal.Model.js';
import { User } from '../models/index.js';
import { InvestorBankInfo } from '../models/investorBankingInformation.js';
import { InvestorDocumentData } from '../models/investorDocumentModel.js';

const registerInvestor = async (req, res) => {
    try {
        console.log('=== REGISTER INVESTOR REQUEST ===');
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        console.log('User:', req.user);

        let {
            investorType,
            organisationName,
            dateOfBirth,
            address,
            nationality,
            linkedInURL,
            revenue,
            netWorth,
            businessLicenseNumber,
            taxId,
            govtIdtype,
            govtIdValue,
            bankName,
            accountNumber,
            accountType,
            ifscCode,
            branchName,
            swiftCode,
        } = req.body;

        const { _id } = req.user;

        // Check if required fields exist before trimming
        if (
            !dateOfBirth ||
            !nationality ||
            !revenue ||
            !netWorth ||
            !taxId ||
            !govtIdtype ||
            !govtIdValue ||
            !bankName ||
            !accountNumber ||
            !accountType ||
            !ifscCode ||
            !branchName ||
            !swiftCode
        ) {
            console.log('Missing fields:');
            console.log('dateOfBirth:', dateOfBirth);
            console.log('nationality:', nationality);
            console.log('revenue:', revenue);
            console.log('netWorth:', netWorth);
            console.log('taxId:', taxId);
            console.log('govtIdtype:', govtIdtype);
            console.log('govtIdValue:', govtIdValue);
            console.log('bankName:', bankName);
            console.log('accountNumber:', accountNumber);
            console.log('accountType:', accountType);
            console.log('ifscCode:', ifscCode);
            console.log('branchName:', branchName);
            console.log('swiftCode:', swiftCode);
            return res.status(BAD_REQUEST).json({
                message: 'Missing required fields',
                missingFields: {
                    dateOfBirth: !dateOfBirth,
                    nationality: !nationality,
                    revenue: !revenue,
                    netWorth: !netWorth,
                    taxId: !taxId,
                    govtIdtype: !govtIdtype,
                    govtIdValue: !govtIdValue,
                    bankName: !bankName,
                    accountNumber: !accountNumber,
                    accountType: !accountType,
                    ifscCode: !ifscCode,
                    branchName: !branchName,
                    swiftCode: !swiftCode,
                },
            });
        }

        dateOfBirth = dateOfBirth.trim();
        nationality = nationality.trim();
        revenue = revenue.toString().trim();
        netWorth = netWorth.toString().trim();
        taxId = taxId.trim();
        govtIdtype = govtIdtype.trim();
        govtIdValue = govtIdValue.trim();
        bankName = bankName.trim();
        accountNumber = accountNumber.trim();
        accountType = accountType.trim();
        ifscCode = ifscCode.trim();
        branchName = branchName.trim();
        swiftCode = swiftCode.trim();

        if (
            !investorType ||
            !dateOfBirth ||
            !address ||
            !nationality ||
            !revenue ||
            !netWorth ||
            !taxId ||
            !govtIdtype ||
            !govtIdValue ||
            !bankName ||
            !accountNumber ||
            !accountType ||
            !ifscCode ||
            !branchName ||
            !swiftCode
        ) {
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
        console.log('Creating investor with data:', {
            userId: user._id,
            dateOfBirth,
            address,
            nationality,
            linkedInURL,
            investorType,
            organisationName,
            revenue: Number(revenue),
            netWorth: Number(netWorth),
            taxId,
            businessLicenseNumber: businessLicenseNumber || '',
        });

        let newInvestor;
        try {
            newInvestor = await Investor.create({
                userId: user._id,
                dateOfBirth: new Date(dateOfBirth),
                address,
                nationality,
                linkedInURL,
                investorType,
                organisationName,
                revenue: Number(revenue),
                netWorth: Number(netWorth),
                taxId,
                businessLicenseNumber: businessLicenseNumber || '',
            });
            console.log('Investor created successfully:', newInvestor._id);
        } catch (error) {
            console.error('Error creating investor:', error);
            throw new Error(`Failed to create investor: ${error.message}`);
        }

        // Save government ID information
        let govId;
        try {
            console.log('Creating government ID with:', {
                investorId: newInvestor._id,
                idType: govtIdtype,
                idValue: govtIdValue,
            });
            govId = await InvestorId.create({
                investorId: newInvestor._id,
                idType: govtIdtype,
                idValue: govtIdValue,
            });
            console.log('Government ID created successfully:', govId._id);
        } catch (error) {
            console.error('Error creating government ID:', error);
            // Rollback investor creation
            await Investor.deleteOne({ _id: newInvestor._id });
            throw new Error(`Failed to create government ID: ${error.message}`);
        }

        // Update investor with government ID reference
        try {
            newInvestor.governmentId = govId._id;
            await newInvestor.save();
            console.log('Investor updated with government ID');
        } catch (error) {
            console.error('Error updating investor with government ID:', error);
            throw new Error(`Failed to update investor: ${error.message}`);
        }

        let addedBankInfo;
        try {
            console.log('Creating bank info with:', {
                bankName,
                accountNumber,
                accountType,
                ifscCode,
                branchName,
                swiftCode,
                investorId: user._id,
            });
            addedBankInfo = await InvestorBankInfo.create({
                bankName,
                accountNumber,
                accountType,
                IFSC: ifscCode,
                branchName,
                swiftCode,
                investorId: user._id,
            });
            console.log('Bank info created successfully:', addedBankInfo._id);
        } catch (error) {
            console.error('Error creating bank info:', error);
            // Rollback previous creations
            await InvestorId.deleteOne({ _id: govId._id });
            await Investor.deleteOne({ _id: newInvestor._id });
            throw new Error(`Failed to create bank info: ${error.message}`);
        }

        if (newInvestor && addedBankInfo) {
            return res.status(OK).json({
                message: 'Investor registration successful',
                data: {
                    investorId: newInvestor._id,
                    userId: user._id,
                    personalInfo: newInvestor,
                    bankingInfo: addedBankInfo,
                },
            });
        }
    } catch (err) {
        console.error('=== ERROR IN REGISTER INVESTOR ===');
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        console.error('Full error:', err);
        return res.status(SERVER_ERROR).json({
            message: 'error occured while applying for stakeholder.',
            error: err.message,
            details: err.stack,
        });
    }
};

const checkInvestorExists = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const existingInvestor = await Investor.findOne({ userId });

        return res.status(OK).json({
            exists: !!existingInvestor,
            message: existingInvestor
                ? 'Investor profile already exists'
                : 'No investor profile found',
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Error checking investor status',
            error: error.message,
        });
    }
};

const addInvestorBankInfo = async () => {};

const deleteInvestorBankInfo = async () => {};

const addInvestorFinancialInfo = async () => {};

// Upload investor documents
const uploadInvestorDocuments = async (req, res) => {
    try {
        const { documentType, documentName } = req.body;
        const { _id: userId } = req.user;

        if (!documentType || !documentName) {
            return res.status(BAD_REQUEST).json({
                message: 'Document type and name are required',
            });
        }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(BAD_REQUEST).json({
                message: 'No file uploaded',
            });
        }

        // Check if investor exists
        const investor = await Investor.findOne({ userId });
        if (!investor) {
            return res.status(NOT_FOUND).json({
                message:
                    'Investor profile not found. Please complete registration first.',
            });
        }

        // Import S3 utilities at the top of the function
        const { uploadFile, getObjectSignedUrl } = await import(
            '../utils/s3utils.js'
        );

        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = req.file.originalname.split('.').pop();
        const fileName = `investor_${investor._id}_${documentType}_${timestamp}.${fileExtension}`;

        // Upload to S3
        await uploadFile(req.file.buffer, fileName, req.file.mimetype);

        // Generate signed URL
        const fileUrl = await getObjectSignedUrl(fileName);

        // Create document record
        const newDocument = await InvestorDocumentData.create({
            name: documentName,
            id: investor._id,
            documentType,
            fileName: fileName,
            fileUrl: fileUrl,
            uploadedBy: userId,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
        });

        // Update investor record with document reference
        if (!investor.documents) {
            investor.documents = [];
        }
        investor.documents.push(newDocument._id);
        await investor.save();

        return res.status(CREATED).json({
            message: 'Document uploaded successfully',
            document: {
                ...newDocument.toObject(),
                signedUrl: fileUrl,
            },
        });
    } catch (error) {
        console.error('Error uploading investor document:', error);
        return res.status(SERVER_ERROR).json({
            message: 'Error uploading document',
            error: error.message,
        });
    }
};

// Get all investor documents
const getInvestorDocuments = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        // Find investor
        const investor = await Investor.findOne({ userId }).populate(
            'documents'
        );
        if (!investor) {
            return res.status(NOT_FOUND).json({
                message: 'Investor profile not found',
            });
        }

        // Get all documents for this investor
        const documents = await InvestorDocumentData.find({ id: investor._id });

        // Import S3 utility
        const { getObjectSignedUrl } = await import('../utils/s3utils.js');

        // Generate fresh signed URLs for each document
        const documentsWithUrls = await Promise.all(
            documents.map(async (doc) => {
                const docObj = doc.toObject();
                if (doc.fileName) {
                    try {
                        docObj.signedUrl = await getObjectSignedUrl(
                            doc.fileName
                        );
                    } catch (error) {
                        console.error(
                            `Error generating signed URL for ${doc.fileName}:`,
                            error
                        );
                        docObj.signedUrl = null;
                    }
                }
                return docObj;
            })
        );

        return res.status(OK).json({
            message: 'Documents retrieved successfully',
            documents: documentsWithUrls,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Error retrieving documents',
            error: error.message,
        });
    }
};

// Update investor document status
const updateDocumentStatus = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { isapproved } = req.body;

        const document = await InvestorDocumentData.findById(documentId);
        if (!document) {
            return res.status(NOT_FOUND).json({
                message: 'Document not found',
            });
        }

        document.isapproved = isapproved;
        await document.save();

        return res.status(OK).json({
            message: 'Document status updated successfully',
            document,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Error updating document status',
            error: error.message,
        });
    }
};

// apply to be a investor in a startup
const applyStartup = async (req, res) => {
    try {
        const companyId = req.id;
        const { startupId } = req.params;

        if (!startupId) {
            return res.status(BAD_REQUEST).json({
                message: 'Startup Id is required.',
            });
        }
        // check if the company has already applied of that same startup
        const existingInvestment = await Investment.findOne({
            startup: startupId,
            invester: companyId,
        });
        if (existingInvestment) {
            return res.status(BAD_REQUEST).json({
                message: 'You have already applied for this startup',
            });
        }

        // check if the startups exist
        const startup = await startup.findById(startupId);
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }
        // create a new investment
        const newinvestment = await Investment.create({
            startup: startupId,
            invester: companyId,
        });
        startup.investments.push(newinvestment._id);
        await startup.save();
        return res.status(CREATED).json({
            message: 'Job applied successfully.',
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while applying for stakeholder.',
            error: error.message,
        });
    }
};

// get all invested startuops by a company
const getAppliedStartups = async (req, res) => {
    try {
        const companyId = req.id;
        const investment = await Investment.find({ invester: companyId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'startup',
                option: { sort: { createdAt: -1 } },
                populate: {
                    path: 'user',
                    option: { sort: { createdAt: -1 } },
                },
            });
        if (!investment) {
            return res.status(NOT_FOUND).json({
                message: 'No investment',
            });
        }
        return res.status(OK).json({
            investment,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting invested startups.',
            error: error.message,
        });
    }
};

// get investors of a particular startup
const getInvesters = async (req, res) => {
    try {
        const { startupId } = req.params;
        const startup = await Startup.findById(startupId).populated({
            path: 'investment',
            option: { sort: { createdAt: -1 } },
            populated: {
                path: 'invester',
            },
        });
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'Job not found.',
            });
        }
        return res.status(OK).json({
            startup,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting investors.',
            error: error.message,
        });
    }
};

// Get investor application by userId
const getInvestorApplication = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find investor application
        const investor = await Investor.findOne({ userId })
            .populate('governmentId')
            .populate('documents');

        if (!investor) {
            return res.status(NOT_FOUND).json({
                message: 'No investor application found',
            });
        }

        // Get bank info
        const bankInfo = await InvestorBankInfo.findOne({ investorId: userId });

        return res.status(OK).json({
            investor,
            bankInfo,
            status: 'Under Review', // You can add actual status logic here
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'Error fetching investor application',
            error: error.message,
        });
    }
};

export {
    registerInvestor,
    checkInvestorExists,
    applyStartup,
    getAppliedStartups,
    getInvesters,
    uploadInvestorDocuments,
    getInvestorDocuments,
    updateDocumentStatus,
    getInvestorApplication,
};
