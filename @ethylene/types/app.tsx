import React from 'react';

export type MixedElement = React.ReactElement | string;

export type EthyleneConnectionType = 'web3auth' | 'metamask';

interface IEthyleneConnector {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface EthyleneMetamaskConnector extends IEthyleneConnector {}
export interface EthyleneWeb3AuthConnector extends IEthyleneConnector {}

export type EthyleneConnector = (
  | EthyleneMetamaskConnector
  | EthyleneWeb3AuthConnector
) & {
  isConnecting: boolean;
  type: EthyleneConnectionType;
  isConnected: boolean;
};
