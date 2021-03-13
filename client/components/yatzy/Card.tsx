import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Player } from '../../../server/src/domain/Yatzy/YatzyTypes'
import Dice from './Die'

interface props{
    players: Player[];
    chooseRow: (row: number)=>void;
    turn: number;
}

const symbols:(number | string)[][] = [
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5],
    [6, 6, 6, 6, 6],
    [6, 6, 0, 0, 0],
    [6, 6, 0, 5, 5],
    [6, 6, 6, 0, 0],
    [5, 5, 5, 5, 0],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [5, 5, 5, 0, 6, 6],
    ['?', '?', '?', '?', '?'],
    ['Y', 'A', 'T', 'Z', 'Y'],
]

const Card:React.FC<props> = ({players, chooseRow, turn}) =>{

    return(
        <div>
            <Head>

            </Head>
            <Container>
                <Paper>

                <Row>
                    <div></div>
                    {players.map((p, pi) =>
                        <div style={pi===turn?{backgroundColor: 'rgba(0, 0, 0, 0.082)', fontWeight: 800}:{}}> {p.name} </div>   
                    )} 
                </Row>

                    {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((e, row)=>
                        <Row onClick={()=>chooseRow(row)}>
                            <div>
                                {symbols[row]?.map(s=>{
                                    if(typeof s === 'string') return <div>{s}</div>
                                    if(s > 0) return <Dice score={s} />
                                    return <div />
                                })}
                            </div>
                            {players.map((p, pi) =>
                                <div style={pi===turn?{backgroundColor: 'rgba(0, 0, 0, 0.082)'}:{}} > {p.usedRows[row] === -1 ? "" : p.usedRows[row]} </div>   
                            )}
                        </Row>
                    )}

                <Row>
                    <div>total</div>
                    {players.map((p, pi) =>
                        <div style={pi===turn?{backgroundColor: 'rgba(0, 0, 0, 0.082)'}:{}}> {p.score} </div>   
                    )} 
                </Row>

                </Paper>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: rgba(14, 14, 14, 0);
    color: #000000;
    padding-top: 20px;
    height: 100%;
    padding: 20px;
`

const Paper = styled.div`
    background-color: rgb(248, 248, 248);
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Row = styled.div`
    border-bottom: dashed black 1px;
    display: flex;
    cursor: pointer;

    &:first-of-type{
        & > div{
            font-size: 10px !important;
            word-wrap: break-word;
            word-break: break-all;

        }
    }
    
    & > div{
        border-right: dashed black 1px;
        padding: 5px;
        font-size: 15px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:first-of-type{
            width: 150px;
            flex: initial;
            padding: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 25px;
            align-content: center;
            padding: 7px;
        }
        &:first-of-type > *{
            width: 90%;
            height: 90%;
        }
    }

    &:hover{
        background-color: #ececec;
    }

    &:last-of-type{
        border: none;
        color: rgba(0, 0, 0, 0.459);
    }
`

export default Card;