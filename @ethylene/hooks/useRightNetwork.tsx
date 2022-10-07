import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import { resetProvider } from '@ethylene/core/resetProvider';
import { useProvider } from '@ethylene/hooks/useProvider';
import {
  useIsConnected,
  useSetProvider,
  useWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { Web3Auth } from '@web3auth/web3auth';
import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { EthyleneNetwork, Web3ProviderType } from '../types/app';

export const useRightNetwork = (network: EthyleneNetwork) => {
  const isConnected = useIsConnected();
  const provider = useProvider();
  const web3AuthInstance = useWeb3AuthInstance();
  const setProvider = useSetProvider();
  const [isRightNetwork, setIsRightNetwork] = useState(true);
  const [result, setResult] = useState<{
    fn: () => void;
  }>({
    fn: () => undefined,
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await checkIfRightNetwork(
        provider,
        setProvider,
        web3AuthInstance,
        network,
        setIsRightNetwork,
      );
      if (res.status === false) {
        setIsRightNetwork(false);
        setResult(() => {
          return { fn: res.switchTo };
        });
      } else {
        setIsRightNetwork(true);
        setResult(() => {
          return { fn: () => undefined };
        });
      }
    };
    fetch();
  }, [isConnected, network, provider, setProvider, web3AuthInstance]);

  return { isRightNetwork, switchTo: result.fn };
};

const checkIfRightNetwork = async (
  provider: Web3ProviderType,
  setProvider: (to: Web3ProviderType) => void,
  web3AuthInstance: Web3Auth | null,
  network: EthyleneNetwork,
  setIsRightNetwork: (to: boolean) => void,
) => {
  if (provider == null) return { status: false, switchTo: () => undefined };
  const networkId = await provider.send('eth_chainId', []);

  if (networkId != network.chainId) {
    return {
      status: false,
      switchTo: function () {
        const fn = async () => {
          try {
            await provider.send('wallet_switchEthereumChain', [
              { chainId: network.chainId },
            ]);
            resetProvider(setProvider, web3AuthInstance);
            setIsRightNetwork(true);
          } catch (error: unknown) {
            const WALLET_ERROR_CODE = 4902;

            if ((error as { code: number })?.code === WALLET_ERROR_CODE) {
              try {
                await provider.send('wallet_addEthereumChain', [
                  {
                    chainId: network.chainId,
                    chainName: network.name,
                    nativeCurrency: network.nativeCurrency,
                    rpcUrls: network.rpcUrls,
                  },
                ]);
                setIsRightNetwork(true);
              } catch (addError) {
                console.log('[DEBUG] Network Add error', addError);
                return;
              }
            }
            console.log('[DEBUG] Switch Network Error');
            return;
          }
        };
        fn().then().catch();
      },
    };
  } else {
    return { status: true, switchTo: () => undefined };
  }
};
