import { JsonRpcSigner } from '@ethersproject/providers';
import { useProvider } from '@ethylene/redux/web3/Web3ReducerHooks';

export const useSigner = (): JsonRpcSigner | null => {
  const provider = useProvider();

  const signer = provider?.getSigner();
  if (signer == null) {
    return null;
  } else {
    return signer;
  }
};
