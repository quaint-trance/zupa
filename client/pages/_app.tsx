import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { ThemeProvider } from '@emotion/react';
import { light, dark } from '../theme/theme'


function App({ Component, pageProps }: AppProps) {
    return(
        <html lang="en" >
        <ThemeProvider theme={ dark }>
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
        </html>
  ) 
}

export default App