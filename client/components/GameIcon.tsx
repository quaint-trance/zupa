import styled from '@emotion/styled'
import Link from 'next/link'
import { useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { motion } from 'framer-motion'

type props = {
    link: string,
    img: string,
    header: string,
    style?: any,
}

const GameIcon:React.FC<props> = ({ link, img, header, style }) =>{

    const [hover, setHover] = useState(false);

    const animatedHover = useSpring({
        transform: hover ? 'scale(1.2)' : 'scale(1)',
        zIndex: hover ? 4 : 2,
        config: config.gentle
    });

    return(
        <Link href={link}>
            <Container
                style={{...animatedHover, ...style}}
                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
            >
                <h2>{header}</h2>
                <div>
                    <img src={img} alt='icon' />
                </div>
            </Container>
        </Link>
    )
}

const Container = styled(animated.div)`
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
`

export default GameIcon;