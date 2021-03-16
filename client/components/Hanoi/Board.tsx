import styled from '@emotion/styled'
import { Player } from '../../../server/src/domain/Hanoi/HanoiTypes'
import Circle from './Circle'

interface props{
    rods:[number[], number[], number[]];
    chooseRod: (column: number)=>void;
    players: Player[];
    from: number | null;
}

const Board:React.FC<props> = ({ rods, chooseRod, players, from }) =>{

    const handleClick = (n: number) =>{
        chooseRod(n);
    }

    return(
        <Container>
            {rods.map((rod, rodIndex)=>(
                <div key={rodIndex} onClick={()=>handleClick(rodIndex)}>

                    {[0,1,2,3,4,5,6,7,8].map(discIndex=>(
                        <Circle size={rod[discIndex]} selected={rodIndex===from && discIndex===rod.length-1} />
                    ))}

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
            background-color: rgba(255, 255, 255, 0.061);
        }
        
        /*&+div{
            border-left: #ffffff 3px solid;
        }
        &:first-of-type{
            border-left: #ffffff 3px solid;
        }
        &:last-of-type{
            border-right: #ffffff 3px solid;
        }*/
    }

`

export default Board;