import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import { useSetProvider } from '@ethylene/redux/web3/Web3ReducerHooks';
import { ethers } from 'ethers';
import { useEffect } from 'react';

export const useInitializeWeb3 = () => {
  const setProvider = useSetProvider();

  useEffect(() => {
    const defaultExternalProvider = getDefaultProvider();

    if (defaultExternalProvider != null) {
      setProvider(new ethers.providers.Web3Provider(defaultExternalProvider));
    }
  }, [setProvider]);
};
