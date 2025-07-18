import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { fileRestrictions } from '../../utils';
import { useUserContext, useRegisterInvestorContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';
import { uploadOnS3Service } from '../../services';

export default function InvestorDocuments() {
    const { setCompletedSteps, setTotalData, totalData, setCurrentStep } =
        useRegisterInvestorContext();
    const { user } = useUserContext();

    const [documents, setDocuments] = useState({
        organizationImage: {
            s3Name: null,
            FileName: null,
        },
        taxId: { s3Name: null, FileName: null },
        governmentIdProof: { s3Name: null, FileName: null },
        bankStatements: { s3Name: null, FileName: null },
        businessDocuments: { s3Name: null, FileName: null },
    });

    const [uploadedDocs, setUploadedDocs] = useState({
        organizationImage: {
            s3Name: null,
            signedUrl: null,
        },
        taxId: { s3Name: null, signedUrl: null },
        governmentIdProof: { s3Name: null, signedUrl: null },
        bankStatements: { s3Name: null, signedUrl: null },
        businessDocuments: { s3Name: null, signedUrl: null },
    });

    useEffect(() => {
        setCurrentStep(4);

        const savedData = localStorage.getItem(`InvestorDocuments`);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setDocuments(parsedData);

            // Also restore uploadedDocs state from saved data
            setUploadedDocs({
                organizationImage: parsedData.organizationImage || {
                    s3Name: null,
                    signedUrl: null,
                },
                taxId: parsedData.taxId || { s3Name: null, signedUrl: null },
                governmentIdProof: parsedData.governmentIdProof || {
                    s3Name: null,
                    signedUrl: null,
                },
                bankStatements: parsedData.bankStatements || {
                    s3Name: null,
                    signedUrl: null,
                },
                businessDocuments: parsedData.businessDocuments || {
                    s3Name: null,
                    signedUrl: null,
                },
            });
        }
    }, []);

    const initialErrors = {
        organizationImage: '',
        taxId: '',
        governmentIdProof: '',
        bankStatements: '',
        businessDocuments: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    function onMouseOver() {
        if (Object.values(documents).some((value) => !value)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all documents are uploaded
        const allDocsUploaded =
            uploadedDocs.organizationImage.signedUrl &&
            uploadedDocs.taxId.signedUrl &&
            uploadedDocs.governmentIdProof.signedUrl &&
            uploadedDocs.bankStatements.signedUrl &&
            uploadedDocs.businessDocuments.signedUrl;

        if (!allDocsUploaded) {
            alert('Please upload all required documents before proceeding.');
            return;
        }

        setCompletedSteps((prev) => [...prev, 'documents']);
        // Save complete document objects with all metadata
        const setData = {
            bankStatements: uploadedDocs.bankStatements,
            taxId: uploadedDocs.taxId,
            businessDocuments: uploadedDocs.businessDocuments,
            governmentIdProof: uploadedDocs.governmentIdProof,
            organizationImage: uploadedDocs.organizationImage,
        };
        setDocuments(setData);
        setTotalData((prev) => ({
            ...prev,
            documents: { data: setData, status: 'complete' },
        }));
        localStorage.setItem(
            `InvestorDocuments`,
            JSON.stringify({ ...setData, documentsStatus: 'complete' })
        );
        navigate(`/become-investor/${user._id}/review`);
    };

    const handleChange = async (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            setDocuments({
                ...documents,
                [name]: file,
            });
            // fileRestrictions(file, name, setErrors);
            await uploadToBackend(file, name); // Automatically upload the file to the backend as soon as it's selected
        }
    };

    const uploadToBackend = async (file, docName) => {
        if (Object.values(errors).some((value) => value)) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Appending the file as expected by the backend
        formData.append('Documentname', docName);
        formData.append('userId', user._id); // Adding the userId as part of the form data

        try {
            const res = await uploadOnS3Service.uploadDocuments(formData);
            if (res && res.signedUrl) {
                console.log(res);
                // Assuming the backend provides a signed URL for S3 access
                setUploadedDocs({
                    ...uploadedDocs,
                    [docName]: {
                        s3Name: res.FileName,
                        signedUrl: res.signedUrl,
                    },
                });

                setDocuments({
                    ...documents,
                    [docName]: {
                        s3Name: res.FileName,
                        FileName: res.document.name,
                    },
                });
                alert('Document uploaded successfully!');
            } else {
                alert('Failed to get document URL from server.');
            }
        } catch (error) {
            navigate('/server-error');
        }
    };

    const handleViewDocument = (docName) => {
        const url = uploadedDocs[docName]?.signedUrl;
        if (url) {
            window.open(url, '_blank'); // Open the document URL in a new tab
        } else {
            alert('Document not found.');
        }
    };

    const handleDeleteDocument = async (docName) => {
        const s3Name = documents[docName].s3Name;
        // Ensure s3Name is correct and exists
        if (!s3Name) {
            alert('Document not found.');
        } else {
            try {
                const res = await uploadOnS3Service.deleteDocument(
                    s3Name,
                    docName
                );
                if (res) {
                    setDocuments((prevDocs) => ({
                        ...prevDocs,
                        [docName]: { s3Name: null, FileName: null }, // Clear the deleted document
                    }));
                    setUploadedDocs((prevUploaded) => ({
                        ...prevUploaded,
                        [docName]: { s3Name: null, signedUrl: null }, // Clear the uploaded document's URL
                    }));

                    alert(`Document ${docName} deleted successfully!`);
                } else {
                    alert('Failed to delete document.');
                }
            } catch (error) {
                navigate('/server-error');
            }
        }
    };

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
            <div className="w-full flex items-center justify-end gap-4 mt-4">
                <Button
                    className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                    onClick={() => handleViewDocument(field.name)}
                    btnText="View"
                />
                <Button
                    className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
                    onClick={() => handleDeleteDocument(field.name)}
                    btnText="Delete"
                />
            </div>
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

                <form
                    className="flex flex-col items-start justify-center gap-1 w-full"
                    onSubmit={handleSubmit}
                >
                    {fileElements}

                    {/* buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button
                            className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
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
