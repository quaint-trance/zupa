import { Socket }  from 'socket.io-client'
import { useState, useEffect } from 'react'

export default (socketRef: React.MutableRefObject<Socket | undefined>, gameId: string)=>{
    const [messages, setMessages] = useState<{author: string, content: string}[]>([]);

    useEffect(()=>{
        if(!socketRef.current) return;
        
        socketRef.current.on('chat message', (data: {author: string, content: string})=>{
            setMessages(o=>[...o, data]);
        });

        pushSystemInfo('type <b>/help</b> for help')

    }, [socketRef.current]);

    const pushSystemInfo = (content: string) =>{
        setMessages(o=>[...o, {content, author: '$system$'}]);
    }

    const sendMessage = (content: string) =>{
        if(!socketRef.current) return;

        if(content[0]=='/'){

            if(content === '/help') return pushSystemInfo(helpMessage);
            if(content === '/clear') return setMessages([]);
            

            socketRef.current.emit('command', {content}, (back: {name: string, payload: any})=>{
                if(back.name === 'unknown') pushSystemInfo('unknown command, type <b>/help</b> for help');
                else if(back.name === 'players'){
                    pushSystemInfo(back.payload.map((p, i)=>(`\n<b>${p.name}\n</b>${p.id}\n`)).join(''));
                }
                else if(back.name === 'scoreboard'){
                    pushSystemInfo(back.payload.map((p, i)=>(`${i+1}. ${p.name} ${p.score}\n`)).join(''));
                }
                else pushSystemInfo(back.name);
            });
        }
        else{
            setMessages(o=>[...o, {content, author: '$me$'}]);
            socketRef.current.emit('chat message', {content, author: localStorage.getItem(`name-${gameId}`), gameId});
        }
        
    }

    return{
        messages,
        pushSystemInfo,
        sendMessage,
    }
}



const helpMessage = `<b>/new</b> reset + start
<b>/reset</b> create new game
<b>/start</b> start game
<b>/players</b> list players
<b>/scoreboard</b> show scoreboard
<b>/kick id</b> kick player
<b>/clear</b> clear chat
<b>/help</b> show this message
`