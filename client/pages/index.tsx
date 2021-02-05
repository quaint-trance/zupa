import Head from 'next/head'
import styled from '@emotion/styled'
import { FaDice } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { decode } from 'jsonwebtoken'

export default function Home() {

  const [userName, setUserName] = useState('');

  useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token) return;
      const payload = decode(token);
      console.log(payload)
      if(!payload || typeof payload === 'string' || !payload.name) return;
      console.log(payload.name)
      setUserName(payload.name);
  }, [])

  return (
    <div>
      <Header>
        {
          !userName 
           ?<><Link href="/login"><div>Login In</div></Link>
              <Link href="/signup"><div>Sign Up</div></Link></>
          : <><Link href={`/profile?userId=${userName}`}><div>Profile</div></Link>
              <Link href={`/settings`}><div>Settings</div></Link></>
      }
      </Header>
      <Head>
        <title>Zupa</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="zupa online games connect4 yatzy charades kalambury kości multiplayer"></meta>
      </Head>
      <Main>
        <img src="/zupa.svg" id="zupa-bg" alt="background" />

          <section id="zupa">
            <h2>Zupa</h2>
            <div>
              <img src='/zupa.svg' alt='' />
            </div>
          </section>

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

          <Link href='/games/charades/create'>
          <section>
            <h2>Charades</h2>
            <div>
              <img src='/charades.svg' alt='' />
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  color: white;
  width: 100%;
  padding: 20px;
  font-size: 25px;
  font-weight: 300;

  & > div{
    margin: 0 20px;
    cursor: pointer;
  }
`

const Main = styled.main`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #zupa-bg{
    position: absolute;
    z-index: 1;
    width: 50%;
    opacity: .15;
    pointer-events: none;
  }

  #zupa{
    cursor: default;
    pointer-events: none;
    display: none;
  }

  & > div:first-of-type{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
    & section{
      z-index: 2;
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
  
  & > div:last-of-type{
    margin: 10px;
    font-size: 20px;
    font-weight: 800;
    color: white;
  }
`
