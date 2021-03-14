import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useGamesList from '../hooks/useGamesList'
import Link from 'next/link'
import Die3D from '../components/yatzy/Die3D'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion';

interface props{

}

const GamesList:React.FC<props> = () =>{

    const { data } = useGamesList();

    return(
        <div>
            <Head>
                <title>Zupa - game list</title>
            </Head>
            <Navbar />
            <Container>
                <h1>Game List</h1>
                <ul>
                    <li>
                        <span>game</span>
                        <span>game ID</span>
                        <span>players in game</span>
                    </li>
                    {data?.map(game=>
                        <Link href={`/games/${game.t}/join?gameId=${game.id}`} key={game.id}>
                        <li>
                            <span>{game.t}</span>
                            <span>{game.id}</span>
                            <span>{game.players.length}</span>
                        </li>
                        </Link>
                    )}
                </ul>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: #0f1316;
    min-height: 100vh;
    color: white;
    padding-top: 20px;
    perspective: 200px;

    & > h1{
        margin: 50px 10px;
        padding: 0;
        font-weight: 400;
        font-size: 50px;
        text-align: center;
        text-decoration: underline;
    }

    & > ul{
        margin: 0;
        padding: 0 20px;

        & > li{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            padding: 20px 20px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.548);
            cursor: pointer;
            &:not(:first-of-type):hover{
                background-color: rgba(255, 255, 255, 0.096);
            }
            &:first-of-type{
                font-weight: 600;
            }

            & > span{
                text-align: center;
            }
        }
    }
`


export default GamesList;