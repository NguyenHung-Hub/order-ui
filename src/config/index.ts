import dotenv from 'dotenv';
// dotenv.config();

const config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    DOMAIN: import.meta.env.VITE_API_DOMAIN,
    PORT: import.meta.env.VITE_API_PORT,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR,
    SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
};

console.log(config.PROD);

export default config;
