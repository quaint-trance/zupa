import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { ThemeProvider } from '@emotion/react';
import { light, dark } from '../theme/theme'
import { createContext } from 'react';
import useGlobalContext, { defaultValues } from '../hooks/useGlobalContext';

export const GlobalContext = createContext(defaultValues);

function App({ Component, pageProps }: AppProps) {

    const gs = useGlobalContext();

    return(
        <html lang="en" >
        <GlobalContext.Provider value={gs}>
        <ThemeProvider theme={ gs.theme === 'dark' ? dark : light }>
            <Head>
                <link rel="icon" href="/zupa.png" type = "image/x-icon" /> 
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <QueryClientProvider client={new QueryClient()}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} />
                </AnimatePresence>
            </QueryClientProvider>
        </ThemeProvider>
        </GlobalContext.Provider>
        </html>
  ) 
}

export default App
