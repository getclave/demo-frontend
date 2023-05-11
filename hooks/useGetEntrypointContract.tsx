import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { ADDRESSES } from 'constants/address';
import { ethers } from 'ethers';
import { Contract } from 'ethers';

export const useGetEntrypointContract = async (): Promise<Contract> => {
    const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
    const contract: Contract = new Contract(
        ADDRESSES.entryPoint,
        ABIs.entrypointContract,
        provider,
    );

    return contract;
};

export const useGetEntrypointContractWithSigner =
    async (): Promise<Contract> => {
        const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);
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
