import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';
import { useRegisterInvestorContext, useUserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';

export default function InvestorBankingInfo() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterInvestorContext();

    const initialInputs = {
        bankName: '',
        accountNumber: '',
        accountType: '',
        ifscCode: '',
        branchName: '',
        swiftCode: '',
    };
    const [inputs, setInputs] = useState(initialInputs);
    const { user } = useUserContext();

    const initialErrors = {
        root: '',
        bankName: '',
        accountNumber: '',
        accountType: '',
        ifscCode: '',
        branchName: '',
        swiftCode: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [countryList, setCountryList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState('');

    useEffect(() => {
        setCurrentStep(2);
        const savedData = localStorage.getItem('InvestorBankingInfo');
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
    }, []);

    function onMouseOver() {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key !== 'linkedIn'
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

        setCompletedSteps((prev) => [...prev, 'banking']);
        setTotalData((prev) => ({
            ...prev,
            banking: { data: inputs, status: 'complete' },
        }));
        localStorage.setItem(
            'InvestorBankingInfo',
            JSON.stringify({ ...inputs, bankingInfoStatus: 'complete' })
        );
        navigate(`/become-investor/${user._id}/documents`);
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            'InvestorBankingInfo',
            JSON.stringify({ ...inputs, bankingInfoStatus: 'pending' })
        );
    }

    const inputFields = [
        {
            name: 'bankName',
            label: 'Bank Name',
            placeholder: 'Enter your Bank Name',
            required: true,
            icon: icons.bank,
            type: 'text',
            show: true,
        },
        {
            name: 'accountNumber',
            label: 'Account Number',
            placeholder: 'Enter your Account Number',
            required: true,
            icon: icons.bank,
            type: 'text',
            show: true,
        },
        {
            name: 'accountType',
            label: 'Account Type',
            placeholder: 'Enter your Account Type',
            required: true,
            icon: icons.money,
            type: 'text',
            show: true,
        },
        {
            name: 'ifscCode',
            label: 'IFSC Code',
            placeholder: 'Enter your IFSC code',
            required: true,
            icon: icons.card,
            type: 'text',
            show: true,
        },
        {
            name: 'branchName',
            label: 'Branch Name',
            placeholder: 'Enter your Branch Name',
            required: true,
            icon: icons.bank,
            type: 'text',
            show: true,
        },
        {
            name: 'swiftCode',
            label: 'Swift Code',
            placeholder: 'Enter your Swift code',
            required: true,
            icon: icons.card,
            type: 'text',
            show: true,
        },
    ];

    const inputElements = inputFields.map(
        (field) =>
            field.show && (
                <div key={field.name} className="w-full transition-all ease-in">
                    <div className="bg-green-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
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
        <div className="p-6 w-full bg-green-50 rounded-lg shadow-md border border-gray-200">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
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
