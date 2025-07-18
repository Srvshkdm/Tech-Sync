import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';
import { useRegisterInvestorContext, useUserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';

export default function InvestorFinancialInfo() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterInvestorContext();
    const initialInputs = {
        revenue: '',
        netWorth: '',
        businessLicenseNumber: '',
        taxPayerIdentification: '',
        idType: '',
        idValue: '',
    };
    const [inputs, setInputs] = useState(initialInputs);
    const { user } = useUserContext();

    const initialErrors = {
        root: '',
        revenue: '',
        netWorth: '',
        businessLicenseNumber: '',
        taxPayerIdentification: '',
        idType: '',
        idValue: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [investorTypeData, setInvestorTypeData] = useState('');

    const idOptions = [
        { value: 'drivingLicense', name: 'Driving License' },
        { value: 'aadhaarCard', name: 'Aadhaar Card' },
        { value: 'passport', name: 'Passport' },
        { value: 'voterId', name: 'Voter ID' },
    ];

    useEffect(() => {
        setCurrentStep(1);
        const savedData = localStorage.getItem('InvestorFinancialInfo');
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
        const personalInfo = JSON.parse(
            localStorage.getItem('InvestorPersonalInfo')
        );
        setInvestorTypeData(personalInfo?.investorType || '');
    }, []);

    function onMouseOver() {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key !== 'businessLicenseNumber'
            ) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setCompletedSteps((prev) => [...prev, 'financial']);
        setTotalData((prev) => ({
            ...prev,
            financial: { data: inputs, status: 'complete' },
        }));
        localStorage.setItem(
            'InvestorFinancialInfo',
            JSON.stringify({ ...inputs, financialInfoStatus: 'complete' })
        );
        navigate(`/become-investor/${user._id}/banking`);
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            'InvestorFinancialInfo',
            JSON.stringify({ ...inputs, financialInfoStatus: 'pending' })
        );
    }

    const inputFields = [
        {
            name: 'revenue',
            label: 'Revenue',
            placeholder: 'Enter your Revenue (in crores)',
            required: true,
            icon: icons.money,
            type: 'number',
            show: true,
        },
        {
            name: 'netWorth',
            label: 'Net Worth',
            placeholder: 'Enter your Net worth (in crores)',
            required: true,
            icon: icons.progress,
            type: 'number',
            show: true,
        },
    ];

    const inputElements = inputFields.map(
        (field) =>
            field.show && (
                <div key={field.name} className="w-full transition-all ease-in">
                    <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                        <label htmlFor={field.name}>
                            {field.required && (
                                <span className="text-red-500">* </span>
                            )}
                            {field.label}
                        </label>
                    </div>
                    <div className="relative">
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
                            className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent`}
                        />
                    </div>
                    {errors[field.name] && (
                        <div className="mt-1 text-red-500 text-xs font-medium">
                            {errors[field.name]}
                        </div>
                    )}
                    {field.name === 'dateOfBirth' && !errors.dateOfBirth && (
                        <div className="text-xs">
                            Age should be atleast 18 years old.
                        </div>
                    )}
                </div>
            )
    );

    return (
        <div className="p-6 w-full bg-blue-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                Financial Information
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
                    {investorTypeData === 'organization' && (
                        <div className="w-full">
                            <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                                <label htmlFor="businessLicenseNumber">
                                    <span className="text-red-500">* </span>
                                    Business License Number (optional)
                                </label>
                            </div>
                            <div className="w-full relative">
                                <div className="size-[16px] fill-[#323232] absolute top-2 right-3">
                                    {icons.locationPinPoint}
                                </div>
                                <input
                                    type="text"
                                    name="businessLicenseNumber"
                                    id="businessLicenseNumber"
                                    placeholder="Enter Business License Number"
                                    value={inputs.businessLicenseNumber}
                                    onChange={handleChange}
                                    className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md pl-3 pr-10 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                                />
                            </div>
                        </div>
                    )}

                    <div className="w-full">
                        <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="taxPayerIdentification">
                                <span className="text-red-500">* </span>
                                {investorTypeData === 'organization'
                                    ? 'Tax or GST Number'
                                    : 'PAN Number'}
                            </label>
                        </div>
                        <input
                            type="text"
                            name="taxPayerIdentification"
                            id="taxPayerIdentification"
                            placeholder={
                                investorTypeData === 'organization'
                                    ? 'Enter TRN or GST number'
                                    : 'Enter PAN number'
                            }
                            value={inputs.taxPayerIdentification}
                            onChange={handleChange}
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md pl-3 pr-10 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                        />
                    </div>

                    {/* Government ID */}
                    <div className="w-full">
                        <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="idType">
                                <span className="text-red-500">* </span>
                                Government ID Type
                            </label>
                        </div>
                        <select
                            name="idType"
                            id="idType"
                            value={inputs.idType}
                            onChange={handleChange}
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md pl-3 pr-10 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                        >
                            <option value="">Select Government ID</option>
                            {idOptions.map((govtId) => (
                                <option key={govtId.value} value={govtId.value}>
                                    {govtId.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <div className="bg-blue-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="idValue">
                                <span className="text-red-500">* </span>
                                ID
                            </label>
                        </div>
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="idValue"
                                placeholder={`Enter ${inputs.idType || 'ID'} Number`}
                                value={inputs.idValue}
                                onChange={handleChange}
                                className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md pl-3 pr-10 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                            />
                        </div>
                    </div>

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setInputs(initialInputs);
                                setErrors(initialErrors);
                                setFlag('');
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            type="submit"
                            btnText={
                                loading ? (
                                    <div className="fill-[#f9f9f9] text-[#f9a264] size-[20px]">
                                        {icons.loading}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-[#f9f9f9]">Save</p>
                                        <div className="size-[14px] fill-[#f9f9f9]">
                                            {icons.next}
                                        </div>
                                    </div>
                                )
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
