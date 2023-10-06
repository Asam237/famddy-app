import "../styles/globals.css";
import '@radix-ui/themes/styles.css';
import type {AppProps} from "next/app";
import {Theme} from '@radix-ui/themes';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({Component, pageProps: {session: any, ...pageProps}}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Theme>
                <Component {...pageProps} />
            </Theme>
        </QueryClientProvider>
    )
}