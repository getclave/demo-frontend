import type { BaseConfig, ExtraConfig } from 'config/config.types';

const EXTRA_CONFIG = {
    PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY
        ? process.env.NEXT_PUBLIC_PRIVATE_KEY
        : '',
    RPC_URL: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_FOR_SEPOLIA}`,
};

export const CONFIG: BaseConfig<ExtraConfig> = {
    APP: 'ClaveKit', // ! Do not use names with space, only use valid variable names !
    APP_DESCRIPTION: 'ClaveKit',
    APP_LOGO: '',
    APP_LOGO_DARK: '',
    APP_LOGO_SM: '',
    APP_LOGO_SM_DARK: '',
    FAVICON_PATH: '/favicon.ico', // Root located at /public
    FONT_FAMILY: '"Prompt", sans-serif',
    INITIAL_THEME: 'dark',
    MORALIS: {
        API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        ENABLED: true,
    },
    REMEMBER_ME: true,
    ...EXTRA_CONFIG,
};
