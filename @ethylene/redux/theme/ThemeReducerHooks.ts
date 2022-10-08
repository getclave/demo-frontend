import { useEthyleneDispatch, useTypedEthyleneSelector } from '@ethylene/redux';
import { EthyleneTheme, setTheme } from '@ethylene/redux/theme/ThemeReducer';
import { useCallback } from 'react';

export const useTheme = () =>
  useTypedEthyleneSelector((state) => state.theme.theme);
export const useSetTheme = () => {
  const dispatch = useEthyleneDispatch();
  return useCallback(
    (value: EthyleneTheme) => dispatch(setTheme(value)),
    [dispatch],
  );
};
