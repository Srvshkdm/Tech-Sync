import { useContext, createContext } from 'react';

const VariantContext = createContext();

export const VariantContextProvider = ({ children }) => {
    // variants
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' },
        },
    };
    const iconVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.4, ease: 'easeOut' },
        }),
    };

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

    return (
        <VariantContext.Provider
            value={{ textVariants, iconVariants, dropdownVariants }}
        >
            {children}
        </VariantContext.Provider>
    );
};

export function useVariantContext() {
    return useContext(VariantContext);
}
