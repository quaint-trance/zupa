import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'
import Board from '../../../components/connect4/Board'

import { useRouter } from 'next/router'
import useConnect4 from '../../../hooks/useConnect4'

interface props{

}

const Connect4 :React.FC<props> = () =>{

    const router = useRouter();
    const { sendMessage, messages, board, chooseColumn, players } = useConnect4(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>Connect4</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage}/>
                <Board board={board} chooseColumn={chooseColumn} players={players} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color:#308048;
    min-height: 100vh;
    color: white;
    display: grid;

    grid-template: 1fr / 1fr 3fr;
`

export default Connect4 ;