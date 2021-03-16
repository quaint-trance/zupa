import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/domain/Hanoi/HanoiTypes'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'

export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [rods, setRods] = useState<[number[], number[], number[]]>([[0],[0],[0]]);
    const [from, setFrom] = useState<number|null>(null);
    
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
            setRods(data.rods);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socket.on('next turn', ({turn, rods})=>{
            setTurn(turn);
            setRods(rods);
            pushSystemInfo(`now solving: ${players[turn].name}`)
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
        socket.on('reset', (data)=>{
            if(!data) return;
            setPlayers(data.players);
            setTurn(data.turn);
            setRods(data.rods);
            pushSystemInfo('reset');
        });
        socket.on('disc moved', (data)=>{
            setRods(data);
        });
        socket.on('win', (time)=>{
            pushSystemInfo(`time: ${time/1000}s`);
        });

        return () => {
            socket.close();
        }
    
    }, [gameId]);

    useEffect(()=>{
        console.log('rods')
        console.log(rods);
    }, [rods]);

    const move = (from: number, to: number) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('move',{from, to} );
    }

    function chooseRod(rod: number){
        if(from === null) return setFrom(rod);
        const temp = from;
        setFrom(null);
        move(temp, rod);
    }

    return{
        players,
        turn,
        messages,
        sendMessage,
        rods,
        chooseRod,
        from,
    }
}