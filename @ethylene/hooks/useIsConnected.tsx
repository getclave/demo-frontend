import { useIsConnected as useIsConnectedFromRedux } from '@ethylene/redux/web3/Web3ReducerHooks';

export const useIsConnected = () => {
  return useIsConnectedFromRedux();
};
