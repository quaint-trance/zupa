import styled from '@emotion/styled'
import { useTransition, animated } from 'react-spring'
import { Player } from '../../../server/src/domain/Connect4/Connect4Types';

interface props{
   playerNumber: undefined | number;
   player: Player | undefined;
}

const Circle:React.FC<props> = ({ playerNumber, player }) =>{

    const transition = useTransition(true, null, {
        from: {
            transform: `translate(0, -100vh)`
        },
        enter: {
            transform: `translate(0, 0)`
        }
    })

    if( playerNumber === undefined || playerNumber ===-1 || player === undefined ) return <Blank />;
    
    return(
        <>
            {transition.map(({ item, key, props }) =>( 
                <Square color={player.color || 'white'} skin={player.skin} style={props} key={key}>
                    <div></div>
                </Square>
            ))}
        </>
    ) 
    
}


const Square = styled(animated.div)<{color: string, skin: string|undefined}>`
    height: 100%;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    background: ${props=> props.color};

    & div{
        margin: 7px;
        margin-top: 8px;
        background: ${props => props.skin} no-repeat center;
        background-size: cover;
        border-radius: 10px;
        flex: 1;
        overflow: hidden;

    }
`

const Blank = styled.div`
    margin: 10px; 
`

export default Circle;