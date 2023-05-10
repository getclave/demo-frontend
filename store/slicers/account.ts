import type {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AccountV2 } from 'restapi/types';

export interface AccountState {
    account: AccountV2 | undefined;
    selectedAccount: number;
    registrationResponse: RegistrationEncoded | null;
    authenticationResponse: AuthenticationEncoded | null;
    deployedContractAddress: string | null;
}

const initialState: AccountState = {
    account: undefined,
    selectedAccount: 0,
    registrationResponse: null,
    authenticationResponse: null,
    deployedContractAddress: null,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<AccountV2 | undefined>) => {
            state.account = action.payload;
        },
        setSelectedAccount: (state, action: PayloadAction<number>) => {
            state.selectedAccount = action.payload;
        },
        setRegistrationResponse: (
            state,
            action: PayloadAction<RegistrationEncoded | null>,
        ) => {
            state.registrationResponse = action.payload;
        },
        setAuthenticationResponse: (
            state,
            action: PayloadAction<AuthenticationEncoded | null>,
        ) => {
            state.authenticationResponse = action.payload;
        },
        setDeployedContractAddress: (
            state,
            action: PayloadAction<string | null>,
        ) => {
            state.deployedContractAddress = action.payload;
        },
    },
});

export const {
    setAccount,
    setSelectedAccount,
    setAuthenticationResponse,
    setRegistrationResponse,
    setDeployedContractAddress,
} = accountSlice.actions;
export default accountSlice.reducer;
