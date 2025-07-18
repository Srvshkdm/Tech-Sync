// Utility to clear all startup application data from localStorage
export const clearStartupApplicationData = (userId) => {
    const keysToRemove = [
        `${userId}_StartupOwnerPersonalInfo`,
        `${userId}_StartupOwnerOrganizationInfo`,
        `${userId}_StartupOwnerFinancialInfo`,
        `${userId}_StartupOwnerBankingInfo`,
        `${userId}_StartupOwnerDocuments`,
        `${userId}_StartupOwnerReview`,
        `${userId}_UploadedDocs`,
        `${userId}_ApplicationSubmitted`,
        `${userId}_MockStartupApplication`,
    ];

    keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
    });

    console.log('All startup application data cleared for user:', userId);
    return true;
};

// Clear all application data for all users (use carefully)
export const clearAllApplicationData = () => {
    const keysToRemove = [];

    // Find all keys related to startup applications
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
            key &&
            (key.includes('_StartupOwner') ||
                key.includes('_ApplicationSubmitted') ||
                key.includes('_UploadedDocs') ||
                key.includes('_MockStartupApplication'))
        ) {
            keysToRemove.push(key);
        }
    }

    // Remove all found keys
    keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
    });

    console.log(`Cleared ${keysToRemove.length} application data entries`);
    return keysToRemove.length;
};
