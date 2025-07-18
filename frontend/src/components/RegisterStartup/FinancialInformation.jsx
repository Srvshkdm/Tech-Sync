import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { icons } from '../../assets/icons';
import { Button } from '..';
import { verifyRegex } from '../../utils';

export default function FinancialInformation() {
    const initialInputs = {
        startupName: '',
        revenue: '',
        profitMargin: '',
        fundingReceived: '',
        valuation: '',
        financialYear: '',
    };
    const initialErrors = {
        root: '',
        startupName: '',
        revenue: '',
        profitMargin: '',
        fundingReceived: '',
        valuation: '',
        financialYear: '',
    };
    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentStep(2);
        // Only try to load saved data if user exists
        if (user && user._id) {
            const savedData = localStorage.getItem(
                `${user._id}_StartupOwnerFinancialInfo`
            );
            if (savedData) {
                setInputs(JSON.parse(savedData));
            }
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

        // Only save to localStorage if user exists
        if (user && user._id) {
            localStorage.setItem(
                `${user._id}_StartupOwnerFinancialInfo`,
                JSON.stringify({ ...inputs, financialInfoStatus: 'pending' })
            );
        }
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

        // Check if user exists
        if (!user || !user._id) {
            setErrors({
                ...initialErrors,
                root: 'User session not found. Please login again.',
            });
            return;
        }

        try {
            setErrors(initialErrors);
            setCompletedSteps((prev) => [...prev, 'financial']);
            setTotalData((prev) => ({
                ...prev,
                financial: { data: inputs, status: 'complete' },
            }));
            localStorage.setItem(
                `${user._id}_StartupOwnerFinancialInfo`,
                JSON.stringify({ ...inputs, financialInfoStatus: 'complete' })
            );

            // Get the current application ID from the URL
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/');
            const appId = pathParts[2]; // Get the app ID from /application/{appId}/financial

            navigate(`/application/${appId}/banking`);
        } catch (error) {
            console.error('Error saving financial information:', error);
            setErrors({
                ...initialErrors,
                root: 'Failed to save information. Please try again.',
            });
        }
    }

    const inputFields = [
        {
            type: 'text',
            name: 'startupName',
            label: 'Startup Name',
            icon: icons.building,
            placeholder: 'Enter your Startup Name',
            required: true,
        },
        {
            type: 'number',
            name: 'revenue',
            label: 'Net Revenue',
            icon: icons.rupee,
            placeholder: 'Enter Revenue (in crores)',
            required: true,
        },
        {
            type: 'number',
            name: 'profitMargin',
            icon: icons.progress,
            required: true,
            placeholder: 'Enter profit margin percentage',
            label: 'Profit Margin (%)',
        },
        {
            type: 'number',
            name: 'fundingReceived',
            icon: icons.money,
            placeholder: 'Enter funding received in crores',
            label: 'Funding Recieved (in crores)',
            required: true,
        },
        {
            type: 'number',
            name: 'valuation',
            icon: icons.progress,
            placeholder: 'Enter valuation in crores',
            label: 'Current Valuation (in crores)',
            required: true,
        },
        {
            type: 'text',
            name: 'financialYear',
            icon: icons.calender,
            placeholder: 'Enter Financial Year',
            label: 'Financial Year',
            required: true,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
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
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-blue-600 bg-transparent`}
                />
            </div>
            {errors[field.name] && (
                <div className="mt-1 text-red-500 text-sm font-medium">
                    {errors[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="p-6 w-full bg-blue-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
                Financial Information for Startup
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-red-600 hover:to-red-700"
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-green-600 hover:to-green-700"
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
