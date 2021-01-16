import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useGamesList from '../hooks/useGamesList'
import Link from 'next/link'
import Die3D from '../components/yatzy/Die3D'

interface props{

}

const GamesList:React.FC<props> = () =>{

    const { data } = useGamesList();

    return(
        <div>
            <Head>

            </Head>
            <Container>
                <ul>
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
    background-color: rgb(14, 14, 14);
    min-height: 100vh;
    color: white;
    padding-top: 20px;
    perspective: 200px;

    & > ul{
        margin: 0;
        padding: 0 20px;

        & > li{
            width: 100%;
            display: flex;
            justify-content: space-around;
            padding: 20px 0px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.548);
            cursor: pointer;
            &:hover{
                background-color: rgba(255, 255, 255, 0.096);
            }
        }
    }
`


export default GamesList;