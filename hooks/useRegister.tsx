import type { Contract, ContractInterface } from 'ethers';
import { useDeployContract } from 'hooks/useDeployContract';
import { register } from 'module/webauthn';
import { getPublicKey } from 'module/webauthnUtils';
import { useDispatch } from 'react-redux';
import {
    setDeployedContractAddress,
    setRegistrationResponse,
} from 'store/slicers/account';

export const useRegister = (): {
    registerAndDeploy: (
        _username: string,
        _ABI: ContractInterface,
        _bytecode: string,
    ) => Promise<void>;
} => {
    const dispatch = useDispatch();

    const registerAndDeploy = async (
        _username: string,
        _ABI: ContractInterface,
        _bytecode: string,
    ): Promise<void> => {
        const registrationResponse = await register(_username);
        if (registrationResponse) {
            dispatch(setRegistrationResponse(registrationResponse));
            const publicKey: string = await getPublicKey(
                registrationResponse?.credential.publicKey,
            );
            const deployedContract: Contract = await useDeployContract(
                _ABI,
                _bytecode,
                '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
                Buffer.from(publicKey, 'hex'),
            );
            console.log(deployedContract.address, 'deploylandi');
            dispatch(setDeployedContractAddress(deployedContract.address));
        }
    };

    return { registerAndDeploy };
};
