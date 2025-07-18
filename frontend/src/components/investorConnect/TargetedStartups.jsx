import { StartupCard } from '..';

export default function TargetedStartupsPage() {
    // dummy startups
    const startups = [
        {
            id: 1,
            image: 'https://aatmnirbharsena.org/blog/wp-content/uploads/2020/11/Startup-India-Scheme.jpg',
            title: 'Startup 1',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 2,
            image: 'https://aiia.gov.in/wp-content/uploads/2023/12/Last-Date-31-Jan-2024.png',
            title: 'Startup 2',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 3,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLSjEZ1VQ0hIczoOQ4qoyMx7suYmLJXpaHlg&s',
            title: 'Startup 3',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 4,
            image: 'https://static.investindia.gov.in/s3fs-public/2024-01/Dialogue%20For%20Dynamic%20Change%20Ayush%20Sector%20%26%20Startup%20Roadmap.png',
            title: 'Startup 4',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 5,
            image: 'https://t3.ftcdn.net/jpg/04/90/85/86/360_F_490858673_c9poJOBga9KUVWAWqTUKRePdeA1y6msH.jpg',
            title: 'Startup 5',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 6,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzLVHUwF-xx3-AiHTWsLrEcnNQXbzVTOVaA&s',
            title: 'Startup 6',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
        {
            id: 7,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-TeoCO46WSFaOx1BZdeVjgESNSfX-U3JP-crn8IqvQ6i-Wmq83FkKOEScvgm1Lulxa6Q&usqp=CAU',
            title: 'Startup 7',
            description:
                'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
        },
    ];

    // Pagination
    const targetedStartups = startups.slice(0, 18); // First 6 startups

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-bold text-gray-800 mb-6">
                    Taregted Startups
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {targetedStartups.map((startup) => (
                        <StartupCard
                            key={startup.id}
                            image={startup.image}
                            title={startup.title}
                            description={startup.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
