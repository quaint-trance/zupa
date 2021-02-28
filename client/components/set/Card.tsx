import styled from '@emotion/styled'
import { Card as CardType } from '../../../server/src/entities/Set'
import Shape0 from './Shape0'
import Shape1 from './Shape1'
import Shape2 from './Shape2'

interface props{
    card: CardType;
    selected: boolean;
    onClick: ()=>void;
}

const Card:React.FC<props> = ({ card, selected, onClick }) =>{

    return(
        <Container selected={selected} onClick={onClick} >
            {(new Array(card.quantity+1)).fill(1).map(_=>
                <div>
                    {card.shape === 0 && <Shape0 color={colors[card.color]} />}
                    {card.shape === 1 && <Shape1 color={colors[card.color]} />}
                    {card.shape === 2 && <Shape2 color={colors[card.color]} />}
                </div>
            )}
        </Container>
    )
}

const Container = styled.div<{selected: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;

    background-color: #ffffff;
    border-radius: 10px;
    color: black;


    & > div{
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
        & > svg{
            width: 100%;
            height: 100%;
        }
    }
    
    ${props=>props.selected && `background-color: #adadad`}    
`
const colors = [
    `red`,
    `green`,
    `blue`,
    `pink`
]

export default Card;