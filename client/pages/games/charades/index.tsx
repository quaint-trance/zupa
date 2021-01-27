import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Chat from '../../../components/Chat'

import { useRouter } from 'next/router'
import useCharades from '../../../hooks/useCharades'
import Canvas from '../../../components/charades/Canvas'
import Toolbar from '../../../components/charades/Toolbar'
import Bar from '../../../components/charades/Bar'

interface props{

}

const Charades:React.FC<props> = () =>{

    const router = useRouter();

    const { sendMessage, messages, sendChunk, drawChunk, clearCanvas, drawingState, clear, time, drawing } = useCharades(typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '');


    return(
        <div>
            <Head>
                <title>zupa - Charades</title>
            </Head>
            <Container>
                <Chat messages={messages} sendMessage={sendMessage}/>
                <Bar time={time} key={drawing} drawing={drawing} />
                <Canvas sendChunk={sendChunk} drawChunk={drawChunk} clearCanvas={clearCanvas} drawingState={drawingState} clear={clear} />
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
    & > div:nth-of-type(2){
        grid-row: 1 / 2;
        grid-column: 2 / 3;        
    }
     
    & > div:last-of-type{
        grid-row: 2 / 3;
        grid-column: 2 / 3;       
    }
`

export default Charades;