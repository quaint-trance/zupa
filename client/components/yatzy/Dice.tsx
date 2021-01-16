import React, { useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Die3D from './Die3D'

interface props{
    dice: {score: number, throwRefresh: number}[],
    throwDice: (selected: boolean[])=>void;
}

const Dice:React.FC<props> = ({dice, throwDice}) =>{

    const [selected, setSelected] = useState([false, false, false, false, false]);

    const handleChangeSelected = (n: number) =>{
        setSelected(o=>{
            o[n] = !o[n];
            return [...o];
        });
    }

    const handleThrow = () =>{
        setSelected([]);
        throwDice(selected);
    }

    return(
        <div>
            <Head>

            </Head>
            <Container>
                {dice?.map((n, i)=>
                    <Die3D key={i} score={n.score} throwRefresh={n.throwRefresh} onClick={()=>handleChangeSelected(i)} selected={selected[i]}/>
                )}

                <button onClick={handleThrow}>throw</button>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: rgba(216, 88, 88, 0);
    background-color: #308048;
    height: 100%;
    color: white;
    padding-top: 20px;

    & > *{
        margin: 40px 40px;
        
    }
`


export default Dice;