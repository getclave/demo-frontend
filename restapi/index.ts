import Axios from 'axios';
import type { AxiosResponse } from 'axios';
import { API } from 'restapi/api';
import type {
    AccountCreateDto,
    AccountResponseDto,
    UserCreateDto,
    UserResponseDto,
} from 'restapi/types';

const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

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
