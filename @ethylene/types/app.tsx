import React from 'react';

export type MixedElement = React.ReactElement | string;

export type EthyleneConnectionType = 'web3auth' | 'metamask'; // TODO: add Starknet

interface IEthyleneConnector {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
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
