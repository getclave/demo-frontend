import { ethers } from 'ethers';

import type { HexString } from '../types/hexString';

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
