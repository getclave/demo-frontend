export type DefaultAxiosErrorResponse = {
    message: string;
    statusCode: number;
};

export type AccountCreateDto = {
    user: string;

    account: string;

    clientId: string;

    publicKey: string;
};

export type Webauthn = {
    id: number;
    clientId: string;
    publicKey: string;
};
export type AccountResponseDto = {
    id: number;
    account: string;
    webauthn: Webauthn;
};

export type AccountParam = {
    account: string;
};

export type UserCreateDto = {
    user: string;
};

export type UserParam = {
    user: string;
};

export type Account = {
    id: number;
    account: string;
};
export type UserResponseDto = {
    id: number;
    user: string;
    account: Array<Account>;
};

export type CreateAccountDto = {
    name: string;
    address: string;
    authName: string;
    authPublic: string;
    authType: number;
    authHexPublic?: string;
};

export type NewOptionDto = {
    name: string;
    authName: string;
    authPublic: string;
    authType: number;
    authHexPublic?: string;
};

export enum Authenticator {
    DESKTOP = 'webauthn',
    MOBILE = 'enclave',
}

export type Option = {
    id: number;
    method_name: string;
    public_key: string;
    type: Authenticator;
};

export type AccountV2 = {
    id: number;
    name: string;
    address: string;
    options: Array<Option>;
};
