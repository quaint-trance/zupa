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
    const [board, setBoard] = useState<string[][]>([]);
    const drowChunkCallback= useRef<any>(()=>{});
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
            setDrawing(data.turn);
            setBoard(data.fields);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socket.on('next turn', (data)=>{
            setDrawing(data);
            setPlayers(o=>{
                const playerName = o.find(p=>p.id===data);
                pushSystemInfo(`now drawing: ${playerName}`)
                return o;
            })
        });
        socket.on('start', ()=>{
            pushSystemInfo('start');
        });
        socket.on('kick', ({kicked, by}:{kicked: string, by: string})=>{
            setPlayers(o=>{
                const byPlayer = o.find(p=> p.id == by);
                const kickedPlayer = o.find(p=> p.id == kicked);
                pushSystemInfo(`${kickedPlayer?.name} was kicked by ${byPlayer?.name}`);
                return [...o.filter(p=> p.id !== kicked)];
            })
        });
        socket.on('reset', ()=>{
            clearCanvasCallback.current();
        });
        socket.on('guessed', (data: {playerId: string, ans: string})=>{
            console.log(data);
            pushSystemInfo(`${players.find(p=>p.id===data.playerId)?.name} guessed: ${data.ans}`);
        });
        socket.on('path',(data)=>{
            drowChunkCallback.current(data);
        })
        return () => {
            socket.close();
        }
    
    }, [gameId]);

    useEffect(() => {
        console.log(players)
    }, [players]);

    const makeGuess = (content: string) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('guess', content);
        sendMessage(content);
    }

    const sendChunk = (chunk) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('add path', chunk);
    }

    const drawChunk = ((callback: any)=>{
        drowChunkCallback.current = callback;
    });
    const clearCanvas = ((callback: any)=>{
        clearCanvasCallback.current = callback;
    });

    const canIDraw = () =>{
        const token = localStorage.getItem(`token-${gameId}`);
        if(!token || !token) return false;
        const payload = decode(token);
        if(!payload || typeof payload==='string' || !('playerId' in payload)) return false;
        
        let drawingId;
        setPlayers(o=>{
            drawingId = o[drawing]         
            return o;
        })
        
        if(!drawingId) return false;
        return drawingId === payload.playerId;
    }

    return{
        players,
        drawing,
        messages,
        sendMessage: makeGuess,
        board,
        sendChunk,
        drawChunk,
        clearCanvas,
        drawingState: canIDraw(),
    }
}