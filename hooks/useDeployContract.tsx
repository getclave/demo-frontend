import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { BYTECODES } from 'constants/bytecode';
import { ContractFactory, ethers } from 'ethers';
import { useEffect } from 'react';

export const useDeployContract = (): void => {
    const provider: ethers.providers.AlchemyProvider =
        new ethers.providers.AlchemyProvider(
            CONFIG.network,
            CONFIG.ALCHEMY_KEY,
        );
    const factory = new ContractFactory(
        ABIs.sealAccountContract,
        BYTECODES.sealAccount,
        signer,
    );
};
