import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { MS_IN_SEC } from 'constants/numbers';
import { QUERIES } from 'constants/queries';
import { useEffect } from 'react';
import { apiGetAccount } from 'restapi';
import type { AccountResponseDto } from 'restapi/types';

export function useGetAccountQuery(
    nickname: string,
): Omit<
    UseQueryResult<AxiosResponse<AccountResponseDto | undefined>>,
    'refetch'
> {
    if (!nickname)
        return {} as UseQueryResult<
            AxiosResponse<AccountResponseDto | undefined>
        >;
    const { data, isLoading, isError, refetch, ...rest } = useQuery(
        QUERIES.account,
        async (): Promise<AxiosResponse<AccountResponseDto>> =>
            apiGetAccount(nickname)
                .then((res) => {
                    console.log('useGetAccountQuery res: ', res);

                    return res;
                })
                .catch((err) => {
                    return err;
                }),
        {
            cacheTime: 0,
            staleTime: 30 * MS_IN_SEC,
        },
    );

    useEffect(() => {
        refetch();
    }, [nickname, refetch]);

    return { data, isError, isLoading, ...rest };
}
