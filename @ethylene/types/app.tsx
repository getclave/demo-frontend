import { ethers } from 'ethers';
import React from 'react';

export type MixedElement = React.ReactElement | string;

export type Web3ProviderType = ethers.providers.Web3Provider | null;

export type EthyleneSigner = ethers.providers.JsonRpcSigner;
export type EthyleneConnectionType = 'web3auth' | 'injected' | 'walletconnect';

export type UseConnectionProps = {
  onError?: () => void;
  onConnect?: () => void;
  connector?: EthyleneConnectionType;
};

interface IEthyleneConnector {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnecting: boolean;
}

export interface EthyleneMetamaskConnector extends IEthyleneConnector {}
export interface EthyleneWeb3AuthConnector extends IEthyleneConnector {}

type EthyleneConnectorExtra = {
  isConnecting: boolean;
  type: EthyleneConnectionType;
  isConnected: boolean;
};

export type EthyleneConnector = (
  | EthyleneMetamaskConnector
  | EthyleneWeb3AuthConnector
) &
  EthyleneConnectorExtra;

export interface IEthyleneNetwork {
  chainId: string;
  name: string;
  rpcUrls: string[];
  nativeCurrency: { name?: string; decimals?: number; symbol?: string };
}

export interface EthyleneNetwork extends IEthyleneNetwork {
  type: 'testnet' | 'mainnet';
}

export type EthyleneAbiItem = {
  anonymous: boolean;
  inputs: Array<unknown>;
  name: string;
  type: string;
};

export type MapStringToBoolean = { [key: string]: boolean };
