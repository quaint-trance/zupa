import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Yatzy'
import useCanvas, { typeStyle } from '../../hooks/useCanvas'
import { FaEraser, FaRegTrashAlt } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'


interface props{
   setStyle: React.Dispatch<React.SetStateAction<typeStyle>>;
   style: typeStyle;
   clear: any;
}

const Toolbar:React.FC<props> = ({ setStyle, style, clear }) =>{

    const handleColorPick = (color: string) =>{
        setStyle(o=>{
            o.color = color;
            return{...o}
        })
    }

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setStyle(o=>{
            o.width = parseInt(event.target.value);
            return {...o}
        })
    }


    return(
        <Container>
            <Color color='red' onClick={()=>handleColorPick('red')} />
            <Color color='green' onClick={()=>handleColorPick('green')} />
            <Color color='white' onClick={()=>handleColorPick('white')} />
            <Color color='yellow' onClick={()=>handleColorPick('yellow')} />
            <Color color='pink' onClick={()=>handleColorPick('pink')} />
            <Color color='blue' onClick={()=>handleColorPick('blue')} />
            <FaEraser onClick={()=>handleColorPick('rgb(14,14,14)')} />
            <input type="range" min="1" max="50" defaultValue={style.width} onChange={handleRangeChange} />
            <FaRegTrashAlt onClick={clear} />
        </Container>
    )
}

const Container = styled.ul`
    display: flex;
    padding: 0;
    margin: 10px 0;
    min-width: 500px;

    & > li{
        list-style: none;
        margin: 0 5px;
    }

    & > *{
        cursor: pointer;
    }

    & > input{
        margin-left: auto;
    }

    & > svg:last-of-type{
        
    }
`

const Color = styled.li<{color: string}>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: ${props=>props.color}
`

export default Toolbar;