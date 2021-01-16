import { useRef, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { RiSendPlaneFill } from 'react-icons/ri'
interface props{
    messages: {author: string, content: string}[],
    sendMessage: (content: string)=> any;
}

const Chat:React.FC<props> = ({messages, sendMessage}) =>{

    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const handleClick = (event) =>{
        event.preventDefault();
        if(!inputRef.current || inputRef.current.value === '') return;
        sendMessage(inputRef.current.value);
        inputRef.current.value = '';
    }

    useEffect(()=>{
        if(!divRef.current) return;
        divRef.current.scroll(0, 100000);
    }, [messages]);

    return(
        <Container>
                <div ref={divRef}>
                    {messages.map(m=>
                        <div key={m.content+m.author} style={m.author==='$me$'?{background: '#6ad48d', marginLeft: 'auto'}:{}}>
                            {m.content}
                        </div>    
                    )}
                </div>
                <form>
                    <input type="text" ref={inputRef} placeholder="Ee"/>
                    <button onClick={handleClick}><RiSendPlaneFill/></button>
                </form>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    padding: 20px 50px 20px 20px;
    background-color: rgba(209, 104, 104, 0);
    display: grid;
    grid-template: 1fr 50px / 1fr;
        
        & > div{
            overflow-y: scroll;
            max-height: 100%;
            padding: 10px;
            
            &::-webkit-scrollbar {
                width: 5px;
            }
            &::-webkit-scrollbar-track {
                background: rgba(255, 166, 0, 0);
            }
            &::-webkit-scrollbar-thumb {
                background-color: #292929;
                border-radius: 60px;
            }

            & > div{
                background-color: rgb(235, 235, 235);
                margin: 10px 0;
                color: black;
                padding: 5px 10px;
                border-radius: 20px;
                max-width: 65%;
            }
        }
        & > form{
            background-color: rgba(236, 235, 235, 0);
            height: 40px;
            display: flex;

            & > input{
                flex: 1;
                margin: 0 10px 0 0;
                border: none;
                border-radius: 20px;
                outline: none;
                font-size: 20px;
                padding: 10px;
                &:active{
                    outline: none;
                }
            }
            & > button{
                margin: 0;
                border: none;
                background-color: #41c06b;
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none;
                cursor: pointer;

                & > *{
                    pointer-events: none;
                    height: 70%;
                    width: 70%;
                }
            }
        }
`


export default Chat;