import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'
import Dice from '../../../components/yatzy/Dice'
import Card from '../../../components/yatzy/Card'
import useYatzy from '../../../hooks/useYatzy'

import { useRouter } from 'next/router'
interface props{

}

const GamesList:React.FC<props> = () =>{

    const router = useRouter();
    const { sendMessage, messages, dice, players, turn, throwDice, chooseRow } = useYatzy(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>Zupa - Yatzy</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage}/>
                <Dice dice={dice} throwDice={throwDice}/>
                <Card players={players} chooseRow={chooseRow} turn={turn} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color:#308048;
    min-height: 100vh;
    color: white;
    display: grid;

    grid-template:  50px 1fr / .6fr 1fr .8fr;
`
const Players = styled.div`
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    border-bottom: 1px dashed white;
    margin: 0 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export default GamesList;