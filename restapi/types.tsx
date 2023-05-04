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
