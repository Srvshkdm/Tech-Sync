import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SubmissionSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-6" />

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Application Submitted Successfully!
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Your investor registration application has been submitted
                    successfully. We will review your application and get back
                    to you within 3-5 business days.
                </p>

                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-8">
                    <p className="text-green-800 font-semibold">What's Next?</p>
                    <ul className="text-left text-green-700 mt-2 space-y-1">
                        <li>• Our team will review your application</li>
                        <li>• You'll receive an email confirmation</li>
                        <li>
                            • We'll contact you if additional information is
                            needed
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmissionSuccess;
