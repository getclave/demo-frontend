import {
  useProvider as useProviderFromRedux,
  useSetProvider,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { Web3ProviderType } from '@ethylene/types/app';

type ProviderReturnType = {
  provider: Web3ProviderType;
  setProvider: (to: Web3ProviderType) => void;
};

export const useProvider = (): ProviderReturnType => {
  const provider = useProviderFromRedux();
  const setProvider = useSetProvider();

  return { provider, setProvider };
};
