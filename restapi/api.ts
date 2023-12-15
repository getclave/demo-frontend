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
    getLogs: (from: number, address: string, apiKey: string): string =>
        `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=${from}&toBlock=latest&address=${address}&apikey=${apiKey}`,
    getTransaction: (txHash: string, apiKey: string): string =>
        `https://api-sepolia.etherscan.io/api?module=transaction&action=getstatus&txhash=${txHash}&apikey=${apiKey}`,
};
