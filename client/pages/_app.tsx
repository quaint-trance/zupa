import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router'

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return(
        <html lang="en">
            <Head>
                <link rel="icon" href="/zupa.png" type = "image/x-icon" /> 
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <QueryClientProvider client={new QueryClient()}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.route}/>
                </AnimatePresence>
            </QueryClientProvider>
        </html>
  ) 
}

export default App