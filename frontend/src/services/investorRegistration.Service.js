class InvestorRegistrationService {
    async submitInvestorApplication(data) {
        try {
            // Map the frontend data structure to match backend expectations
            const payload = {
                // Personal Information
                investorType: data.personalInformation.investorType,
                organisationName:
                    data.personalInformation.organizationName || '',
                dateOfBirth: data.personalInformation.dateOfBirth,
                address: data.personalInformation.address,
                nationality: data.personalInformation.nationality,
                linkedInURL: data.personalInformation.linkedIn || '',

                // Financial Information
                revenue: data.financialInformation.revenue,
                netWorth: data.financialInformation.netWorth,
                businessLicenseNumber:
                    data.financialInformation.businessLicenseNumber || '',
                taxId: data.financialInformation.taxPayerIdentification,
                govtIdtype: data.financialInformation.idType,
                govtIdValue: data.financialInformation.idValue,

                // Banking Information
                bankName: data.bankingInformation.bankName,
                accountNumber: data.bankingInformation.accountNumber,
                accountType: data.bankingInformation.accountType,
                ifscCode: data.bankingInformation.ifscCode,
                branchName: data.bankingInformation.branchName,
                swiftCode: data.bankingInformation.swiftCode,
            };

            console.log('Sending payload:', payload);

            const res = await fetch('/api/v1/investments/become-a-investor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            let result;
            try {
                result = await res.json();
            } catch (e) {
                console.error('Failed to parse response as JSON');
                const text = await res.text();
                console.error('Response text:', text);
                throw new Error('Server returned invalid response');
            }

            console.log('Response status:', res.status);
            console.log('Response result:', result);

            if (res.status === 500 || res.status === 400) {
                console.error('Server error details:', result);
                throw new Error(
                    result.message || 'Failed to submit investor application'
                );
            }

            // Clear localStorage after successful submission
            localStorage.removeItem('InvestorPersonalInfo');
            localStorage.removeItem('InvestorFinancialInfo');
            localStorage.removeItem('InvestorBankingInfo');
            localStorage.removeItem('InvestorDocuments');

            return result;
        } catch (err) {
            console.error(
                'Error in submitInvestorApplication service:',
                err.message
            );
            throw err;
        }
    }
}

export const investorRegistrationService = new InvestorRegistrationService();
