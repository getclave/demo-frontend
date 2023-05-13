// import { useQuery } from '@tanstack/react-query';
// import { BigNumber } from 'ethers';

// import { provider } from '../../wallet/contracts';
// import { Queries } from '../query';

// export const useBalance = (
//     address: string,
// ): { balance: BigNumber; refetch: () => void } => {
//     const { data, refetch } = useQuery({
//         queryKey: Queries.BALANCE,
//         queryFn: async (): Promise<BigNumber> =>
//             provider.getBalance(address).then((res) => {
//                 return res;
//             }),
//         retry: true,
//         refetchOnWindowFocus: true,
//         refetchInterval: 15000,
//     });

//     return { balance: data ?? BigNumber.from(0), refetch };
// };
