import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { MS_IN_SEC } from 'constants/numbers';
import { QUERIES } from 'constants/queries';
import { useEffect } from 'react';
import { apiGetUser } from 'restapi';
import type { UserResponseDto } from 'restapi/types';

export function useGetUserQuery(
    nickname: string,
): Omit<UseQueryResult<AxiosResponse<UserResponseDto | undefined>>, 'refetch'> {
    const { data, error, isLoading, isError, isSuccess, refetch, ...rest } =
        useQuery(
            QUERIES.user,
            async (): Promise<AxiosResponse<UserResponseDto>> => {
                const a = await apiGetUser(nickname)
                    .then((res) => {
                        return res.data;
                    })
                    .catch((err) => {
                        return err as AxiosError;
                        return err.response.data.message;
                    });
                return a;
            },
            {
                cacheTime: 0,
                staleTime: 30 * MS_IN_SEC,
            },
        );

    useEffect(() => {
        refetch();
    }, [nickname, refetch]);
    return { data, error, isError, isLoading, isSuccess, ...rest };
}
