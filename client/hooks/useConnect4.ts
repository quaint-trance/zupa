import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Yatzy'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'

export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [board, setBoard] = useState<string[][]>([]);
    
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
            console.log(data);
            if(!data) return;
            setPlayers(data.players);
            setTurn(data.turn);
            setBoard(data.fields);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socket.on('next turn', (data)=>{
            setTurn(data);
        });
        socket.on('start', ()=>{
            pushSystemInfo('start');
        });
        socket.on('reset', (data)=>{
            if(!data) return;
            setPlayers(data.players);
            setTurn(data.turn);
            setBoard(data.fields);
            pushSystemInfo('reset');
        });
        socket.on('field selected', (data)=>{
            console.log('column selected', data);
            setBoard(o=>{
                o[data.column][data.row] = data.id;
                return [...o];
                
            });
        });
        socket.on('win', (data: {name: string})=>{
            pushSystemInfo(`${data.name} wins`);
        });

        return () => {
            socket.close();
        }
    
    }, [gameId]);

    const chooseColumn = (column: number) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('choose column', column);
    }

    return{
        players,
        turn,
        chooseColumn,
        messages,
        sendMessage,
        board,
    }
}