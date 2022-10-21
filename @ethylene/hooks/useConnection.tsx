import { useDefaultAuth } from '@ethylene/core/useDefaultAuth';
import { useWalletConnectAuth } from '@ethylene/core/useWalletConnectAuth';
import { useWeb3Auth } from '@ethylene/core/useWeb3Auth';
import {
  useIsConnected,
  useIsConnecting,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';
import { CONFIG } from 'config';
import { useMemo } from 'react';

export const useConnection = (
  props?: UseConnectionProps,
): EthyleneConnector => {
  const mainConnector = props?.connector ?? CONFIG.CONNECTION;

  const {
    connect: connectMetamask,
    disconnect: disconnectMetamask,
    isConnecting: isConnectingMetamask,
  } = useDefaultAuth(props);

  const {
    connect: connectWeb3Auth,
    disconnect: disconnectWeb3Auth,
    isConnecting: isConnectingWeb3Auth,
  } = useWeb3Auth(props);

  const {
    connect: connectWalletConnect,
    disconnect: disconnectWalletConnect,
    isConnecting: isConnectingWalletConnect,
  } = useWalletConnectAuth(props);

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const connect = async (): Promise<void> => {
    if (isConnected) return;

    if (mainConnector === 'web3auth') {
      await connectWeb3Auth();
    } else if (mainConnector === 'injected') {
      await connectMetamask();
    } else if (mainConnector === 'walletconnect') {
      await connectWalletConnect();
    } else {
      throw new Error('Invalid connection type');
    }
  };

  const disconnect = async (): Promise<void> => {
    if (mainConnector === 'web3auth') {
      await disconnectWeb3Auth();
    } else if (mainConnector === 'injected') {
      await disconnectMetamask();
    } else if (mainConnector === 'walletconnect') {
      await disconnectWalletConnect();
    }
  };

  const isConnectingSpecificWallet = useMemo(() => {
    if (mainConnector === 'injected') {
      return isConnectingMetamask;
    } else if (mainConnector === 'walletconnect') {
      return isConnectingWalletConnect;
    } else if (mainConnector === 'web3auth') {
      return isConnectingWeb3Auth;
    } else {
      return false;
    }
  }, [
    mainConnector,
    isConnectingMetamask,
    isConnectingWalletConnect,
    isConnectingWeb3Auth,
  ]);

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting: isConnectingSpecificWallet,
    isConnectingAnyWallet: isConnecting,
    type: mainConnector,
  };
};
