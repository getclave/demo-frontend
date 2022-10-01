import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import {
  useSetProvider,
  useSetSigner,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { batch } from 'react-redux';

export const useInitializeWeb3 = () => {
  const setProvider = useSetProvider();
  const setSigner = useSetSigner();

  useEffect(() => {
    const defaultExternalProvider = getDefaultProvider();

    if (defaultExternalProvider != null) {
      const _provider = new ethers.providers.Web3Provider(
        defaultExternalProvider,
      );
      const _signer = _provider.getSigner();
      batch(() => {
        setProvider(_provider);
        setSigner(_signer);
      });
    }
  }, [setProvider, setSigner]);
};
