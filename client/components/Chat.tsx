import { useRef, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { RiSendPlaneFill } from 'react-icons/ri'
import ReactHtmlParser from 'react-html-parser'

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
                    {messages.map((m, i, arr)=>
                    <>
                        {!['$me$','$system$'].includes(m.author) && 
                            arr[i-1]?.author !== m.author &&
                        <span>{m.author}</span>}
                        <Message key={i+m.author} author={m.author}>
                            {ReactHtmlParser(m.content)}
                        </Message>    
                    </>
                    )}
                </div>
                <form>
                    <div><input type="text" ref={inputRef} placeholder="Ee"/></div>
                    <button onClick={handleClick}><RiSendPlaneFill/></button>
                </form>
        </Container>
    )
}

interface MessageProps{
    author: '$me$' | '$system$' | string;
}

const Message = styled.div<MessageProps>`
    margin: 3px 0;
    color: black;
    padding: 10px 15px;
    border-radius: 20px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    ${props=>{
        if(props.author === '$system$') return `
        background-color: #d46d6a;
        align-self: center;
        width: 100%;
        text-align: center;
        `;
        if(props.author === '$me$') return `
            background-color: #6ad48d;
            align-self: flex-end;
            max-width: 65%;
        `;
        return `
            background-color: #eeeeee;
            align-self: flex-start;
            max-width: 65%;
        `;
    }}

    & ~ span{
        margin-top: 15px;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.705);
    }
`

const Container = styled.div`
    height: 100vh;
    padding: 20px 20px 20px 20px;
    background-color: rgba(209, 104, 104, 0);
    display: grid;
    grid-template: 1fr 50px / 1fr;

        & > div{
            max-width: 100%;
            overflow-y: scroll;
            max-height: 100%;
            padding: 10px;
            margin-bottom: 10px;

            display: flex;
            flex-direction: column;
            
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

        }
        & > form{
            background-color: rgba(236, 235, 235, 0);
            height: 40px;
            display: grid;
            max-width: 100%;
            grid-template-columns: 1fr auto;

            & > div{
                padding-right: 10px;
                & > input{
                    width: 100%;
                    border: none;
                    border-radius: 20px;
                    outline: none;
                    font-size: 20px;
                    padding: 10px;
                    &:active{
                        outline: none;
                    }
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