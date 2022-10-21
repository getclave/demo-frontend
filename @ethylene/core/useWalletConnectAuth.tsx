import { useResetWeb3Connection } from '@ethylene/core/useResetWeb3Connection';
import {
  useIsConnected,
  useSetIsConnected,
  useSetIsConnecting,
  useSetProvider,
  useSetWalletConnectInstance,
  useWalletConnectInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneMetamaskConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';
import { __dev__ } from '@ethylene/utils';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { CONFIG } from 'config';
import { useState } from 'react';

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
  const [connecting, setConnecting] = useState(false);

  const isConnected = useIsConnected();
  const walletConnectInstance = useWalletConnectInstance();
  const setIsConnected = useSetIsConnected();
  const setIsConnecting = useSetIsConnecting();
  const setWalletConnectInstance = useSetWalletConnectInstance();
  const resetWeb3Connection = useResetWeb3Connection();
  const setProvider = useSetProvider();

  const connect = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      setConnecting(true);

      const provider = new ethers.providers.Web3Provider(
        walletConnectProviderInstance,
        'any',
      );
      await walletConnectProviderInstance.enable();
      setProvider(provider);
      setIsConnected(true);
      setWalletConnectInstance(walletConnectProviderInstance);
      onConnect?.();

      setIsConnecting(false);
      setConnecting(false);
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }

      setIsConnecting(false);
      setConnecting(false);

      onError?.();
    }
  };

  const disconnect = async (): Promise<void> => {
    if (!isConnected) return;
    walletConnectInstance?.disconnect();
    resetWeb3Connection();
  };

  return { connect, disconnect, isConnecting: connecting };
};
