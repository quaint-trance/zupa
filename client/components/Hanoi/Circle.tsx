import styled from '@emotion/styled'
import { useTransition, animated } from 'react-spring'

interface props{
   size: number | undefined;
   selected?: boolean
}

const Circle:React.FC<props> = ({ size, selected }) =>{

    if(!size) return(
        <Blank/>
    )

    return(
        <Square size={Math.floor(100*size/6)} color={selected ? `lightblue` : `coral`}> 
            <div></div>
        </Square>
    ) 
    
}


const Square = styled(animated.div)<{size: number}>`
    height: 100%;
    margin: 10px auto 0px auto;
    border-radius: 10px;
    display: flex;
    background: ${props=>props.color};
    width: ${props=>props.size}%;

    & div{
        margin: 7px;
        margin-top: 8px;
        border-radius: 10px;
        flex: 1;
        overflow: hidden;

    }
`

const Blank = styled.div`
    margin: 10px 0 0 0; 
`

export default Circle;