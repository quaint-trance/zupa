import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'
import Board from '../../../components/connect4/Board'
import Header from '../../../components/connect4/Header'
import Settings from '../../../components/connect4/Settings'

import { useRouter } from 'next/router'
import useConnect4 from '../../../hooks/useConnect4'

interface props{

}

const Connect4 :React.FC<props> = () =>{

    const router = useRouter();
    const { sendMessage, messages, board, chooseColumn, players, turn } = useConnect4(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>Zupa - Connect4</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage} Settings={Settings} />
                <Header players={players} turn={turn} />
                <Board board={board} chooseColumn={chooseColumn} players={players} />
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

export default Connect4 ;