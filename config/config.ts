import { BaseConfig, ExtraConfig } from 'config/config.types';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { ETHEREUM_MAINNET } from '@ethylene/constants';
import { GEORLI } from '@ethylene/constants/networks';

const EXTRA_CONFIG = {};

export const CONFIG: BaseConfig<ExtraConfig> = {
  APP: 'Ethylene', // ! Do not use names with space, only use valid variable names !
  APP_DESCRIPTION: 'Customizable boilerplate dAPP project',
  CONNECTION: 'web3auth',
  FONT_FAMILY: '"Prompt", sans-serif',
  INITIAL_THEME: 'dark',
  MORALIS: {
    API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    ENABLED: true,
  },
  WALLETCONNECT: {
    rpc: {
      1: ETHEREUM_MAINNET.rpcUrls[0],
      5: GEORLI.rpcUrls[0],
      // ...
    },
  },
  WEB3AUTH_CHAIN_CONFIG: {
    chainId: ETHEREUM_MAINNET.chainId,
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: ETHEREUM_MAINNET.rpcUrls[0],
  },
  WEB3AUTH_CLIENT_ID:
    'BH6_OwO37GKHXaoDvvxeYcGW5hDxpPprnNvEqFXwqUDKs5g7pVXqRoriHfVea1e4AZD3LbkryWUlHuUNwv2Q4Io',
  ...EXTRA_CONFIG,
};
