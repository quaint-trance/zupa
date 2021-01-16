import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { RiSendPlaneFill } from 'react-icons/ri'

interface props{
    messages: {author: string, content: string}[],
    sendMessage: (content: string)=> any;
}

const Board:React.FC<props> = ({messages, sendMessage}) =>{

    return(
        <Container>
                
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    padding: 20px 50px 20px 20px;
    background-color: rgba(209, 104, 104, 0);
`


export default Board;