import { Contract } from 'ethers';

import { ABIs } from '../constants/abi';
import { ADDRESSES } from '../constants/address';
import { provider } from '../restapi/index';

export const useGetFactoryContract = async (): Promise<Contract> => {
    const factory: Contract = new Contract(
        ADDRESSES.factory,
        ABIs.factoryContract,
        provider,
    );

    return factory;
};
