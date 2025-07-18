import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export default function AadhaarVerificationPage() {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const navigate = useNavigate();
    // Regex for validating Aadhaar number format
    const isValidAadhaar = (number) => {
        const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
        return aadhaarRegex.test(number);
    };

    const handleVerifyAadhaar = async () => {
        if (!isValidAadhaar(aadhaarNumber)) {
            setVerificationStatus('Invalid Aadhaar number format.');
            return;
        }

        try {
            setVerificationStatus('Verifying...');

            // Simulated API call
            // const response = await fetch('/api/verify-aadhaar', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ aadhaarNumber }),
            // });

            // const data = await response.json();

            // if (data.success) {
            setVerificationStatus('Aadhaar verified successfully!');
            // } else {
            //     setVerificationStatus(
            //         'Aadhaar verification failed. Please check the details.'
            //     );
            // }
        } catch (error) {
            console.error('Error during Aadhaar verification:', error);
            setVerificationStatus(
                'An error occurred while verifying Aadhaar. Please try again later.'
            );
        }
    };

    return (
        <div className="p-6 w-full bg-gray-100 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
                Aadhaar Verification
            </h2>
            <div className="flex flex-col gap-4 items-center">
                <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    placeholder="Enter your Aadhaar number"
                    className="p-2 w-80 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleVerifyAadhaar}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Verify Aadhaar
                </button>

                {verificationStatus && (
                    <p
                        className={`mt-2 text-sm ${verificationStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {verificationStatus}
                    </p>
                )}

                <Button
                    disabled={!aadhaarNumber}
                    btnText="Proceed with License Generation"
                    onClick={() => navigate('/license-generator/generation')}
                />
            </div>
        </div>
    );
}
