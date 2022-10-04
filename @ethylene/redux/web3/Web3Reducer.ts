import { EthyleneSigner, Web3ProviderType } from '@ethylene/types/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Web3Auth } from '@web3auth/web3auth';
import { ethers, Signer } from 'ethers';

export interface Web3State {
  address: string | null;
  connected: boolean;
  isConnecting: boolean;
  provider: ethers.providers.Web3Provider | null;
  signer: EthyleneSigner | null;
  web3AuthInstance: Web3Auth | null;
}

const initialState: Web3State = {
  address: null,
  connected: false,
  isConnecting: false,
  provider: null,
  signer: null,
  web3AuthInstance: null,
};

export const web3Slice = createSlice({
  initialState,
  name: 'web3',
  reducers: {
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
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
    setSigner: (state, action: PayloadAction<Signer | null>) => {
      state.signer = action.payload;
    },
    setWeb3AuthInstance: (state, action: PayloadAction<Web3Auth | null>) => {
      state.web3AuthInstance = action.payload;
    },
  },
});

export const {
  setAddress,
  setIsConnected,
  setWeb3AuthInstance,
  setIsConnecting,
  setProvider,
  setSigner,
} = web3Slice.actions;

export default web3Slice.reducer;
