/**
 * Function to convert a string to a hex string.
 * If string is already a hex string, it returns the same string
 * @param _string
 * @returns
 */
export const toHexString = (_string: string): string => {
    if (_string.slice(0, 2) === '0x') return _string;
    return '0x' + _string;
};
