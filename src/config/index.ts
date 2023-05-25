import dotenv from 'dotenv';
// dotenv.config();

const config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    DOMAIN: import.meta.env.VITE_API_DOMAIN,
    PORT: import.meta.env.VITE_API_PORT,
};

export default config;
