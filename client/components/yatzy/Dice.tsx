import React, { useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Die3D from './Die3D'
import { animated, useSprings } from 'react-spring'

interface props{
    dice: {score: number, throwRefresh: number}[],
    throwDice: (selected: boolean[])=>void;
    throwCount: number;
}

const Dice:React.FC<props> = ({dice, throwDice, throwCount}) =>{

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

    const springs = useSprings(3, [0,1,2].map( (item, index) => ({ opacity: index <= 2-throwCount ? 1 : 0 })));

    return(
        <div>
            <Container>
                <RectBox>
                    {springs.map(props=>(
                        <Rect style={props} />
                    ))}
                </RectBox>
                <DiceBox>
                    {dice?.map((n, i)=>
                        <Die3D key={i} score={n.score} throwRefresh={n.throwRefresh} onClick={()=>handleChangeSelected(i)} selected={selected[i]}/>
                    )}
                </DiceBox>
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
    display: flex;
    flex-direction: column;
    height: 100%;
`
const Rect = styled(animated.div)`
    background-color: white;
    width: 20%;
    height: 20px;
    margin: 0 5px;
    flex: 1;
`

const RectBox = styled.div`
    display: flex;
    margin: 0;
`

const DiceBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
`

export default Dice;