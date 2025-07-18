import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
    AYUSHSTARTUPLOGO,
    AYUSHLOGO,
    ASHOKAPILLAR,
    ASHOKACHAKAR,
} from '../assets/images';
import { useState } from 'react';
import { userService } from '../services';
import { useVariantContext } from '../contexts';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Popup } from '../components';
import { verifyRegex } from '../utils';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const emptyInputs = {
        name: '',
        email: '',
        // dateOfBirth: '',
        password: '',
        phone: '',
    };
    const emptyErrors = {
        root: '',
        name: '',
        email: '',
        // dateOfBirth: '',
        password: '',
        phone: '',
    };
    const [inputs, setInputs] = useState(emptyInputs);
    const [errors, setErrors] = useState(emptyErrors);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState();
    const navigate = useNavigate();

    async function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    const handleBlur = (e) => {
        let { name, value } = e.target;
        verifyRegex(name, value, setErrors);
    };

    function onMouseOver() {
        if (
            Object.values(inputs).some((value) => !value) ||
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
        setLoading(true);
        setDisabled(true);
        setErrors(emptyErrors);
        try {
            const res = await userService.register(inputs);
            if (res && res.message === 'verification email sent') {
                setShowPopup(true);
            } else {
                setShowPopup(false);
                setErrors((prev) => ({ ...prev, root: res.message }));
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    }

    // input fields
    const inputFields = [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Enter your Name',
            required: true,
        },
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
            <div className="bg-white z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
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
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
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
        </div>
    ));

    // variants
    const { iconVariants } = useVariantContext();

    // logos array
    const logos = [
        { image: AYUSHLOGO, className: '' },
        { image: ASHOKACHAKAR, className: 'slow-spin' },
        { image: ASHOKAPILLAR, className: '' },
    ];
    const logoElements = logos.map((logo, index) => (
        <motion.div
            key={index}
            className={`drop-shadow-md size-[30%] max-w-[80px] ${logo.className}`}
            custom={index}
            variants={iconVariants}
        >
            <img
                src={logo.image}
                alt="ayush and india logos"
                className="object-contain size-full"
            />
        </motion.div>
    ));

    return (
        <div className="py-6 px-[5%] text-[#040606] flex flex-col md:flex-row items-center justify-start gap-14 bg-white min-h-[calc(100vh-110px)]">
            {/* email verification popup */}
            {showPopup && (
                <Popup
                    onClick={() => setShowPopup(false)}
                    className="text-[#f9f9f9] mt-4 rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                    header="Verification Email"
                    description="A verification email has been sent on your provided email, check it out to proceed with the registeration process"
                />
            )}

            {/* logo section */}
            <div className="w-full flex flex-col self-start h-full items-center gap-10 pt-10">
                <div className="flex flex-col items-center gap-1">
                    <div className="hidden md:flex items-center justify-between w-[90%] gap-4 mb-10">
                        {logoElements}
                    </div>
                    <h2 className="text-[2rem] leading-9 md:text-[2.3rem] text-center font-bold text-[#040606]">
                        AYUSH Startup Connect
                    </h2>
                    <h3 className="text-[1.3rem] text-center font-semibold text-[#1a2424]">
                        Registration Portal
                    </h3>
                </div>
                <Link
                    to="/"
                    className="drop-shadow-md size-[45%] xs:size-[40%] sm:max-w-[220px] md:w-[250px] min-w-[50px] transition-all ease-in hover:brightness-75"
                >
                    <img
                        src={AYUSHSTARTUPLOGO}
                        alt="Ayush Logo"
                        className="size-full object-contain"
                    />
                </Link>
            </div>

            {/* form section */}
            <div className="w-full flex items-center justify-center">
                <div className="py-4 px-[5%] w-[90%] max-w-[500px] md:w-full rounded-xl shadow-md shadow-gray-300 flex flex-col items-center gap-2">
                    <div className="w-fit">
                        <p className="text-center text-[1.5rem] font-medium">
                            Create a new Account
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.2 }}
                            className="relative -top-1 h-[0.06rem] bg-[#040606]"
                        />
                    </div>

                    <div className="w-full flex flex-col items-center justify-center gap-3">
                        {errors.root && (
                            <div className="text-red-500 w-full text-center">
                                {errors.root}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-start justify-center gap-1 w-full"
                        >
                            {inputElements}

                            {/* Phone Number */}
                            <div className="w-full shadow-md shadow-[#f8f0eb]">
                                <div className="bg-white z-[10] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                                    <label htmlFor="phone">
                                        <span className="text-red-500">* </span>
                                        Phone Number
                                    </label>
                                </div>
                                <div className="w-full">
                                    <PhoneInput
                                        country="in"
                                        value={inputs.phone}
                                        onChange={(value) =>
                                            setInputs((prev) => ({
                                                ...prev,
                                                phone: value,
                                            }))
                                        }
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            id: 'phone',
                                        }}
                                        inputClass="!w-full !h-[45px] !indent-2 !rounded-md !shadow-sm !border-[0.01rem] !border-[#858585] !outline-[#f68533] !bg-transparent"
                                        buttonClass="!h-[45px] !w-[45px] !bg-white !hover:bg-white !z-[1] !rounded-r-none !rounded-md !border-[0.01rem] !border-[#858585] !outline-[#f68533]"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <Button
                                    className="text-[#f9f9f9] mt-4 rounded-md w-full bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                    disabled={disabled}
                                    onMouseOver={onMouseOver}
                                    type="submit"
                                    btnText={
                                        loading ? 'Registering...' : 'Register'
                                    }
                                />
                                <p className="w-full text-center text-xs xs:text-sm mt-2">
                                    already have an Account ?{' '}
                                    <Link
                                        to="/login"
                                        className="text-[#2a4fae] hover:underline"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
