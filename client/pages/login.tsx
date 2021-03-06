import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'

import useLogin from '../hooks/useLogin'

interface props{

}

const Login:React.FC<props> = () =>{

    const { data, isError, isLoading, isSuccess, mutate } = useLogin(
    );
    const [playerName, setPlayerName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    const handleClick = (e)=>{
        e.preventDefault();
        if(!playerName) return;
        mutate({
            name: playerName,
            password
        });
    }

    return(
        <div>
            <Head>
                <title>Zupa - log in</title>
            </Head>
            <Container>
                <form>
                    <h2>Log in to Zupa</h2>
                    
                    <input value={playerName} type="text" placeholder="Name or email address" onChange={(e)=>setPlayerName(e.target.value)} />
                    <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    
                    <button onClick={handleClick} disabled={isLoading} >Log in</button>
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {isSuccess && <div>success</div>}
                </form>
            </Container>
        </div>
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
    & > form{
        border: 2px solid ${props=>props.theme.text};
        border-radius: 20px;
        padding: 30px;
        display: grid;
        grid-template: 1fr 1fr 1fr 1fr 15px/ 1fr 1fr 1fr;
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
            border-bottom: 1px solid white;
            color: white;
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
            color: white;
            background-color: rgba(255, 0, 0, 0);
            font-size: 20px;
            font-weight: 800;
            padding: 5px;
            border: 2px solid white;
            grid-column: 1 / 4;
            cursor: pointer;
        }

        & > span:last-of-type{
            text-align: center;
            grid-column: 1 / 4;
        }
    }
`

export default Login;