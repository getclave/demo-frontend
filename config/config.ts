import { BaseConfig, ExtraConfig } from 'config/config.types';

const EXTRA_CONFIG = {};

export const CONFIG: BaseConfig<ExtraConfig> = {
  APP: 'Ethylene',
  APP_DESCRIPTION: 'Customizable boilerplate dAPP project',
  CONNECTION: 'web3auth',
  FONT_FAMILY: '"Prompt", sans-serif',
  INITIAL_THEME: 'dark',
  ...EXTRA_CONFIG,
};
