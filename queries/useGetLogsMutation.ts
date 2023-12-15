import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { apiGetLogs } from 'restapi';

export type CustomMutationResult<T, K = unknown> = UseMutationResult<
    T,
    unknown,
    K,
    unknown
>;

type ResponseType = {
    status: string;
    message: string;
    result: Array<unknown>;
};

export const useGetLogsMutation = (): CustomMutationResult<
    unknown,
    { block: number; address: string }
> => {
    const mutation = useMutation({
        mutationFn: async ({
            block,
            address,
        }: {
            block: number;
            address: string;
        }): Promise<unknown> => {
            const res = await apiGetLogs(block, address);
            const data = res.data as ResponseType;
            if (data.status !== '1') {
                return [];
            }
            return data.result;
        },
    });

    return mutation;
};
