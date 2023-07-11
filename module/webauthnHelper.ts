import type {
    AuthenticateOptions,
    RegisterOptions,
} from '@passwordless-id/webauthn/dist/esm/types';
import { ADDRESSES } from 'constants/address';
import { initializationCodeStart } from 'constants/initCode';
import { ethers } from 'ethers';
import {
    bufferFromBase64,
    getClientChallengeOffset,
    getCoordinatesFromHexPublicKey,
    getRS,
} from 'module/webauthnUtils';
import { deviceType } from 'react-device-detect';
import { looksLikeHex } from 'utils/looksLikeHex';

/**
 * Set WebAuthn options for the registration and authentication
 */

export const WebauthnOptions = (): {
    registerOptions: RegisterOptions;
    authOptions: AuthenticateOptions;
    algorithm: string;
} => {
    const userAgent: boolean =
        window.navigator.userAgent.toLowerCase().includes('mac') ||
        deviceType == 'mobile';
    return {
        registerOptions: {
            authenticatorType: userAgent ? 'auto' : 'both', // extern => remove browser
            userVerification: 'required',
            timeout: 60000,
            attestation: false,
            debug: false,
        } as RegisterOptions,
        authOptions: {
            authenticatorType: userAgent ? 'auto' : 'both', // extern => remove browser
            userVerification: 'required',
            timeout: 60000,
        } as AuthenticateOptions,
        algorithm: 'ES256',
    };
};

/**
 * Encode the signature to be verified by the smart contract
 * @param {string} _authenticatorData - authenticatorData comes from authentication response
 * @param {string} _clientData - clientData comes from authentication response
 * @param {string} _challenge - challenge which is used to authentication
 * @param {string} _publicKey - publicKey of the user
 * @param {string} _signatureBase64 - signature comes from authentication response
 * @returns {string} - encoded signature
 */
export const getSignatureVerifyParamEncoded = async (
    _authenticatorData: string,
    _clientData: string,
    _challenge: string,
    _publicKey: string,
    _signatureBase64: string,
): Promise<string> => {
    const authenticatorData: Buffer = bufferFromBase64(_authenticatorData);
    const clientData: Buffer = bufferFromBase64(_clientData);
    const clientChallengeDataOffset: number =
        getClientChallengeOffset(_clientData);
    const rs: Array<ethers.BigNumber> = getRS(_signatureBase64);
    const coordinates: Array<ethers.BigNumber> =
        getCoordinatesFromHexPublicKey(_publicKey);
    const abiCoder: ethers.utils.AbiCoder = new ethers.utils.AbiCoder();
    const signature: string = abiCoder.encode(
        [
            'bytes',
            'bytes1',
            'bytes',
            'bytes32',
            'uint256',
            'uint256[2]',
            'uint256[2]',
        ],
        [
            authenticatorData,
            '0x01',
            clientData,
            _challenge,
            clientChallengeDataOffset,
            rs,
            coordinates,
        ],
    );

    return signature;
};

export type HexString = `0x${string}`;

/**
 * The AbiCoder is a collection of Coders which can be used to encode and decode the binary data formats used to interoperate between the EVM and higher level libraries.
 */
export const abiEncoder = (
    types: Array<string | ethers.utils.ParamType>,
    values: Array<unknown>,
): HexString => {
    const abiCoder = new ethers.utils.AbiCoder();
    const signature = abiCoder.encode(types, values) as HexString;
    return signature;
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
    const publicKey = looksLikeHex(_publicKey);
    const SELECTOR = 'fd7230d6';
    const initializationCode = getInitializationCode(publicKey);
    const initCode =
        ADDRESSES.factory +
        SELECTOR +
        abiEncoder(['uint256', 'bytes'], [0, initializationCode]).slice(2);

    return initCode as HexString;
};
