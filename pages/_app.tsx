import { useInitializeWeb3 } from '@ethylene/core/useInitializeWeb3';
import { EthyleneProvider } from '@ethylene/redux';
import '@ethylene/styles/global.scss';
import { useInitialTheme } from '@ethylene/ui-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStyling } from 'hooks/useStyling';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'store';

const queryClient = new QueryClient();

function EthyleneApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <EthyleneProvider>
                    <>
                        <InitHooks />
                        <Component {...pageProps} />
                    </>
                </EthyleneProvider>
            </Provider>
        </QueryClientProvider>
    );
}

function InitHooks(): null {
    useStyling();
    useInitializeWeb3();
    useInitialTheme();
    return null;
}

export default EthyleneApp;
