import styled from '@emotion/styled'
import { Player } from '../../../server/src/domain/Hanoi/HanoiTypes'

interface props{
    players: Player[];
    turn: number;
}

const Header:React.FC<props> = ({ players, turn }) =>{

    return(
        <Container>
           {players.map((player, playerIndex)=>
                <Name turn={playerIndex===turn} color={colors[playerIndex]} key={playerIndex}  >{player.name}</Name>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
interface NameProps{
    turn: boolean;
    color: string;
}
const Name = styled.div<NameProps>`
    font-size: 30px;
    font-weight: ${props => props.turn ? '900' : '400'};
    text-decoration: ${props => props.turn ? 'underline' : 'none'};
    color: ${props=>props.color};
`

const colors = [
    'coral',
    'lightblue',
    'lightgreen',
    'orange',
    'pink'
]


export default Header;