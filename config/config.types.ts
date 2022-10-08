import { EthyleneConnectionType } from '@ethylene/types';
import { CHAIN_NAMESPACES } from '@web3auth/base';

/* Add your custom type definitions */
export type ExtraConfig = {};

export type BaseConfig<TExtra> = {
  APP: string;
  APP_DESCRIPTION: string;
  CONNECTION: EthyleneConnectionType;
  FONT_FAMILY: string;
  INITIAL_THEME: 'dark' | 'light';
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
