import { BaseConfig, ExtraConfig } from 'config/config.types';
import { CHAIN_NAMESPACES } from '@web3auth/base';

const EXTRA_CONFIG = {};

export const CONFIG: BaseConfig<ExtraConfig> = {
  APP: 'Ethylene',
  APP_DESCRIPTION: 'Customizable boilerplate dAPP project',
  CONNECTION: 'metamask',
  FONT_FAMILY: '"Prompt", sans-serif',
  INITIAL_THEME: 'dark',
  WEB3AUTH_CHAIN_CONFIG: {
    chainId: '0x1',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c',
  },
  WEB3AUTH_CLIENT_ID:
    'BH6_OwO37GKHXaoDvvxeYcGW5hDxpPprnNvEqFXwqUDKs5g7pVXqRoriHfVea1e4AZD3LbkryWUlHuUNwv2Q4Io',
  ...EXTRA_CONFIG,
};
