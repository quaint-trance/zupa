import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useCreate from '../../../hooks/useCreate'
import { maxHeaderSize } from 'http'
import AnimatedPage from '../../../components/AnimatedPage'

interface props{

}

const Create:React.FC<props> = () =>{

    const {isLoading, isError, mutate} = useCreate('charades')
    
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');
    const [timeouts, setTimeouts] = useState([60, 60, 45, 15]);

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    const handleClick = (e) =>{
        e.preventDefault();
        mutate({
            playerName,
            timeouts,
        });
    };

    const changeTimeouts = (index: number, value: number) =>{
        setTimeouts(o=>{
            o[index] = value;
            return [...o];
        })
    }

    return(
        <Container>
            <Head>
                <title>Zupa - create charades</title>
                <meta name="description" content="zupa online charades kalambury"></meta>
            </Head>
            <AnimatedPage>
                <form>
                    <h2>Create charades game</h2>
                    
                    <input value={playerName} type="text" placeholder="Your Name" onChange={(e)=>setPlayerName(e.target.value)} />
                    
                    <div>
                        <input min="1" value={timeouts[0]} type="number" placeholder="number of columns" onChange={(e)=>changeTimeouts(0, parseInt(e.target.value))} />
                        <label htmlFor="">first hint</label>
                    </div>
                    <div>
                        <input min="1" value={timeouts[1]} type="number" placeholder="number of columns" onChange={(e)=>changeTimeouts(1, parseInt(e.target.value))} />
                        <label htmlFor="">second</label>
                    </div>
                    <div>
                        <input min="1" value={timeouts[2]} type="number" placeholder="number of columns"  onChange={(e)=>changeTimeouts(2, parseInt(e.target.value))} />
                        <label htmlFor="">third</label>
                    </div>
                    <div>
                        <input min="1" value={timeouts[3]} type="number" placeholder="number of columns"  onChange={(e)=>changeTimeouts(3, parseInt(e.target.value))} />
                        <label htmlFor="">end of time</label>
                    </div>
                    
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {!isError && !isLoading && <button onClick={handleClick}>create</button>}
                    {error && <span>{error}</span>}
                </form>
            </AnimatedPage>
        </Container>
    )
}

const Container = styled.div`
    background: ${props=>props.theme.background};
    min-height: 100vh;
    color: ${props=>props.theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content{

        & > form{
            border: 2px solid ${props=>props.theme.text};
            border-radius: 20px;
            padding: 30px;
            display: grid;
            grid-template: 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr;
            grid-gap: 10px;
        
        & > h2{
            margin: 0 0 20px 0;
            grid-column: 1 / 5;
            text-align: center;
        }
        
        & input{
            font-size: 25px;
            background-color: rgba(255, 0, 0, 0);
            border: none;
            border-bottom: 1px solid ${props=>props.theme.text};
            color: ${props=>props.theme.text};
            padding: 5px;
        }
        
        & > input{
            grid-column: 1 /5;
        }
        
        & > div{
            display: flex;
            flex-direction: column;
            
            & > label{   
                color: #5d5d5d;
            }
            
            & > input{
                font-size: 20px;
                max-width: 100px;
            }
        }
        
        & > button{
            width: 100%;
            color: ${props=>props.theme.text};
            background-color: rgba(255, 0, 0, 0);
            font-size: 20px;
            font-weight: 800;
            padding: 5px;
            border: 2px solid ${props=>props.theme.text};
            grid-column: 1 / 5;
            cursor: pointer;
        }
        
        & > span:last-of-type{
            text-align: center;
            grid-column: 1 / 5;
        }
    }
}
    `
    

export default Create;