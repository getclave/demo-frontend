import { Provider } from '@ethersproject/abstract-provider';
import { Web3ProviderType } from '@ethylene/types/app';
import { Contract, ContractInterface, Signer } from 'ethers';

export class EthyleneContract<T> extends Contract {
  methods: T;
}
