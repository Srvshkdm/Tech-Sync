import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { icons } from '../../assets/icons';
import { Button } from '..';
import { verifyRegex } from '../../utils';

export default function BankingInformation() {
    const initialInputs = {
        bankName: '',
        accountNumber: '',
        accountType: '',
        IFSC: '',
        branchName: '',
        swiftCode: '',
    };
    const initialErrors = {
        root: '',
        bankName: '',
        accountNumber: '',
        accountType: '',
        IFSC: '',
        branchName: '',
        swiftCode: '',
    };
    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        setCurrentStep(3);
        const savedData = localStorage.getItem(
            `${user._id}_StartupOwnerBankingInfo`
        );
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleBlur(e) {
        let { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            `${user._id}_StartupOwnerBankingInfo`,
            JSON.stringify({ ...inputs, bankingInfoStatus: 'pending' })
        );
    }

    function onMouseOver() {
        if (
            Object.values(inputs).some((value) => !value) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(initialErrors);
        setCompletedSteps((prev) => [...prev, 'banking']);
        setTotalData((prev) => ({
            ...prev,
            banking: { data: inputs, status: 'complete' },
        }));
        localStorage.setItem(
            `${user._id}_StartupOwnerBankingInfo`,
            JSON.stringify({ ...inputs, bankingInfoStatus: 'complete' })
        );
        navigate(`/application/${user._id}/documents`);
    }

    const inputFields = [
        {
            type: 'text',
            name: 'bankName',
            label: 'Bank Name',
            placeholder: 'Enter your Bank Name',
            required: true,
            icon: icons.bank,
        },
        {
            type: 'text',
            name: 'accountNumber',
            label: 'Account Number',
            placeholder: 'Enter Account Number',
            required: true,
            icon: icons.user,
        },
        {
            type: 'text',
            name: 'accountType',
            required: true,
            placeholder: 'Enter Account Type (e.g., Checking, Savings)',
            label: 'Account Type',
            icon: icons.money,
        },
        {
            type: 'text',
            name: 'IFSC',
            placeholder: 'Enter IFSC code',
            label: 'IFSC Code',
            required: true,
            icon: icons.card,
        },
        {
            type: 'text',
            name: 'branchName',
            placeholder: 'Enter Branch Name',
            label: 'Branch Name ',
            required: true,
            icon: icons.building,
        },
        {
            type: 'text',
            name: 'swiftCode',
            placeholder: 'Enter Swift Code',
            label: 'Swift Code',
            required: true,
            icon: icons.card,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-green-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label}
                </label>
            </div>
            <div className="shadow-md shadow-[#f8f0eb] relative">
                {field.icon && (
                    <div className="size-[16px] fill-[#323232] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
                        {field.icon}
                    </div>
                )}
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={inputs[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-green-600 bg-transparent`}
                />
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-sm font-medium">
                    {errors[field.name]}
                </div>
            )}
            {field.name === 'password' && !errors.password && (
                <div className="text-xs">
                    This password will be used for further verification.
                </div>
            )}
            {field.name === 'balanceStatement' && (
                <div className="text-xs">Only .pdf files are accepted.</div>
            )}
        </div>
    ));

    return (
        <div className="p-6 w-full bg-green-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-green-600 mb-6 text-center">
                Banking Information
            </h2>

            <div className="w-full flex flex-col items-center justify-center gap-3">
                {errors.root ? (
                    <div className="text-red-500 w-full text-center">
                        {errors.root}
                    </div>
                ) : (
                    <p className="text-red-500 w-full text-center text-[15px]">
                        <span className="font-bold">* </span>Indicates
                        compulsory fields
                    </p>
                )}

                {/* Form */}
                <form
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
                    {inputElements}

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-green-500 to-green-600 hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setInputs(initialInputs);
                                setErrors(initialErrors);
                            }}
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Reset</p>
                                    <div className="size-[15px] fill-[#f9f9f9]">
                                        {icons.erase}
                                    </div>
                                </div>
                            }
                        />
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-500 hover:to-orange-600"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            type="submit"
                            btnText={
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-[#f9f9f9]">Save</p>
                                    <div className="size-[14px] fill-[#f9f9f9]">
                                        {icons.next}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
