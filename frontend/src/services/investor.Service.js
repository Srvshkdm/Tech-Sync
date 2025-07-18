class InvestorService {
    async getInvestor(id) {
        try {
            const res = await fetch(`/api/v1/investors/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log('error in get investor service, error:', err.message);
            throw err;
        }
    }

    async checkInvestorExists() {
        try {
            const res = await fetch(
                '/api/v1/investments/check-investor-exists',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include auth cookies
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(
                    data.message || 'Failed to check investor existence'
                );
            }
            return data;
        } catch (err) {
            console.log(
                'error in check investor exists service, error:',
                err.message
            );
            throw err;
        }
    }

    async getInvestorDetails(investorId) {
        try {
            const res = await fetch(
                `/api/v1/investments/investors/${investorId}/details`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(
                    data.message || 'Failed to fetch investor details'
                );
            }
            return data;
        } catch (err) {
            console.log(
                'error in get investor details service, error:',
                err.message
            );
            throw err;
        }
    }
}

export const investorService = new InvestorService();
