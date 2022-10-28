import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import { useConnection } from '@ethylene/hooks';
import { useOnNetworkChange } from '@ethylene/hooks/useOnNetworkChange';
import {
  useProvider,
  useSetAddress,
  useSetProvider,
  useSetSigner,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { CONFIG } from 'config';
import { ethers } from 'ethers';
import Moralis from 'moralis';
import { useEffect } from 'react';

if (CONFIG.MORALIS?.ENABLED) {
  Moralis.start({
    apiKey: CONFIG.MORALIS?.API_KEY,
  });
}

export const useInitializeWeb3 = () => {
  const setProvider = useSetProvider();
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();
  const provider = useProvider();
  const { connect } = useConnection();

  useEffect(() => {
    if (CONFIG.REMEMBER_ME !== true) {
      return;
    }

    if (provider != null && connect != null) {
      const previousConnectionType: string | null = localStorage.getItem(
        `${CONFIG.APP}ConnectionType`,
      );
      if (
        previousConnectionType === 'injected' ||
        previousConnectionType === 'web3auth' ||
        previousConnectionType === 'walletconnect'
      ) {
        connect(previousConnectionType);
      }
    }
  }, [provider, connect]);

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

  useOnNetworkChange(() => {
    const fetch = async () => {
      if (provider != null) {
        const _signer = provider.getSigner();
        setSigner(_signer);
      }
    };
    fetch();
  });
};
