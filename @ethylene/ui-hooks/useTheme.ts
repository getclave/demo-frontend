import {
  useSetTheme,
  useTheme as useThemeFromRedux,
} from '@ethylene/redux/theme/ThemeReducerHooks';
import { CONFIG } from 'config';
import { useCallback, useEffect } from 'react';

export const useTheme = () => {
  const theme = useThemeFromRedux();
  const setTheme = useSetTheme();

  const toggleTheme = useCallback(() => {
    if (Array.from(document.body.classList).includes('dark')) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');

      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');

      setTheme('light');
      localStorage.setItem(`${CONFIG.APP}Theme`, 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');

      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');

      setTheme('dark');
      localStorage.setItem(`${CONFIG.APP}Theme`, 'dark');
    }
  }, [setTheme]);

  return { theme, toggleTheme };
};

export const useInitialTheme = () => {
  const setTheme = useSetTheme();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem(`${CONFIG.APP}Theme`);
    if (localStorageTheme === 'dark') {
      setTheme('dark');

      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');

      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      setTheme('light');

      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');

      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [setTheme]);
};
