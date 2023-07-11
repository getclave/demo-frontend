import type { Contract } from 'ethers';

import { useGetEntrypointContract } from './useGetEntrypointContract';

export const useGetNonce = async (_address: string): Promise<number> => {
    const entrypoint: Contract = await useGetEntrypointContract();

    const nonce = await entrypoint.getNonce(_address, 0);
    return Number(nonce.toString());
};
