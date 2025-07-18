import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables for the current mode (e.g., development, production)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': env.VITE_BACKEND_BASE_URL,
            },
        },
    };
});
