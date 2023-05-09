import { CONFIG } from 'config';
import { ContractFactory, ethers } from 'ethers';
import type { Contract, ContractInterface } from 'ethers';

export const useDeployContract = async (
    _abi: ContractInterface,
    _bytecode: string,
    ...params: Array<unknown>
): Promise<Contract> => {
    const provider = new ethers.providers.JsonRpcProvider(CONFIG.ALCHEMY_KEY);
    const wallet: ethers.Wallet = new ethers.Wallet(
        CONFIG.PRIVATE_KEY,
        provider,
    );
    const factory = new ContractFactory(_abi, _bytecode, wallet);
    const deployedContract = await factory.deploy(...params);

    return deployedContract;
};
