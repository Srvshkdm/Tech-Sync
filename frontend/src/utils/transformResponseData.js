export function transformResponseData(serverResponse) {
    const { owner, startup, financialInfo, bankInfo, documents } =
        serverResponse;

    // Extract personal and organization info from owner
    const personalInfo = {
        fullName: owner.userId.fullName || '',
        email: owner.userId.email || '',
        phoneNumber: owner.userId.phoneNumber || '',
        dateOfBirth: owner.dateOfBirth || '',
        address: owner.address || '',
        nationality: owner.nationality || '',
        linkedInURL: owner.linkedInURL || '',
    };

    const organizationInfo = {
        startupName: startup.startupName || '',
        description: startup.description || '',
        businessType: startup.businessType || '',
        industry: startup.industry || '',
        address: startup.address || '',
        country: startup.country || '',
        website: startup.website || '',
    };

    // Extract financial info
    const extractedFinancialInfo = {
        revenue: financialInfo.revenue || 0,
        profitMargin: financialInfo.profitMargin || 0,
        fundingReceived: financialInfo.fundingReceived || 0,
        valuation: financialInfo.valuation || 0,
        financialYear: financialInfo.financialYear || '',
    };

    // Extract banking info
    const extractedBankingInfo = {
        bankName: bankInfo.bankName || '',
        accountNumber: bankInfo.accountNumber || '',
        accountType: bankInfo.accountType || '',
        IFSC: bankInfo.IFSC || '',
        branchName: bankInfo.branchName || '',
        swiftCode: bankInfo.swiftCode || '',
    };

    // Handle documents data
    const extractedDocuments = {
        startupLogo: documents.startupLogo || '',
        balanceSheet: documents.balanceSheet || '',
        governmentIdProof: documents.governmentIdProof || '',
        GSTCertificate: documents.GSTCertificate || '',
        businessDocuments: documents.businessDocuments || '',
    };

    return {
        personalInfo,
        organizationInfo,
        financialInfo: extractedFinancialInfo,
        bankingInfo: extractedBankingInfo,
        documents: extractedDocuments,
    };
}
