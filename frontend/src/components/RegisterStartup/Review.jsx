import { Button } from '..';
import { icons } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { startupRegistrationApplicationService } from '../../services';

export default function Review() {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applicationData, setApplicationData] = useState(null);
    const [uploadedDocs, setUploadedDocs] = useState({});
    const {
        currentStep,
        setCurrentStep,
        setTotalData,
        setCompletedSteps,
        totalData,
    } = useRegisterStartupContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentStep(5);

        // Load saved data from localStorage
        if (user && user._id) {
            // Personal Information
            const personalData = localStorage.getItem(
                `${user._id}_StartupOwnerPersonalInfo`
            );
            // Organization Information
            const organizationData = localStorage.getItem(
                `${user._id}_StartupOwnerOrganizationInfo`
            );
            // Financial Information
            const financialData = localStorage.getItem(
                `${user._id}_StartupOwnerFinancialInfo`
            );
            // Banking Information
            const bankingData = localStorage.getItem(
                `${user._id}_StartupOwnerBankingInfo`
            );
            // Documents
            const documentsData = localStorage.getItem(
                `${user._id}_StartupOwnerDocuments`
            );
            const uploadedDocsData = localStorage.getItem(
                `${user._id}_UploadedDocs`
            );

            const allData = {
                personal: personalData ? JSON.parse(personalData) : null,
                organization: organizationData
                    ? JSON.parse(organizationData)
                    : null,
                financial: financialData ? JSON.parse(financialData) : null,
                banking: bankingData ? JSON.parse(bankingData) : null,
                documents: documentsData ? JSON.parse(documentsData) : null,
            };

            setApplicationData(allData);

            if (uploadedDocsData) {
                setUploadedDocs(JSON.parse(uploadedDocsData));
            }
        }
    }, []);

    const handleViewDocument = (docName) => {
        const url = uploadedDocs[docName]?.signedUrl;
        if (url) {
            window.open(url, '_blank'); // Open the document URL in a new tab
        } else {
            alert('Document not found.');
        }
    };

    async function handleFinalSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);

            if (!applicationData) {
                alert('No application data found. Please complete all steps.');
                return;
            }

            // Prepare the data for submission
            const submissionData = {
                owner: user._id,
                personalInfo: applicationData.personal,
                organizationInfo: applicationData.organization,
                financialInfo: applicationData.financial,
                bankingInfo: applicationData.banking,
                documents: uploadedDocs,
                status: 'Under Review',
            };

            // Submit to backend using the service
            const result =
                await startupRegistrationApplicationService.submitApplication(
                    submissionData
                );

            // Mark as submitted in localStorage
            localStorage.setItem(`${user._id}_ApplicationSubmitted`, 'true');

            // Clear individual form data from localStorage after successful submission
            if (user && user._id) {
                localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerOrganizationInfo`
                );
                localStorage.removeItem(
                    `${user._id}_StartupOwnerFinancialInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
                localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
                localStorage.removeItem(`${user._id}_UploadedDocs`);
            }

            setCompletedSteps((prev) => [...prev, 'reviewed']);

            // Navigate to success page
            navigate('/startup-registration-success');
        } catch (err) {
            console.error('Error submitting application:', err);
            alert('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        // TODO: Implement delete functionality
        if (
            window.confirm('Are you sure you want to cancel this application?')
        ) {
            // Clear all localStorage data
            if (user && user._id) {
                localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerOrganizationInfo`
                );
                localStorage.removeItem(
                    `${user._id}_StartupOwnerFinancialInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
                localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
                localStorage.removeItem(`${user._id}_UploadedDocs`);
            }
            navigate('/');
        }
    }

    const documentTypes = [
        { key: 'GSTCertificate', label: 'GST Certificate' },
        { key: 'balanceSheet', label: 'Balance Sheet' },
        { key: 'businessDocuments', label: 'Business Documents' },
        { key: 'governmentIdProof', label: 'Government ID Proof' },
        { key: 'startupLogo', label: 'Startup Logo' },
    ];

    return (
        <div className="p-6 w-full bg-blue-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-green-600 mb-6 text-center">
                Review and Submit the Form
            </h2>

            {/* Application Data Summary */}
            <div className="mb-6">
                {applicationData && (
                    <div className="space-y-4">
                        {/* Personal Information */}
                        {applicationData.personal && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-2">
                                    Personal Information
                                </h3>
                                <p>
                                    <strong>Name:</strong>{' '}
                                    {applicationData.personal.firstName}{' '}
                                    {applicationData.personal.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {applicationData.personal.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{' '}
                                    {applicationData.personal.phoneNumber}
                                </p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {applicationData.personal
                                        .personalInfoStatus || 'pending'}
                                </p>
                            </div>
                        )}

                        {/* Organization Information */}
                        {applicationData.organization && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-2">
                                    Organization Information
                                </h3>
                                <p>
                                    <strong>Organization Name:</strong>{' '}
                                    {
                                        applicationData.organization
                                            .organizationName
                                    }
                                </p>
                                <p>
                                    <strong>Type:</strong>{' '}
                                    {
                                        applicationData.organization
                                            .organizationType
                                    }
                                </p>
                                <p>
                                    <strong>Address:</strong>{' '}
                                    {applicationData.organization.address}
                                </p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {applicationData.organization
                                        .organizationInfoStatus || 'pending'}
                                </p>
                            </div>
                        )}

                        {/* Financial Information */}
                        {applicationData.financial && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-2">
                                    Financial Information
                                </h3>
                                <p>
                                    <strong>Startup Name:</strong>{' '}
                                    {applicationData.financial.startupName}
                                </p>
                                <p>
                                    <strong>Revenue:</strong> ₹
                                    {applicationData.financial.revenue} Cr
                                </p>
                                <p>
                                    <strong>Valuation:</strong> ₹
                                    {applicationData.financial.valuation} Cr
                                </p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {applicationData.financial
                                        .financialInfoStatus || 'pending'}
                                </p>
                            </div>
                        )}

                        {/* Banking Information */}
                        {applicationData.banking && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-bold text-lg mb-2">
                                    Banking Information
                                </h3>
                                <p>
                                    <strong>Account Number:</strong>{' '}
                                    {applicationData.banking.accountNumber}
                                </p>
                                <p>
                                    <strong>Bank Name:</strong>{' '}
                                    {applicationData.banking.bankName}
                                </p>
                                <p>
                                    <strong>IFSC Code:</strong>{' '}
                                    {applicationData.banking.ifscCode}
                                </p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {applicationData.banking
                                        .bankingInfoStatus || 'pending'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Uploaded Documents Section */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-center">
                    Uploaded Documents
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {documentTypes.map((doc) => {
                        const hasDocument = uploadedDocs[doc.key]?.signedUrl;
                        return (
                            <div
                                key={doc.key}
                                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                                    hasDocument
                                        ? 'bg-white hover:bg-gray-100 shadow hover:shadow-lg'
                                        : 'bg-gray-200 cursor-not-allowed'
                                }`}
                                onClick={() =>
                                    hasDocument && handleViewDocument(doc.key)
                                }
                            >
                                <div
                                    className={`text-4xl mb-2 ${hasDocument ? 'text-blue-600' : 'text-gray-400'}`}
                                >
                                    📄
                                </div>
                                <p className="text-xs text-center">
                                    {doc.label}
                                </p>
                                {hasDocument && (
                                    <p className="text-xs text-green-600 mt-1">
                                        ✓ Uploaded
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                {applicationData?.documents?.documentsStatus && (
                    <p className="text-center mt-4 text-green-600 font-medium">
                        Documents Status:{' '}
                        {applicationData.documents.documentsStatus}
                    </p>
                )}
            </div>
            {/* submit btn */}
            <div className="w-full flex items-center justify-center gap-4 mt-4">
                <Button
                    className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-500 hover:to-orange-600"
                    disabled={disabled}
                    onClick={handleFinalSubmit}
                    type="submit"
                    btnText={
                        loading ? (
                            <div className="fill-[#f9f9f9] text-blue-400 size-[20px]">
                                {icons.loading}
                            </div>
                        ) : (
                            <p className="text-[#f9f9f9] text-lg">Submit</p>
                        )
                    }
                />
                <Button
                    className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-red-500 to-red-600 hover:from-orange-500 hover:to-orange-600"
                    disabled={disabled}
                    onClick={handleDelete}
                    type="submit"
                    btnText={
                        loading ? (
                            <div className="fill-[#f9f9f9] text-blue-400 size-[20px]">
                                {icons.loading}
                            </div>
                        ) : (
                            <p className="text-[#f9f9f9] text-lg">Cancel</p>
                        )
                    }
                />
            </div>
        </div>
    );
}
