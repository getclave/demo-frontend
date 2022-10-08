import { CONFIG } from 'config';
import Moralis from 'moralis';

export const useMoralisEvmApi = () => {
  if (CONFIG.MORALIS?.ENABLED === false) {
    throw new Error(
      'Moralis is disabled in your application. Please modify your config file',
    );
  }

  return Moralis.EvmApi;
};
