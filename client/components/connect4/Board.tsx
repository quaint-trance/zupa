import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { RiSendPlaneFill } from 'react-icons/ri'
import { Player } from '../../../server/src/entities/Yatzy'

interface props{
    board: string[][];
    chooseColumn: (column: number)=>void;
    players: Player[];
}

const Board:React.FC<props> = ({ board, chooseColumn, players }) =>{

    const handleClick = (n: number) =>{
        chooseColumn(n);
    }

    return(
        <Container>
            {board.map((column, columnIndex)=>(
                <div onClick={()=>handleClick(columnIndex)}>
                    {column.map((row)=>{
                        if(row === '' || !row) return <div></div>;
                        return <div style={{background: colors[players.findIndex(p=>p.id===row)]}}></div>
                    }
                    )}
                </div>
            ))}
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    padding: 20px 50px 20px 20px;

    display: flex;
    
    & > div{
        flex: 1;
        border: black 1px solid;
        
        display: flex;
        flex-direction: column-reverse;
        
        & > div{
            border: black 1px solid;
            flex: 1;
        }
    }
`

const colors = [
    'coral',
    'lightblue',
    'lightgreen'
]


export default Board;