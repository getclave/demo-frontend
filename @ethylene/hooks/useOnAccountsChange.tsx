import { useAddress } from '@ethylene/hooks/useAddress';
import { useSigner } from '@ethylene/redux/web3/Web3ReducerHooks';
import { useEffect } from 'react';

export const useOnAccountsChange = (callback: () => void, interval = 1000) => {
  const signer = useSigner();
  const address = useAddress();

  useEffect(() => {
    if (signer == null) return;

    const timer = setInterval(() => {
      const fn = async () => {
        const val = await signer.getAddress();
        if (val !== address) {
          callback?.();
        }
      };
      fn();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [signer, address, interval, callback]);
};
