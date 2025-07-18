import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { DPIITservice } from '../services';
import { Button } from '../components';
import { icons } from '../assets/icons';

export default function DPIITregistrationPage() {
    const [inputs, setInputs] = useState({ id: '', password: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            const res = await DPIITservice.getDPIITdetails(inputs);
            if (res && !res.message) {
                setData(res);
            } else {
                setData(null);
                if (res.message === 'startup not found') {
                    setError(
                        <p>
                            Startup with the provided DPIIT ID not found, Enter
                            valid DPIIT ID or{' '}
                            <NavLink
                                to="/application/new/personal"
                                className="text-blue-800 hover:underline"
                            >
                                Register Manually
                            </NavLink>
                        </p>
                    );
                } else {
                    setError(res.message);
                }
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-110px)]">
            {loading ? (
                <div className="bg-white drop-shadow-md transition-all ease-in rounded-lg p-4 sm:p-6 max-w-sm md:max-w-md w-full">
                    <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
                        <div className="fill-[#f68533] text-white size-[30px] md:size-[40px]">
                            {icons.loading}
                        </div>
                        <div className="flex items-center flex-col justify-center gap-3">
                            <p className="text-blue-500 font-semibold text-sm xs:text-base lg:text-lg text-center">
                                Verifying your License...
                            </p>
                            <p className="text-xs xs:text-sm text-md text-center text-[#2f2f2f] md:px-6">
                                Please wait while we verify your startup DPIIT
                                recognition License.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                !data && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm bg-[#f9f9f9] p-4 rounded-lg drop-shadow-md"
                    >
                        <h2 className="font-semibold text-xl text-center mb-6 underline">
                            Register Via DPIIT ID
                        </h2>
                        {error && (
                            <div className="text-center text-sm text-red-500">
                                {error}
                            </div>
                        )}
                        <div>
                            <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                                <label htmlFor="DPIITid">
                                    <span className="text-red-500">* </span>
                                    DPIIT ID:
                                </label>
                            </div>
                            <input
                                type="text"
                                className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                                required
                                name="DPIITid"
                                id="DPIITid"
                                value={inputs.id}
                                placeholder="Enter The ID issued by DPIIT"
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        id: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                                <label htmlFor="DPIITpassword">
                                    <span className="text-red-500">* </span>
                                    DPIIT password:
                                </label>
                            </div>
                            <input
                                type="password"
                                className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                                required
                                name="DPIITpassword"
                                id="DPIITpassword"
                                value={inputs.password}
                                placeholder="Enter your DPIIT password"
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="w-full flex items-center justify-center mt-6">
                            <Button
                                className="text-[#f9f9f9] rounded-md h-[35px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                                btnText="Submit"
                                type="submit"
                                disabled={disabled}
                            />
                        </div>
                    </form>
                )
            )}

            {data && (
                <div className="w-full max-w-xl m-8 bg-[#f9f9f9] rounded-lg shadow-md p-4">
                    <h2 className="text-center text-xl font-semibold text-black mb-8 underline">
                        DPIIT Startup Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {/* Personal Info Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-[#f68533]">
                                Personal Information
                            </h3>
                            <div>
                                <strong>First Name:</strong> {data.firstName}
                            </div>
                            <div>
                                <strong>Middle Name:</strong> {data.middleName}
                            </div>
                            <div>
                                <strong>Last Name:</strong> {data.lastName}
                            </div>
                            <div>
                                <strong>Email Address:</strong>{' '}
                                {data.emailAddress}
                            </div>
                            <div>
                                <strong>Mobile:</strong> {data.mobile}
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-[#f68533]">
                                Address
                            </h3>
                            <div>
                                <strong>Address:</strong> {data.address}
                            </div>
                            <div>
                                <strong>City/District:</strong> {data.district},{' '}
                                {data.state}
                            </div>
                            <div>
                                <strong>Pin Code:</strong> {data.pinCode}
                            </div>
                            <div>
                                <strong>Country:</strong> {data.country}
                            </div>
                        </div>

                        {/* Bank Info Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-[#f68533]">
                                Bank Information
                            </h3>
                            <div>
                                <strong>Bank Name:</strong> {data.bankName}
                            </div>
                            <div>
                                <strong>Branch Name:</strong> {data.branchName}
                            </div>
                            <div>
                                <strong>Account Number:</strong>{' '}
                                {data.accountNumber}
                            </div>
                            <div>
                                <strong>Account Type:</strong>{' '}
                                {data.accountType}
                            </div>
                            <div>
                                <strong>IFSC Code:</strong> {data.IFSC}
                            </div>
                        </div>

                        {/* Other Details Section */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-[#f68533]">
                                Other Information
                            </h3>
                            <div>
                                <strong>SWIFT Code:</strong> {data.swiftCode}
                            </div>
                            <div>
                                <strong>Taluka:</strong> {data.taluka}
                            </div>
                            <div>
                                <strong>Fax:</strong> {data.fax}
                            </div>
                            <div>
                                <strong>Confirm Email:</strong>{' '}
                                {data.confirmEmailAddress}
                            </div>
                            <div>
                                <strong>Confirm Mobile:</strong>{' '}
                                {data.confirmMobile}
                            </div>
                            <div>
                                <strong>Balance Statement:</strong>{' '}
                                {data.balanceStatement}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center mt-8">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">
                                        Proceed with Above Details
                                    </p>
                                    <div className="size-[14px] fill-[#f9f9f9]">
                                        {icons.next}
                                    </div>
                                </div>
                            }
                            onClick={() => navigate('/register-DPIIT/docs')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
