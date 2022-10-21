import { useEthyleneDispatch, useTypedEthyleneSelector } from '@ethylene/redux';
import {
  setAddress,
  setIsConnected,
  setIsConnecting,
  setProvider,
  setSigner,
  setWeb3AuthInstance,
  setWalletConnectInstance,
  setConnectionType,
} from '@ethylene/redux/web3/Web3Reducer';
import {
  EthyleneConnectionType,
  EthyleneSigner,
  Web3ProviderType,
} from '@ethylene/types/app';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Auth } from '@web3auth/web3auth';
import { useCallback } from 'react';

export const useIsConnected = () =>
  useTypedEthyleneSelector((state) => state.web3.connected);
export const useSetIsConnected = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: boolean) => dispatch(setIsConnected(value)),
    [dispatch],
  );
};

export const useWeb3AuthInstance = () =>
  useTypedEthyleneSelector((state) => state.web3.web3AuthInstance);
export const useSetWeb3AuthInstance = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: Web3Auth | null) => dispatch(setWeb3AuthInstance(value)),
    [dispatch],
  );
};

export const useIsConnecting = () =>
  useTypedEthyleneSelector((state) => state.web3.isConnecting);
export const useSetIsConnecting = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: boolean) => dispatch(setIsConnecting(value)),
    [dispatch],
  );
};

export const useProvider = () =>
  useTypedEthyleneSelector((state) => state.web3.provider);
export const useSetProvider = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: Web3ProviderType) => {
      dispatch(setProvider(value));
    },
    [dispatch],
  );
};

export const useSigner = () =>
  useTypedEthyleneSelector((state) => state.web3.signer);
export const useSetSigner = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (signer: EthyleneSigner | null) => {
      dispatch(setSigner(signer));
    },
    [dispatch],
  );
};

export const useAddress = () =>
  useTypedEthyleneSelector((state) => state.web3.address);
export const useSetAddress = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: string | null) => dispatch(setAddress(value)),
    [dispatch],
  );
};

export const useWalletConnectInstance = () =>
  useTypedEthyleneSelector((state) => state.web3.walletConnectInstance);
export const useSetWalletConnectInstance = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: WalletConnectProvider | null) =>
      dispatch(setWalletConnectInstance(value)),
    [dispatch],
  );
};

export const useConnectionType = () =>
  useTypedEthyleneSelector((state) => state.web3.connectionType);
export const useSetConnectionType = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: EthyleneConnectionType | null) =>
      dispatch(setConnectionType(value)),
    [dispatch],
  );
};
