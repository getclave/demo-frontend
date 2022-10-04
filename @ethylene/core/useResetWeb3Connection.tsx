import {
  useSetAddress,
  useSetIsConnected,
  useSetProvider,
  useSetSigner,
  useSetWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { useCallback } from 'react';
import { batch } from 'react-redux';

export const useResetWeb3Connection = () => {
  const setProvider = useSetProvider();
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();
  const setIsConnected = useSetIsConnected();
  const setWeb3AuthInstance = useSetWeb3AuthInstance();

  const reset = useCallback(() => {
    batch(() => {
      setProvider(null);
      setAddress(null);
      setSigner(null);
      setIsConnected(false);
      setWeb3AuthInstance(null);
    });
  }, [setProvider, setSigner, setAddress, setIsConnected, setWeb3AuthInstance]);

  return reset;
};
