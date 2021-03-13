import styled from '@emotion/styled'
import { Player } from '../../../server/src/domain/Set/SetTypes'
import { Card as CardType } from '../../../server/src/domain/Set/SetTypes';
import Card from './Card';
import { useState, useEffect } from 'react'

interface props{
    cards: CardType[]; 
    chooseSet: (set: string[])=>void;
    players: Player[];
}

const Board:React.FC<props> = ({ cards, chooseSet, players }) =>{

    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (id: string) =>{
        if(selected.includes(id)) setSelected(selected.filter(card=> card !== id));
        else setSelected([...selected, id]);

    }
    
    useEffect(()=>{
        if(selected.length === 3){
            chooseSet(selected);
            setSelected([]);
        }
    }, [selected]);

    return(
        <Container>
            <div/><div/><div/>
            {cards.map(card=>
                <Card card={card} selected={selected.includes(card.id)} onClick={()=>handleClick(card.id)} key={card.id} /> 
                )}
            <div/><div/><div/>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(6, 1fr);
    grid-gap: 10px;
    padding: 10px;
    grid-auto-flow: column;
    height: 100vh;
`

export default Board;