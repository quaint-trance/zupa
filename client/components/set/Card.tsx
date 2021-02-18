import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Connect4'
import { Card as CardType } from '../../../server/src/entities/Set'

interface props{
    card: CardType;
    selected: boolean;
    onClick: ()=>void;
}

const Card:React.FC<props> = ({ card, selected, onClick }) =>{

    return(
        <Container selected={selected} onClick={onClick} >
            {card.color} {card.fill} {card.quantity} {card.shape}
        </Container>
    )
}

const Container = styled.div<{selected: boolean}>`
    display: flex;
    flex-direction: column;

    background-color: white;
    border-radius: 10px;
    color: black;
    padding: 10px;

    ${props=>props.selected && `background-color: yellow`}    
`

export default Card;