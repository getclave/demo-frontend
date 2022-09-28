import 'styles/global.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CONFIG } from 'config';

function EthyleneApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.style.fontFamily = CONFIG.FONT_FAMILY;
  }, []);

  return <Component {...pageProps} />;
}

export default EthyleneApp;
