import { expect } from '@jest/globals';
import { ethers } from 'ethers';

import { abiEncoder } from './abiEncoder';

describe('when abiEncoder is called, it', () => {
    it('should encode bytes correct', () => {
        const encodedData = abiEncoder(['bytes'], ['0x10']);
        const expectedData =
            '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000';

        expect(encodedData).toBe(expectedData);
    });
    it('should return address, uint and bytes encoded correctly', () => {
        const encodedData = abiEncoder(
            ['address', 'uint256', 'bytes'],
            [
                '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
                ethers.BigNumber.from('0x10'),
                '0x',
            ],
        );
        const expectedData =
            '0x00000000000000000000000095222290dd7278aa3ddd389cc1e1d165cc4bafe5000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000';

        expect(encodedData).toBe(expectedData);
    });

    it('should be capable of taking more than 4 inputs', () => {
        const encodedData = abiEncoder(
            ['address', 'uint256', 'bytes', 'address', 'address'],
            [
                '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
                ethers.BigNumber.from('0x10'),
                '0x',
                '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19',
                '0x7e2a2FA2a064F693f0a55C5639476d913Ff12D05',
            ],
        );
        const expectedData =
            '0x00000000000000000000000095222290dd7278aa3ddd389cc1e1d165cc4bafe5000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000baf6dc2e647aeb6f510f9e318856a1bcd66c5e190000000000000000000000007e2a2fa2a064f693f0a55c5639476d913ff12d050000000000000000000000000000000000000000000000000000000000000000';

        expect(encodedData).toBe(expectedData);
    });
});
