import { useState } from 'react';
import { Button } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts';
import { userService } from '../services';
import { Login_BackG } from '../assets/images';

export default function LoginPage() {
    const [role, setRole] = useState('Startup Owner'); // Default role
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    async function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    function onMouseOver() {
        if (Object.values(inputs).some((value) => !value)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setDisabled(true);
        try {
            const res = await userService.login(inputs, role);
            if (res && !res.message) {
                setUser(res);
                navigate('/');
            } else {
                setError(res.message);
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    }

    async function handleForgotPassword(e) {
        e.preventDefault();
        setForgotPasswordLoading(true);
        setForgotPasswordMessage('');
        setError(''); // Clear any existing login errors
        try {
            const res =
                await userService.requestResetPassword(forgotPasswordEmail);
            if (res && res.message) {
                // Check for specific error messages
                if (
                    res.message === 'access token missing' ||
                    res.message.includes('token')
                ) {
                    setForgotPasswordMessage(
                        'Backend configuration issue: Password reset endpoint requires authentication fix. Please contact support.'
                    );
                } else if (res.message === 'password reset email sent') {
                    setForgotPasswordMessage(
                        'Password reset link has been sent to your email! Please check your inbox.'
                    );
                } else if (res.message === 'user not found') {
                    setForgotPasswordMessage(
                        'No account found with this email address.'
                    );
                } else {
                    setForgotPasswordMessage(res.message);
                }
            } else {
                setForgotPasswordMessage(
                    'Password reset link has been sent to your email!'
                );
            }
        } catch (err) {
            setForgotPasswordMessage('An error occurred. Please try again.');
        } finally {
            setForgotPasswordLoading(false);
        }
    }

    // input fields
    const inputFields = [
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Create a strong password',
            required: true,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={inputs[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                />
            </div>
        </div>
    ));

    return (
        <div
            className="bg-cover bg-no-repeat min-h-[calc(100vh-110px)] flex items-center justify-center"
            style={{
                backgroundImage: `url('${Login_BackG}')`,
            }}
        >
            <div className="w-full bg-opacity-70 max-w-[450px] text-center bg-[#f9f9f9] drop-shadow-md p-6 rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome Back!
                </h1>

                <div className="bg-opacity-85 bg-white drop-shadow-md border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {inputElements}

                        <div className="w-full">
                            <Button
                                className="text-[#f9f9f9] mt-8 rounded-md w-full bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                disabled={disabled}
                                onMouseOver={onMouseOver}
                                type="submit"
                                btnText={loading ? 'logging...' : 'Login'}
                            />
                            <div className="flex flex-col space-y-2 mt-2">
                                <p className="w-full text-center text-xs xs:text-sm">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowForgotPassword(true)
                                        }
                                        className="text-[#2a4fae] hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </p>
                                <p className="w-full text-center text-xs xs:text-sm">
                                    don't have an account?{' '}
                                    <Link
                                        to={'/register'}
                                        className="text-[#2a4fae] hover:underline"
                                    >
                                        Sign up now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                Reset Password
                            </h2>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForgotPassword(false);
                                    setForgotPasswordEmail('');
                                    setForgotPasswordMessage('');
                                    setError('');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Enter your email address and we'll send you a link
                            to reset your password.
                        </p>
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => {
                                        setForgotPasswordEmail(e.target.value);
                                        setForgotPasswordMessage(''); // Clear message when typing
                                    }}
                                    placeholder="Enter your email"
                                    className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-white"
                                    required
                                />
                            </div>
                            {forgotPasswordMessage && (
                                <div
                                    className={`mb-4 p-3 rounded-md text-sm ${
                                        forgotPasswordMessage.includes(
                                            'error'
                                        ) ||
                                        forgotPasswordMessage.includes(
                                            'Error'
                                        ) ||
                                        forgotPasswordMessage.includes(
                                            'not found'
                                        ) ||
                                        forgotPasswordMessage.includes(
                                            'issue'
                                        ) ||
                                        forgotPasswordMessage.includes('token')
                                            ? 'bg-red-50 text-red-700 border border-red-200'
                                            : 'bg-green-50 text-green-700 border border-green-200'
                                    }`}
                                >
                                    {forgotPasswordMessage}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex-1 text-[#f9f9f9] rounded-md bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                    disabled={
                                        forgotPasswordLoading ||
                                        !forgotPasswordEmail
                                    }
                                    btnText={
                                        forgotPasswordLoading
                                            ? 'Sending...'
                                            : 'Send Reset Link'
                                    }
                                />
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setForgotPasswordEmail('');
                                        setForgotPasswordMessage('');
                                        setError('');
                                    }}
                                    className="flex-1 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-100"
                                    btnText="Cancel"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
