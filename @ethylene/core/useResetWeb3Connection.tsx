import {
  useSetAddress,
  useSetIsConnected,
  useSetSigner,
  useSetWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { CONFIG } from 'config';
import { useCallback } from 'react';
import { batch } from 'react-redux';

export const useResetWeb3Connection = () => {
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();
  const setIsConnected = useSetIsConnected();
  const setWeb3AuthInstance = useSetWeb3AuthInstance();

  const reset = useCallback(() => {
    batch(() => {
      setAddress(null);
      setSigner(null);
      setIsConnected(false);
      setWeb3AuthInstance(null);
      localStorage.removeItem(`${CONFIG.APP}ConnectionType`);
    });
  }, [setSigner, setAddress, setIsConnected, setWeb3AuthInstance]);

  return reset;
};
