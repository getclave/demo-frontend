import type { Contract, Transaction } from 'ethers';

import { ADDRESSES } from '../constants/address';
import { initializationCodeStart } from '../constants/initCode';
import { useGetAccountContract } from '../hooks/useGetAccountContract';
import {
    useGetEntrypointContract,
    useGetEntrypointContractWithSigner,
} from '../hooks/useGetEntrypointContract';
import { useGetNonce } from '../hooks/useGetNonce';
import type { HexString } from '../types/hexString';
import type { UserOp } from '../types/userOp';
import { toHexString } from '../utils';
import { abiEncoder } from '../utils/abiEncoder';
import { getSignatureVerifyParamEncoded } from '../webauthn/utils';

/**
 * To create a UserOp object
 * @param {string} _senderAddress - sender address
 * @param {string} _signature - signature of the userOp
 * @param {string} _calldata - calldata of the userOp
 * @returns {UserOp} - UserOp object
 */

export const getDefaultUserOp = async (
    _senderAddress = '',
    _signature = '0x',
    _calldata = '0x',
): Promise<UserOp> => {
    const nonce = await useGetNonce(_senderAddress);

    const defaultUserOp: UserOp = {
        sender: _senderAddress,
        nonce: nonce,
        initCode: '0x',
        callData: _calldata,
        callGasLimit: 500000,
        verificationGasLimit: 500000,
        preVerificationGas: 500000,
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
        paymasterAndData: '0x',
        signature: _signature,
    };

    return defaultUserOp;
};

/**
 * To Create UserOp for init Clave Contract
 * @param _senderAddress - sender address
 * @param _publicKey - publicKey for control contract
 * @param _signature - signature of the userOp
 * @returns {UserOp} - UserOp object
 */

export const getInitUserOp = async (
    _senderAddress = '',
    _publicKey = '0x',
    _signature = '0x',
): Promise<UserOp> => {
    const initCode = getInitCode(_publicKey);
    const initUserOp: UserOp = {
        sender: _senderAddress,
        nonce: 0,
        initCode: initCode,
        callData: '0x',
        callGasLimit: 5000000,
        verificationGasLimit: 5000000,
        preVerificationGas: 5000000,
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
        paymasterAndData: '0x',
        signature: _signature,
    };

    return initUserOp;
};

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

const initializationCode = (publicKey: string): string =>
    `${initializationCodeStart}${publicKey.slice(2)}`;

/**
 * This function contains the calldata of the Clave contracts to be deployed.
 * At first, it adds the publicKey that can control the contract while deployed.
 * @param {HexString} publicKey - The publicKey which will be used to control the contract
 * @returns {string} - The initialization code of the contract
 */
export const getInitializationCode = (publicKey: string): HexString => {
    return initializationCode(publicKey) as HexString;
};

/**
 * Function that adds the factory contratin address and selector to be used when deploying it with the clave account calldata.
 * In this way, the necessary calldata to deploy the contract is created.
 * @param {string} publicKey - The publicKey which will be used to control the contract
 * @returns {HexString} - The initialization code of the contract
 */
export const getInitCode = (_publicKey: string): HexString => {
    const publicKey = toHexString(_publicKey);
    const SELECTOR = 'fd7230d6';
    const initializationCode = getInitializationCode(publicKey);
    const initCode =
        ADDRESSES.factory +
        SELECTOR +
        abiEncoder(['uint256', 'bytes'], [0, initializationCode]).slice(2);

    return initCode as HexString;
};
