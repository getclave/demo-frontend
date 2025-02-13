import { ethers } from 'ethers';
import { useGetNonce } from 'hooks/useGetNonce';
import { getInitCode } from 'module/webauthnHelper';
import { looksLikeHex } from 'utils/looksLikeHex';

/**
 * UserOp type definition, it comes from eip-4337
 */

export type UserOp = {
    sender: string;
    nonce: number;
    initCode: string;
    callData: string;
    callGasLimit: number;
    verificationGasLimit: number;
    preVerificationGas: number;
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
    paymasterAndData: string;
    signature: string;
};

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

// export function

export function bufferFromBase64(base64url: string): Buffer {
    function padString(input: string): string {
        const segmentLength = 4;
        const stringLength = input.length;
        const diff = stringLength % segmentLength;

        if (!diff) {
            return input;
        }

        let position = stringLength;
        let padLength = segmentLength - diff;
        const paddedStringLength = stringLength + padLength;
        const buffer = Buffer.alloc(paddedStringLength);

        buffer.write(input);

        while (padLength--) {
            buffer.write('=', position++);
        }

        return buffer.toString();
    }

    function toBase64(base64url: string | Buffer): string {
        base64url = base64url.toString();
        return padString(base64url).replace(/\-/g, '+').replace(/_/g, '/');
    }

    return Buffer.from(toBase64(base64url), 'base64');
}

export function getClientChallengeOffset(_clientData: string): number {
    return (
        bufferFromBase64(_clientData).indexOf(
            '226368616c6c656e6765223a',
            0,
            'hex',
        ) +
        12 +
        1
    );
}

export function getRS(_signatureBase64: string): Array<ethers.BigNumber> {
    const signatureBuffer = bufferFromBase64(_signatureBase64);
    const signatureParsed = derToRS(signatureBuffer);

    const sig: Array<ethers.BigNumber> = [
        ethers.BigNumber.from(bufferToHex(signatureParsed[0])),
        ethers.BigNumber.from(bufferToHex(signatureParsed[1])),
    ];

    return sig;
}

export async function getCoordinates(
    pubkey: string | undefined,
): Promise<Array<ethers.BigNumber>> {
    const pubKeyBuffer = bufferFromBase64(pubkey as string);
    const rawPubkey = await crypto.subtle.exportKey(
        'jwk',
        await getKey(pubKeyBuffer),
    );
    const { x, y } = rawPubkey;
    const pubkeyUintArray = [
        ethers.BigNumber.from(bufferToHex(bufferFromBase64(x as string))),
        ethers.BigNumber.from(bufferToHex(bufferFromBase64(y as string))),
    ];

    return pubkeyUintArray;
}

export function getCoordinatesFromHexPublicKey(
    pubkey: string,
): Array<ethers.BigNumber> {
    if (pubkey.length !== 128) {
        throw new Error('Invalid public key');
    }

    const x = pubkey.slice(0, 64);
    const y = pubkey.slice(64, 128);

    const pubkeyUintArray = [
        ethers.BigNumber.from(looksLikeHex(x) as string),
        ethers.BigNumber.from(looksLikeHex(y) as string),
    ];

    return pubkeyUintArray;
}

export async function getPublicKey(
    pubkey: string | undefined,
): Promise<string> {
    const pubKeyBuffer = bufferFromBase64(pubkey as string);
    const rawPubkey = await crypto.subtle.exportKey(
        'jwk',
        await getKey(pubKeyBuffer),
    );
    const { x, y } = rawPubkey;
    const pubkeyUintArray = [
        ethers.BigNumber.from(bufferToHex(bufferFromBase64(x as string))),
        ethers.BigNumber.from(bufferToHex(bufferFromBase64(y as string))),
    ];

    const publicKey: string =
        pubkeyUintArray[0].toHexString().slice(2) +
        pubkeyUintArray[1].toHexString().slice(2);

    return publicKey;
}

export function derToRS(der: Buffer): Array<Buffer> {
    let offset = 3;
    let dataOffset;

    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const r = der.slice(dataOffset, dataOffset + 32);
    offset = offset + der[offset] + 1 + 1;
    if (der[offset] == 0x21) {
        dataOffset = offset + 2;
    } else {
        dataOffset = offset + 1;
    }
    const s = der.slice(dataOffset, dataOffset + 32);
    return [r, s];
}

export function bufferToHex(buffer: ArrayBufferLike): string {
    return '0x'.concat(
        [...new Uint8Array(buffer)]
            .map((b) => b.toString(16).padStart(2, '0'))
            .join(''),
    );
}

async function getKey(pubkey: ArrayBufferLike): Promise<CryptoKey> {
    const algoParams = {
        name: 'ECDSA',
        namedCurve: 'P-256',
        hash: 'SHA-256',
    };

    const response = await crypto.subtle.importKey(
        'spki',
        pubkey,
        algoParams,
        true,
        ['verify'],
    );
    return response;
}

const base64toBase64Url = (txt: string): string => {
    return txt.replaceAll('+', '-').replaceAll('/', '_');
};

/**
 * Encode challenge to base64url
 * @param challenge
 * @returns {string} - Enocded challenge
 */
export const encodeChallenge = (challenge: string): string => {
    const sliced = challenge.slice(2);
    const split = base64toBase64Url(
        Buffer.from(sliced, 'hex').toString('base64'),
    ).replaceAll('=', 'A');

    return split;
};
