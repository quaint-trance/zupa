import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Set'
import { Card as CardType } from '../../../server/src/entities/Set';
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
            {cards.map(card=>
                <Card card={card} selected={selected.includes(card.id)} onClick={()=>handleClick(card.id)} key={card.id} /> 
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    & > div {
        margin: 20px;
    }
`

export default Board;