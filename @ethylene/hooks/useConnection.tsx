import { useDefaultAuth } from '@ethylene/core/useDefaultAuth';
import { useWalletConnectAuth } from '@ethylene/core/useWalletConnectAuth';
import { useWeb3Auth } from '@ethylene/core/useWeb3Auth';
import {
  useConnectionType,
  useIsConnected,
  useIsConnecting,
  useSetConnectionType,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneConnector } from '@ethylene/types';
import {
  EthyleneConnectionType,
  UseConnectionProps,
} from '@ethylene/types/app';
import { CONFIG } from 'config';
import { useMemo } from 'react';

export const useConnection = (
  props?: UseConnectionProps,
): EthyleneConnector => {
  const connectionType = useConnectionType();
  const setConnectionType = useSetConnectionType();

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

  const connect = async (
    connectorAsProp?: EthyleneConnectionType,
  ): Promise<void> => {
    if (isConnected) return;

    const mainConnector = connectorAsProp ?? CONFIG.CONNECTION;

    setConnectionType(mainConnector);
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
    const mainConnector = connectionType;
    if (mainConnector === 'web3auth') {
      await disconnectWeb3Auth();
    } else if (mainConnector === 'injected') {
      await disconnectMetamask();
    } else if (mainConnector === 'walletconnect') {
      await disconnectWalletConnect();
    }
    setConnectionType(null);
  };

  const isConnectingSpecificWallet = useMemo(() => {
    if (connectionType === 'injected') {
      return isConnectingMetamask;
    } else if (connectionType === 'walletconnect') {
      return isConnectingWalletConnect;
    } else if (connectionType === 'web3auth') {
      return isConnectingWeb3Auth;
    } else {
      return false;
    }
  }, [
    isConnectingMetamask,
    isConnectingWalletConnect,
    isConnectingWeb3Auth,
    connectionType,
  ]);

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting: isConnectingSpecificWallet,
    isConnectingAnyWallet: isConnecting,
    type: connectionType,
  };
};
