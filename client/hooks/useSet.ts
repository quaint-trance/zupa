import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Set'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'
import { Card } from '../../server/src/entities/Set'


export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const socketRef = useRef<Socket | undefined>();
    const [table, setTable] = useState<Card[]>([]);
    
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
            setTable(data.table);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socket.on('start', (data)=>{
            setTable(data);
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
        socket.on('reset', (data)=>{
            if(!data) return;
            setPlayers(data.players);
            setTable(data.table);
            pushSystemInfo('reset');
        });
        socket.on('replace', (data)=>{
            setTable(data);
        });
        socket.on('win', (data: {name: string})=>{
            pushSystemInfo(`${data.name} wins`);
        });

        return () => {
            socket.close();
        }
    
    }, [gameId]);

    useEffect(() => {
        console.log(players)
    }, [players]);
    useEffect(()=>{
        console.log(table)
    },[table])
    
    const chooseSet = (set: string[]) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('choose set', set);
    }

    return{
        players,
        chooseSet,
        messages,
        sendMessage,
        table
    }
}