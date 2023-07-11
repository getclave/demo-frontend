import type { Contract } from 'ethers';

import { useGetFactoryContract } from '../hooks/useGetFactoryContract';
import { getInitializationCode } from '../userOp/userOp';
import { toHexString } from '../utils/toHexString';

/**
 * Gets a create2 address with publickey and clave contract calldata
 * @param {string} _publicKey - Public key which comes from webauthn
 * @returns {Promise<string>} - Create2 address
 */
export const useGetCreate2Address = async (
    _publicKey: string,
): Promise<string> => {
    const factory: Contract = await useGetFactoryContract();
    const publicKey: string = toHexString(_publicKey);
    const initializationCode: string = getInitializationCode(publicKey);
    const create2Address = await factory.findCreate2Address(
        0,
        initializationCode,
    );

    return create2Address;
};
