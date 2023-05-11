import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { ADDRESSES } from 'constants/address';
import { ethers } from 'ethers';
import { Contract } from 'ethers';

export const useGetFactoryContract = async (): Promise<Contract> => {
    const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);

    const factory: Contract = new Contract(
        ADDRESSES.factory,
        ABIs.factoryContract,
        provider,
    );

    return factory;
};
