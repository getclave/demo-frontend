import { EthyleneContract } from '@ethylene/core/EthyleneContract';
import { MapStringToBoolean, Web3ProviderType } from '@ethylene/types/app';
import { abiExtractor } from '@ethylene/utils/abiExtractor';
import { ContractInterface, Signer } from 'ethers';
import { useMemo, useState } from 'react';

export const useContract = <T extends string>(
  address: string,
  abi: ContractInterface,
  signerOrProvider: Web3ProviderType | Signer,
) => {
  const initialState: MapStringToBoolean = useMemo(() => {
    const extractedAbi = abiExtractor(abi);
    if (extractedAbi == null) {
      return {};
    }
    const obj = {} as MapStringToBoolean;
    extractedAbi.forEach((item) => {
      obj[item.name] = false;
    });
    return obj;
  }, [abi]);

  const [loadingState, setLoadingState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);

  const contract: EthyleneContract<T> | null = useMemo(() => {
    if (signerOrProvider == null) return null;
    return new EthyleneContract(
      address,
      abi,
      signerOrProvider,
      loadingState,
      setLoadingState,
      errorState,
      setErrorState,
    );
  }, [abi, address, signerOrProvider, errorState, loadingState]);

  return contract;
};
