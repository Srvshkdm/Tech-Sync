// Mock startup application for testing
export const createMockStartupApplication = (userId) => {
    const mockAppId = `mock_${Date.now()}`;

    // Mock application data
    const mockApplication = {
        _id: mockAppId,
        owner: userId,
        status: 'Under Review',
        createdAt: new Date().toISOString(),
        expireAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
        startupName: 'Mock Ayurveda Startup',
        startupData: {
            personal: {
                fullName: 'Test User',
                email: 'test@example.com',
                phoneNumber: '+91 9876543210',
                dateOfBirth: '1990-01-01',
                address: 'Test Address, India',
                nationality: 'India',
                role: 'Founder',
                qualification: "Bachelor's Degree",
                experience: '5',
            },
            organization: {
                startupName: 'Mock Ayurveda Startup',
                registrationNumber: 'REG123456',
                dateOfIncorporation: '2023-01-01',
                typeOfOrganization: 'Private Limited',
                businessAddress: 'Business Address, India',
                website: 'https://mockstartup.com',
                businessActivities: 'Ayurvedic Products Manufacturing',
            },
            financial: {
                currentRevenue: '10',
                projectedRevenue: '50',
                fundingReceived: 'No',
                currentValuation: '100',
            },
            banking: {
                accountHolderName: 'Mock Startup Pvt Ltd',
                bankName: 'Test Bank',
                accountNumber: '1234567890',
                ifscCode: 'TEST0001234',
                branchName: 'Test Branch',
            },
        },
    };

    return mockApplication;
};

// Store mock application in localStorage
export const storeMockApplication = (userId) => {
    const mockApp = createMockStartupApplication(userId);

    // Store the mock application data
    localStorage.setItem(
        `${userId}_MockStartupApplication`,
        JSON.stringify(mockApp)
    );

    return mockApp;
};
