import { ethers } from 'ethers';

import { toHexString } from '../utils';

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
        ethers.BigNumber.from(toHexString(x) as string),
        ethers.BigNumber.from(toHexString(y) as string),
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
