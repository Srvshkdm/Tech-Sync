class OwnerService {
    async getOwner(id) {
        try {
            const res = await fetch(`/api/v1/owners/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in getting owner service: ${err.message}`);
            throw err;
        }
    }
}

export const ownerService = new OwnerService();
