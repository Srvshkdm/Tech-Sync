import AYUSHLOGO from '../../assets/images/ayushLogo.png';
import GOVINDIAIMAGE from '../../assets/images/govIndiaLogo.png';
import { icons } from '../../assets/icons';
import { NavLink } from 'react-router-dom';

export default function StartupHeader() {
    const tabs = [
        { url: '', name: 'Home' },
        { url: 'register', name: 'Status' },
    ];
    const tabElements = tabs.map((tab) => (
        <NavLink
            to={tab.url}
            end
            key={tab.name}
            className={({ isActive }) =>
                `${isActive && 'underline'} hover:underline text-[#f9f9f9] font-medium text-md max-sm:hidden`
            }
        >
            {tab.name}
        </NavLink>
    ));
    return (
        <div className="h-[110px]">
            <div className="drop-shadow-md h-[70px] bg-[#f9f9f9] flex items-center justify-between w-full px-4 py-[5px]">
                <img
                    src={GOVINDIAIMAGE}
                    alt="gov india image"
                    className="object-cover h-full"
                />
                <img
                    src={AYUSHLOGO}
                    alt="gov india image"
                    className="object-cover rounded-full size-[60px]  max-md:hidden"
                />
            </div>
            <div className="drop-shadow-md bg-[#f68533] h-[40px] flex items-center justify-end gap-10 px-4">
                {tabElements}
                <div className="size-[20px] fill-[#f9f9f9]">{icons.search}</div>
            </div>
        </div>
    );
}
