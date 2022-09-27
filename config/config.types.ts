/* Add your custom type definitions */
export type ExtraConfig = {};

export type BaseConfig<TExtra> = {
  APP: string;
  APP_DESCRIPTION: string;
  INITIAL_THEME: 'dark' | 'light';
  FONT_FAMILY: string;
  CONNECTION: 'web3auth' | 'metamask';
} & TExtra;
