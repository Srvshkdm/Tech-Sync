import {
    HASHTAG,
    AYUSHLOGOWHITE,
    AYUSHSTARTUPLOGO,
    GOVINDIAIMAGE,
} from '../../assets/images';
import { icons } from '../../assets/icons';
import { NavLink } from 'react-router-dom';
import { Button } from '..';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { copyEmail } from '../../utils';
import { EMAIL, NUMBER1, NUMBER2 } from '../../constants/contacts';

export default function Footer() {
    const [showDropdown, setShowDropdown] = useState(false);

    // Close dropdown on screen resize
    useEffect(() => {
        const handleResize = () => setShowDropdown(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: 'easeIn' },
        },
    };

    // socials
    const socials = [icons.telegram, icons.twitter, icons.youtube];
    const socialElements = socials.map((social, index) => (
        <div
            key={index}
            className="cursor-pointer hover:backdrop-brightness-95 hover:scale-105 transition-all ease-in fill-[#f9f9f9] border-[0.1rem] border-[#f9f9f9] p-[5px] drop-shadow-md rounded-full size-fit"
        >
            <div className="size-[13px] md:size-[20px] lg:size-[25px]">
                {social}
            </div>
        </div>
    ));

    // quick links
    const quickLinks = [
        { url: '', name: 'Home' },
        { url: 'about-us', name: 'About Ministry' },
        { url: 'services', name: 'AYUSH Services' },
        { url: 'faqs', name: 'FAQs' },
        { url: 'contact-us', name: 'Contact Us' },
    ];
    const quickLinkElements = quickLinks.map((link) => (
        <NavLink
            key={link.name}
            to={link.url}
            className={({ isActive }) =>
                `${isActive && 'underline'} hover:underline line-clamp-2`
            }
        >
            {link.name}
        </NavLink>
    ));

    // extra links
    const extraLinks = [
        { url: 'chat', name: 'Chat Assistance' },
        { url: 'privacy-policies', name: 'Privacy Policy' },
        { url: 'terms-conditions', name: 'Terms & Conditions' },
    ];
    const extraLinkElements = extraLinks.map((link) => (
        <NavLink
            key={link.name}
            to={link.url}
            className={({ isActive }) =>
                `${isActive ? 'underline' : ''} hover:underline line-clamp-2`
            }
        >
            {link.name}
        </NavLink>
    ));

    // hamburgur links
    const hamburgurLinkElements = quickLinks.concat(extraLinks).map((tab) => (
        <NavLink
            to={tab.url}
            end
            key={tab.name}
            className={({ isActive }) =>
                `hover:bg-[#f68533] hover:text-[#ffffff] px-2 py-1 text-sm text-[#040606] rounded-md ${
                    isActive && 'bg-[#f68533] text-white'
                }`
            }
        >
            {tab.name}
        </NavLink>
    ));

    // HTML
    return (
        <div className="overflow-hidden">
            <div className="bg-[#f68533] w-full p-2 sm:flex flex-row-reverse justify-between items-center px-[3%] py-4">
                <div className="w-full sm:w-[35%] self-start lg:hidden relative flex flex-col items-center">
                    <div>
                        <Button
                            className="drop-shadow-md rounded-md h-[28px] px-[6px] mb-4 bg-gradient-to-r from-[#f9f9f9] to-[#e1e1e1] hover:to-[#cbcbcb]"
                            onClick={() => setShowDropdown((prev) => !prev)}
                            btnText={
                                <div className="flex items-center justify-center gap-1">
                                    <p className="text-sm">Quick Links</p>
                                    <motion.div
                                        animate={{
                                            rotate: showDropdown ? 180 : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                        className="size-[12px]"
                                    >
                                        {icons.downArrow}
                                    </motion.div>
                                </div>
                            }
                        />
                    </div>
                    {/* Hamburger Dropdown */}
                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                className="text-nowrap z-10 h-[160px] overflow-scroll absolute top-[32px] bg-[#f9f9f9] rounded-lg py-2 flex flex-col gap-y-[2px] px-[5px] drop-shadow-md"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                            >
                                {hamburgurLinkElements}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="hidden sm:block overflow-x-scroll text-sm text-[#f9f9f9] pt-12">
                        <p className="font-medium text-[1rem] mb-[3px]">
                            Contact us :
                        </p>
                        <div className="flex items-center gap-2">
                            <div>
                                <div className="size-[12px] fill-[#f9f9f9]">
                                    {icons.call}
                                </div>
                            </div>
                            <p className="">
                                +91 {NUMBER1}, {NUMBER2}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <div className="size-[12px] fill-[#f9f9f9]">
                                    {icons.mail}
                                </div>
                            </div>
                            <p>{EMAIL}</p>
                            <div
                                className="cursor-pointer hover:scale-125 transition-all ease-in size-[12px] fill-[#f9f9f9]"
                                onClick={copyEmail}
                            >
                                {icons.clipboard}
                            </div>
                        </div>
                    </div>
                </div>

                {/* separator */}
                <div className="hidden sm:block lg:hidden h-[150px] border-r-[0.01rem] border-[#ffae74] rounded-full w-[1px]" />

                {/* links */}
                <div className="w-[40%] hidden lg:flex items-start justify-around gap-4 text-[#f9f9f9]">
                    <div className="flex flex-col gap-2">
                        <h4 className="underline underline-offset-2 text-md font-semibold">
                            Quick Links
                        </h4>
                        <div className="text-[0.9rem] flex flex-col gap-1">
                            {quickLinkElements}
                        </div>
                    </div>

                    <div className="text-[0.95rem] flex flex-col gap-1">
                        {extraLinkElements}
                        <div className="hidden lg:block overflow-x-scroll text-sm mt-2 text-[#f9f9f9]">
                            <p className="font-medium text-[1rem] mb-[3px]">
                                Contact us :
                            </p>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="size-[12px] fill-[#f9f9f9]">
                                        {icons.call}
                                    </div>
                                </div>
                                <p className="">
                                    +91 {NUMBER1}, {NUMBER2}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="size-[12px] fill-[#f9f9f9]">
                                        {icons.mail}
                                    </div>
                                </div>
                                <p>{EMAIL}</p>
                                <div
                                    className="cursor-pointer hover:scale-125 transition-all ease-in size-[12px] fill-[#f9f9f9]"
                                    onClick={copyEmail}
                                >
                                    {icons.clipboard}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* separator */}
                <div className="lg:block hidden h-[150px] border-r-[0.01rem] border-[#ffbf91] rounded-full w-[1px]" />

                <div className="sm:w-[58%] md:w-[55%] lg:w-[50%] xl:w-[40%] sm:flex flex-col h-full sm:gap-4">
                    <div className="mt-2 w-full flex flex-wrap items-center justify-between gap-2">
                        <NavLink
                            to="/"
                            className="hover:scale-105 transition-all ease-in h-[50px] drop-shadow-md"
                        >
                            <img
                                src={AYUSHSTARTUPLOGO}
                                alt="ayush logo"
                                className="size-full object-contain"
                            />
                        </NavLink>

                        <NavLink
                            to="/"
                            className="hover:scale-105 transition-all ease-in size-[50px] xxs:size-[55px] xs:hidden drop-shadow-md"
                        >
                            <img
                                src={AYUSHLOGOWHITE}
                                alt="ayush logo"
                                className="size-full object-contain"
                            />
                        </NavLink>

                        <NavLink
                            to="/"
                            className="hover:scale-105 transition-all ease-in h-[45px] drop-shadow-md"
                        >
                            <img
                                src={GOVINDIAIMAGE}
                                alt="gov india image"
                                className="h-full object-contain"
                            />
                        </NavLink>
                    </div>

                    <div className="flex items-center justify-between gap-2 flex-wrap mt-2 w-full">
                        <div className="flex flex-col items-center gap-[5px]">
                            <p className="text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] text-[#f9f9f9] font-medium">
                                Follow us on:
                            </p>
                            <div className="flex items-center justify-center flex-wrap gap-2">
                                {socialElements}
                            </div>
                        </div>

                        <NavLink
                            to="/"
                            className="hidden sm:block hover:scale-105 transition-all ease-in h-[15%] sm:h-[40px] drop-shadow-md"
                        >
                            <img
                                src={HASHTAG}
                                alt="ayush logo"
                                className="size-full object-contain"
                            />
                        </NavLink>

                        <NavLink
                            to="/"
                            className="hidden xs:block hover:scale-105 transition-all ease-in size-[15%] sm:size-[70px] drop-shadow-md"
                        >
                            <img
                                src={AYUSHLOGOWHITE}
                                alt="ayush logo"
                                className="size-full object-contain"
                            />
                        </NavLink>

                        <div className="sm:hidden overflow-x-scroll text-sm text-[#f9f9f9]">
                            <p className="font-medium text-[1rem] mb-[3px]">
                                Contact us :
                            </p>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="size-[12px] fill-[#f9f9f9]">
                                        {icons.call}
                                    </div>
                                </div>
                                <p className="">
                                    +91 {NUMBER1}, {NUMBER2}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="size-[12px] fill-[#f9f9f9]">
                                        {icons.mail}
                                    </div>
                                </div>
                                <p>{EMAIL}</p>
                                <div
                                    className="cursor-pointer hover:scale-125 transition-all ease-in size-[12px] fill-[#f9f9f9]"
                                    onClick={copyEmail}
                                >
                                    {icons.clipboard}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* copyright */}
            <div className="bg-[#f68533] border-t-[0.01rem] p-2 border-t-[#dadada]">
                <p className="text-[#f9f9f9] text-xs md:text-sm w-full text-center">
                    © 2024 Ministry of AYUSH, Government of India. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
}
