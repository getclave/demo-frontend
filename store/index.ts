import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import accountSlice from './slicers/account';

export const store = configureStore({
    reducer: {
        account: accountSlice,
    },
    middleware: (getDefaultMiddleware) => {
        const customizedMiddleware = getDefaultMiddleware({
            serializableCheck: false,
        });
        return customizedMiddleware;
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
