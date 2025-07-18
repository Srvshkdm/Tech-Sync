import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { verifyRegex } from '../../utils';
import { useRegisterInvestorContext, useUserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';

export default function DPIITDocs() {
    const { setCurrentStep, setTotalData, setCompletedSteps } =
        useRegisterInvestorContext();
    const { user } = useUserContext();
    const initialFiles = {
        organizationImage: null,
        taxId: null,
        governmentIdProof: null,
        bankStatements: null,
        businessDocuments: null,
    };
    const [files, setFiles] = useState(initialFiles);
    const initialErrors = {
        root: '',
        organizationImage: '',
        taxId: '',
        governmentIdProof: '',
        bankStatements: '',
        businessDocuments: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    };

    useEffect(() => {
        setCurrentStep(3);
        const savedData = localStorage.getItem('InvestorDocuments');
        if (savedData) {
            setFiles(JSON.parse(savedData));
        }
    }, []);

    function onMouseOver() {
        if (
            Object.values(files).some((value) => !value) ||
            Object.entries(errors).some(
                ([key, value]) => value && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setCompletedSteps((prev) => [...prev, 'documents']);
        setTotalData((prev) => ({
            ...prev,
            documents: { data: files, status: 'complete' },
        }));
        localStorage.setItem(
            'InvestorDocuments',
            JSON.stringify({ ...files, documentsStatus: 'complete' })
        );
        navigate(`/become-investor/${user._id}/review`);
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        verifyRegex(name, value, setErrors);
        localStorage.setItem(
            'InvestorDocuments',
            JSON.stringify({ ...files, documentsStatus: 'pending' })
        );
    }

    const fileFields = [
        {
            name: 'organizationImage',
            label: 'Upload Organization Image',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'taxId',
            label: 'Upload Tax ID',
            required: true,
            icon: icons.card,
            type: 'file',
        },
        {
            name: 'governmentIdProof',
            label: 'Upload any Government ID',
            required: true,
            icon: icons.card,
            type: 'file',
        },
        {
            name: 'bankStatements',
            label: 'Upload Bank Statements',
            required: true,
            icon: icons.file,
            type: 'file',
        },
        {
            name: 'businessDocuments',
            label: 'Upload Businness Registration Documents',
            required: true,
            icon: icons.file,
            type: 'file',
        },
    ];

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="w-full transition-all ease-in">
            <div className="bg-orange-50 z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
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
                    accept={field.accept}
                    onChange={handleChange}
                    className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? 'pl-3 pr-10' : 'px-3'} w-full border-[0.01rem] border-[#858585] bg-transparent`}
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
    ));

    return (
        <div className="p-6 w-full bg-orange-50 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-orange-600 mb-6 text-center">
                Upload Your Documents
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
                    {fileElements}

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                            onClick={() => {
                                setFiles(initialFiles);
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
