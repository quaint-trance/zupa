import { useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { Chunk } from '../../server/src/entities/Charades';
import useEventListener from './useEventListener';

export type typeStyle = {
    color: string,
    width: number,
}



const useCanvas = ({width, height}, sendChunk: (chunk: Omit<Chunk, 'id'>)=>void , addChunk, clearCanvas, drawingState: boolean) =>{
    
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const contextRef = useRef<null | CanvasRenderingContext2D>(null);

    const drawing = useRef(false);
    const coords = useRef({x: 0, y: 0});
    const [style, setStyle] = useState<typeStyle>({color: "#ffffff", width: 3});
    const stack = useRef<Chunk['lines']>([]);
    const offset = useRef({x: 0, y: 0});
    
    const wholePicture = useRef<any>([]);

    const handleMouseDown = ( event )=>{
        coords.current.x = event.offsetX;
        coords.current.y = event.offsetY - offset.current.y;
        drawing.current = true;
    }

    const handleMouseUp = ( event )=>{
        if( drawing.current === true && drawingState){
            drawLine( style,
                coords.current.x, coords.current.y,
                event.offsetX, event.offsetY - offset.current.y);
            sendNewLine();
            coords.current.x = 0;
            coords.current.y = 0;
        
        }
        drawing.current = false;
    }
    
    const handleMouseMove = ( event )=>{
        if( drawing.current === true && drawingState){
            stack.current.push({
                x1: coords.current.x,
                y1:coords.current.y,
                x2: event.offsetX,
                y2: event.offsetY - offset.current.y,
            });
            drawLine( style,
                coords.current.x, coords.current.y,
                event.offsetX, event.offsetY - offset.current.y);
            coords.current.x = event.offsetX;
            coords.current.y = event.offsetY - offset.current.y;
        }
    }

    const handleMouseEnter = (event: React.MouseEvent) =>{
        if( event.buttons === 1 ) handleMouseDown(event);
    }
    
    const drawLine = (styledep: typeStyle, x1, y1, x2, y2) => {
        if(!contextRef.current || !styledep) return;

        contextRef.current.beginPath();
        contextRef.current.strokeStyle = styledep.color;
        contextRef.current.fillStyle = styledep.color;
        contextRef.current.lineWidth = Math.max(styledep.width, 1);
        contextRef.current.moveTo(x1, y1);
        contextRef.current.lineTo(x2, y2);
        contextRef.current.stroke();
        contextRef.current.closePath();
        
        if(Math.max(styledep.width, 2) === 2) return;

        contextRef.current.beginPath();
        contextRef.current.arc(x1, y1, (styledep.width/2), 0, 2 * Math.PI);
        contextRef.current.arc(x2, y2, (styledep.width/2), 0, 2 * Math.PI);
        contextRef.current.fill();
        contextRef.current.closePath();
    }

    const sendNewLine = () =>{
        sendChunk( {lines: stack.current, style: style} );
        wholePicture.current.push({lines: stack.current});
        stack.current = [];
    };

    useEventListener('mouseup', canvasRef.current, handleMouseUp);
    useEventListener('mousemove', canvasRef.current, handleMouseMove);
    useEventListener('mousedown', canvasRef.current, handleMouseDown);
    useEventListener('mouseout', canvasRef.current, handleMouseUp);
    useEventListener('mouseenter', canvasRef.current, handleMouseEnter);
    
    useEffect(() => {
        if(!canvasRef.current) return;
        clear();
        
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');
    
        
    
    }, []);


    const clear = () =>{
        if(!contextRef.current || !canvasRef.current) return;
        contextRef.current.clearRect(0, 0, canvasRef.current.width*1000, 100*canvasRef.current.height);
    }

    const handleOffsetChange = () =>{
        if(!contextRef.current) return;
        clear();
        contextRef.current.setTransform(1, 0, 0, 1, offset.current.x, offset.current.y);
        
        wholePicture.current.forEach(chunk => {
            chunk.lines.forEach(({x1, x2, y1, y2, style: styledep}) =>{
                drawLine(styledep ,x1, y1, x2, y2);
            });
        })

        contextRef.current.beginPath();
        contextRef.current.arc(500, 0, 20, 0, 2 * Math.PI);
        contextRef.current.fillStyle = 'orange'
        contextRef.current.fill();
        contextRef.current.closePath();
    }

    useEffect(()=>{
        wholePicture.current.forEach(chunk => {
            chunk.lines.forEach(({x1, x2, y1, y2, style: styledep}) =>{
                drawLine(styledep ,x1, y1, x2, y2);
            });
        })
    }, [ width, height ]);

    addChunk((chunk: Chunk) =>{
       chunk.lines.forEach(({x1, x2, y1, y2}) =>{
            drawLine(chunk.style, x1, y1, x2, y2);
        })
    });

    clearCanvas(()=>{
        clear();
    });

    return{
        canvasRef,
        clear,
        style,
        setStyle,
        addChunk,
    }

}

export default useCanvas;