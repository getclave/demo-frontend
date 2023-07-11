import { ContractFactory, ethers } from 'ethers';
import type { Contract, ContractInterface } from 'ethers';

import { CONFIG } from '../config/config';
import { provider } from '../restapi/index';

export const useDeployContract = async (
    _abi: ContractInterface,
    _bytecode: string,
    ...params: Array<unknown>
): Promise<Contract> => {
    const wallet: ethers.Wallet = new ethers.Wallet(
        CONFIG.PRIVATE_KEY,
        provider,
    );
    const factory = new ContractFactory(_abi, _bytecode, wallet);
    const deployedContract = await factory.deploy(...params);

    return deployedContract;
};
