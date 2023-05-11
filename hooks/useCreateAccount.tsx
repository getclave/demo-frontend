import type { Contract } from 'ethers';
import { useGetFactoryContract } from 'hooks';
import { getInitializationCode } from 'module/webauthnHelper';
import { looksLikeHex } from 'utils/looksLikeHex';

export const useCreateAccount = async (_publicKey: string): Promise<string> => {
    const factory: Contract = await useGetFactoryContract();
    const publicKey: string = looksLikeHex(_publicKey);
    const initializationCode: string = getInitializationCode(publicKey);
    const create2Address = await factory.findCreate2Address(
        0,
        initializationCode,
    );

    return create2Address;
};
