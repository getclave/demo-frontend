import { CONFIG } from 'config';
import { ethers } from 'ethers';

declare let window: Window & {
  ethereum: ethers.providers.ExternalProvider;
};

export const getDefaultProvider = () => {
  if (CONFIG.CONNECTION === 'injected') {
    if (window.ethereum != null) {
      return window.ethereum;
    }
  } else {
    return null;
  }
};
