import Head from 'next/head'
import styled from '@emotion/styled'
import { FaDice } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>

        <div>
  
          <Link href='/games/yatzy/create'>
          <section>
            <h2>Yatzy</h2>
            <div>
              <img src='/dice.svg' alt='' />
            </div>
          </section>
          </Link>
          
          <Link href='/games/connect4/create'>
          <section>
            <h2>Connect4</h2>
            <div>
              <img src='/connect4.svg' alt='' />
            </div>
          </section>
          </Link>
          
        </div>
        
        <div><Link href='/gamesList'>show list</Link></div>
      </Main>

      <footer>
        
      </footer>
    </div>
  )
}

const Main = styled.main`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div:first-of-type{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
    & > section{
      margin: 20px;
      border: solid 2px white;
      border-radius: 20px;
      cursor: pointer;
      color: white;
      width: 200px;
      height: 200px;
      display: grid;
      flex-direction: column;
      grid-template: auto 1fr / 1fr;
      padding: 20px;
    
      & > h2{
        margin: 0px;
        width: 100%;
        text-align: center;
      }
    
      & > div{
        display: flex;
        align-items: center;
        justify-content: center;

        & > *{
          height: 70%;
          width: 70%;
        }
      }
    }
  }
  
  & > div:last-of-type{
    margin: 10px;
    font-size: 20px;
    font-weight: 100;
    color: white;
  }
`
