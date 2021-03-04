import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'

import useSignUp from '../hooks/useSignUp'

interface props{

}

const Login:React.FC<props> = () =>{

    const { data, isError, isLoading, isSuccess, mutate } = useSignUp();
    const [playerName, setPlayerName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    const handleClick = (e)=>{
        e.preventDefault();
        if(!playerName) return;
        mutate({
            name: playerName,
            email,
            password,
        });
    }

    return(
        <div>
            <Head>
                <title>Zupa - sign up</title>
            </Head>
            <Container>
                <form>
                    <h2>Sign up to Zupa</h2>
                    
                    <input value={playerName} type="text" placeholder="Name" onChange={(e)=>setPlayerName(e.target.value)} />
                    <input value={email} type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    
                    <button onClick={handleClick} disabled={isLoading}>Sign Up</button>
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {isSuccess && <div>success</div>}
                </form>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: #0f1316;
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > form{
        border: 2px solid white;
        border-radius: 20px;
        padding: 30px;
        display: grid;
        grid-template: 1fr 1fr 1fr 1fr 1fr 5px/ 1fr 1fr 1fr;
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