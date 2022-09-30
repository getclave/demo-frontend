import web3Slice from '@ethylene/redux/web3/Web3Reducer';
import { MixedElement } from '@ethylene/types';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { TypedUseSelectorHook, useSelector, Provider } from 'react-redux';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware;
  },
  reducer: {
    web3: web3Slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

type EthyleneProviderProps = {
  children: MixedElement;
};
export const EthyleneProvider = ({ children }: EthyleneProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
