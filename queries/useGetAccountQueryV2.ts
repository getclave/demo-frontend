import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { QUERIES } from 'constants/queries';
import { useEffect } from 'react';
import { apiGetAccount2 } from 'restapi';
import type { AccountV2 } from 'restapi/types';

type DefaultAxiosError = AxiosError<{ message: string }>;

type CustomQueryResult<T> = Omit<
    UseQueryResult<AxiosResponse<T>, DefaultAxiosError>,
    'refetch'
>;

type AxiosResponsePromise<T> = Promise<AxiosResponse<T>>;

export function useGetAccountQueryV2(
    name: string | null,
): CustomQueryResult<AccountV2> {
    const { data, isLoading, isError, error, refetch, ...rest } = useQuery<
        AxiosResponse<AccountV2>,
        DefaultAxiosError
    >(
        QUERIES.account,
        async (): AxiosResponsePromise<AccountV2> =>
            apiGetAccount2(name ? name : '').then((res) => {
                return res;
            }),
        {
            retry: false,
            enabled: name != null,
        },
    );

    useEffect(() => {
        if (name == null) {
            return;
        }
        refetch();
    }, [name, refetch]);
    return { data, isError, error, isLoading, ...rest };
}

// const { mutate: getAccount } = useMutation({
//     mutationFn: async (name: string): Promise<AccountV2> =>
//         apiGetAccount2(name),
//     onError: (err: AxiosError<DefaultAxiosErrorResponse>) => {
//         notify.error(err.response?.data.message);
//     },
//     onSuccess: () => {
//         notify.success(`Update this text`);
//     },
// });
