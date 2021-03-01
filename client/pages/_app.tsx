// @ts-nocheck
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Head from 'next/head'
import styled from '@emotion/styled'
import { BsPhoneLandscape } from 'react-icons/bs'
import { FiRotateCcw } from 'react-icons/fi'

function App({ Component, pageProps }: AppProps) {
  return(
    <html lang="en">
      <QueryClientProvider client={new QueryClient()}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
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
        <Warning>
          <div>
            this website is only viewable in landscape mode
            <icon><BsPhoneLandscape /></icon>
            <i>rotate your device</i>
          </div>
        </Warning>
        <Component {...pageProps} />
      </QueryClientProvider>
    </html>
  ) 
}

const Warning = styled.div`
  display: none;
  z-index: 250;
  overflow: hidden;
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  icon{
    display: flex;
    justify-content: center;
    font-size: 40px;
  }
  
  & > div{
    z-index: 251;
    position: fixed;
    background-color: orange;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 80vw;
    border-radius: 10px;
    font-size: 25px;
    text-align: justify;
  }

  i{
    display: flex;
    justify-content: center;
    margin: 5px;
    font-weight: 500;
  }

  @media only screen and (orientation:portrait){
     display:hidden;
  }
`

export default App