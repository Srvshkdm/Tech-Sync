import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterStartupContext, useUserContext } from '../../contexts';
import { icons } from '../../assets/icons';
import { Button } from '..';

export default function OrganizationInformation() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterStartupContext();
    const { user } = useUserContext();

    const initialInputs = {
        startupName: '',
        dateOfEstablishment: '',
        valuation: '',
        address: '',
        industry: '',
        website: '',
        businessType: '',
        country: '',
        description: '',
    };

    const initialErrors = {
        root: '',
        startupName: '',
        dateOfEstablishment: '',
        valuation: '',
        address: '',
        industry: '',
        website: '',
        businessType: '',
        country: '',
        description: '',
    };

    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const [countryList, setCountryList] = useState([]);
    const [flag, setFlag] = useState('');

    useEffect(() => {
        setCurrentStep(1);
        const savedData = localStorage.getItem(
            `${user._id}_StartupOwnerOrganizationInfo`
        );
        if (savedData) {
            setInputs(JSON.parse(savedData));
        }
        (async function fetchCountryList() {
            try {
                const res = await fetch(
                    'https://countriesnow.space/api/v0.1/countries/flag/images',
                    {
                        method: 'GET',
                    }
                );
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await res.json();
                const countries = result.data;

                countries.sort((a, b) => a.name.localeCompare(b.name));
                setCountryList(countries);
                if (inputs.country) {
                    const initialCountry = countries.find(
                        (countryObject) => countryObject.name === inputs.country
                    );

                    if (initialCountry) {
                        setFlag(initialCountry.flag);
                    } else {
                        console.warn(
                            `Country with name "${inputs.country}" not found.`
                        );
                    }
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
        // update flag
        if (name === 'country') {
            const selectedCountry = countryList.find(
                (countryObject) => countryObject.name === value
            );
            setFlag(selectedCountry.flag);
        }
    };

    function handleBlur(e) {
        let { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            `${user._id}_StartupOwnerOrganizationInfo`,
            JSON.stringify({ ...inputs, organizationInfoStatus: 'pending' })
        );
    }

    function onMouseOver() {
        console.log(inputs);
        if (
            Object.values(inputs).some(
                (value) => !value // nothing is optional
            ) ||
            Object.entries(errors).some(
                ([key, value]) => value !== '' && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(initialErrors);
        setCompletedSteps((prev) => [...prev, 'organization']);
        setTotalData((prev) => ({
            ...prev,
            organization: { data: inputs, status: 'complete' },
        }));
        localStorage.setItem(
            `${user._id}_StartupOwnerOrganizationInfo`,
            JSON.stringify({ ...inputs, organizationInfoStatus: 'complete' })
        );
        navigate(`/application/${user._id}/financial`);
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
            type: 'date',
            label: 'Date of Establishment',
            required: true,
            name: 'dateOfEstablishment',
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
            type: 'url',
            name: 'website',
            label: 'Website URL',
            icon: icons.link,
            placeholder: 'Enter website URL',
            required: true,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
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
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent`}
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
            {field.name === 'pdf' && (
                <div className="text-xs">Only .pdf files are accepted.</div>
            )}
        </div>
    ));

    const bussinessOptions = [
        {
            name: 'Sole Partnership',
            value: 'Sole Partnership',
        },
        {
            name: 'Partnership',
            value: 'Partnership',
        },
        {
            name: 'Corporation (Private or Public)',
            value: 'Corporation',
        },
        {
            name: 'LLC',
            value: 'Limited Liability Company (LLC)',
        },
        {
            name: 'Nonprofit',
            value: 'Nonprofit',
        },
    ];

    const industoryOptions = [
        { name: 'Ayurveda', value: 'Ayurveda' },
        { name: 'Yoga and Naturopathy', value: 'Yoga and Naturopathy' },
        { name: 'Unani', value: 'Unani' },
        { name: 'Siddha', value: 'Siddha' },
        { name: 'Homoeopathy', value: 'Homoeopathy' },
    ];

    return (
        <div className="p-6 w-full bg-violet-50 overflow-x-scroll rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-violet-700 mb-6 text-center">
                Startup/Organization Information
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
                    {/* Business Type */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="businessType">
                                <span className="text-red-500">* </span>
                                Bussiness Type
                            </label>
                        </div>
                        <select
                            name="businessType"
                            id="businessType"
                            value={inputs.businessType}
                            onChange={handleChange}
                            className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                        >
                            <option value="">Select Business Type</option>
                            {bussinessOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Country Dropdown */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="country">
                                <span className="text-red-500">* </span>
                                Country
                            </label>
                        </div>
                        <div className="w-full relative">
                            {flag && (
                                <div className="h-[18px] w-[28px] rounded-sm overflow-hidden absolute top-[50%] translate-y-[-50%] left-3">
                                    <img
                                        src={flag}
                                        alt={`${inputs.country} flag`}
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                            )}
                            <select
                                name="country"
                                id="country"
                                value={inputs.country}
                                onChange={handleChange}
                                className={`py-[10px] text-ellipsis transition-all ease-in placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${flag ? 'pl-12 pr-3' : 'px-3'} w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent`}
                            >
                                <option value="">Select Country</option>
                                {countryList.map((country) => (
                                    <option
                                        key={country.name}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Industry Dropdown */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="industory">
                                <span className="text-red-500">* </span>
                                Industory
                            </label>
                        </div>
                        <div className="w-full">
                            <select
                                id="industory"
                                name="industry"
                                value={inputs.industry}
                                onChange={handleChange}
                                className="py-[10px] text-ellipsis transition-all ease-in placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                            >
                                <option value="">Select Industry</option>
                                {industoryOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Address */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="address">
                                <span className="text-red-500">* </span>
                                Address (Headquarter)
                            </label>
                        </div>
                        <div className="w-full relative">
                            <div className="size-[16px] fill-[#323232] absolute top-2 right-3">
                                {icons.locationPinPoint}
                            </div>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Provide your headquarter address"
                                value={inputs.address}
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                className="shadow-md shadow-[#f8f0eb] py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                            />
                        </div>
                        {errors.address ? (
                            <div className="mt-1 text-red-500 text-sm font-medium">
                                {errors.address}
                            </div>
                        ) : (
                            <div className="text-xs">
                                Only 256 characters are allowed.
                            </div>
                        )}
                    </div>
                    {/* description */}
                    <div className="w-full">
                        <div className="bg-violet-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                            <label htmlFor="description">
                                <span className="text-red-500">* </span>
                                Description
                            </label>
                        </div>
                        <div className="w-full relative">
                            <div className="size-[16px] fill-[#323232] absolute top-2 right-3">
                                {icons.locationPinPoint}
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Provide breif description about the startup"
                                value={inputs.description}
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                className="shadow-md shadow-[#f8f0eb] py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent"
                            />
                        </div>
                        {errors.description ? (
                            <div className="mt-1 text-red-500 text-sm font-medium">
                                {errors.description}
                            </div>
                        ) : (
                            <div className="text-xs">
                                Only 256 characters are allowed.
                            </div>
                        )}
                    </div>
                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-violet-600 to-violet-700 hover:from-red-600 hover:to-red-700"
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
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-violet-600 to-violet-700 hover:from-green-600 hover:to-green-700"
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
