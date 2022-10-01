import { Web3Auth } from '@web3auth/web3auth';
import { __dev__ } from '@ethylene/utils';
import {
  useIsConnected,
  useSetIsConnected,
  useSetIsConnecting,
  useSetWeb3AuthInstance,
  useWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { CONFIG } from 'config';
import { batch } from 'react-redux';
import { EthyleneWeb3AuthConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';

export function useWeb3Auth({
  onError,
  onConnect,
}: UseConnectionProps | undefined = {}): EthyleneWeb3AuthConnector {
  const isConnected = useIsConnected();
  const setIsConnected = useSetIsConnected();
  const setWeb3AuthInstance = useSetWeb3AuthInstance();
  const setIsConnecting = useSetIsConnecting();
  const web3AuthInstance = useWeb3AuthInstance();

  const getInstance = (): Web3Auth | null => {
    if (CONFIG.WEB3AUTH_CHAIN_CONFIG == null) return null;
    const clientId = CONFIG.WEB3AUTH_CLIENT_ID;
    const _web3AuthInstance = new Web3Auth({
      chainConfig: CONFIG.WEB3AUTH_CHAIN_CONFIG,
      clientId: String(clientId),
    });
    return _web3AuthInstance;
  };

  const connect = async (): Promise<void> => {
    if (isConnected || CONFIG.CONNECTION !== 'web3auth') return;
    const web3AuthInstance = getInstance();

    if (web3AuthInstance == null) {
      return;
    }

    try {
      setIsConnecting(true);
      await web3AuthInstance.initModal();
      await web3AuthInstance.connect();
      batch(() => {
        setIsConnected(true);
        setWeb3AuthInstance(web3AuthInstance);
        setIsConnecting(false);
      });
      onConnect?.();
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }

      setIsConnecting(false);
      onError?.();
    }
  };

  const disconnect = async (): Promise<void> => {
    if (
      web3AuthInstance == null ||
      !isConnected ||
      CONFIG.CONNECTION !== 'web3auth'
    )
      return;
    try {
      await web3AuthInstance.logout();
      web3AuthInstance.clearCache();
      batch(() => {
        setWeb3AuthInstance(null);
        setIsConnected(false);
      });
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }
    }
  };

  return { connect, disconnect };
}
