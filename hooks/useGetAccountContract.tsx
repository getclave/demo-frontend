import { CONFIG } from 'config';
import { ABIs } from 'constants/abi';
import { ethers } from 'ethers';
import { Contract } from 'ethers';

export const useGetAccountContract = async (
    _address: string,
): Promise<Contract> => {
    const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL);

    const contract: Contract = new Contract(
        _address,
        ABIs.sealAccountContract,
        provider,
    );

    return contract;
};
