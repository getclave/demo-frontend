import Axios from 'axios';
import type { AxiosResponse } from 'axios';
import { CONFIG } from 'config/config';
import { ethers } from 'ethers';
import { API } from 'restapi/api';
import type {
    AccountCreateDto,
    AccountResponseDto,
    AccountV2,
    CreateAccountDto,
    NewOptionDto,
    UserCreateDto,
    UserResponseDto,
} from 'restapi/types';

const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/account';

export const provider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);

export const opProvider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider(CONFIG.OP_RPC_URL);

export const axios = Axios.create({
    baseURL,
});

export const apiGetUser = async (
    nickname: string,
): Promise<AxiosResponse<UserResponseDto>> => {
    return await axios.get(API.getUserRouteByNickname(nickname));
};

export const apiGetAccount = async (
    account: string,
): Promise<AccountResponseDto> => {
    return await axios.get(API.getAccountRouteByAddress(account));
};

export const apiCreateUser = async (
    params: UserCreateDto,
): Promise<AxiosResponse<UserResponseDto>> => {
    return await axios.post(API.getUserRoute(), params);
};

export const apiCreateAccount = async (
    params: AccountCreateDto,
): Promise<AxiosResponse<AccountResponseDto>> => {
    return await axios.post(API.getUserRoute(), params);
};

export const apiGetAccount2 = async (
    name: string,
): Promise<AxiosResponse<AccountV2>> => {
    return await axios.get(API.getAccountByNameRoute(name));
};

export const apiGetLogs = async (
    from: number,
    address: string,
): Promise<AxiosResponse<unknown>> => {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    if (!apiKey) {
        throw new Error('Missing API key');
    }
    return await axios.get(API.getLogs(from, address, apiKey));
};

export const apiGetTransaction = async (
    txHash: string,
): Promise<AxiosResponse<unknown>> => {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    if (!apiKey) {
        throw new Error('Missing API key');
    }
    return await axios.get(API.getTransaction(txHash, apiKey));
};

export const apiCreateAccountV2 = async (
    params: CreateAccountDto,
): Promise<AxiosResponse<AccountV2>> => {
    return await axios.post(API.getCreateAccountRoute(), params);
};

export const apiCreateNewOption = async (
    params: NewOptionDto,
): Promise<AxiosResponse<AccountV2>> => {
    return await axios.post(API.getNewOptionRoute(), params);
};

export const apiRecovery = async (
    params: NewOptionDto,
): Promise<AxiosResponse<AccountV2>> => {
    return await axios.post(API.recoveryRoute(), params);
};
