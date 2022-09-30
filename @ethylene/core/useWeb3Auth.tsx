import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';
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

export function useWeb3Auth(): EthyleneWeb3AuthConnector {
  const isConnected = useIsConnected();
  const setIsConnected = useSetIsConnected();
  const setWeb3AuthInstance = useSetWeb3AuthInstance();
  const setIsConnecting = useSetIsConnecting();
  const web3AuthInstance = useWeb3AuthInstance();

  const getInstance = (): Web3Auth => {
    const clientId = CONFIG.WEB3AUTH_CLIENT_ID;
    const _web3AuthInstance = new Web3Auth({
      chainConfig: {
        chainId: '0x1',
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: CONFIG.RPC_URL,
      },
      clientId: String(clientId),
    });
    return _web3AuthInstance;
  };

  const connect = async (): Promise<void> => {
    if (isConnected || CONFIG.CONNECTION !== 'web3auth') return;

    const web3AuthInstance = getInstance();
    try {
      setIsConnecting(true);
      await web3AuthInstance.initModal();
      await web3AuthInstance.connect();
      batch(() => {
        setIsConnected(true);
        setWeb3AuthInstance(web3AuthInstance);
        setIsConnecting(false);
      });
    } catch (err) {
      setIsConnecting(false);
      if (__dev__) {
        console.error(err);
      }
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
