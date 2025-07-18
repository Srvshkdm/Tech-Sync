import { useState, useEffect } from 'react';
import { icons } from '../../assets/icons';
import { fileRestrictions } from '../../utils';
import { useUserContext, useRegisterStartupContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';
import { uploadOnS3Service } from '../../services';

export default function StartupOwnerDocuments() {
    const { setCompletedSteps, setTotalData, setCurrentStep } =
        useRegisterStartupContext();
    const { user } = useUserContext();

    const [documents, setDocuments] = useState({
        startupLogo: {
            s3Name: null,
            FileName: null,
        },
        balanceSheet: { s3Name: null, FileName: null },
        governmentIdProof: { s3Name: null, FileName: null },
        GSTCertificate: { s3Name: null, FileName: null },
        businessDocuments: { s3Name: null, FileName: null },
    });

    const [uploadedDocs, setUploadedDocs] = useState({
        startupLogo: {
            s3Name: null,
            signedUrl: null,
        },
        balanceSheet: { s3Name: null, signedUrl: null },
        governmentIdProof: { s3Name: null, signedUrl: null },
        GSTCertificate: { s3Name: null, signedUrl: null },
        businessDocuments: { s3Name: null, signedUrl: null },
    });

    useEffect(() => {
        setCurrentStep(4);

        // Only try to load saved data if user exists
        if (user && user._id) {
            const savedData = localStorage.getItem(
                `${user._id}_StartupOwnerDocuments`
            );
            const savedUploadedDocs = localStorage.getItem(
                `${user._id}_UploadedDocs`
            );
            if (savedData) {
                setDocuments(JSON.parse(savedData));
            }
            if (savedUploadedDocs) {
                setUploadedDocs(JSON.parse(savedUploadedDocs));
            }
        }
    }, []);

    const initialErrors = {
        startupLogo: '',
        balanceSheet: '',
        governmentIdProof: '',
        GSTCertificate: '',
        businessDocuments: '',
    };
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    function onMouseOver() {
        // Check if all documents have been uploaded (have signedUrl)
        const allDocsUploaded = Object.values(uploadedDocs).every(
            (doc) => doc.signedUrl !== null && doc.signedUrl !== undefined
        );
        setDisabled(!allDocsUploaded);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user exists
        if (!user || !user._id) {
            alert('User session not found. Please login again.');
            return;
        }

        // Check if all documents are uploaded
        const allDocsUploaded = Object.values(uploadedDocs).every(
            (doc) => doc.signedUrl !== null && doc.signedUrl !== undefined
        );

        if (!allDocsUploaded) {
            alert('Please upload all required documents before proceeding.');
            return;
        }

        try {
            setCompletedSteps((prev) => [...prev, 'documents']);
            const setData = {
                GSTCertificate: uploadedDocs.GSTCertificate.signedUrl,
                balanceSheet: uploadedDocs.balanceSheet.signedUrl,
                businessDocuments: uploadedDocs.businessDocuments.signedUrl,
                governmentIdProof: uploadedDocs.governmentIdProof.signedUrl,
                startupLogo: uploadedDocs.startupLogo.signedUrl,
            };
            setDocuments(setData);
            setTotalData((prev) => ({
                ...prev,
                documents: { data: setData, status: 'complete' },
            }));
            localStorage.setItem(
                `${user._id}_StartupOwnerDocuments`,
                JSON.stringify({ ...setData, documentsStatus: 'complete' })
            );

            // Get the current application ID from the URL
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/');
            const appId = pathParts[2]; // Get the app ID from /application/{appId}/documents

            navigate(`/application/${appId}/review`);
        } catch (error) {
            console.error('Error handling documents:', error);
            alert('Failed to save information. Please try again.');
        }
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
        console.log(user._id);
        try {
            const res = await uploadOnS3Service.uploadDocuments(formData);
            if (res && res.signedUrl) {
                console.log(res);
                // Assuming the backend provides a signed URL for S3 access
                const newUploadedDocs = {
                    ...uploadedDocs,
                    [docName]: {
                        s3Name: res.FileName,
                        signedUrl: res.signedUrl,
                    },
                };
                setUploadedDocs(newUploadedDocs);
                localStorage.setItem(
                    `${user._id}_UploadedDocs`,
                    JSON.stringify(newUploadedDocs)
                );

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
                    setUploadedDocs((prevUploaded) => {
                        const newUploadedDocs = {
                            ...prevUploaded,
                            [docName]: { s3Name: null, signedUrl: null }, // Clear the uploaded document's URL
                        };
                        localStorage.setItem(
                            `${user._id}_UploadedDocs`,
                            JSON.stringify(newUploadedDocs)
                        );
                        return newUploadedDocs;
                    });

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
            name: 'startupLogo',
            label: 'Upload Startup Logo',
            required: true,
            icon: icons.image,
            type: 'file',
        },
        {
            name: 'balanceSheet',
            label: 'Upload Balance Sheet',
            required: true,
            icon: icons.money,
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
            name: 'GSTCertificate',
            label: 'Upload GST Registration Certificate',
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
