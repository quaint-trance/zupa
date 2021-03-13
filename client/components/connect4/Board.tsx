import styled from '@emotion/styled'
import { Player } from '../../../server/src/domain/Connect4/Connect4Types'
import Circle from './Circle'

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
                <div key={columnIndex} onClick={()=>handleClick(columnIndex)}>
                    {column.map((circle, circleIndex)=>{
                        return <Circle key={circle+circleIndex} playerNumber={ players.findIndex(p=>p.id===circle)} player={players.find(p=>p.id===circle)} />
                    })}
                </div>
            ))}
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
    overflow: hidden;

    display: flex;

    & image{
        display: none !important;
    }
    
    & > div{
        flex: 1;
        
        display: flex;
        flex-direction: column-reverse;
        
        & > div{
            flex: 1;
        }

        &:hover{
            background-color: rgba(255, 255, 255, 0.13);
        }
        
        &+div{
            border-left: #ffffff 3px solid;
        }
        &:first-of-type{
            border-left: #ffffff 3px solid;
        }
        &:last-of-type{
            border-right: #ffffff 3px solid;
        }
    }

`

export default Board;