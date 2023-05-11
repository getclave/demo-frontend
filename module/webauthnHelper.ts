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
    getCoordinates,
    getRS,
} from 'module/webauthnUtils';
import { looksLikeHex } from 'utils/looksLikeHex';

export const WebauthnOptions = {
    registerOptions: {
        authenticatorType: 'auto', // extern => remove browser
        userVerification: 'required',
        timeout: 60000,
        attestation: false,
        debug: false,
    } as RegisterOptions,
    authOptions: {
        authenticatorType: 'auto', // extern => remove browser
        userVerification: 'required',
        timeout: 60000,
    } as AuthenticateOptions,
    algorithm: 'ES256',
};

export const getSignatureVerifyParamEncoded = async (
    _authenticatorData: string,
    _clientData: string,
    _challenge: string,
    _webauthnPublicKey: string,
    _signatureBase64: string,
): Promise<string> => {
    const authenticatorData: Buffer = bufferFromBase64(_authenticatorData);
    const clientData: Buffer = bufferFromBase64(_clientData);
    const clientChallengeDataOffset: number =
        getClientChallengeOffset(_clientData);
    const rs: Array<ethers.BigNumber> = getRS(_signatureBase64);
    const coordinates: Array<ethers.BigNumber> = await getCoordinates(
        _webauthnPublicKey,
    );
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

export const getInitializationCode = (publicKey: string): HexString => {
    return initializationCode(publicKey) as HexString;
};

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
