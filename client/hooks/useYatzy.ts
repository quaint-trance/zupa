import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Yatzy'
import { io, Socket }  from 'socket.io-client'
import { useRouter } from 'next/router'
import ENDPOINT from '../ENDPOINT'

export default (gameId: string)=>{
    const [dice, setDice] = useState([1, 2, 3, 4, 5].map(e=>({score: e, throwRefresh: 0})));
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [messages, setMessages] = useState<{author: string, content: string}[]>([]);

    const router = useRouter();

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
        });
        socket.on('dice throw', (data: (null|number)[])=>{
            setDice(o => data.map((die, index)=>{
                if(die === null) return o[index];
                return {score: die, throwRefresh: Date.now()}
            }));
        });
        socket.on('row chosen', (data: {row: number, score: number, turn: number})=>{
            console.log('row chosen');
            setPlayers(o=>{
               o[data.turn].usedRows[data.row] = data.score;
               o[data.turn].score += data.score;
               return [...o];
           })
        });
        socket.on('chat message', (data: {author: string, content: string})=>{
            setMessages(o=>[...o, data]);
        });
        socket.on('win', (data: {name: string})=>{
            console.log(data);
            setMessages(o=>[...o, {content: `${data.name} wins`, author: '$server$'}])
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

    const sendMessage = (content: string) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('chat message', {content, author: localStorage.getItem(`name-${gameId}`)});
        setMessages(o=>[...o, {content, author: '$me$'}]);
    }

    return{
        dice,
        players,
        turn,
        throwDice,
        chooseRow,
        messages,
        sendMessage,
    }

}