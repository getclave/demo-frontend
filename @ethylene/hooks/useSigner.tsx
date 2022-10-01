import { JsonRpcSigner } from '@ethersproject/providers';
import { useSigner as useSignerFromRedux } from '@ethylene/redux/web3/Web3ReducerHooks';

export const useSigner = (): JsonRpcSigner | null => {
  const signer = useSignerFromRedux();
  return signer;
};
