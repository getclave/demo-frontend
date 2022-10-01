import { useAddress as useAddressFromRedux } from '@ethylene/redux/web3/Web3ReducerHooks';

export const useAddress = (): string | null => {
  const address = useAddressFromRedux();
  return address;
};
