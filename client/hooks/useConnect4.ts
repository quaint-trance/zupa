import { useState, useEffect, useRef } from 'react'
import { Player } from '../../server/src/entities/Yatzy'
import { io, Socket }  from 'socket.io-client'
import { useRouter } from 'next/router'
import ENDPOINT from '../ENDPOINT'

export default (gameId: string)=>{
    const [players, setPlayers] = useState<Player[]>([]);
    const [turn, setTurn] = useState(-1);
    const socketRef = useRef<Socket | undefined>();
    const [messages, setMessages] = useState<{author: string, content: string}[]>([]);
    const [board, setBoard] = useState([]);

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
            setTurn(data.turn);
        });

        socket.on('new player', (data)=>{
            setPlayers(o => [...o, data]);
        });
        socket.on('next turn', (data)=>{
            setTurn(data);
        });
        socket.on('column selected', (data: {row: number, score: number, turn: number})=>{
            console.log('column selected');
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

    const chooseColumn = (column: number) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('choose column', column);
    }

    const sendMessage = (content: string) =>{
        if(!socketRef.current) return;
        socketRef.current.emit('chat message', {content, author: localStorage.getItem(`name-${gameId}`)});
        setMessages(o=>[...o, {content, author: '$me$'}]);
    }

    return{
        players,
        turn,
        chooseColumn,
        messages,
        sendMessage,
        board
    }

}