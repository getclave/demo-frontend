import { useSigner } from '@ethylene/redux/web3/Web3ReducerHooks';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

type UseBalanceReturnType = {
  balance: BigNumber;
  setBalance: (to: BigNumber) => void;
  refetch: () => void;
};

export const useBalance = (autoFetch = true): UseBalanceReturnType => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const signer = useSigner();

  const refetch = useCallback(() => {
    if (signer != null) {
      signer.getBalance().then((bal) => setBalance(bal));
    }
  }, [signer]);

  useEffect(() => {
    if (autoFetch) {
      refetch();
    }
  }, [refetch, autoFetch]);

  return { balance, refetch, setBalance };
};
