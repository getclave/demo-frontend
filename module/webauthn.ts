import { client } from '@passwordless-id/webauthn';
import type {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import type { Transaction } from 'ethers';
import type { Contract } from 'ethers';
import { useGetAccountContract } from 'hooks/useGetAccountContract';
import {
    useGetEntrypointContract,
    useGetEntrypointContractWithSigner,
} from 'hooks/useGetEntrypointContract';
import {
    WebauthnOptions,
    getSignatureVerifyParamEncoded,
} from 'module/webauthnHelper';
import { getDefaultUserOp, getInitUserOp } from 'module/webauthnUtils';
import type { UserOperationWithSignature } from 'module/webauthnUtils';

export const getChallange = async (
    _senderAddress = '',
    _signature = '0x',
    _calldata = '0x',
): Promise<string> => {
    const contract = await useGetEntrypointContract();

    const userOp: UserOperationWithSignature = await getDefaultUserOp(
        _senderAddress,
        _signature,
        _calldata,
    );

    const response = await contract.getUserOpHash(userOp);
    return response;
};

export const getInitChallange = async (
    _senderAddress = '',
    _publicKey = '0x',
): Promise<string> => {
    const contract = await useGetEntrypointContract();
    const userOp: UserOperationWithSignature = await getInitUserOp(
        _senderAddress,
        _publicKey,
    );

    const response = await contract.getUserOpHash(userOp);

    return response;
};

export const register = async (
    user = 'seal',
    challenge = 'seal',
): Promise<RegistrationEncoded> => {
    const registration = await client.register(
        user,
        challenge,
        WebauthnOptions.registerOptions,
    );
    return registration;
};

export const authenticate = async (
    credentialId: Array<string>,
    challenge: string,
): Promise<AuthenticationEncoded> => {
    const login = await client.authenticate(
        credentialId,
        challenge,
        WebauthnOptions.authOptions,
    );

    return login;
};

export const sendUserOpToEntrypoint = async (
    _challenge: string,
    _publicKey: string,
    _encodedChallenge: string,
    _signatureBase64: string,
    _authenticatorData: string,
    _clientData: string,
    _senderAddress = '',
    _calldata = '0x',
    _beneficiary = '0x114B242D931B47D5cDcEe7AF065856f70ee278C4',
): Promise<Transaction> => {
    const signature: string = await getSignatureVerifyParamEncoded(
        _authenticatorData,
        _clientData,
        _challenge,
        _publicKey,
        _signatureBase64,
    );
    const contract: Contract = await useGetEntrypointContractWithSigner();

    const userOp: UserOperationWithSignature = await getDefaultUserOp(
        _senderAddress,
        signature,
        _calldata,
    );
    const response = await contract.handleOps([userOp], _beneficiary, {
        gasLimit: 5000000,
    });
    await response.wait();
    return response;
};

export const sendInitUserOp = async (
    _challenge: string,
    _publicKey: string,
    _encodedChallenge: string,
    _signatureBase64: string,
    _authenticatorData: string,
    _clientData: string,
    _senderAddress = '',
    _beneficiary = '0x114B242D931B47D5cDcEe7AF065856f70ee278C4',
): Promise<Transaction> => {
    const signature: string = await getSignatureVerifyParamEncoded(
        _authenticatorData,
        _clientData,
        _challenge,
        _publicKey,
        _signatureBase64,
    );
    const contract: Contract = await useGetEntrypointContractWithSigner();

    const userOp: UserOperationWithSignature = await getInitUserOp(
        _senderAddress,
        _publicKey,
        signature,
    );
    const response = await contract.handleOps([userOp], _beneficiary, {
        gasLimit: 20000000,
    });
    await response.wait();
    return response;
};

export const verifySignature = async (
    _challenge: string,
    _publicKey: string,
    _encodedChallenge: string,
    _signatureBase64: string,
    _authenticatorData: string,
    _clientData: string,
    _senderAddress = '',
): Promise<Transaction> => {
    const signature: string = await getSignatureVerifyParamEncoded(
        _authenticatorData,
        _clientData,
        _challenge,
        _publicKey,
        _signatureBase64,
    );

    const userOp: UserOperationWithSignature = await getDefaultUserOp(
        _senderAddress,
        _publicKey,
        signature,
    );

    const contract: Contract = await useGetAccountContract(_senderAddress);

    const response = await contract.validateSignature([userOp], _challenge);
    await response.wait();
    return response;
};
