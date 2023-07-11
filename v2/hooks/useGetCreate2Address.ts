import type { Contract } from 'ethers';

import { useGetFactoryContract } from '../hooks/useGetFactoryContract';
import { getInitializationCode } from '../userOp/userOp';
import { toHexString } from '../utils/toHexString';

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
