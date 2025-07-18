class UserService {
    async login(inputs) {
        try {
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in login service: ${err.message}`);
            throw err;
        }
    }

    async register(inputs) {
        try {
            const res = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...inputs,
                    redirectURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/user/verify`,
                }),
            });

            let data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in register service: ${err.message}`);
            throw err;
        }
    }

    async verifyEmail(userId, uniqueString) {
        try {
            const res = await fetch(
                `/api/v1/users/verify-email/${userId}/${uniqueString}`,
                {
                    method: 'GET',
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
                `error in email verification service: ${err.message}`
            );

            throw err;
        }
    }

    async logout() {
        try {
            const res = await fetch('/api/v1/users/logout', {
                method: 'PATCH',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in logout service: ${err.message}`);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            const res = await fetch('/api/v1/users', {
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
            console.error(`error in getCurrentUser service: ${err.message}`);
            throw err;
        }
    }

    async requestResetPassword(email) {
        try {
            const res = await fetch('/api/v1/users/request-reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    redirectURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/user/reset-password`,
                }),
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(
                `error in request reset password service: ${err.message}`
            );
            throw err;
        }
    }

    async resetPassword(resetString, newPassword) {
        try {
            const res = await fetch('/api/v1/users/reset-password', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // userId,
                    resetString,
                    newPassword,
                }),
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error(`error in reset password service: ${err.message}`);
            throw err;
        }
    }
}

export const userService = new UserService();
