export const toHexString = (_string: string): string => {
    if (_string.slice(0, 2) === '0x') return _string;
    return '0x' + _string;
};
