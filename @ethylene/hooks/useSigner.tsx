import { useSigner as useSignerFromRedux } from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneSigner } from '@ethylene/types/app';

export const useSigner = (): EthyleneSigner | null => {
  const signer = useSignerFromRedux();
  return signer;
};
