import { createContext, useContext, useState } from 'react';

const RegisterStartupContext = createContext();

export const RegisterStartupContextProvider = ({ children }) => {
    const [existingApp, setExistingApp] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [totalData, setTotalData] = useState({
        personal: {
            data: null,
            status: 'pending',
        },
        organization: { data: null, status: 'pending' },
        financial: { data: null, status: 'pending' },
        banking: { data: null, status: 'pending' },
        documents: { data: null, status: 'pending' },
        reviewd: { status: 'pending' },
    });

    return (
        <RegisterStartupContext.Provider
            value={{
                existingApp,
                setExistingApp,
                currentStep,
                setCurrentStep,
                totalData,
                setTotalData,
                completedSteps,
                setCompletedSteps,
            }}
        >
            {children}
        </RegisterStartupContext.Provider>
    );
};

export function useRegisterStartupContext() {
    return useContext(RegisterStartupContext);
}
