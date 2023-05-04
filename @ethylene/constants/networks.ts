import { EthyleneNetwork } from '@ethylene/types/app';

export const AVAX_FUJI_C_CHAIN: EthyleneNetwork = {
    chainId: '0xa869',
    name: 'Avalanche Fuji C Chain',
    nativeCurrency: { decimals: 18, name: 'AVAX', symbol: 'AVAX' },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    type: 'testnet',
};

export const AVAX_MAINNET: EthyleneNetwork = {
    chainId: '0xa86a',
    name: 'Avalanche',
    nativeCurrency: { decimals: 18, name: 'AVAX', symbol: 'AVAX' },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    type: 'mainnet',
};

export const ETHEREUM_MAINNET: EthyleneNetwork = {
    chainId: '0x1',
    name: 'Ethereum',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    type: 'mainnet',
};

export const GEORLI: EthyleneNetwork = {
    chainId: '0x5',
    name: 'Georli Testnet',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    type: 'testnet',
};

export const BSC_MAINNET: EthyleneNetwork = {
    chainId: '0x38',
    name: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Binance Chain Native Token',
        symbol: 'BNB',
    },
    rpcUrls: [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed2.defibit.io',
        'https://bsc-dataseed3.defibit.io',
        'https://bsc-dataseed4.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed2.ninicoin.io',
        'https://bsc-dataseed3.ninicoin.io',
        'https://bsc-dataseed4.ninicoin.io',
    ],
    type: 'mainnet',
};

export const BSC_TESTNET: EthyleneNetwork = {
    chainId: '0x61',
    name: 'Binance Smart Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Binance Chain Native Token',
        symbol: 'tBNB',
    },
    rpcUrls: [
        'https://data-seed-prebsc-1-s1.binance.org:8545',
        'https://data-seed-prebsc-2-s1.binance.org:8545',
        'https://data-seed-prebsc-1-s2.binance.org:8545',
        'https://data-seed-prebsc-2-s2.binance.org:8545',
        'https://data-seed-prebsc-1-s3.binance.org:8545',
        'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    type: 'testnet',
};

export const POLYGON_MAINNET: EthyleneNetwork = {
    chainId: '0x89',
    name: 'Polygon',
    nativeCurrency: { decimals: 18, name: 'Matic', symbol: 'MATIC' },
    rpcUrls: ['https://polygon-rpc.com'],
    type: 'mainnet',
};

export const MUMBAI_TESTNET: EthyleneNetwork = {
    chainId: '0x13881',
    name: 'Mumbai',
    nativeCurrency: { decimals: 18, name: 'Matic', symbol: 'MATIC' },
    rpcUrls: ['https://mumbai.polygonscan.com'],
    type: 'testnet',
};
