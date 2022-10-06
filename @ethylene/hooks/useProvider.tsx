import { useProvider as useProviderFromRedux } from '@ethylene/redux/web3/Web3ReducerHooks';
import { Web3ProviderType } from '@ethylene/types/app';

type ProviderReturnType = Web3ProviderType;

export const useProvider = (): ProviderReturnType => {
  const provider = useProviderFromRedux();

  return provider;
};
