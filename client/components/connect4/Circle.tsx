import styled from '@emotion/styled'
import { useTransition, animated } from 'react-spring'

interface props{
   playerNumber: undefined | number;
}

const Circle:React.FC<props> = ({ playerNumber }) =>{

    const transition = useTransition(true, null, {
        from: {
            transform: `translate(0, -100vh)`
        },
        enter: {
            transform: `translate(0, 0)`
        }
    })

    if( playerNumber === undefined || playerNumber ===-1) return <Blank />;
    
    return(
        <>
            {transition.map(({ item, key, props }) =>( 
                <Square color={colors[playerNumber >= 0 ? playerNumber : 4]} style={props} key={key} />
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
        background-color: ${props => props.color};
    } 
`

const Square = styled(animated.div)`
    height: 100%;
    margin: 10px;
    background-color: ${props => props.color};
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