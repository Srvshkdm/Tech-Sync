import { createContext, useContext, useState } from 'react';

const ProfileDropdownContext = createContext();

export const ProfileDropdownContextProvider = ({ children }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    return (
        <ProfileDropdownContext.Provider
            value={{ showProfileDropdown, setShowProfileDropdown }}
        >
            {children}
        </ProfileDropdownContext.Provider>
    );
};

export function useProfileDropdownContext() {
    return useContext(ProfileDropdownContext);
}
