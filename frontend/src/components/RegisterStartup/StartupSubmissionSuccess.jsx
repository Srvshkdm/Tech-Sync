import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function StartupSubmissionSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Startup Registration Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Congratulations! Your startup has been successfully
                    registered. We have received all your information and
                    documents.
                </p>

                <p className="text-gray-600 mb-8">
                    Our team will review your application and verify the
                    submitted documents within 3-5 business days. You will
                    receive an email notification once your startup is approved.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Go to Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Return to Home
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    Application ID: {new Date().getTime()}
                </p>
            </div>
        </div>
    );
}
