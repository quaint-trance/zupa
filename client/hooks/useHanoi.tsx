import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/domain/Hanoi/HanoiTypes'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'
import Timer from '../components/Hanoi/Timer'

export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [rods, setRods] = useState<[number[], number[], number[]]>([[0],[0],[0]]);
    const [from, setFrom] = useState<number|null>(null);
    
    const { messages, sendMessage, pushSystemInfo, deleteMessage } = useChat(socketRef, gameId);

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
        return () => {
            socket.close();
        }
    
    }, [gameId]);

    useEffect(()=>{
        socketRef.current?.on('next turn', ({turn})=>{
            console.log(turn)
            setTurn(turn);
            players.length>1 && pushSystemInfo(`now solving: ${players[turn]?.name}`)
        });
        socketRef.current?.on('kick', ({kicked, by}:{kicked: string, by: string})=>{
            setPlayers(o=>{
                const byPlayer = o.find(p=> p.id == by);
                const kickedPlayer = o.find(p=> p.id == kicked);
                pushSystemInfo(`${kickedPlayer?.name} was kicked by ${byPlayer?.name}`);
                return [...o.filter(p=> p.id !== kicked)];
            })
        });
        socketRef.current?.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
            pushSystemInfo(`${data.name} joined`)
        });
        socketRef.current?.on('start', ()=>{
            pushSystemInfo('start');
        });
        
        socketRef.current?.on('reset', (data)=>{
            if(!data) return;
            setRods(data);
        });
        socketRef.current?.on('disc moved', (data)=>{
            setRods(data);
        });
        socketRef.current?.on('win', (time)=>{
            pushSystemInfo(`${players[turn]?.name} time: ${time/1000}s`);
        });

        socketRef.current?.on('time start', date=>{
            const comp = <Timer start={Date.now()} refToStop={()=>{}} />;
            pushSystemInfo( {content: comp, type:'timer' });
            pushSystemInfo( {content: <div onClick={()=>sendMessage('/reset')}>*reset*</div>, type:'timer' });

        });
        socketRef.current?.on('time stop', ()=>{
            deleteMessage('timer')
        });

        return ()=>{
            socketRef.current?.off('next turn');
            socketRef.current?.off('kick');
            socketRef.current?.off('new player');
            socketRef.current?.off('start');
            socketRef.current?.off('reset');
            socketRef.current?.off('disc moved');
            socketRef.current?.off('win');
            socketRef.current?.off('time start');
            socketRef.current?.off('time stop');
        }
    }, [socketRef.current, players, turn]);

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