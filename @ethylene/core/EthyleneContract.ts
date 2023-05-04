import { Provider } from '@ethersproject/abstract-provider';
import { MapStringToBoolean, Web3ProviderType } from '@ethylene/types/app';
import { abiExtractor } from '@ethylene/utils/abiExtractor';
import { Contract, ContractInterface, Signer } from 'ethers';

export type IEthyleneContractFunction<T extends string> = {
    [key in T]: {
        /**
         * @dev Execute a function from Smart Contract
         */
        execute: <R>(...args: any) => Promise<R | undefined>;

        /**
         * @dev Execute a function from Smart Contract and wait for the transaction
         */
        executeAndWait: <R>(...args: any) => Promise<R | undefined>;

        /**
         * @dev is the transaction loading
         */
        isLoading: boolean;

        /**
         * @dev is the transaction failed
         */
        isFailed: boolean;
    };
};

export class EthyleneContract<T extends string> extends Contract {
    methods: IEthyleneContractFunction<T>;

    constructor(
        addressOrName: string,
        contractInterface: ContractInterface,
        signerOrProvider: Signer | Web3ProviderType,
        loading: MapStringToBoolean,
        setLoading: (to: MapStringToBoolean) => void,
        error: MapStringToBoolean,
        setError: (to: MapStringToBoolean) => void,
    ) {
        super(addressOrName, contractInterface, signerOrProvider as Provider);
        const mainAbi = abiExtractor(contractInterface);
        const map = {} as IEthyleneContractFunction<T>;

        if (mainAbi == null) {
            this.methods = map;
            return;
        }

        mainAbi
            .filter((item) => item.type === 'function')
            .forEach((item) => {
                (map as any)[item.name] = {
                    execute: async <R>(
                        ...args: any
                    ): Promise<R | undefined> => {
                        try {
                            setLoading({ ...loading, [item.name]: true });
                            const res = await this[item.name](
                                ...(args as Array<unknown>),
                            );
                            setLoading({ ...loading, [item.name]: false });
                            return res;
                        } catch {
                            setLoading({ ...loading, [item.name]: false });
                            setError({ ...error, [item.name]: true });
                            return new Promise((res) => {
                                res(undefined);
                            });
                        }
                    },
                    executeAndWait: async <R>(
                        ...args: any
                    ): Promise<R | undefined> => {
                        if (signerOrProvider == null) {
                            return new Promise((res) => {
                                res(undefined);
                            });
                        }
                        try {
                            setLoading({ ...loading, [item.name]: true });
                            const txn = await this.connect(signerOrProvider)[
                                item.name
                            ](...(args as Array<unknown>));
                            setLoading({ ...loading, [item.name]: false });
                            return await txn.wait();
                        } catch {
                            setLoading({ ...loading, [item.name]: false });
                            setError({ ...error, [item.name]: true });
                        }
                    },
                    isFailed: loading[item.name],
                    isLoading: error[item.name],
                };
            });

        this.methods = map;
    }
}
