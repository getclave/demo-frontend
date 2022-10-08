import '@ethylene/styles/global.scss';
import type { AppProps } from 'next/app';
import { EthyleneProvider } from '@ethylene/redux';
import { useStyling } from 'hooks/useStyling';
import { useInitializeWeb3 } from '@ethylene/core/useInitializeWeb3';
import { useInitialTheme } from '@ethylene/ui-hooks';

function EthyleneApp({ Component, pageProps }: AppProps) {
  return (
    <EthyleneProvider>
      <>
        <InitHooks />
        <Component {...pageProps} />
      </>
    </EthyleneProvider>
  );
}

function InitHooks(): null {
  useStyling();
  useInitializeWeb3();
  useInitialTheme();
  return null;
}

export default EthyleneApp;
