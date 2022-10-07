import { BaseConfig, ExtraConfig } from 'config/config.types';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { AVAX_FUJI_C_CHAIN } from '@ethylene/constants';

const EXTRA_CONFIG = {};

export const CONFIG: BaseConfig<ExtraConfig> = {
  APP: 'Ethylene',
  APP_DESCRIPTION: 'Customizable boilerplate dAPP project',
  CONNECTION: 'web3auth',
  FONT_FAMILY: '"Prompt", sans-serif',
  INITIAL_THEME: 'dark',
  MORALIS: {
    API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    ENABLED: true,
  },
  WEB3AUTH_CHAIN_CONFIG: {
    chainId: AVAX_FUJI_C_CHAIN.chainId,
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: AVAX_FUJI_C_CHAIN.rpcUrls[0],
  },
  WEB3AUTH_CLIENT_ID:
    'BH6_OwO37GKHXaoDvvxeYcGW5hDxpPprnNvEqFXwqUDKs5g7pVXqRoriHfVea1e4AZD3LbkryWUlHuUNwv2Q4Io',
  ...EXTRA_CONFIG,
};
