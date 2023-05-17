export const isInArray = (_array: Array<T>, _value: T): boolean => {
    const result: boolean = _array.includes(_value);
    return result;
};
