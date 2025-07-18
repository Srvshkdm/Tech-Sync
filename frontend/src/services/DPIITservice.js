class DPIITService {
    async getDPIITdetails(inputs) {
        try {
            const res = await fetch(
                `/api/v1/startups/register-DPIIT/${inputs.id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ password: inputs.password }),
                }
            );

            let data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log(
                `error in getting details from DPIIT id: ${err.message}`
            );
            throw err;
        }
    }
}

export const DPIITservice = new DPIITService();
