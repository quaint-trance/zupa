import { Socket }  from 'socket.io-client'
import { useState, useEffect } from 'react'

export default (socketRef: React.MutableRefObject<Socket | undefined>, gameId: string)=>{
    const [messages, setMessages] = useState<{author: string, content: string}[]>([]);

    useEffect(()=>{
        if(!socketRef.current) return;
        
        socketRef.current.on('chat message', (data: {author: string, content: string})=>{
            setMessages(o=>[...o, data]);
        });

    }, [socketRef.current]);

    const pushSystemInfo = (content: string) =>{
        setMessages(o=>[...o, {content, author: '$system$'}]);
    }

    const sendMessage = (content: string) =>{
        if(!socketRef.current) return;

        if(content[0]==='/')
            socketRef.current.emit('command', {content, author: localStorage.getItem(`name-${gameId}`)}, (back: string)=>{
                pushSystemInfo(back);
        });
        else socketRef.current.emit('chat message', {content, author: localStorage.getItem(`name-${gameId}`), gameId});
        
        setMessages(o=>[...o, {content, author: '$me$'}]);
    }

    return{
        messages,
        pushSystemInfo,
        sendMessage,
    }
}