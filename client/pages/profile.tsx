import { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'

import { useRouter } from 'next/router'
import useProfile from '../hooks/useProfile'

interface props{

}

const Profile:React.FC<props> = () =>{

    const router = useRouter();
    const { data, isError, isLoading} = useProfile(
        typeof router.query.userId==='object' ? router.query.userId[0] : router.query.userId || '',
    );
    const [playerName, setPlayerName] = useState('');

    useEffect(()=>{
        const temp = localStorage?.getItem('name');
        if(temp) setPlayerName(temp);
    }, []);

    return(
        <div>
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <Container>
               <h2>{data?.name}</h2>
               <p>{JSON.stringify(data)}</p>
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
    

    &  button{
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

`

export default Profile;