import { useTypedSelector } from '@ethylene/redux';
import {
  setAddress,
  setIsConnected,
  setIsConnecting,
  setProvider,
  setSigner,
  setWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3Reducer';
import { EthyleneSigner, Web3ProviderType } from '@ethylene/types/app';
import { Web3Auth } from '@web3auth/web3auth';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export const useIsConnected = () =>
  useTypedSelector((state) => state.web3.connected);
export const useSetIsConnected = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: boolean) => dispatch(setIsConnected(value)),
    [dispatch],
  );
};

export const useWeb3AuthInstance = () =>
  useTypedSelector((state) => state.web3.web3AuthInstance);
export const useSetWeb3AuthInstance = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: Web3Auth | null) => dispatch(setWeb3AuthInstance(value)),
    [dispatch],
  );
};

export const useIsConnecting = () =>
  useTypedSelector((state) => state.web3.isConnecting);
export const useSetIsConnecting = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: boolean) => dispatch(setIsConnecting(value)),
    [dispatch],
  );
};

export const useProvider = () =>
  useTypedSelector((state) => state.web3.provider);
export const useSetProvider = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: Web3ProviderType) => {
      dispatch(setProvider(value));
    },
    [dispatch],
  );
};

export const useSigner = () => useTypedSelector((state) => state.web3.signer);
export const useSetSigner = () => {
  const dispatch = useDispatch();
  return useCallback(
    (signer: EthyleneSigner | null) => {
      dispatch(setSigner(signer));
    },
    [dispatch],
  );
};

export const useAddress = () => useTypedSelector((state) => state.web3.address);
export const useSetAddress = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: string | null) => dispatch(setAddress(value)),
    [dispatch],
  );
};
