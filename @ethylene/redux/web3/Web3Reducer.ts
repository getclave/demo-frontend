import { Web3ProviderType } from '@ethylene/types/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Web3Auth } from '@web3auth/web3auth';
import { ethers } from 'ethers';

export interface Web3State {
  connected: boolean;
  isConnecting: boolean;
  provider: ethers.providers.Web3Provider | null;
  web3AuthInstance: Web3Auth | null;
}

const initialState: Web3State = {
  connected: false,
  isConnecting: false,
  provider: null,
  web3AuthInstance: null,
};

export const web3Slice = createSlice({
  initialState,
  name: 'web3',
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setIsConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setProvider: (state, action: PayloadAction<Web3ProviderType>) => {
      state.provider = action.payload;
    },
    setWeb3AuthInstance: (state, action: PayloadAction<Web3Auth | null>) => {
      state.web3AuthInstance = action.payload;
    },
  },
});

export const {
  setIsConnected,
  setWeb3AuthInstance,
  setIsConnecting,
  setProvider,
} = web3Slice.actions;

export default web3Slice.reducer;
