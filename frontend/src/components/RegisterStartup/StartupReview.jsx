import { Button } from '..';
import { icons } from '../../assets/icons';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import {
    startupService,
    startupRegistrationApplicationService,
} from '../../services';

export default function StartupReview() {
    const {
        setCurrentStep,
        setCompletedSteps,
        setTotalData,
        totalData,
        existingApp,
        setExistingApp,
    } = useRegisterStartupContext();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { appId } = useParams();
    const { isReadOnly } = useOutletContext();
    const [loading, setLoading] = useState(false);

    // State to store displayed data
    const [displayData, setDisplayData] = useState({
        personal: {},
        financial: {},
        organization: {},
        banking: {},
        documents: {},
    });

    useEffect(() => {
        setCurrentStep(5);
        // Fetch application if in readonly mode and appId exists
        const fetchApplicationData = async () => {
            try {
                const appData =
                    await startupRegistrationApplicationService.getApplication(
                        user._id,
                        appId
                    );
                if (appData) {
                    const transformedData = {
                        personal: appData.startupData.personal,
                        financial: appData.startupData.financial,
                        organization: appData.startupData.organization,
                        banking: appData.startupData.banking,
                        documents: {},
                    };
                    setDisplayData(transformedData);
                    setCompletedSteps(
                        [
                            'personal',
                            'financial',
                            'organization',
                            'banking',
                            'documents',
                            'review',
                        ].map((step) => ({ name: step, status: 'complete' }))
                    );
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        if (appId && isReadOnly) {
            fetchApplicationData();
        } else {
            const personal = JSON.parse(
                localStorage.getItem(`${user._id}_StartupOwnerPersonalInfo`) ||
                    '{}'
            );
            const financial = JSON.parse(
                localStorage.getItem(`${user._id}_StartupOwnerFinancialInfo`) ||
                    '{}'
            );
            const organization = JSON.parse(
                localStorage.getItem(
                    `${user._id}_StartupOwnerOrganizationInfo`
                ) || '{}'
            );
            const banking = JSON.parse(
                localStorage.getItem(`${user._id}_StartupOwnerBankingInfo`) ||
                    '{}'
            );
            const documents = JSON.parse(
                localStorage.getItem(`${user._id}_StartupOwnerDocuments`) ||
                    '{}'
            );

            setDisplayData({
                personal,
                financial,
                organization,
                banking,
                documents,
            });
        }
    }, [appId, isReadOnly, user._id]);

    const renderDataSection = (title, data) => {
        // Special handling for personal information
        if (title === 'Personal Information') {
            return renderPersonalSection(data);
        }

        return (
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    {title}
                </h3>
                {Object.keys(data).length > 0 ? (
                    <ul className="list-disc list-inside bg-gray-50 p-4 rounded shadow">
                        {Object.entries(data).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {String(value)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">No data available</p>
                )}
            </div>
        );
    };

    const renderPersonalSection = (data) => {
        const formatLabel = (key) => {
            const labels = {
                fullName: 'Full Name',
                email: 'Email Address',
                phoneNumber: 'Phone Number',
                dateOfBirth: 'Date of Birth',
                address: 'Current Address',
                nationality: 'Nationality',
                linkedInURL: 'LinkedIn Profile',
                role: 'Role in Company',
                qualification: 'Educational Qualification',
                experience: 'Years of Experience',
                personalInfoStatus: 'Status',
            };
            return labels[key] || key;
        };

        const personalFields = [
            'fullName',
            'email',
            'phoneNumber',
            'dateOfBirth',
            'nationality',
            'address',
            'role',
            'qualification',
            'experience',
            'linkedInURL',
        ];

        return (
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    Founder/Co-Founder Personal Information
                </h3>
                {Object.keys(data).length > 0 ? (
                    <div className="bg-gray-50 p-4 rounded shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {personalFields.map((key) => {
                                if (data[key] && key !== 'personalInfoStatus') {
                                    return (
                                        <div key={key} className="">
                                            <span className="font-semibold text-gray-700">
                                                {formatLabel(key)}:
                                            </span>
                                            <span className="ml-2 text-gray-600">
                                                {key === 'linkedInURL' &&
                                                data[key] ? (
                                                    <a
                                                        href={data[key]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View Profile
                                                    </a>
                                                ) : (
                                                    String(data[key])
                                                )}
                                            </span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">
                        No personal data available
                    </p>
                )}
            </div>
        );
    };

    const renderDocumentImages = (documents) => (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Uploaded Documents
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                {documents && Object.keys(documents).length > 0 ? (
                    Object.entries(documents).map(([key, url]) => (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={key}
                            className="flex flex-col overflow-clip h-[80px] items-center justify-center text-center border-[0.01rem] drop-shadow-md rounded-lg p-2"
                        >
                            <div className="size-[24px]">{icons.file}</div>
                            <p className="text-[12px] w-fit mt-2 text-gray-800">
                                {key}
                            </p>
                        </a>
                    ))
                ) : (
                    <p className="text-gray-500 italic">
                        No documents uploaded
                    </p>
                )}
            </div>
        </div>
    );

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            setCompletedSteps((prev) => [...prev, 'reviewd']);
            setTotalData((prev) => ({
                ...prev,
                reviewd: { status: 'complete' },
            }));

            // Include applicationId in the data sent to register startup
            // Only include applicationId if it's not 'new' and is a valid MongoDB ObjectId
            const isValidObjectId =
                appId && appId !== 'new' && /^[0-9a-fA-F]{24}$/.test(appId);

            const dataWithAppId = {
                ...totalData,
                personal: {
                    ...totalData.personal,
                    data: {
                        ...totalData.personal?.data,
                        ...(isValidObjectId && { applicationId: appId }),
                    },
                },
            };

            console.log('Submitting data:', dataWithAppId);
            const res = await startupService.registerStartup(dataWithAppId);

            if (
                res &&
                res.message === 'startup has been registered successfully'
            ) {
                // Clear localStorage
                localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerFinancialInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
                localStorage.removeItem(
                    `${user._id}_StartupOwnerOrganizationInfo`
                );
                localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
                localStorage.removeItem(`${user._id}_UploadedDocs`);

                // Set application submitted flag
                localStorage.setItem(
                    `${user._id}_ApplicationSubmitted`,
                    'true'
                );

                // Update all statuses to complete
                localStorage.setItem(
                    `${user._id}_StartupOwnerReview`,
                    JSON.stringify({ reviewStatus: 'complete' })
                );

                // Navigate to success page with application data
                navigate('/startup-submission-success', {
                    state: {
                        applicationId:
                            res.applicationId || res.data?.applicationId,
                        startupName:
                            displayData.organization?.startupName ||
                            totalData.organization?.startupName,
                        submissionDate: new Date().toISOString(),
                        message: res.message,
                    },
                });
            } else {
                // Handle API error response
                console.error(
                    'Submission failed:',
                    res?.message || 'Unknown error'
                );
                alert(
                    `Submission failed: ${res?.message || 'Please try again later.'}`
                );
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            // Check if it's a network error or server error
            if (err.message && err.message.includes('fetch')) {
                alert(
                    'Network error. Please check your internet connection and try again.'
                );
            } else {
                // Navigate to error page for other errors
                navigate('/server-error');
            }
        } finally {
            setLoading(false); // End loading
        }
    }

    async function handleAbort() {
        localStorage.removeItem(`${user._id}_StartupOwnerPersonalInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerFinancialInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerBankingInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerOrganizationInfo`);
        localStorage.removeItem(`${user._id}_StartupOwnerDocuments`);
        localStorage.removeItem(`${user._id}_UploadedDocs`);
        alert('Startup registration process has been aborted.');
        navigate('/');
    }

    return (
        <div className="p-6 w-full bg-blue-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-green-600 mb-6 text-center">
                {isReadOnly
                    ? 'Application Details'
                    : 'Review and Submit the Form'}
            </h2>

            {/* Display Data */}
            {renderDataSection('Personal Information', displayData.personal)}
            {renderDataSection('Financial Information', displayData.financial)}
            {renderDataSection(
                'Organization Information',
                displayData.organization
            )}
            {renderDataSection('Banking Information', displayData.banking)}
            {renderDocumentImages(displayData.documents)}

            {/* Buttons - Only show when not in read-only mode */}
            {!isReadOnly && (
                <div className="w-full flex items-center justify-center gap-4 mt-10">
                    <Button
                        className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loading}
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
                        className="text-[#f9f9f9] rounded-md h-[40px] w-[90px] bg-gradient-to-r from-red-500 to-red-600 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleAbort}
                        type="button"
                        disabled={loading}
                        btnText={
                            <p className="text-[#f9f9f9] text-lg">Abort</p>
                        }
                    />
                </div>
            )}
        </div>
    );
}
