import Head from 'next/head'
import styled from '@emotion/styled'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameIcon from '../components/GameIcon'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import {useTrail, animated} from 'react-spring'
import { useEffect, useState } from 'react'

const animate = {
  initial: {
    opacity: 0,
  },
  animate:{
    opacity: 1,
  },
  exit:{
    opacity: 0
  }
}

const games = [
  {
    img: '/dice.svg',
    link:'/games/yatzy/create',
    header:'Yatzy'
  },{
    img:'/connect4.svg',
    link:'/games/connect4/create',
    header:'Connect4'
  },{
    img:'/charades.svg',
    link:'/games/charades/create', 
    header:'Charades' 
  }
]


export default function Home() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  const trail = useTrail(games.length, {
    opacity: loaded ? 1 : 0,
    transform: `translate(0, ${loaded ? 0 : 20}px)` 
  })

  return (
<Background>
    <Container {...animate} key={3} >
      <Navbar fixed={true} />
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

          {trail.map((props, index) => 
            <GameIcon img={games[index].img} link={games[index].link} header={games[index].header} style={props} key={games[index].header}/>
          )}
         
        </div>
        
        {<animated.div style={trail[Math.floor(games.length/2)]} ><Link href='/gamesList'>show list</Link></animated.div>}
      </Main>

      <footer>
        
      </footer>
    </Container>
</Background>
  )
}

const Background = styled.div`
  background-color: #0f1316;
`

const Container = styled(motion.div)`
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
