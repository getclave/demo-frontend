export const API = {
    getUserRoute: (): string => `/user`,
    getUserRouteByNickname: (nickname: string): string => `/user/${nickname}`,
    getAccountRoute: (): string => `/account`,
    getAccountRouteByAddress: (account: string): string =>
        `/account/${account}`,
};
