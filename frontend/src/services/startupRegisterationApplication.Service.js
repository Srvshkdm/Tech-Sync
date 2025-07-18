class StartupRegistrationApplicationService {
    async startApplication() {
        try {
            const res = await fetch(`/api/v1/applications/start`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in starting startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }
    async getApplication(userId, appId) {
        try {
            const res = await fetch(
                `/api/v1/applications/application/${userId}/${appId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in getting startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }
    async getApplications(userId) {
        try {
            const res = await fetch(`/api/v1/applications/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in getting startup registeration applications service: ${err.message}`
            );

            throw err;
        }
    }

    async markApplicationComplete(applicationId) {
        try {
            const res = await fetch(
                `/api/v1/applications/complete/${applicationId}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            );
            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data);
            }
            return data;
        } catch (err) {
            console.error(
                `error in marking complete startup registeration application service: ${err.message}`
            );

            throw err;
        }
    }

    async submitApplication(applicationData) {
        try {
            const res = await fetch('/api/v1/applications/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(applicationData),
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 500 || !res.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }
            return data;
        } catch (err) {
            console.error(
                `error in submitting startup registration application: ${err.message}`
            );
            throw err;
        }
    }
}

export const startupRegistrationApplicationService =
    new StartupRegistrationApplicationService();
