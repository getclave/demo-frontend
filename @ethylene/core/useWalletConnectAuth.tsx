import { useResetWeb3Connection } from '@ethylene/core/useResetWeb3Connection';
import {
  useIsConnected,
  useSetAddress,
  useSetIsConnected,
  useSetIsConnecting,
  useSetProvider,
  useSetSigner,
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
import { batch } from 'react-redux';

if (CONFIG.WALLETCONNECT == null) {
  throw new Error('Wallet Connect configuration is not provider');
}

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
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();

  const connect = async (): Promise<void> => {
    const walletConnectProviderInstance = new WalletConnectProvider({
      qrcode: true,
      rpc: CONFIG.WALLETCONNECT?.rpc,
    });

    batch(async () => {
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

        const _signer = provider.getSigner();
        setSigner(_signer);
        const address = await _signer.getAddress();
        setAddress(address);
        onConnect?.();
        localStorage.setItem(`${CONFIG.APP}ConnectionType`, 'walletconnect');
        setIsConnecting(false);
        setConnecting(false);
      } catch (err) {
        if (__dev__) {
          console.error(err);
        }

        batch(() => {
          setWalletConnectInstance(null);
          setIsConnecting(false);
          setConnecting(false);
        });

        onError?.();
      }
    });
  };

  const disconnect = async (): Promise<void> => {
    if (!isConnected) return;
    walletConnectInstance?.disconnect();
    resetWeb3Connection();
  };

  return { connect, disconnect, isConnecting: connecting };
};
