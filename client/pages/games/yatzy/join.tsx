import { useRef } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'

import { useRouter } from 'next/router'
import useJoin from '../../../hooks/useJoin'

interface props{

}

const Join:React.FC<props> = () =>{

    const router = useRouter();
    const { data, isError, isLoading, mutate } = useJoin('yatzy', typeof router.query.gameId==='object' ? router.query.gameId[0] : router.query.gameId || '')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = (e) =>{
        e.preventDefault();
        mutate({playerName: inputRef.current?.value || ''});
    }

    return(
        <div>
            <Container>
                <section>
                    <h2>Join yatzy game</h2>
                    <input ref={inputRef} type="text" placeholder="Your Name"/>
                    {isLoading && <div>loading</div>}
                    {isError && <div>error</div>}
                    {!isError && !isLoading && <div><button onClick={handleClick}>join</button></div>}
                </section>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: rgb(14, 14, 14);
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > section{
        border: 2px solid white;
        border-radius: 20px;
        padding: 30px;
        
        & > h2{
            margin: 0 0 20px 0;
        }
        & > input{
            width: 100%;
        }
        & > div{
            width: 100%;
            margin: 10px 0 0 0;
            & > button{
                width: 100%;
                color: white;
                background-color: rgba(255, 0, 0, 0);
                font-size: 20px;
                font-weight: 800;
                padding: 5px;
                border: 2px solid white;
            }
        }
    }
`

export default Join;