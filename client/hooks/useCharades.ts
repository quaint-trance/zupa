import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Yatzy'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'
import { decode } from 'jsonwebtoken'

export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [drawing, setDrawing] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [canIDraw, setCanIDraw] = useState<boolean>(false);
    const drawChunkCallback= useRef<any>(()=>{});
    const clearCanvasCallback= useRef<any>(()=>{});

    
    const { messages, sendMessage, pushSystemInfo } = useChat(socketRef, gameId);

    useEffect(() => {
        if(!gameId) return;
        const socket = io(ENDPOINT, {
            auth: {
                token: localStorage.getItem(`token-${gameId}`)
            }
        });
        socketRef.current = socket;
        socket.emit('checkin', { gameId }, (data)=>{
            if(!data) return;
            setPlayers(data.players);
            setDrawing(data.drawing);
            data.canvas.forEach(e=> drawChunkCallback.current(e));
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socket.on('start', ()=>{
            pushSystemInfo('start');
            setDrawing(0);
        });
        socket.on('reset', ()=>{
            clearCanvasCallback.current();
        });
        socket.on('path',(data)=>{
            drawChunkCallback.current(data);
        });
        return () => {
            socket.close();
        }
        
    }, [gameId]);
    
    useEffect(() => {
        socketRef.current?.on('guessed', (data: {playerId: string, ans: string})=>{
            pushSystemInfo(`${players.find(p=>p.id===data.playerId)?.name} guessed: ${data.ans}`);
        });
        socketRef.current?.on('kick', ({kicked, by}:{kicked: string, by: string})=>{
            setPlayers(o=>{
                const byPlayer = o.find(p=> p.id == by);
                const kickedPlayer = o.find(p=> p.id == kicked);
                pushSystemInfo(`${kickedPlayer?.name} was kicked by ${byPlayer?.name}`);
                return [...o.filter(p=> p.id !== kicked)];
            });
        });
        socketRef.current?.on('next turn', (data)=>{
            setDrawing(data);
            const playerName = players[data]?.name;
            playerName && pushSystemInfo(`now drawing: ${playerName}`)
        });
        socketRef.current?.on('hint', (data: string)=>{
            pushSystemInfo(`<b>${data}...</b>`);
        });
        
        return()=>{
            socketRef.current?.off('guessed');
            socketRef.current?.off('kick');
            socketRef.current?.off('next turn');
            socketRef.current?.off('hint');
        }
    }, [players, socketRef.current]);
    
    const makeGuess = (content: string) =>{
        if(!socketRef.current) return;
        sendMessage(content);
        socketRef.current.emit('guess', content);
    };

    const sendChunk = (chunk) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('add path', chunk);
    };

    const drawChunk = ((callback: any)=>{
        drawChunkCallback.current = callback;
    });

    const clearCanvas = ((callback: any)=>{
        clearCanvasCallback.current = callback;
    });

    const clear = () =>{
        socketRef.current?.emit('clear canvas');
    }

    useEffect(() => {
        setCanIDraw(()=>{
            const token = localStorage.getItem(`token-${gameId}`);
            if(!token) return false;
            const payload = decode(token);
            if(!payload || typeof payload==='string' || !('playerId' in payload)) return false;
            let drawingId = players[drawing]?.id;
            if(!drawingId) return false;
            return drawingId === payload.playerId;
        });
    }, [drawing, players]);

    useEffect(() => {
       socketRef.current?.emit('get charade', (data)=>{
            pushSystemInfo(`you're drawing: <b>${data}</b>`)
       });
    }, [canIDraw]);

    return{
        players,
        drawing,
        messages,
        sendMessage: makeGuess,
        sendChunk,
        drawChunk,
        clearCanvas,
        drawingState: canIDraw,
        clear,
    }
}