import {
    EthyleneConnectionType,
    EthyleneSigner,
    Web3ProviderType,
} from '@ethylene/types/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Auth } from '@web3auth/web3auth';
import { ethers } from 'ethers';

export interface Web3State {
    address: string | null;
    connected: boolean;
    isConnecting: boolean;
    provider: ethers.providers.Web3Provider | null;
    signer: EthyleneSigner | null;
    web3AuthInstance: Web3Auth | null;
    walletConnectInstance: WalletConnectProvider | null;
    connectionType: EthyleneConnectionType | null;
}

const initialState: Web3State = {
    address: null,
    connected: false,
    connectionType: null,
    isConnecting: false,
    provider: null,
    signer: null,
    walletConnectInstance: null,
    web3AuthInstance: null,
};

export const web3Slice = createSlice({
    initialState,
    name: 'web3',
    reducers: {
        setAddress: (state, action: PayloadAction<string | null>) => {
            state.address = action.payload;
        },
        setConnectionType: (
            state,
            action: PayloadAction<EthyleneConnectionType | null>,
        ) => {
            state.connectionType = action.payload;
        },
        setIsConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setIsConnecting: (state, action: PayloadAction<boolean>) => {
            state.isConnecting = action.payload;
        },
        setProvider: (state, action: PayloadAction<Web3ProviderType>) => {
            state.provider = action.payload;
        },
        setSigner: (state, action: PayloadAction<EthyleneSigner | null>) => {
            state.signer = action.payload;
        },
        setWalletConnectInstance: (
            state,
            action: PayloadAction<WalletConnectProvider | null>,
        ) => {
            state.walletConnectInstance = action.payload;
        },
        setWeb3AuthInstance: (
            state,
            action: PayloadAction<Web3Auth | null>,
        ) => {
            state.web3AuthInstance = action.payload;
        },
    },
});

export const {
    setAddress,
    setConnectionType,
    setIsConnected,
    setWeb3AuthInstance,
    setIsConnecting,
    setProvider,
    setSigner,
    setWalletConnectInstance,
} = web3Slice.actions;

export default web3Slice.reducer;
