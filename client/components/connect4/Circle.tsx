import styled from '@emotion/styled'
import { useTransition, animated } from 'react-spring'
import { Player } from '../../../server/src/entities/Connect4';

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
                <Square color={player.skin} style={props} key={key} />
            ))}
        </>
    ) 
    
}

const Full = styled.div`
    margin: 10px auto;
    width: 90%;

    overflow: hidden;
    &:before{
        border-radius: 50%;
        content:'';
        display: block;
        padding-bottom: 90%;
        background: red; 
    }
`

const Square = styled(animated.div)`
    height: 100%;
    margin: 10px;
    background: ${props => props.color} no-repeat center;
    background-size: 200px;
`

const Blank = styled.div`
    margin: 10px; 
`

const colors = [
    'coral',
    'lightblue',
    'lightgreen',
    'orange',
    'pink'
]


export default Circle;