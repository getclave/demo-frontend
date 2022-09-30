import { useDefaultAuth } from '@ethylene/core/useDefaultAuth';
import { useWeb3Auth } from '@ethylene/core/useWeb3Auth';
import {
  useIsConnected,
  useIsConnecting,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneConnector } from '@ethylene/types';
import { CONFIG } from 'config';

export const useConnection = (): EthyleneConnector => {
  const { connect: connectMetamask, disconnect: disconnectMetamask } =
    useDefaultAuth();

  const { connect: connectWeb3Auth, disconnect: disconnectWeb3Auth } =
    useWeb3Auth();

  const isConnecting = useIsConnecting();
  const isConnected = useIsConnected();

  const connect = async (): Promise<void> => {
    if (CONFIG.CONNECTION === 'web3auth') {
      await connectWeb3Auth();
    } else if (CONFIG.CONNECTION === 'metamask') {
      await connectMetamask();
    } else {
      throw new Error('Invalid connection type');
    }
  };

  const disconnect = async (): Promise<void> => {
    if (CONFIG.CONNECTION === 'web3auth') {
      await disconnectWeb3Auth();
    } else {
      await disconnectMetamask();
    }
  };

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    type: CONFIG.CONNECTION,
  };
};
