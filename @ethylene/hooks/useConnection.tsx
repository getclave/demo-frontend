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

export const useConnection = (
  props?: UseConnectionProps,
): EthyleneConnector => {
  const mainConnector = props?.connector ?? CONFIG.CONNECTION;

  const { connect: connectMetamask, disconnect: disconnectMetamask } =
    useDefaultAuth(props);

  const { connect: connectWeb3Auth, disconnect: disconnectWeb3Auth } =
    useWeb3Auth(props);

  const { connect: connectWalletConnect, disconnect: disconnectWalletConnect } =
    useWalletConnectAuth(props);

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

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    type: mainConnector,
  };
};
