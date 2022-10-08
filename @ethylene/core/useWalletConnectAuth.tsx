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
import WalletConnectProvider from '@walletconnect/web3-provider';
import { CONFIG } from 'config';

if (CONFIG.WALLETCONNECT == null) {
  throw new Error('Wallet Connect configuration is not provider');
}

const walletConnectProviderInstance = new WalletConnectProvider({
  qrcode: true,
  rpc: CONFIG.WALLETCONNECT?.rpc,
});

export const useWalletConnectAuth = ({
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
        walletConnectProviderInstance,
        'any',
      );
      await walletConnectProviderInstance.enable();
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
    walletConnectProviderInstance.disconnect();
    resetWeb3Connection();
  };

  return { connect, disconnect };
};
