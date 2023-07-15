import { expect, test } from '@jest/globals';

import { toHexString } from './toHexString';

describe('when toHexString is called, it', () => {
    it('should add 0x to a string without 0x prefix', () => {
        expect(toHexString('alim')).toBe('0xalim');
    });

    it('should return string as it is, if it starts with 0x', () => {
        const input = '0xalim';
        expect(toHexString(input)).toBe(input);
    });
});
