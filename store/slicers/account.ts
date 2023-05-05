import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AccountResponseDto } from 'restapi/types';

export interface ThemeState {
    account: string | null;
    cliendId: string | null;
    publicKey: string | null;
}

const initialState: ThemeState = {
    account: null,
    cliendId: null,
    publicKey: null,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<string | null>) => {
            state.account = action.payload;
        },
        setAllAccount: (state, action: PayloadAction<AccountResponseDto>) => {
            state.account = action.payload.account;
            state.cliendId = action.payload.webauthn.clientId;
            state.publicKey = action.payload.webauthn.publicKey;
        },
    },
});

export const { setAccount, setAllAccount } = accountSlice.actions;
export default accountSlice.reducer;
