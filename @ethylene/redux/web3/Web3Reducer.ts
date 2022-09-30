import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Web3Auth } from '@web3auth/web3auth';

export interface Web3State {
  connected: boolean;
  web3AuthInstance: Web3Auth | null;
  isConnecting: boolean;
}

const initialState: Web3State = {
  connected: false,
  isConnecting: false,
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
    setWeb3AuthInstance: (state, action: PayloadAction<Web3Auth | null>) => {
      state.web3AuthInstance = action.payload;
    },
  },
});

export const { setIsConnected, setWeb3AuthInstance, setIsConnecting } =
  web3Slice.actions;

export default web3Slice.reducer;
