import 'styles/global.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CONFIG } from 'config';
import { EthyleneProvider } from '@ethylene/redux';

function EthyleneApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.style.fontFamily = CONFIG.FONT_FAMILY;
  }, []);

  return (
    <EthyleneProvider>
      <Component {...pageProps} />
    </EthyleneProvider>
  );
}

export default EthyleneApp;
