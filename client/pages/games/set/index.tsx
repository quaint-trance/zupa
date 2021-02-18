import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'
import Table from '../../../components/set/Table'

import { useRouter } from 'next/router'
import useSet from '../../../hooks/useSet'

interface props{

}

const Set:React.FC<props> = () =>{

    const router = useRouter();
    const { sendMessage, messages, table, players, chooseSet } = useSet(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>Zupa - Connect4</title>
                </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage} />
                <Table cards={table} players={players} chooseSet={chooseSet} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color:rgb(14, 14, 14);;
    min-height: 100vh;
    color: white;
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

export default Set;