import { expect, test } from '@jest/globals';

import { toHexString } from './toHexString';

test('adds 0x to normal string', () => {
    expect(toHexString('alim')).toEqual('0xalim');
});

test('return input if it starts with 0x', () => {
    const input = '0xalim';
    expect(toHexString(input)).toEqual(input);
});
