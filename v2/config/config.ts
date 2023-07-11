/**
 * ! Do not use this private key in production, it is only for demo purposes
 * ! This private key does not work
 */
const PRIVATEKEY =
    '0de499506f74353e0d2032a81b6c93806cb7458dc65eaf9ca7fa46f5b6f172b9';

/**
 * ! This Alchemy key is not work
 */
const ALCHEMY_KEY = 'pM-NCzrzuFgZxHj-ICsFWfElwcM1s8_Y';
const API_URL = 'https://sealapi.ethylene.io/account';

export const CONFIG: { [key: string]: string } = {
    PRIVATE_KEY: PRIVATEKEY,
    ALCHEMY_KEY: ALCHEMY_KEY,
    API_URL: API_URL,
};
