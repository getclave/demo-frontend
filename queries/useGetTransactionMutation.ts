import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { apiGetTransaction } from 'restapi';

export type CustomMutationResult<T, K = unknown> = UseMutationResult<
    T,
    unknown,
    K,
    unknown
>;

export const useGetTransactionMutation = (): CustomMutationResult<
    unknown,
    { txHash: string }
> => {
    const mutation = useMutation({
        mutationFn: async ({
            txHash,
        }: {
            txHash: string;
        }): Promise<unknown> => {
            const res = await apiGetTransaction(txHash);
            return res;
        },
    });

    return mutation;
};
