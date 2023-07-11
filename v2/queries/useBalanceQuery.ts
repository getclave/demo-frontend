import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';

import { QUERIES } from '../constants/queries';
import { provider } from '../restapi/index';

/**
 * Gets balance of address query
 * @param address - Address to get balance of
 */
export const useBalanceQuery = (
    address: string,
): { balance: BigNumber; refetch: () => void } => {
    const { data, refetch } = useQuery({
        queryKey: QUERIES.balance,
        queryFn: async (): Promise<BigNumber> =>
            provider.getBalance(address).then((res) => {
                return res;
            }),
        retry: true,
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
    });

    return { balance: data ?? BigNumber.from(0), refetch };
};
