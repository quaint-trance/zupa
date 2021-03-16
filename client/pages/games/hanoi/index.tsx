import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'

import { useRouter } from 'next/router'
import useHanoi from '../../../hooks/useHanoi'
import Board from '../../../components/Hanoi/Board'
import Header from '../../../components/Hanoi/Header'

interface props{

}

const Hanoi: React.FC<props> = () =>{

    const router = useRouter();
    const { sendMessage, messages, chooseRod, rods, players, turn, from } = useHanoi(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>Zupa - Hanoi</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage} />
                <Header players={players} turn={turn} />
                <Board rods={rods} chooseRod={chooseRod} players={[]} from={from} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    background:${props=>props.theme.background};
    min-height: 100vh;
    color: ${props=>props.theme.text};
    display: grid;

    grid-template: 50px 1fr / 1fr 3fr;

    & >*:nth-of-type(1){
        grid-row: 1 / 3;
        grid-column: 1 / 2;
    }
    & >*:nth-of-type(2){
        grid-row: 1 / 2;
        grid-column: 2 / 3;
    }
    & >*:nth-of-type(3){
        grid-row: 2 / 3;
        grid-column: 2 / 3;
    }
`

export default Hanoi ;