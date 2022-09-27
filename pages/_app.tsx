import 'styles/global.scss';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { CONFIG } from 'config';

function EthyleneApp({ Component, pageProps }: AppProps) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.body.style.fontFamily = CONFIG.FONT_FAMILY;
    setFontLoaded(true);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default EthyleneApp;
