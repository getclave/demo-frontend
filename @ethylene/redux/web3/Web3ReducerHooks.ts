import { useTypedSelector } from '@ethylene/redux';
import {
  setIsConnected,
  setIsConnecting,
  setWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3Reducer';
import { Web3Auth } from '@web3auth/web3auth';
import { useDispatch } from 'react-redux';

export const useIsConnected = () =>
  useTypedSelector((state) => state.web3.connected);

export const useSetIsConnected = () => {
  const dispatch = useDispatch();
  return (value: boolean) => dispatch(setIsConnected(value));
};

export const useWeb3AuthInstance = () =>
  useTypedSelector((state) => state.web3.web3AuthInstance);

export const useSetWeb3AuthInstance = () => {
  const dispatch = useDispatch();
  return (value: Web3Auth | null) => dispatch(setWeb3AuthInstance(value));
};

export const useIsConnecting = () =>
  useTypedSelector((state) => state.web3.isConnecting);

export const useSetIsConnecting = () => {
  const dispatch = useDispatch();
  return (value: boolean) => dispatch(setIsConnecting(value));
};
