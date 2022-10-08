import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EthyleneTheme = 'dark' | 'light';

export interface ThemeState {
  theme: 'dark' | 'light';
}

const initialState: ThemeState = {
  theme: 'dark',
};

export const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setTheme: (state, action: PayloadAction<EthyleneTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
