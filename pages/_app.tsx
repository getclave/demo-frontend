import 'styles/global.scss';
import type { AppProps } from 'next/app';
import { EthyleneProvider } from '@ethylene/redux';
import { useStyling } from 'hooks/useStyling';

function EthyleneApp({ Component, pageProps }: AppProps) {
  useStyling();

  return (
    <EthyleneProvider>
      <Component {...pageProps} />
    </EthyleneProvider>
  );
}

export default EthyleneApp;
