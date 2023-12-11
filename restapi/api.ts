export const API = {
    getUserRoute: (): string => `/user`,
    getUserRouteByNickname: (nickname: string): string => `/user/${nickname}`,
    getAccountRoute: (): string => `/account`,
    getAccountRouteByAddress: (account: string): string =>
        `/account/${account}`,
    getAccountByNameRoute: (name: string): string => `?name=${name}`,
    getCreateAccountRoute: (): string => `/create`,
    getNewOptionRoute: (): string => `/newOption`,
    recoveryRoute: (): string => `/recovery`,
};
