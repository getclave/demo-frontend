import { Contract } from 'ethers';

import { ABIs } from '../constants/abi';
import { provider } from '../restapi/index';

/**
 * Gets a Clave contract
 * @param {string} _address - Contract address
 * @returns {Promise<Contract>} - Contract
 */
export const useGetAccountContract = async (
    _address: string,
): Promise<Contract> => {
    const contract: Contract = new Contract(
        _address,
        ABIs.claveAccountContract,
        provider,
    );

    return contract;
};
