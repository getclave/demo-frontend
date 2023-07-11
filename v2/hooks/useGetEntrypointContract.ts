import { Contract, ethers } from 'ethers';

import { CONFIG } from '../config/config';
import { ABIs } from '../constants/abi';
import { ADDRESSES } from '../constants/address';
import { provider } from '../restapi/index';

/**
 * Gets entrypoint contract
 * @returns {Promise<Contract>} - Contract
 */
export const useGetEntrypointContract = async (): Promise<Contract> => {
    const contract: Contract = new Contract(
        ADDRESSES.entryPoint,
        ABIs.entrypointContract,
        provider,
    );

    return contract;
};
/**
 * Gets entrypoint contract with signer
 * @returns {Promise<Contract>} - Contract
 */
export const useGetEntrypointContractWithSigner =
    async (): Promise<Contract> => {
        const wallet: ethers.Wallet = new ethers.Wallet(
            CONFIG.PRIVATE_KEY,
            provider,
        );
        const contract: Contract = new Contract(
            ADDRESSES.entryPoint,
            ABIs.entrypointContract,
            wallet,
        );

        return contract;
    };
