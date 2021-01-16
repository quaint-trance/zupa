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

    return(
        <div>
            <Head>

            </Head>
            <Container>
                <h2>Join {router.query.gameId}</h2>
                <input ref={inputRef} type="text"/>
                <button onClick={()=>mutate(inputRef.current && inputRef.current.value)}>join</button>
                {isLoading && <div>loading</div>}
                {isError && <div>error</div>}
                {!isError && !isLoading && <div>E</div>}
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: rgb(14, 14, 14);
    min-height: 100vh;
    color: white;
    

    & > h2{
        margin: 0;
    }
`


export default Join;