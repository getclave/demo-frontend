import { Web3Auth } from '@web3auth/web3auth';
import { CONFIG } from 'config';
import { ethers } from 'ethers';

declare let window: Window & {
  ethereum: ethers.providers.ExternalProvider;
};

export const getDefaultProvider = (web3AuthInstance?: Web3Auth | null) => {
  if (CONFIG.CONNECTION === 'injected') {
    if (window.ethereum != null) {
      return window.ethereum;
    }
  } else if (CONFIG.CONNECTION === 'web3auth' && web3AuthInstance != null) {
    return web3AuthInstance.provider;
  }
};
