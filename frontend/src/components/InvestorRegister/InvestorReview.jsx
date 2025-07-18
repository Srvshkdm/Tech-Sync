import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { investorRegistrationService, investorService } from '../../services';

export default function InvestorReview() {
    const navigate = useNavigate();
    const location = useLocation();
    const { investorId } = useParams(); // This is actually userId during registration

    // Check if we're in registration mode by looking at the route and localStorage
    const isRegistrationRoute =
        location.pathname.includes('/become-investor/') &&
        location.pathname.includes('/personal');
    const hasLocalStorageData =
        localStorage.getItem('InvestorPersonalInfo') !== null;
    const isRegistrationMode =
        isRegistrationRoute ||
        (hasLocalStorageData && !location.pathname.includes('/review'));

    // Treat as viewing existing if we have investorId AND the path includes /review but not during registration
    const isViewingExisting =
        !!investorId &&
        location.pathname.includes('/review') &&
        !hasLocalStorageData;

    // State to hold fetched data
    const [investorData, setInvestorData] = useState({
        personalInformation: {},
        financialInformation: {},
        bankingInformation: {},
        documents: {},
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFromLocalStorage = () => {
            const personalInformation =
                JSON.parse(localStorage.getItem('InvestorPersonalInfo')) || {};
            const financialInformation =
                JSON.parse(localStorage.getItem('InvestorFinancialInfo')) || {};
            const bankingInformation =
                JSON.parse(localStorage.getItem('InvestorBankingInfo')) || {};
            const documents =
                JSON.parse(localStorage.getItem('InvestorDocuments')) || {};

            setInvestorData({
                personalInformation,
                financialInformation,
                bankingInformation,
                documents,
            });
        };

        const loadInvestorData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (isViewingExisting && investorId) {
                    // Only fetch from backend if viewing existing investor
                    try {
                        console.log(
                            'Fetching investor details for ID:',
                            investorId
                        );
                        const response =
                            await investorService.getInvestorDetails(
                                investorId
                            );

                        console.log('Response from backend:', response);

                        // Check if response has investor data
                        const investor = response.investor || response;

                        // Map the investor data to the expected structure
                        setInvestorData({
                            personalInformation: {
                                fullName:
                                    investor.fullName || investor.name || '',
                                investorType: investor.investorType || '',
                                organizationName:
                                    investor.organisationName ||
                                    investor.organizationName ||
                                    '',
                                phoneNumber:
                                    investor.phoneNumber ||
                                    investor.mobile ||
                                    '',
                                email: investor.email || '',
                                address: investor.address || '',
                                dateOfBirth:
                                    investor.dateOfBirth || investor.dob || '',
                                nationality: investor.nationality || '',
                                linkedIn:
                                    investor.linkedIn ||
                                    investor.linkedin ||
                                    '',
                            },
                            financialInformation: {
                                revenue:
                                    investor.revenue ||
                                    investor.financialInfo?.revenue ||
                                    '',
                                netWorth:
                                    investor.netWorth ||
                                    investor.financialInfo?.netWorth ||
                                    '',
                                businessLicenseNumber:
                                    investor.businessLicenseNumber || '',
                                taxPayerIdentification:
                                    investor.taxPayerIdentification ||
                                    investor.taxId ||
                                    '',
                                idType:
                                    investor.idType ||
                                    investor.governmentIdType ||
                                    '',
                                idValue:
                                    investor.idValue ||
                                    investor.governmentIdNumber ||
                                    '',
                            },
                            bankingInformation: {
                                bankName:
                                    investor.bankName ||
                                    investor.bankInfo?.bankName ||
                                    '',
                                accountNumber:
                                    investor.accountNumber ||
                                    investor.bankInfo?.accountNumber ||
                                    '',
                                accountType:
                                    investor.accountType ||
                                    investor.bankInfo?.accountType ||
                                    '',
                                ifscCode:
                                    investor.ifscCode ||
                                    investor.bankInfo?.ifscCode ||
                                    investor.bankInfo?.IFSC ||
                                    '',
                                branchName:
                                    investor.branchName ||
                                    investor.bankInfo?.branchName ||
                                    '',
                                swiftCode:
                                    investor.swiftCode ||
                                    investor.bankInfo?.swiftCode ||
                                    '',
                            },
                            documents: investor.documents || {},
                        });
                    } catch (err) {
                        // If error and in registration mode, fallback to localStorage
                        if (isRegistrationMode) {
                            loadFromLocalStorage();
                        } else {
                            throw err;
                        }
                    }
                } else {
                    // Load from localStorage for new applications
                    loadFromLocalStorage();
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadInvestorData();
    }, [investorId, isViewingExisting, isRegistrationMode]);

    const {
        personalInformation,
        financialInformation,
        bankingInformation,
        documents,
    } = investorData;

    // Check if all required documents are uploaded
    const hasAllDocuments =
        documents.organizationImage &&
        documents.taxId &&
        documents.governmentIdProof &&
        documents.bankStatements &&
        documents.businessDocuments;

    // Helper function to check if a document exists
    const isDocumentUploaded = (doc) => {
        return (
            doc &&
            (typeof doc === 'string' ||
                doc.FileName ||
                doc.signedUrl ||
                doc.s3Name)
        );
    };

    // Helper function to get document filename
    const getDocumentFileName = (doc) => {
        if (!doc) return null;
        if (typeof doc === 'string') return null; // It's a URL
        return doc.FileName || doc.s3Name || null;
    };

    // Check if all required information is present
    const hasAllRequiredInfo =
        personalInformation.fullName &&
        financialInformation.revenue &&
        bankingInformation.bankName &&
        hasAllDocuments;

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading investor details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error loading investor details: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Review & Submit
            </h2>

            {/* Personal Information Section */}
            <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Personal Information
                </h3>
                <p className="text-gray-600">
                    <strong>Full Name:</strong>{' '}
                    {personalInformation.fullName || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Investor Type:</strong>{' '}
                    {personalInformation.investorType || 'N/A'}
                </p>
                {personalInformation.organizationName && (
                    <p className="text-gray-600">
                        <strong>Organization Name:</strong>{' '}
                        {personalInformation.organizationName}
                    </p>
                )}
                <p className="text-gray-600">
                    <strong>Phone Number:</strong>{' '}
                    {personalInformation.phoneNumber || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Email:</strong> {personalInformation.email || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Address:</strong>{' '}
                    {personalInformation.address || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Date of Birth:</strong>{' '}
                    {personalInformation.dateOfBirth || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Nationality:</strong>{' '}
                    {personalInformation.nationality || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>LinkedIn:</strong>{' '}
                    <a
                        href={personalInformation.linkedIn || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {personalInformation.linkedIn || 'N/A'}
                    </a>
                </p>
            </div>

            {/* Banking Information Section */}
            <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Banking Information
                </h3>
                <p className="text-gray-600">
                    <strong>Bank Name:</strong>{' '}
                    {bankingInformation.bankName || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Account Number:</strong>{' '}
                    {bankingInformation.accountNumber || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Account Type:</strong>{' '}
                    {bankingInformation.accountType || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>IFSC Code:</strong>{' '}
                    {bankingInformation.ifscCode || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Branch Name:</strong>{' '}
                    {bankingInformation.branchName || 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>SWIFT Code:</strong>{' '}
                    {bankingInformation.swiftCode || 'N/A'}
                </p>
            </div>

            {/* Financial Information Section */}
            <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Financial Information
                </h3>
                <p className="text-gray-600">
                    <strong>Revenue:</strong>{' '}
                    {financialInformation.revenue
                        ? `${financialInformation.revenue} crores`
                        : 'N/A'}
                </p>
                <p className="text-gray-600">
                    <strong>Net Worth:</strong>{' '}
                    {financialInformation.netWorth
                        ? `${financialInformation.netWorth} crores`
                        : 'N/A'}
                </p>
                {financialInformation.businessLicenseNumber && (
                    <p className="text-gray-600">
                        <strong>Business License Number:</strong>{' '}
                        {financialInformation.businessLicenseNumber}
                    </p>
                )}
                <p className="text-gray-600">
                    <strong>Taxpayer Identification:</strong>{' '}
                    {financialInformation.taxPayerIdentification || 'N/A'}
                </p>
                {financialInformation.idType && (
                    <p className="text-gray-600">
                        <strong>Government ID Type:</strong>{' '}
                        {financialInformation.idType === 'drivingLicense'
                            ? 'Driving License'
                            : financialInformation.idType === 'aadhaarCard'
                              ? 'Aadhaar Card'
                              : financialInformation.idType === 'passport'
                                ? 'Passport'
                                : financialInformation.idType === 'voterId'
                                  ? 'Voter ID'
                                  : financialInformation.idType}
                    </p>
                )}
                {financialInformation.idValue && (
                    <p className="text-gray-600">
                        <strong>ID Number:</strong>{' '}
                        {financialInformation.idValue}
                    </p>
                )}
            </div>

            {/* Documents Section */}
            <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Uploaded Documents
                </h3>
                {Object.entries(documents).map(([docType, doc]) => (
                    <div key={docType} className="mb-2">
                        <p className="text-gray-600">
                            <strong>
                                {docType.replace(/([A-Z])/g, ' $1')}:{' '}
                            </strong>
                            {doc.fileUrl ? (
                                <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Document
                                </a>
                            ) : (
                                <span className="text-red-600">
                                    Not Uploaded
                                </span>
                            )}
                        </p>
                        {doc.fileName && (
                            <p className="text-sm text-gray-500 ml-4">
                                File: {doc.fileName}
                            </p>
                        )}
                    </div>
                ))}
                {Object.keys(documents).length === 0 && (
                    <p className="text-gray-500 italic">
                        No documents uploaded yet
                    </p>
                )}
            </div>

            {/* Submit Button */}
            {!isViewingExisting && (
                <div className="flex flex-col items-center mt-8">
                    {!hasAllRequiredInfo && (
                        <p className="text-red-600 mb-4 text-center">
                            Please complete all sections before submitting.
                            {!hasAllDocuments && ' Missing required documents.'}
                        </p>
                    )}
                    <button
                        type="button"
                        disabled={!hasAllRequiredInfo || isSubmitting}
                        className={`px-8 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                            !hasAllRequiredInfo || isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500'
                        }`}
                        onClick={async () => {
                            if (!hasAllRequiredInfo) {
                                alert(
                                    'Please complete all required sections before submitting.'
                                );
                                return;
                            }

                            setIsSubmitting(true);
                            try {
                                await investorRegistrationService.submitInvestorApplication(
                                    investorData
                                );
                                localStorage.removeItem('InvestorPersonalInfo');
                                localStorage.removeItem(
                                    'InvestorFinancialInfo'
                                );
                                localStorage.removeItem('InvestorBankingInfo');
                                localStorage.removeItem('InvestorDocuments');
                                navigate('/submission-success');
                            } catch (error) {
                                console.error('Submission failed:', error);
                                alert(
                                    'Failed to submit application. Please try again.'
                                );
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            )}

            {/* Back Button for viewing mode */}
            {isViewingExisting && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                    >
                        Back to Applications
                    </button>
                </div>
            )}
        </div>
    );
}
