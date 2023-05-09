export const parseAddress = (address: string): string => {
    return (
        address?.substring?.(0, 5) +
        '...' +
        address?.substring?.(address?.length - 4)
    );
};

export const parseAddressMobile = (address: string): string => {
    return (
        address?.substring?.(0, 3) +
        '...' +
        address?.substring?.(address?.length - 2)
    );
};
