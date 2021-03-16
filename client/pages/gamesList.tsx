import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useGamesList from '../hooks/useGamesList'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion';
import {useTransition, animated} from 'react-spring'

interface props{

}

const animate = {
    initial:{
        opacity: 0,
    },
    animate:{
        opacity: 1,
    },
    exit:{
        opacity: 0,
    }
}

const GamesList:React.FC<props> = () =>{

    const { data } = useGamesList();
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        if(!data) return;
        setLoaded(true);
    },[data]);

    useEffect(()=>{
        if(!loaded)setLoaded(true);
    }, [loaded])
    
    const transitions = useTransition(data, item => item.id, {
        from: { transform: 'translate(100px)', opacity: 0 },
        enter: { transform: 'translate(0px)', opacity: 1 },
        leave: { transform: 'translate(100px)', opacity: 0 },
        trail: 100,
        config:{
            delay: 0,
        }
    })

    return(
    <Background>
        <Container {...animate} >
            <Navbar fixed={true}/>
            <Head>
                <title>Zupa - game list</title>
            </Head>
                <h1>Game List</h1>
                <ul>
                    <li>
                        <span>game</span>
                        <span>game ID</span>
                        <span>players in game</span>
                    </li>
                    {transitions.map(({ item, props, key }) =>
                     <Link href={`/games/${item.t}/join?gameId=${item.id}`} key={key}>
                        <animated.li style={props}>
                            <span>{item.t}</span>
                            <span>{item.id}</span>
                            <span>{item.players.length}</span>
                        </animated.li>
                     </Link>
                    )}
                </ul>
        </Container>
    </Background>
    )
}

const Background = styled.div`
    background: ${props=>props.theme.background};
`

const Container = styled(motion.div)`
    min-height: 100vh;
    color: ${props=>props.theme.text};
    padding-top: 20px;
    padding-bottom: 50px;
    perspective: 200px;
    overflow-x: hidden;

    & > h1{
        margin: 50px 10px;
        padding: 0;
        font-weight: 300;
        font-size: 50px;
        text-align: center;
    }

    & > ul{
        margin: 0;
        padding: 0 20px;

        & > li{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            padding: 20px 20px;
            cursor: pointer;
            &:not(:first-of-type){
                &:hover{
                    background: ${props=>props.theme.hover};
                }
            }
            &:first-of-type{
                font-weight: 600;
                cursor: auto;
                font-size: 30px;
            }

            & > span{
                text-align: center;
            }
        }
    }
`


export default GamesList;