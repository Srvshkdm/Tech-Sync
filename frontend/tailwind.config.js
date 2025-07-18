/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                xxs: '300px',
                xs: '400px',
                '2xl': '1440px',
            },
        },
    },
    plugins: [],
};
