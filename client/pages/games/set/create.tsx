import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useCreate from '../../../hooks/useCreate'
import { maxHeaderSize } from 'http'

interface props{

}

const Create:React.FC<props> = () =>{

    const {isLoading, isError, mutate} = useCreate('set')
    
    const [playerName, setPlayerName] = useState('');
    const [columns, setColumns] = useState('7');
    const [rows, setRows] = useState('6');
    const [connectToWin, setConnectToWin] = useState('4');
    const [error, setError] = useState('');

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    const handleClick = (e) =>{
        e.preventDefault();
        if(
            parseInt(columns) > 30 || 
            parseInt(rows) > 30 || 
            Math.max(parseInt(columns), parseInt(rows)) < parseInt(connectToWin)
        ) return setError('za dużo lmao');

        mutate({
            playerName,
        });
    };

    return(
        <div>
            <Head>
                <title>Zupa - create set</title>
                <meta name="description" content="zupa connect4"></meta>
            </Head>
            <Container>
                <form>
                    <h2>Create set game</h2>
                    
                    <input value={playerName} type="text" placeholder="Your Name" onChange={(e)=>setPlayerName(e.target.value)} />
                    
                    <div>
                        <input min="1" value={columns} type="number" placeholder="number of columns" onChange={(e)=>setColumns(e.target.value)} />
                        <label htmlFor="">columns</label>
                    </div>
                    
                    <div>
                        <input min="1" value={rows} type="number" placeholder="number of rows" onChange={(e)=>setRows(e.target.value)} />
                        <label htmlFor="">rows</label>
                    </div>
                    
                    <div>
                        <input min="1" value={connectToWin} type="number" placeholder="connect to win" onChange={(e)=>setConnectToWin(e.target.value)} />
                        <label htmlFor="to win">to win</label>
                    </div>
                    
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {!isError && !isLoading && <button onClick={handleClick}>create</button>}
                    {error && <span>{error}</span>}
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
        grid-template: 1fr 1fr 1fr 1fr / 1fr 1fr 1fr;
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


export default Create;