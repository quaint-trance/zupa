import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useCreate from '../../../hooks/useCreate'
import { useRouter } from 'next/router'
import AnimatedPage from '../../../components/AnimatedPage'

interface props{

}

const GamesList:React.FC<props> = () =>{

    const router = useRouter();
    const {isLoading, isError, mutate} = useCreate('yatzy')
    const [playerName, setPlayerName] = useState('');

    const handleClick = (e) =>{
        e.preventDefault();
        mutate({ playerName });
    }

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    return(
        <Container>
            <Head>
                <title>Zupa - create yatzy</title>
                <meta name="description" content="yatzy kości zupa"></meta>
            </Head>
            <AnimatedPage>
                <form>
                    <h2>Create yatzy game</h2>
                    <input value={playerName} type="text" placeholder="Your Name" onChange={(e)=> setPlayerName(e.target.value )} />
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {!isError && !isLoading && <button onClick={handleClick}>create</button>}
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
            grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
            grid-gap: 10px;
            
            & > h2{
                margin: 0 0 20px 0;
                grid-column: 1 / 4;
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
                grid-column: 1 /4;
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
            grid-column: 1 / 4;
            cursor: pointer;
        }
        
        & > span:last-of-type{
            text-align: center;
            grid-column: 1 / 4;
        }
    }
    }
    `
    

export default GamesList;