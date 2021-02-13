import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Yatzy'
import { io, Socket }  from 'socket.io-client'
import ENDPOINT from '../ENDPOINT'
import useChat from './useChat'

export default (gameId: string)=>{
    const [dice, setDice] = useState([1, 2, 3, 4, 5].map(e=>({score: e, throwRefresh: 0})));
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const [throwCount, setThrowCount] = useState(0);
    const socketRef = useRef<Socket | undefined>();

    const { messages, sendMessage, pushSystemInfo } = useChat(socketRef, gameId);

    useEffect(() => {
        if(!gameId) return;
        const socket = io(ENDPOINT, {
            auth: {
                token: localStorage.getItem(`token-${gameId}`)
            }
        });
        socketRef.current = socket;
        socket.emit('checkin', { gameId}, (data)=>{
            if(!data) return;
            setDice(data.dice.map(e=>({score: e, throwCount: 0})));
            setPlayers(data.players);
            setTurn(data.turn);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
        });
        socket.on('next turn', (data)=>{
            setTurn(data);
            setThrowCount(0);
        });
        socket.on('dice throw', (data: (null|number)[])=>{
            setThrowCount(o=>o+1);
            setDice(o => data.map((die, index)=>{
                if(die === null) return o[index];
                return {score: die, throwRefresh: Date.now()}
            }));
        });
        socket.on('row chosen', (data: {row: number, score: number, turn: number})=>{
            setPlayers(o=>{
               o[data.turn].usedRows[data.row] = data.score;
               o[data.turn].score += data.score;
               return [...o];
           })
        });
        
        socket.on('win', (data: {name: string})=>{
            pushSystemInfo(`${data.name} wins`);
        });

        socket.on('start', ()=>{
            setTurn(0);
            setThrowCount(0);
            pushSystemInfo('start');
        });

        socket.on('reset', (newPlayers: Player[])=>{
            setPlayers(newPlayers);
            pushSystemInfo('reset');
        });

        return () => {
            socket.close();
        }
    
    }, [gameId]);

    const throwDice = (selected: boolean[]) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('throw dice', selected);
    }

    const chooseRow = (row: number) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('choose row', row);
    }

    return {
        dice,
        players,
        turn,
        throwDice,
        chooseRow,
        messages,
        sendMessage,
        throwCount,
    }

}