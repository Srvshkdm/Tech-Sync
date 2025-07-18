import React, { useState, useEffect } from 'react';
import { Footer, Header } from '../components';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [startups, setStartups] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredStartups, setFilteredStartups] = useState([]);
    const [filteredInvestors, setFilteredInvestors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sectorFilter, setSectorFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All'); // Default to 'All'
    const [sortOrder, setSortOrder] = useState('desc');
    const [activeTab, setActiveTab] = useState('startups');

    const sectors = [
        'All',
        'Ayurveda',
        'Yoga and Naturopathy',
        'Unani',
        'Siddha',
        'Homoeopathy',
    ];
    const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dummyStartups = [
                    {
                        id: 1,
                        name: 'Ayurveda Solutions',
                        sector: 'Ayurveda',
                        registeredDate: '2024-11-28',
                        status: 'Approved',
                    },
                    {
                        id: 2,
                        name: 'Yoga Harmony',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2024-11-30',
                        status: 'Pending',
                    },
                    {
                        id: 3,
                        name: 'Unani CureTech',
                        sector: 'Unani',
                        registeredDate: '2024-11-25',
                        status: 'Rejected',
                    },
                    {
                        id: 4,
                        name: 'Herbal Healers',
                        sector: 'Siddha',
                        registeredDate: '2023-03-15',
                        status: 'Approved',
                    },
                    {
                        id: 5,
                        name: 'Natural Fitness',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2023-06-12',
                        status: 'Pending',
                    },
                    {
                        id: 6,
                        name: 'Green Remedies',
                        sector: 'Ayurveda',
                        registeredDate: '2023-04-20',
                        status: 'Approved',
                    },
                    {
                        id: 7,
                        name: 'Holistic Health',
                        sector: 'Homoeopathy',
                        registeredDate: '2024-02-10',
                        status: 'Rejected',
                    },
                    {
                        id: 8,
                        name: 'Ancient Solutions',
                        sector: 'Unani',
                        registeredDate: '2024-08-01',
                        status: 'Pending',
                    },
                    {
                        id: 9,
                        name: 'Wellness Works',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2024-09-05',
                        status: 'Approved',
                    },
                    {
                        id: 10,
                        name: 'Herbal Essence',
                        sector: 'Siddha',
                        registeredDate: '2023-11-20',
                        status: 'Rejected',
                    },
                    {
                        id: 11,
                        name: 'ZenLife',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2024-04-15',
                        status: 'Approved',
                    },
                    {
                        id: 12,
                        name: 'Ayurveda Innovations',
                        sector: 'Ayurveda',
                        registeredDate: '2024-07-10',
                        status: 'Rejected',
                    },
                    {
                        id: 13,
                        name: 'Mind & Body Tech',
                        sector: 'Homoeopathy',
                        registeredDate: '2024-06-22',
                        status: 'Pending',
                    },
                    {
                        id: 14,
                        name: 'Pure Health Systems',
                        sector: 'Ayurveda',
                        registeredDate: '2023-10-08',
                        status: 'Approved',
                    },
                    {
                        id: 15,
                        name: 'Naturopathy Hub',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2023-12-03',
                        status: 'Rejected',
                    },
                ];

                const dummyInvestors = [
                    {
                        id: 1,
                        name: 'Investor Group A',
                        sector: 'Technology',
                        registeredDate: '2024-11-01',
                        status: 'Approved',
                    },
                    {
                        id: 2,
                        name: 'Green Capital',
                        sector: 'Agriculture',
                        registeredDate: '2023-07-25',
                        status: 'Pending',
                    },
                    {
                        id: 3,
                        name: 'Wellness Fund',
                        sector: 'Healthcare',
                        registeredDate: '2023-11-10',
                        status: 'Approved',
                    },
                    {
                        id: 4,
                        name: 'Eco Investors',
                        sector: 'Environment',
                        registeredDate: '2024-05-15',
                        status: 'Rejected',
                    },
                    {
                        id: 5,
                        name: 'Innovation Partners',
                        sector: 'Technology',
                        registeredDate: '2023-09-12',
                        status: 'Approved',
                    },
                    {
                        id: 6,
                        name: 'Sustainable Futures',
                        sector: 'Environment',
                        registeredDate: '2024-03-21',
                        status: 'Pending',
                    },
                    {
                        id: 7,
                        name: 'Fitness Investors',
                        sector: 'Healthcare',
                        registeredDate: '2023-12-15',
                        status: 'Rejected',
                    },
                    {
                        id: 8,
                        name: 'Ayurveda Investors',
                        sector: 'Healthcare',
                        registeredDate: '2023-08-10',
                        status: 'Approved',
                    },
                    {
                        id: 9,
                        name: 'GreenTech Ventures',
                        sector: 'Technology',
                        registeredDate: '2024-02-25',
                        status: 'Pending',
                    },
                    {
                        id: 10,
                        name: 'Natural Capital',
                        sector: 'Agriculture',
                        registeredDate: '2024-06-30',
                        status: 'Approved',
                    },
                    {
                        id: 11,
                        name: 'Yoga Investors',
                        sector: 'Healthcare',
                        registeredDate: '2023-10-05',
                        status: 'Rejected',
                    },
                    {
                        id: 12,
                        name: 'Herbal Ventures',
                        sector: 'Agriculture',
                        registeredDate: '2024-08-01',
                        status: 'Approved',
                    },
                    {
                        id: 13,
                        name: 'Digital Fitness Fund',
                        sector: 'Technology',
                        registeredDate: '2023-04-18',
                        status: 'Pending',
                    },
                    {
                        id: 14,
                        name: 'Eco Life Partners',
                        sector: 'Environment',
                        registeredDate: '2024-01-20',
                        status: 'Rejected',
                    },
                    {
                        id: 15,
                        name: 'Health First Ventures',
                        sector: 'Healthcare',
                        registeredDate: '2023-06-22',
                        status: 'Approved',
                    },
                ];

                // Sort the datasets by registration date (descending)
                const sortedStartups = dummyStartups.sort(
                    (a, b) =>
                        new Date(b.registeredDate) - new Date(a.registeredDate)
                );
                const sortedInvestors = dummyInvestors.sort(
                    (a, b) =>
                        new Date(b.registeredDate) - new Date(a.registeredDate)
                );

                await new Promise((resolve) => setTimeout(resolve, 1000));
                setStartups(sortedStartups);
                setInvestors(sortedInvestors);
                setFilteredStartups(sortedStartups);
                setFilteredInvestors(sortedInvestors);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterAndSortData = (data) => {
            let filteredData = data;

            if (sectorFilter !== 'All') {
                filteredData = filteredData.filter(
                    (item) => item.sector === sectorFilter
                );
            }

            if (statusFilter !== 'All') {
                filteredData = filteredData.filter(
                    (item) => item.status === statusFilter
                );
            }

            if (searchTerm) {
                filteredData = filteredData.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            return filteredData.sort(
                (a, b) =>
                    new Date(b.registeredDate) - new Date(a.registeredDate)
            );
        };

        if (activeTab === 'startups') {
            setFilteredStartups(filterAndSortData(startups));
        } else {
            setFilteredInvestors(filterAndSortData(investors));
        }
    }, [
        sectorFilter,
        statusFilter,
        searchTerm,
        sortOrder,
        startups,
        investors,
        activeTab,
    ]);

    const handleSortToggle = () => {
        setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
        const sortedData = (data) =>
            [...data].sort((a, b) =>
                sortOrder === 'asc'
                    ? new Date(a.registeredDate) - new Date(b.registeredDate)
                    : new Date(b.registeredDate) - new Date(a.registeredDate)
            );
        if (activeTab === 'startups') {
            setFilteredStartups(sortedData(filteredStartups));
        } else {
            setFilteredInvestors(sortedData(filteredInvestors));
        }
    };

    const renderTable = (data) => (
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                        <th className="px-6 py-4 border-b">S.ID</th>
                        <th className="px-6 py-4 border-b">Name</th>
                        <th className="px-6 py-4 border-b">Sector</th>
                        <th
                            className="px-6 py-4 border-b cursor-pointer hover:opacity-80"
                            onClick={handleSortToggle}
                        >
                            Registered Date {sortOrder === 'desc' ? '↓' : '↑'}
                        </th>
                        <th className="px-6 py-4 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-gray-200`}
                            >
                                <td className="px-6 py-4 border">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border">
                                    <Link
                                        to={`/document-check/${activeTab}/${item.id}`}
                                        className="text-blue-700 hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 border">
                                    {item.sector}
                                </td>
                                <td className="px-6 py-4 border">
                                    {item.registeredDate}
                                </td>
                                <td className="px-6 py-4 border">
                                    <span
                                        className={`block w-full text-center px-3 py-2 rounded-3xl text-sm font-medium ${
                                            item.status === 'Approved'
                                                ? 'bg-green-500 text-white'
                                                : item.status === 'Pending'
                                                  ? 'bg-yellow-500 text-black'
                                                  : 'bg-red-500 text-white'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center text-gray-500 py-6"
                            >
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
                <header className="bg-[#fb9247] text-white py-6 shadow-md">
                    <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-4">
                        <h1 className="text-3xl font-semibold tracking-wide">
                            Admin Dashboard
                        </h1>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 text-sm rounded-md border border-gray-300 shadow-sm text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="px-4 py-2 text-sm rounded-md border border-gray-300 shadow-sm text-black"
                                value={sectorFilter}
                                onChange={(e) =>
                                    setSectorFilter(e.target.value)
                                }
                            >
                                {sectors.map((sector) => (
                                    <option key={sector} value={sector}>
                                        {sector}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-4 ">
                            <button
                                onClick={() => setActiveTab('startups')}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-transform ${
                                    activeTab === 'startups'
                                        ? 'bg-[#f68533] text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Startups
                            </button>
                            <button
                                onClick={() => setActiveTab('investors')}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-transform ${
                                    activeTab === 'investors'
                                        ? 'bg-[#f68533] text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Investors
                            </button>
                        </div>
                        <select
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 shadow-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">
                        {activeTab === 'startups' ? 'Startups' : 'Investors'}{' '}
                        Documents
                    </h2>

                    {loading ? (
                        <div className="text-center text-[#f68533] font-medium">
                            Loading...
                        </div>
                    ) : activeTab === 'startups' ? (
                        renderTable(filteredStartups)
                    ) : (
                        renderTable(filteredInvestors)
                    )}
                </main>
            </div>
        </div>
    );
}
