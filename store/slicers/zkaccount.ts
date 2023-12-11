import type {
    AuthenticationEncoded,
    RegistrationEncoded,
} from '@passwordless-id/webauthn/dist/esm/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AccountV2 } from 'restapi/types';

import type { AccountState } from './account';

const initialState: AccountState = {
    account: undefined,
    balance: 0,
    selectedAccount: null,
    registrationResponse: null,
    authenticationResponse: null,
    deployedContractAddress: null,
};

export const zkaccountSlice = createSlice({
    name: 'zkaccount',
    initialState,
    reducers: {
        setZKAccount: (state, action: PayloadAction<AccountV2 | undefined>) => {
            state.account = action.payload;
        },
        setZKBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        setZKSelectedAccount: (state, action: PayloadAction<number | null>) => {
            state.selectedAccount = action.payload;
        },
        setZKRegistrationResponse: (
            state,
            action: PayloadAction<RegistrationEncoded | null>,
        ) => {
            state.registrationResponse = action.payload;
        },
        setZKAuthenticationResponse: (
            state,
            action: PayloadAction<AuthenticationEncoded | null>,
        ) => {
            state.authenticationResponse = action.payload;
        },
        setZKDeployedContractAddress: (
            state,
            action: PayloadAction<string | null>,
        ) => {
            state.deployedContractAddress = action.payload;
        },
    },
});

export const {
    setZKAccount,
    setZKBalance,
    setZKSelectedAccount,
    setZKAuthenticationResponse,
    setZKRegistrationResponse,
    setZKDeployedContractAddress,
} = zkaccountSlice.actions;
export default zkaccountSlice.reducer;
