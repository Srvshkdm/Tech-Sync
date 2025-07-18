import { useEffect, useState } from 'react';
import {
    NavLink,
    Outlet,
    useLocation,
    useParams,
    useNavigate,
} from 'react-router-dom';
import { useRegisterStartupContext, useUserContext } from '../contexts';
import { icons } from '../assets/icons';
import { startupRegistrationApplicationService } from '../services/startupRegisterationApplication.Service';
export default function TrackApplication() {
    const location = useLocation();
    const pathname = location.pathname;
    const currentURL = pathname.split('/').pop();
    const { appId } = useParams();

    const { currentStep, setCurrentStep, totalData, setTotalData } =
        useRegisterStartupContext();

    const { user } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [isApplicationComplete, setIsApplicationComplete] = useState(false);
    const navigate = useNavigate();

    // Check if navigated with read-only state
    const isReadOnlyFromNav = location.state?.isReadOnly || false;

    const steps = [
        {
            name: 'Personal Information',
            path: 'personal',
            onClick: () => setCurrentStep(0),
            status: totalData.personal?.status,
        },
        {
            name: 'Organization Information',
            path: 'organization',
            onClick: () => setCurrentStep(1),
            status: totalData.organization?.status,
        },
        {
            name: 'Financial Information',
            path: 'financial',
            onClick: () => setCurrentStep(2),
            status: totalData.financial?.status,
        },
        {
            name: 'Banking Information',
            path: 'banking',
            onClick: () => setCurrentStep(3),
            status: totalData.banking?.status,
        },
        {
            name: 'Upload Documents',
            path: 'documents',
            onClick: () => setCurrentStep(4),
            status: totalData.documents?.status,
        },
        {
            name: 'Review & Submit',
            path: 'review',
            onClick: () => setCurrentStep(5),
            status: totalData.reviewd?.status,
        },
    ];

    useEffect(() => {
        const step = steps.find((step) => step.path === currentURL);
        step?.onClick();
    }, [currentURL]);

    useEffect(() => {
        (async function getData() {
            try {
                // Check if this is an existing application (not "new")
                if (appId !== 'new' && appId) {
                    // Fetch data from server for existing application
                    const applicationData =
                        await startupRegistrationApplicationService.getApplication(
                            user._id,
                            appId
                        );

                    console.log('Fetched application data:', applicationData);

                    // Transform the fetched data into the expected format
                    if (applicationData) {
                        const { owner, startup } = applicationData;

                        // Extract personal info from owner and user data
                        const personalData = {
                            fullName: owner?.fullName || '',
                            gender: owner?.gender || '',
                            category: owner?.category || '',
                            email: owner?.email || '',
                            mobile: owner?.phoneNumber || '',
                            aadhaar: owner?.aadhaar || '',
                            pan: owner?.pan || '',
                            address: owner?.address || '',
                            city: owner?.city || '',
                            district: owner?.district || '',
                            state: owner?.state || '',
                            pincode: owner?.pincode || '',
                        };

                        // Extract organization info from startup
                        const organizationData = {
                            organizationName: startup?.startupName || '',
                            officeAddress: startup?.address || '',
                            state: startup?.state || '',
                            pincode: startup?.pincode || '',
                            dateOfIncorporation:
                                startup?.dateOfIncorporation || '',
                            businessEntity: startup?.businessEntity || '',
                            rocRegistrationNumber:
                                startup?.rocRegistrationNumber || '',
                            gstin: startup?.gstin || '',
                            natureOfBusiness: startup?.businessType || '',
                            majorProductsOrServices:
                                startup?.majorProductsOrServices || '',
                            totalEmployees: startup?.totalEmployees || '',
                            businessPlan: startup?.businessPlan || '',
                        };

                        // Extract financial info
                        const financialData = {
                            currentFinancialYear:
                                startup?.financialInfo?.financialYear || '',
                            turnoverYear1:
                                startup?.financialInfo?.turnoverYear1 || '',
                            turnoverYear2:
                                startup?.financialInfo?.turnoverYear2 || '',
                            turnoverYear3:
                                startup?.financialInfo?.turnoverYear3 || '',
                            netProfitYear1:
                                startup?.financialInfo?.netProfitYear1 || '',
                            netProfitYear2:
                                startup?.financialInfo?.netProfitYear2 || '',
                            netProfitYear3:
                                startup?.financialInfo?.netProfitYear3 || '',
                            fundingReceived:
                                startup?.financialInfo?.fundingReceived || '',
                            fundingSource:
                                startup?.financialInfo?.fundingSource || '',
                            fundingAmount:
                                startup?.financialInfo?.fundingAmount || '',
                            totalValuation:
                                startup?.financialInfo?.valuation || '',
                        };

                        // Extract banking info
                        const bankingData = {
                            bankName: startup?.bankInfo?.bankName || '',
                            accountHolderName:
                                startup?.bankInfo?.accountHolderName || '',
                            accountNumber:
                                startup?.bankInfo?.accountNumber || '',
                            ifscCode: startup?.bankInfo?.IFSC || '',
                            accountType: startup?.bankInfo?.accountType || '',
                            branchName: startup?.bankInfo?.branchName || '',
                            branchAddress:
                                startup?.bankInfo?.branchAddress || '',
                        };

                        const data = {
                            personal: {
                                data: personalData,
                                status: 'complete',
                            },
                            organization: {
                                data: organizationData,
                                status: 'complete',
                            },
                            financial: {
                                data: financialData,
                                status: 'complete',
                            },
                            banking: {
                                data: bankingData,
                                status: 'complete',
                            },
                            documents: {
                                data: applicationData.documents || {},
                                status: 'complete',
                            },
                            reviewd: {
                                status: 'complete',
                            },
                        };

                        setTotalData(data);
                        setIsApplicationComplete(true);
                    }
                } else {
                    // Load from localStorage for new applications
                    const { personalInfoStatus, ...personalInfo } =
                        await JSON.parse(
                            localStorage.getItem(
                                `${user._id}_StartupOwnerPersonalInfo`
                            ) || '{}'
                        );

                    const { organizationInfoStatus, ...organizationInfo } =
                        await JSON.parse(
                            localStorage.getItem(
                                `${user._id}_StartupOwnerOrganizationInfo`
                            ) || '{}'
                        );

                    const { financialInfoStatus, ...financialInfo } =
                        await JSON.parse(
                            localStorage.getItem(
                                `${user._id}_StartupOwnerFinancialInfo`
                            ) || '{}'
                        );
                    const { bankingInfoStatus, ...bankingInfo } =
                        await JSON.parse(
                            localStorage.getItem(
                                `${user._id}_StartupOwnerBankingInfo`
                            ) || '{}'
                        );
                    const { documentsStatus, ...StartupOwnerdocuments } =
                        await JSON.parse(
                            localStorage.getItem(
                                `${user._id}_StartupOwnerDocuments`
                            ) || '{}'
                        );
                    const { reviewStatus } = await JSON.parse(
                        localStorage.getItem(
                            `${user._id}_StartupOwnerReview`
                        ) || '{}'
                    );

                    // Check if application was submitted
                    const isSubmitted = await JSON.parse(
                        localStorage.getItem(
                            `${user._id}_ApplicationSubmitted`
                        ) || 'false'
                    );

                    const data = {
                        personal: {
                            data: personalInfo || null,
                            status: isSubmitted
                                ? 'complete'
                                : personalInfoStatus || 'pending',
                        },
                        organization: {
                            data: organizationInfo || null,
                            status: isSubmitted
                                ? 'complete'
                                : organizationInfoStatus || 'pending',
                        },
                        financial: {
                            data: financialInfo || null,
                            status: isSubmitted
                                ? 'complete'
                                : financialInfoStatus || 'pending',
                        },
                        banking: {
                            data: bankingInfo || null,
                            status: isSubmitted
                                ? 'complete'
                                : bankingInfoStatus || 'pending',
                        },
                        documents: {
                            data: StartupOwnerdocuments || null,
                            status: isSubmitted
                                ? 'complete'
                                : documentsStatus || 'pending',
                        },
                        reviewd: {
                            status: isSubmitted
                                ? 'complete'
                                : reviewStatus || 'pending',
                        },
                    };

                    setTotalData(data);
                    // Set as complete if navigated from applications list or if submitted
                    setIsApplicationComplete(isReadOnlyFromNav || isSubmitted);
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, [appId]);

    const stepElements = steps.map((step, index) => (
        <NavLink
            className={`cursor-pointer flex flex-col items-center justify-center gap-2 ${
                isApplicationComplete ? 'pointer-events-none opacity-90' : ''
            }`}
            key={step.name}
            to={step.path}
            onClick={
                isApplicationComplete ? (e) => e.preventDefault() : step.onClick
            }
        >
            {/* Circle with checkmark for completed steps */}
            <div
                className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep === index && !isApplicationComplete
                        ? 'bg-[#f68533] text-white shadow-lg scale-110'
                        : step.status === 'complete'
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-[#f9f9f9] text-[#040606] shadow-md'
                }`}
            >
                {step.status === 'complete' ? (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    index + 1
                )}
            </div>

            {/* Step Name */}
            <div
                className={`text-sm md:text-[15px] text-wrap max-w-[100px] font-medium text-center ${
                    currentStep === index && !isApplicationComplete
                        ? 'text-[#f68533] font-semibold'
                        : step.status === 'complete'
                          ? 'text-green-600 font-semibold'
                          : 'text-[#040606]'
                }`}
            >
                {step.name}
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
                <div
                    className={`absolute top-4 left-full w-full h-[3px] transition-all ${
                        step.status === 'complete'
                            ? 'bg-green-400'
                            : currentStep > index
                              ? 'bg-[#f68533]'
                              : 'bg-gray-300'
                    }`}
                    style={{ width: '100px' }}
                />
            )}
        </NavLink>
    ));

    return loading ? (
        <div className="w-full fill-[#f68533] text-white size-[30px]">
            {icons.loading}
        </div>
    ) : (
        <div className="w-screen min-h-[calc(100vh-110px)] bg-[#fff7f2] flex flex-col items-center">
            {/* Success Banner for Completed Applications */}
            {isApplicationComplete && (
                <div className="w-full bg-green-100 border-b border-green-300 p-4">
                    <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-green-800 font-semibold text-lg">
                            Application Successfully Submitted - All steps are
                            complete!
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-[#ffd7bb] overflow-x-auto drop-shadow-md py-6 px-2 md:px-4 lg:px-10 w-full transition-all ease-in">
                <div className="flex items-center justify-between gap-4 min-w-[800px] max-w-6xl mx-auto relative">
                    {stepElements}
                </div>
            </div>

            <div className="w-full p-4 flex items-center justify-center">
                <div className="bg-white max-w-xl w-full drop-shadow-md rounded-md flex flex-col items-center justify-center p-4 flex-1">
                    {isApplicationComplete && (
                        <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-700 text-sm text-center font-medium">
                                Your application has been submitted. This is a
                                read-only view of your submitted information.
                            </p>
                        </div>
                    )}
                    <Outlet context={{ isReadOnly: isApplicationComplete }} />
                </div>
            </div>
        </div>
    );
}
