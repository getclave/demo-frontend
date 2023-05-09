import type {
    AuthenticateOptions,
    RegisterOptions,
} from '@passwordless-id/webauthn/dist/esm/types';
import { ethers } from 'ethers';
import {
    bufferFromBase64,
    getClientChallengeOffset,
    getCoordinates,
    getRS,
} from 'module/webauthnUtils';

export const WebauthnOptions = {
    registerOptions: {
        authenticatorType: 'auto',
        userVerification: 'required',
        timeout: 60000,
        attestation: false,
        debug: false,
    } as RegisterOptions,
    authOptions: {
        authenticatorType: 'auto',
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
