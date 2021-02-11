// @ts-nocheck
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return(
    <html lang="en">
      <QueryClientProvider client={new QueryClient()}>
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRZP018N6D"></script>
            <script
              async
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-YRZP018N6D');`
              }}
              />
            <link rel="icon" href="/zupa.png" type = "image/x-icon" /> 
            <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </html>
  ) 
}

export default App