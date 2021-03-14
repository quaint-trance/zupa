import Head from 'next/head'
import styled from '@emotion/styled'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameIcon from '../components/GameIcon'
import AnimatedPage from '../components/AnimatedPage'

export default function Home() {

  return (
    <Container>
      <Navbar fixed={true} />
      <AnimatedPage>

      <Head>
        <title>Zupa</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="zupa online games connect4 yatzy charades kalambury kości multiplayer"></meta>
      </Head>
      <Main >
        <img src="/zupa.svg" id="zupa-bg" alt="background" />

          <section id="zupa">
            <h2>Zupa</h2>
            <div>
              <img src='/zupa.svg' alt='' />
            </div>
          </section>

        <div>
  
          <GameIcon img='/dice.svg' link='/games/yatzy/create' header='Yatzy'/>
          <GameIcon img='/connect4.svg' link='/games/connect4/create' header='Connect4'/>
          <GameIcon img='/charades.svg' link='/games/charades/create'  header='Charades' />
         
        </div>
        
        <div><Link href='/gamesList'>show list</Link></div>
      </Main>

      <footer>
        
      </footer>
      </AnimatedPage>
    </Container>
  )
}

const Container = styled.div`
  background-color: #0f1316;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
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
    display: none;
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
  
  & > div:last-of-type{
    margin: 10px;
    font-size: 20px;
    font-weight: 800;
    color: white;
  }
`
