import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Yatzy'

interface props{
    players: Player[];
    turn: number;
}

const Header:React.FC<props> = ({ players, turn }) =>{

    return(
        <Container>
           {players.map((player, playerIndex)=>
                <Name turn={playerIndex===turn}>{player.name}</Name>
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
}
const Name = styled.div<NameProps>`
    font-size: 30px;
    font-weight: ${props => props.turn ? '900' : '300'};
    text-decoration: ${props => props.turn ? 'underline' : 'none'}
`



export default Header;