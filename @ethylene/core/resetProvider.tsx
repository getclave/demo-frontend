import { getDefaultProvider } from '@ethylene/core/getDefaultProvider';
import { Web3ProviderType } from '@ethylene/types/app';
import { Web3Auth } from '@web3auth/web3auth';
import { ethers } from 'ethers';

export const resetProvider = (
  setProvider: (to: Web3ProviderType) => void,
  web3AuthInstance: Web3Auth | null,
) => {
  const defaultExternalProvider = getDefaultProvider(web3AuthInstance);
  if (defaultExternalProvider != null) {
    const _provider = new ethers.providers.Web3Provider(
      defaultExternalProvider,
    );
    setProvider(_provider);
  }
};
