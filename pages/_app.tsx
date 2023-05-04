import { useInitializeWeb3 } from '@ethylene/core/useInitializeWeb3';
import { EthyleneProvider } from '@ethylene/redux';
import '@ethylene/styles/global.scss';
import { useInitialTheme } from '@ethylene/ui-hooks';
import { useStyling } from 'hooks/useStyling';
import type { AppProps } from 'next/app';

function EthyleneApp({ Component, pageProps }: AppProps): JSX.Element {
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
