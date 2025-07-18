import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Header } from '../components';

export default function DocumentsCheck() {
    const { id } = useParams();
    const location = useLocation();
    const [documents, setDocuments] = useState([]);
    const [entityInfo, setEntityInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [decisions, setDecisions] = useState({});
    const [rejectionMessages, setRejectionMessages] = useState({});
    const [checked, setChecked] = useState(false);
    const [showActions, setShowActions] = useState({}); // Track visibility for actions per document

    const isStartup = location.pathname.includes('startups');

    useEffect(() => {
        const fetchEntityData = async () => {
            try {
                const dummyStartups = {
                    1: {
                        name: 'Ayurveda Solutions',
                        logo: 'https://st2.depositphotos.com/1810600/5838/v/450/depositphotos_58387439-stock-illustration-abstract-vector-logo.jpg',
                        founder: 'Ramesh Kumar',
                        headquarters: 'Pune, India',
                        valuation: '$2M',
                        sector: 'Ayurveda',
                        totalFunding: '$500K',
                        annualRevenue: '$1M',
                        employees: 50,
                        industry: 'Health & Wellness',
                        documents: [
                            {
                                id: 1,
                                name: 'Business_Plan_Ayurveda.pdf',
                                type: 'PDF',
                                size: '2 MB',
                            },
                            {
                                id: 2,
                                name: 'Financial_Report_2023.pdf',
                                type: 'PDF',
                                size: '3 MB',
                            },
                            {
                                id: 3,
                                name: 'Compliance_Documents.pdf',
                                type: 'PDF',
                                size: '1.5 MB',
                            },
                        ],
                    },
                };

                await new Promise((resolve) => setTimeout(resolve, 1000));
                const data = isStartup ? dummyStartups[id] : null;
                setEntityInfo(data);
                setDocuments(data ? data.documents : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntityData();
    }, [id, isStartup]);

    const handleAcceptReject = (docId, decision) => {
        setDecisions((prev) => ({ ...prev, [docId]: decision }));
    };

    const handleRejectionMessageChange = (docId, message) => {
        setRejectionMessages((prev) => ({ ...prev, [docId]: message }));
    };

    const handleFinalCheck = () => {
        setChecked(true);
        alert('Documents have been reviewed and final decision has been made.');
    };

    const toggleDocumentActions = (docId) => {
        setShowActions((prev) => ({ ...prev, [docId]: !prev[docId] }));
    };

    const handleViewDocument = (docName) => {
        alert(`Viewing ${docName}`); // This could open a modal or preview functionality
    };

    const handleDownloadDocument = (docName) => {
        alert(`Downloading ${docName}`); // This could trigger a download action
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gradient-to-r from-[#f68533] to-purple-600 py-8 shadow-lg">
                <div className="container mx-auto px-6 flex items-center justify-center md:justify-start">
                    {entityInfo?.logo && (
                        <img
                            src={entityInfo.logo}
                            alt={`${entityInfo.name} Logo`}
                            className="w-16 h-16 rounded-full border-4 border-white mr-4 shadow-md"
                        />
                    )}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                        {entityInfo?.name}
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10">
                {loading ? (
                    <div className="text-center text-orange-500 font-semibold text-xl animate-pulse">
                        Loading {isStartup ? 'startup' : 'investor'} details...
                    </div>
                ) : entityInfo ? (
                    <div className="bg-white text-gray-800 shadow-xl rounded-lg p-8">
                        <h3 className="text-3xl font-bold text-orange-500 mb-6 text-center uppercase tracking-wide">
                            General Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {[
                                ['Founder', entityInfo.founder],
                                ['Headquarters', entityInfo.headquarters],
                                ['Valuation', entityInfo.valuation],
                                ['Sector', entityInfo.sector],
                                ['Total Funding', entityInfo.totalFunding],
                                ['Annual Revenue', entityInfo.annualRevenue],
                                ['Employees', entityInfo.employees],
                                ['Industry', entityInfo.industry],
                            ].map(([title, value], index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white border-2 border-blue-200 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl"
                                >
                                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-black font-medium">
                                        {value || 'Unknown'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-3xl font-bold text-orange-500 mb-6 text-center uppercase tracking-wide">
                                Uploaded Documents
                            </h3>
                            {documents.length > 0 ? (
                                <ul className="divide-y divide-gray-300">
                                    {documents.map((doc) => (
                                        <li
                                            key={doc.id}
                                            className="flex flex-wrap justify-between items-center py-4"
                                        >
                                            {/* Document Info */}
                                            <div className="w-full sm:w-auto flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    {doc.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {doc.type} - {doc.size}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-full sm:w-auto flex justify-end sm:justify-center mt-4 sm:mt-0 space-x-4">
                                                <a
                                                    href={doc.name}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-700 underline"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={doc.name}
                                                    download
                                                    className="text-blue-500 hover:text-blue-700 underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-lg font-bold text-orange-500">
                                    No documents available.
                                </p>
                            )}
                        </div>

                        {!checked && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleFinalCheck}
                                    className="bg-[#f68533] text-white p-3 rounded-lg hover:bg-[#df6f1f] transition duration-300"
                                >
                                    Final Check
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-red-500 font-bold text-xl">
                        {isStartup ? 'Startup' : 'Investor'} not found.
                    </div>
                )}
            </main>
        </div>
    );
}
