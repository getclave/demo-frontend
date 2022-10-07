import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import { resetProvider } from '@ethylene/core/resetProvider';
import { useOnNetworkChange } from '@ethylene/hooks/useOnNetworkChange';
import {
  useProvider,
  useSetAddress,
  useSetProvider,
  useSetSigner,
  useWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { ethers } from 'ethers';
import { useEffect } from 'react';

export const useInitializeWeb3 = () => {
  const setProvider = useSetProvider();
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();
  const provider = useProvider();
  const web3AuthInstance = useWeb3AuthInstance();

  useEffect(() => {
    const defaultExternalProvider = getDefaultProvider();
    if (defaultExternalProvider != null) {
      const _provider = new ethers.providers.Web3Provider(
        defaultExternalProvider,
      );
      setProvider(_provider);
    }
  }, [setProvider]);

  useEffect(() => {
    if (provider != null) {
      const _signer = provider.getSigner();
      setSigner(_signer);
      _signer.getAddress().then((address) => setAddress(address));
    }
  }, [provider, setSigner, setAddress]);
};
