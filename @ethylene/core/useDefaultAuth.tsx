import { useResetWeb3Connection } from '@ethylene/core/useResetWeb3Connection';
import {
  useIsConnected,
  useSetIsConnected,
  useSetIsConnecting,
  useSetProvider,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneMetamaskConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';
import { __dev__ } from '@ethylene/utils';
import { ethers } from 'ethers';

declare let window: Window & {
  ethereum: ethers.providers.ExternalProvider;
};

export const useDefaultAuth = ({
  onError,
  onConnect,
}: UseConnectionProps | undefined = {}): EthyleneMetamaskConnector => {
  const isConnected = useIsConnected();
  const setIsConnected = useSetIsConnected();
  const setIsConnecting = useSetIsConnecting();
  const resetWeb3Connection = useResetWeb3Connection();
  const setProvider = useSetProvider();

  const connect = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      setProvider(provider);

      setIsConnected(true);
      onConnect?.();
      setIsConnecting(false);
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }
      onError?.();
      setIsConnecting(false);
    }
  };

  const disconnect = async (): Promise<void> => {
    if (!isConnected) return;
    resetWeb3Connection();
  };

  return { connect, disconnect };
};
