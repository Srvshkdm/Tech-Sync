class GovService {
    async getGovOfficial(id) {
        try {
            const res = await fetch(`/api/v1/officals/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log(
                'error in get gov official service, error:',
                err.message
            );
            throw err;
        }
    }
}

export const govService = new GovService();
