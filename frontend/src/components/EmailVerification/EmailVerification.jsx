import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import { icons } from '../../assets/icons';
import { Button } from '..';

export default function EmailVerification() {
    const { userId, uniqueString } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async function verifyEmail() {
            try {
                const res = await userService.verifyEmail(userId, uniqueString);
                if (res && res.message === 'email verified successfully') {
                    setSuccess(true);
                    setMessage(res.message);
                } else {
                    setMessage(res.message);
                    setSuccess(false);
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();
    }, [userId, uniqueString]);

    return (
        <div className="flex items-center justify-center px-4 md:px-10 min-h-[calc(100vh-110px)] bg-[#f9f9f9]">
            <div className="bg-white drop-shadow-md transition-all ease-in rounded-lg p-4 sm:p-6 max-w-sm md:max-w-md w-full">
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
                        <div className="fill-[#f68533] text-white size-[30px] md:size-[40px]">
                            {icons.loading}
                        </div>
                        <div className="flex items-center flex-col justify-center gap-3">
                            <p className="text-blue-500 font-semibold text-sm xs:text-base lg:text-lg text-center">
                                Verifying your email...
                            </p>
                            <p className="text-xs xs:text-sm text-md text-center text-[#2f2f2f] md:px-6">
                                This step is crucial for your registeration
                                process, Please do not close the Current Tab
                            </p>
                        </div>
                    </div>
                ) : success ? (
                    <div className="text-center flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-col px-2 md:px-10">
                        <h1 className="text-lg sm:text-xl md:text-2xl leading-6 md:leading-7 font-bold text-green-500 flex items-center justify-center gap-3">
                            <p>Email Verified</p>
                            <div>
                                <div className="fill-green-500 size-[20px]">
                                    {icons.tick}
                                </div>
                            </div>
                        </h1>
                        <p className="text-[#2f2f2f] text-sm md:text-base text-center">
                            {message}
                        </p>
                        <Button
                            btnText="Login"
                            onClick={() => navigate('/login')}
                            className="w-fit mt-1 md:mt-0 text-[#f9f9f9] rounded-md bg-gradient-to-r px-2 py-[5px] from-blue-500 to-blue-600 hover:from-[#f68533] hover:to-[#e97c2e]"
                        />
                    </div>
                ) : (
                    <div className="text-center flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-col px-2 md:px-10">
                        <h1 className="text-lg sm:text-xl md:text-2xl leading-6 md:leading-7 font-bold text-red-500">
                            Verification Failed
                        </h1>
                        <p className="text-[#2f2f2f] text-sm md:text-base text-center">
                            {message}
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="w-fit mt-1 md:mt-0 px-2 py-[5px] text-[#f9f9f9] rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-[#f68533] hover:to-[#e97c2e]"
                        >
                            Sign Up Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
