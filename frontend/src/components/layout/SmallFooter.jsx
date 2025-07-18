import { Link } from 'react-router-dom';

export default function SmallFooter() {
    // links
    const links = [
        {
            name: 'Contact Us',
            url: '/contact-us',
        },
        {
            name: 'About Us',
            url: '/about-us',
            className: 'hidden xs:block',
        },
        {
            name: 'Privacy Policy',
            url: 'privacy-policies',
        },
        {
            name: 'Chat Assistance',
            url: '/',
        },
    ];

    const linkElements = links.map((link) => (
        <Link
            key={link.name}
            to={link.url}
            className={`underline ${link.className}`}
        >
            {link.name}
        </Link>
    ));

    return (
        <footer className="overflow-x-scroll bg-[#f9f9f9] drop-shadow-md border-[0.01rem] border-[#dadada] text-[#1b36b2] p-2 sm:px-4 font-medium flex flex-col sm:flex-row-reverse justify-between items-center gap-2 transition-all ease-in">
            <div className="flex justify-evenly text-center gap-2 xs:gap-4 sm:gap-6 lg:gap-8 text-[10px] xxs:text-xs">
                {linkElements}
            </div>

            <div className="text-[8px] xxs:text-[10px] xs:text-[11px] sm:text-xs text-center">
                © 2024 Ministry of AYUSH, Government of India.
            </div>
        </footer>
    );
}
