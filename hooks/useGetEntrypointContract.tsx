import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { ADDRESSES } from 'constants/address';
import { ethers } from 'ethers';
import { Contract } from 'ethers';
import { provider } from 'restapi/index';

export const useGetEntrypointContract = async (): Promise<Contract> => {
    const contract: Contract = new Contract(
        ADDRESSES.entryPoint,
        ABIs.entrypointContract,
        provider,
    );

    return contract;
};

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
