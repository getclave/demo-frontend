import { Contract } from 'ethers';

import { ABIs } from '../constants/abi';
import { provider } from '../restapi/index';

export const useGetAccountContract = async (
    _address: string,
): Promise<Contract> => {
    const contract: Contract = new Contract(
        _address,
        ABIs.sealAccountContract,
        provider,
    );

    return contract;
};
