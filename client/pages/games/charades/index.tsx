import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'

import { useRouter } from 'next/router'
import useCharades from '../../../hooks/useCharades'
import Canvas from '../../../components/charades/Canvas'

interface props{

}

const Connect4 :React.FC<props> = () =>{

    const router = useRouter();

    const { sendMessage, messages, sendChunk, drawChunk, clearCanvas, drawingState} = useCharades(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>zupa - Connect4</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage}/>
                <div></div>
                <Canvas sendChunk={sendChunk} drawChunk={drawChunk} clearCanvas={clearCanvas} drawingState={drawingState} />
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
    place-items: center;

    & > div:first-of-type{
        grid-row: 1 /3;
        grid-column: 1 / 2;        
    }
    & > div:last-of-type{
        grid-row: 1 / 2;
        grid-column: 2 / 3;        
    }
     
    & > canvas{
        grid-row: 2 / 3;
        grid-column: 2 / 3;       
    }
`

export default Connect4 ;