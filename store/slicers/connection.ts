import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConnectionOptions } from 'types/connection';

export interface ConnectionState {
    connectionOption: ConnectionOptions;
}

const initialState: ConnectionState = {
    connectionOption: ConnectionOptions.CONNECT,
};

export const connectionSlice = createSlice({
    name: 'connectionOption',
    initialState,
    reducers: {
        setConnectionOption: (
            state,
            action: PayloadAction<ConnectionOptions>,
        ) => {
            state.connectionOption = action.payload;
        },
    },
});

export const { setConnectionOption } = connectionSlice.actions;
export default connectionSlice.reducer;
