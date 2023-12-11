import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConnectionOptions } from 'types/connection';

import type { ConnectionState } from './connection';

const initialState: ConnectionState = {
    connectionOption: ConnectionOptions.CONNECT,
};

export const zkconnectionSlice = createSlice({
    name: 'zkconnectionOption',
    initialState,
    reducers: {
        setZKConnectionOption: (
            state,
            action: PayloadAction<ConnectionOptions>,
        ) => {
            state.connectionOption = action.payload;
        },
    },
});

export const { setZKConnectionOption } = zkconnectionSlice.actions;
export default zkconnectionSlice.reducer;
