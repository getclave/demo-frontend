import { EthyleneAbiItem } from '@ethylene/types/app';
import { ContractInterface } from 'ethers';
import { FormatTypes, Interface } from 'ethers/lib/utils';

export const abiExtractor = (abi: ContractInterface) => {
  let mainAbi: Array<EthyleneAbiItem> | null = null;
  let iface: Interface | null = null;
  if (abi instanceof Interface) {
    iface = abi;
  } else {
    iface = new Interface(abi);
  }

  const stringifiedAbi = iface.format(FormatTypes.json);
  if (typeof stringifiedAbi === 'string') {
    mainAbi = JSON.parse(stringifiedAbi);
  }
  if (mainAbi == null) {
    return;
  }

  return mainAbi;
};
