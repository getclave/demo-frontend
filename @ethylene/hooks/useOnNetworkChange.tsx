import { useProvider } from '@ethylene/redux/web3/Web3ReducerHooks';
import { useEffect } from 'react';

export const useOnNetworkChange = (callback: () => void) => {
  const provider = useProvider();

  useEffect(() => {
    if (!provider) return;

    provider.on('network', (_newNetwork: unknown, oldNetwork: unknown) => {
      if (oldNetwork) {
        callback();
      }
    });

    return () => {
      provider.off('network');
    };
  }, [provider, callback]);
};
