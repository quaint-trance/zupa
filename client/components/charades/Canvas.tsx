import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Yatzy'
import useCanvas from '../../hooks/useCanvas'
import Toolbar from './Toolbar'


interface props{
    sendChunk: any;
    drawChunk: any;
    clearCanvas: any;
    drawingState: boolean;
    clear: any;
}

const Canvas:React.FC<props> = ({ sendChunk, drawChunk, clearCanvas, drawingState, clear }) =>{

    const { canvasRef, style, setStyle } = useCanvas({height: 500, width: 500}, sendChunk, drawChunk, clearCanvas, drawingState)

    return(
        <Container>
            <Toolbar style={style} setStyle={setStyle} clear={clear} display={drawingState} />
            <Canv ref={canvasRef} height={500} width={500} />
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
    overflow: hidden;
`

const Canv = styled.canvas`
    border: solid 1px white;
    display: block;
    cursor: crosshair;
`

export default Canvas;