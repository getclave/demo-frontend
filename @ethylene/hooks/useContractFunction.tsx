import { useProvider } from '@ethylene/hooks/useProvider';
import { useSigner } from '@ethylene/hooks/useSigner';
import { EthyleneSigner } from '@ethylene/types/app';
import { __dev__ } from '@ethylene/utils';
import { Contract, ContractInterface, ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

export const useContractFunction = <T,>({
    address,
    abi,
    method,
    onFail,
    onSuccess,
}: {
    address: string;
    abi: ContractInterface;
    method: string;
    onFail?: (err: unknown) => void;
    onSuccess?: (res: T) => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const provider = useProvider();
    const signer = useSigner();

    const execute = useCallback(
        async <R extends Array<unknown>>(
            type: 'write' | 'read' = 'read',
            ...args: R
        ) => {
            const isRead = type === 'read';
            try {
                const contract = new Contract(
                    address,
                    abi,
                    isRead
                        ? (provider as ethers.providers.Web3Provider)
                        : (signer as EthyleneSigner),
                );
                setIsLoading(true);
                setIsFailed(false);
                const res = await contract[method](...args);
                let txn;
                if (!isRead) {
                    txn = await res.wait();
                }
                setIsLoading(false);
                onSuccess?.(!isRead ? txn : res);
            } catch (err) {
                setIsFailed(true);
                setIsLoading(false);
                onFail?.(err);
                if (__dev__) {
                    console.error(err);
                }
            }
        },
        [abi, address, method, onFail, onSuccess, provider, signer],
    );

    const write = useCallback(
        <T extends Array<unknown>>(...args: T) => {
            execute('write', ...args);
        },
        [execute],
    );

    const read = useCallback(
        <T extends Array<unknown>>(...args: T) => {
            execute('read', ...args);
        },
        [execute],
    );

    return useMemo(
        () => ({ isFailed, isLoading, read, write }),
        [read, write, isLoading, isFailed],
    );
};
