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
import type { UserOp } from 'module/webauthnUtils';

/**
 * To call the getUserOpHash function of the entryPoint contract,
 * first create a userOp and then return the response of the function
 * Get the challenge for the user authentication
 * @param {string} _senderAddress - Address of the contract who will be signing the transaction
 * @param {string} _signature - Signature of the transaction
 * @param {string} _calldata - Calldata of the transaction
 * @returns {string} - getUserOpHash function result of entrypoint
 */
export const getChallange = async (
    _senderAddress = '',
    _signature = '0x',
    _calldata = '0x',
): Promise<string> => {
    const contract = await useGetEntrypointContract();

    const userOp: UserOp = await getDefaultUserOp(
        _senderAddress,
        _signature,
        _calldata,
    );

    const response = await contract.getUserOpHash(userOp);
    return response;
};

/**
 * To call the getUserOpHash function of the entryPoint for init contract
 * @param {string} _senderAddress - Create2 address
 * @param {string} _publicKey - Public key which comes from registration
 * @returns {string} - string
 */

export const getInitChallenge = async (
    _senderAddress = '',
    _publicKey = '0x',
): Promise<string> => {
    const contract = await useGetEntrypointContract();
    const userOp: UserOp = await getInitUserOp(_senderAddress, _publicKey);

    const response = await contract.getUserOpHash(userOp);
    return response;
};

/**
 * Create a new passkey for the user
 * @param {string} user - Nickname for the registration
 * @param {string} challenge - Challenge for the registration, does not matter what it is for registration
 * @returns {RegistrationEncoded} - Registration return object
 */

export const register = async (
    user = 'seal',
    challenge = 'seal',
): Promise<RegistrationEncoded> => {
    const registration = await client.register(
        user,
        challenge,
        WebauthnOptions().registerOptions,
    );
    return registration;
};

/**
 * After the user has registered, authenticate the user with challenge
 * @param {Array<string>} credentialId - Credential ID from the registration
 * @param {string} challenge - Challenge for the authentication
 * @returns {AuthenticationEncoded} - Authentication return object
 */

export const authenticate = async (
    credentialId: Array<string>,
    challenge: string,
): Promise<AuthenticationEncoded> => {
    const login = await client.authenticate(
        credentialId,
        challenge,
        WebauthnOptions().authOptions,
    );

    return login;
};

/**
 * After sign the userOp (authentication with challenge),
 * send the userOp to the entrypoint contract.
 * @param _challenge
 * @param _publicKey
 * @param _encodedChallenge
 * @param _signatureBase64
 * @param _authenticatorData
 * @param _clientData
 * @param _senderAddress
 * @param _calldata
 * @param _beneficiary
 * @returns {Transaction} - Transaction response
 */
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

    const userOp: UserOp = await getDefaultUserOp(
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

/**
 * After sign the userOp (authentication with challenge),
 * send the userOp to the entrypoint contract.
 * @param _challenge
 * @param _publicKey
 * @param _encodedChallenge
 * @param _signatureBase64
 * @param _authenticatorData
 * @param _clientData
 * @param _senderAddress
 * @param _beneficiary
 * @returns {Transaction} - Transaction response
 */
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

    const userOp: UserOp = await getInitUserOp(
        _senderAddress,
        _publicKey,
        signature,
    );
    const response = await contract.handleOps([userOp], _beneficiary, {
        gasLimit: 20000000, //change this
    });
    await response.wait();
    return response;
};

/**
 * Verify the signature, (validateSignature function can be internal)
 * @returns {Transaction} - Transaction response
 */

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

    const userOp: UserOp = await getDefaultUserOp(
        _senderAddress,
        _publicKey,
        signature,
    );

    const contract: Contract = await useGetAccountContract(_senderAddress);

    const response = await contract.validateSignature([userOp], _challenge);
    await response.wait();
    return response;
};
