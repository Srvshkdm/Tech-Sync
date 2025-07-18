import { useState, useEffect } from 'react';
import { useUserContext } from '../contexts';
import { useNavigate } from 'react-router-dom';
import { icons } from '../assets/icons';
import { Button } from '../components';
import { startupRegistrationApplicationService } from '../services';
import { clearStartupApplicationData } from '../utils';

export default function StartupApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [investorApplication, setInvestorApplication] = useState(null);
    const [inProgressForm, setInProgressForm] = useState(null);
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        (async function getApps() {
            try {
                // Get startup applications
                const res =
                    await startupRegistrationApplicationService.getApplications(
                        user._id
                    );
                if (res && !res.message) {
                    setApplications(res);
                } else {
                    setMessage('No Ongoing Startups Registration Applications');
                }

                // Get investor application
                try {
                    const investorRes = await fetch(
                        `/api/v1/investments/investor-application/${user._id}`,
                        {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                        }
                    );

                    if (investorRes.ok) {
                        const investorData = await investorRes.json();
                        setInvestorApplication(investorData);
                    }
                } catch (error) {
                    console.log('No investor application found');
                }

                // Check for in-progress startup registration form in localStorage
                const checkInProgressForm = () => {
                    const personalInfo = localStorage.getItem(
                        `${user._id}_StartupOwnerPersonalInfo`
                    );
                    const organizationInfo = localStorage.getItem(
                        `${user._id}_StartupOwnerOrganizationInfo`
                    );
                    const financialInfo = localStorage.getItem(
                        `${user._id}_StartupOwnerFinancialInfo`
                    );
                    const bankingInfo = localStorage.getItem(
                        `${user._id}_StartupOwnerBankingInfo`
                    );
                    const documentsInfo = localStorage.getItem(
                        `${user._id}_StartupOwnerDocuments`
                    );

                    if (
                        personalInfo ||
                        organizationInfo ||
                        financialInfo ||
                        bankingInfo ||
                        documentsInfo
                    ) {
                        const progress = {
                            personal: personalInfo
                                ? JSON.parse(personalInfo).personalInfoStatus
                                : null,
                            organization: organizationInfo
                                ? JSON.parse(organizationInfo)
                                      .organizationInfoStatus
                                : null,
                            financial: financialInfo
                                ? JSON.parse(financialInfo).financialInfoStatus
                                : null,
                            banking: bankingInfo
                                ? JSON.parse(bankingInfo).bankingInfoStatus
                                : null,
                            documents: documentsInfo
                                ? JSON.parse(documentsInfo).documentsStatus
                                : null,
                        };

                        // Find the last completed step
                        let lastCompletedStep = 'personal';
                        if (progress.documents === 'complete')
                            lastCompletedStep = 'review';
                        else if (progress.banking === 'complete')
                            lastCompletedStep = 'documents';
                        else if (progress.financial === 'complete')
                            lastCompletedStep = 'banking';
                        else if (progress.organization === 'complete')
                            lastCompletedStep = 'financial';
                        else if (progress.personal === 'complete')
                            lastCompletedStep = 'organization';

                        setInProgressForm({
                            progress,
                            lastCompletedStep,
                            completedSteps: Object.values(progress).filter(
                                (status) => status === 'complete'
                            ).length,
                            totalSteps: 5,
                        });
                    }
                };

                checkInProgressForm();
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const appsElements = (
        <div className="mx-4 md:mx-8 lg:mx-16">
            {/* Adding margins around the table */}
            <table className="table-auto border-collapse w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-[#FF7F32] text-white">
                    <tr>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            S. No
                        </th>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            Startup ID
                        </th>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            Startup Owner
                        </th>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            Registered Date
                        </th>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            Expiration Date
                        </th>
                        <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {applications?.slice(0, 2).map((app, index) => {
                        // Calculate the registration date as 10 days before the expiration date
                        const expirationDate = new Date(app.expireAt);
                        const registrationDate = new Date(expirationDate);
                        registrationDate.setDate(expirationDate.getDate() - 10);

                        return (
                            <tr
                                key={app._id}
                                onClick={() =>
                                    navigate(`/application/${app._id}`, {
                                        state: { isReadOnly: true },
                                    })
                                }
                                className="cursor-pointer hover:bg-[#FF7F32] hover:text-white transition-all duration-300"
                            >
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {index + 1}
                                </td>
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {app._id}
                                </td>
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {app.owner || 'N/A'}
                                </td>
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {registrationDate
                                        ? registrationDate.toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {app.expireAt
                                        ? new Date(
                                              app.expireAt
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                                    {app.status || 'Pending'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return loading ? (
        <div className="w-full flex size-[20px] text-[#f9f9f9] justify-center items-center fill-[#f68533]">
            {icons.loading}
        </div>
    ) : (
        <div>
            <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
                <Button
                    className="text-[#f9f9f9] rounded-md h-auto px-6 py-3 bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700 
                        flex items-center justify-center gap-2 min-w-[120px] max-w-[90vw] transition-all duration-300 m-4"
                    onClick={() => navigate(`/application/new/personal`)}
                    type="submit"
                    btnText={
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-[#f9f9f9] text-center">
                                Register new Startup
                            </p>
                            <div className="size-[14px] fill-[#f9f9f9]">
                                {icons.next}
                            </div>
                        </div>
                    }
                />
            </div>

            {/* In-Progress Startup Registration Form */}
            {inProgressForm && (
                <div className="mx-4 md:mx-8 lg:mx-16 mb-8">
                    <h2 className="text-2xl font-bold text-[#FF7F32] mb-4">
                        In-Progress Startup Registration
                    </h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="mb-4">
                            <p className="text-gray-700 mb-2">
                                You have an incomplete startup registration
                                form. Progress: {inProgressForm.completedSteps}/
                                {inProgressForm.totalSteps} steps completed
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                                <div
                                    className="bg-gradient-to-r from-[#f68533] to-[#ff8025] h-4 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${(inProgressForm.completedSteps / inProgressForm.totalSteps) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                                <div
                                    className={`text-center p-2 rounded ${inProgressForm.progress.personal === 'complete' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    <p className="text-sm font-medium">
                                        Personal Info
                                    </p>
                                    <p className="text-xs">
                                        {inProgressForm.progress.personal ===
                                        'complete'
                                            ? '✓ Complete'
                                            : 'Pending'}
                                    </p>
                                </div>
                                <div
                                    className={`text-center p-2 rounded ${inProgressForm.progress.organization === 'complete' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    <p className="text-sm font-medium">
                                        Organization
                                    </p>
                                    <p className="text-xs">
                                        {inProgressForm.progress
                                            .organization === 'complete'
                                            ? '✓ Complete'
                                            : 'Pending'}
                                    </p>
                                </div>
                                <div
                                    className={`text-center p-2 rounded ${inProgressForm.progress.financial === 'complete' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    <p className="text-sm font-medium">
                                        Financial
                                    </p>
                                    <p className="text-xs">
                                        {inProgressForm.progress.financial ===
                                        'complete'
                                            ? '✓ Complete'
                                            : 'Pending'}
                                    </p>
                                </div>
                                <div
                                    className={`text-center p-2 rounded ${inProgressForm.progress.banking === 'complete' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    <p className="text-sm font-medium">
                                        Banking
                                    </p>
                                    <p className="text-xs">
                                        {inProgressForm.progress.banking ===
                                        'complete'
                                            ? '✓ Complete'
                                            : 'Pending'}
                                    </p>
                                </div>
                                <div
                                    className={`text-center p-2 rounded ${inProgressForm.progress.documents === 'complete' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    <p className="text-sm font-medium">
                                        Documents
                                    </p>
                                    <p className="text-xs">
                                        {inProgressForm.progress.documents ===
                                        'complete'
                                            ? '✓ Complete'
                                            : 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/application/new/${inProgressForm.lastCompletedStep}`
                                    )
                                }
                                className="px-4 py-2 bg-[#FF7F32] text-white rounded-lg hover:bg-[#ff8025] transition-all"
                            >
                                Continue Registration
                            </button>
                            <button
                                onClick={() => {
                                    if (
                                        confirm(
                                            'Are you sure you want to clear this form? All progress will be lost.'
                                        )
                                    ) {
                                        clearStartupApplicationData(user._id);
                                        setInProgressForm(null);
                                        // Reload the page to refresh the state
                                        window.location.reload();
                                    }
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            >
                                Clear Form
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Investor Application Section */}
            {investorApplication && (
                <div className="mx-4 md:mx-8 lg:mx-16 mb-8">
                    <h2 className="text-2xl font-bold text-[#FF7F32] mb-4">
                        Investor Application
                    </h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">
                                    <strong>Application ID:</strong>{' '}
                                    {investorApplication.investor._id}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Investor Type:</strong>{' '}
                                    {investorApplication.investor.investorType}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Organization:</strong>{' '}
                                    {investorApplication.investor
                                        .organisationName || 'N/A'}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Nationality:</strong>{' '}
                                    {investorApplication.investor.nationality}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <strong>Revenue:</strong>{' '}
                                    {investorApplication.investor.revenue}{' '}
                                    crores
                                </p>
                                <p className="text-gray-600">
                                    <strong>Net Worth:</strong>{' '}
                                    {investorApplication.investor.netWorth}{' '}
                                    crores
                                </p>
                                <p className="text-gray-600">
                                    <strong>Status:</strong>{' '}
                                    <span className="text-blue-600 font-semibold">
                                        {investorApplication.status}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    <strong>Submitted Date:</strong>{' '}
                                    {new Date(
                                        investorApplication.investor.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/become-investor/${investorApplication.investor._id}/review`
                                    )
                                }
                                className="px-4 py-2 bg-[#FF7F32] text-white rounded-lg hover:bg-[#ff8025] transition-all"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Startup Applications Section */}
            <div className="mx-4 md:mx-8 lg:mx-16">
                <h2 className="text-2xl font-bold text-[#FF7F32] mb-4">
                    Startup Applications
                </h2>
                {applications.length > 0 ? (
                    <div>{appsElements}</div>
                ) : (
                    <div className="w-full text-black">
                        No ongoing startup applications
                    </div>
                )}
            </div>
        </div>
    );
}
