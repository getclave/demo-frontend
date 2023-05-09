import themeSlice from '@ethylene/redux/theme/ThemeReducer';
import web3Slice from '@ethylene/redux/web3/Web3Reducer';
import type { MixedElement } from '@ethylene/types';
import { configureStore } from '@reduxjs/toolkit';
import React, { createContext } from 'react';
import {
    Provider,
    TypedUseSelectorHook,
    createDispatchHook,
    createSelectorHook,
} from 'react-redux';

export const store = configureStore({
    middleware: (getDefaultMiddleware) => {
        const customizedMiddleware = getDefaultMiddleware({
            serializableCheck: false,
        });
        return customizedMiddleware;
    },
    reducer: {
        theme: themeSlice,
        web3: web3Slice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ethyleneStoreContext = createContext<any>(null);
export const useEthyleneDispatch = createDispatchHook(
    ethyleneStoreContext as any,
);
export const useEthyleneSelector = createSelectorHook(
    ethyleneStoreContext as any,
);
export const useTypedEthyleneSelector: TypedUseSelectorHook<RootState> =
    useEthyleneSelector;

type EthyleneProviderProps = {
    children: MixedElement;
};

export const EthyleneProvider = ({ children }: EthyleneProviderProps) => {
    return (
        <Provider context={ethyleneStoreContext} store={store}>
            {children}
        </Provider>
    );
};
