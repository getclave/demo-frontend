import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStyling } from 'hooks/useStyling';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'store';
import 'styles/global.scss';

const queryClient = new QueryClient();

function ClaveApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <>
                    <InitHooks />
                    <Component {...pageProps} />
                </>
            </Provider>
            <ToastContainer draggable />
        </QueryClientProvider>
    );
}

function InitHooks(): null {
    useStyling();
    return null;
}

export default ClaveApp;
