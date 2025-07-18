import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import { Button, Popup } from '..';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';

export default function ResetPassword() {
    const { userId, resetString } = useParams();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [inputs, setInputs] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState();
    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    async function handleResetPassword(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            const res = await userService.resetPassword(
                // userId,
                resetString,
                inputs.newPassword
            );
            setShowPopup(true);
            if (res?.message === 'password has been reset successfully') {
                setSuccess(true);
                setMessage('Your password has been updated successfully');
            } else {
                setMessage(res.message);
                setSuccess(false);
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (
            name === 'confirmPassword' &&
            value &&
            inputs.newPassword !== value // can't check state cause it may take time to update
        ) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: 'confirm password should match new password',
            }));
        } else {
            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
        }
    }

    function onMouseOver() {
        if (!inputs.newPassword || !inputs.confirmPassword) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <form
                    onSubmit={handleResetPassword}
                    className="w-full flex flex-col items-center"
                >
                    <div className="w-full">
                        <div className="bg-white z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="newPassword">
                                <span className="text-red-500">* </span>
                                New Password
                            </label>
                        </div>
                        <div>
                            <input
                                type="password"
                                className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                                id="newPassword"
                                name="newPassword"
                                value={inputs.newPassword}
                                onBlur={(e) => {
                                    verifyRegex(
                                        'newPassword',
                                        e.target.value,
                                        setErrors
                                    );
                                }}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                            />
                        </div>

                        {errors.newPassword ? (
                            <div className="mt-1 text-red-500 text-sm font-medium">
                                {errors.newPassword}
                            </div>
                        ) : (
                            <div className="text-xs">
                                password must be 8-12 characters.
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="bg-white z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="confirmPassword">
                                <span className="text-red-500">* </span>
                                Confirm Password
                            </label>
                        </div>
                        <div>
                            <input
                                type="password"
                                className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={inputs.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <div className="mt-1 text-red-500 text-sm font-medium">
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>
                    <Button
                        className="text-[#f9f9f9] mt-4 rounded-md w-fit bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                        disabled={disabled}
                        type="submit"
                        onMouseOver={onMouseOver}
                        btnText={
                            loading ? (
                                <div className="fill-[#f9f9f9] text-[#f9a264] size-[20px]">
                                    {icons.loading}
                                </div>
                            ) : (
                                'Update'
                            )
                        }
                    />
                </form>

                {showPopup &&
                    (success ? (
                        <Popup
                            btnText="Try Login"
                            onClick={() => navigate('/login')}
                            className="text-[#f9f9f9] mt-2 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                            header="Password Updated"
                            description={message}
                        />
                    ) : (
                        <Popup
                            className="text-[#f9f9f9] mt-2 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                            header="Password Updation Failed"
                            description={message}
                            onClick={() => setShowPopup(false)}
                        />
                    ))}
            </div>
        </div>
    );
}
