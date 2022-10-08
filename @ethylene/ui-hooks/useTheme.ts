import {
  useSetTheme,
  useTheme as useThemeFromRedux,
} from '@ethylene/redux/theme/ThemeReducerHooks';
import { useCallback, useEffect } from 'react';

export const useTheme = () => {
  const theme = useThemeFromRedux();
  const setTheme = useSetTheme();

  const toggleTheme = useCallback(() => {
    if (Array.from(document.body.classList).includes('dark')) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      setTheme('light');
      localStorage.setItem('CashmereTheme', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      setTheme('dark');
      localStorage.setItem('CashmereTheme', 'dark');
    }
  }, [setTheme]);

  return { theme, toggleTheme };
};

export const useInitialTheme = () => {
  const setTheme = useSetTheme();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('CashmereTheme');
    if (localStorageTheme === 'dark') {
      setTheme('dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      setTheme('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [setTheme]);
};
