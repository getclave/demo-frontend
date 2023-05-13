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
} & TExtra;
