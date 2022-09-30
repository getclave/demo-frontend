import { EthyleneConnectionType } from '@ethylene/types';

/* Add your custom type definitions */
export type ExtraConfig = {};

export type BaseConfig<TExtra> = {
  APP: string;
  APP_DESCRIPTION: string;
  CONNECTION: EthyleneConnectionType;
  FONT_FAMILY: string;
  INITIAL_THEME: 'dark' | 'light';
  RPC_URL: string;
  WEB3AUTH_CLIENT_ID?: string;
} & TExtra;
