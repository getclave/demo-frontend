import type { EthyleneConnectionType } from '@ethylene/types';
import type { CHAIN_NAMESPACES } from '@web3auth/base';

/* Add your custom type definitions */
export type ExtraConfig = {
    PRIVATE_KEY: string;
    RPC_URL: string;
};

export type BaseConfig<TExtra> = {
    APP: string;
    APP_DESCRIPTION: string;
    APP_LOGO: string;
    APP_LOGO_DARK: string;
    APP_LOGO_SM: string;
    APP_LOGO_SM_DARK: string;
    CONNECTION: EthyleneConnectionType;
    FAVICON_PATH: string;
    FONT_FAMILY: string;
    INITIAL_THEME: 'dark' | 'light';
    REMEMBER_ME: boolean;
    MORALIS:
        | {
              API_KEY?: string;
              ENABLED: boolean;
          }
        | undefined;
    WALLETCONNECT?: {
        rpc: { [chainId: number]: string };
    };
    WEB3AUTH_CLIENT_ID?: string;
    WEB3AUTH_CHAIN_CONFIG?: {
        chainId: string;
        chainNamespace: typeof CHAIN_NAMESPACES[keyof typeof CHAIN_NAMESPACES];
        rpcTarget: string;
    };
} & TExtra;
