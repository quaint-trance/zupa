import styled from '@emotion/styled'
import { Player } from '../../../server/src/entities/Yatzy'
import useCanvas from '../../hooks/useCanvas'


interface props{
    sendChunk: any;
    drawChunk: any;
    clearCanvas: any;
    drawingState: boolean;
}

const Canvas:React.FC<props> = ({ sendChunk, drawChunk, clearCanvas, drawingState }) =>{

    const { canvasRef } = useCanvas({height: 500, width: 500}, sendChunk, drawChunk, clearCanvas, drawingState)

    return(
       
            <Canv ref={canvasRef} height={500} width={500} />
       
    )
}

const Container = styled.div`
    padding: 20px;
    overflow: hidden;
`

const Canv = styled.canvas`
    border: solid 1px white;
    display: block;
`

export default Canvas;