import { useState, useEffect, useReducer } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import useProfile from '../hooks/useProfile'
import { decode } from 'jsonwebtoken'
import useSettings from '../hooks/useSettings'

interface props{

}

const Profile:React.FC<props> = () =>{

    const [userName, setUserName] = useState('');
    const { data } = useProfile(userName);
    const { isError, isLoading,isSuccess,  mutate } = useSettings();

    const [usMusic, setUsMusic] = useState('');
    const [usDesc, setUsDesc] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;
        const payload = decode(token);
        console.log(payload)
        if(!payload || typeof payload === 'string' || !payload.name) return;
        console.log(payload.name)
        setUserName(payload.name);
    }, [])

    const handleClick = (event: React.MouseEvent) =>{
        event.preventDefault();
        mutate({
            description: usDesc,
            music: usMusic,
        })
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = evt.target;
        if(name==='music') setUsMusic(value);
        if(name==='description') setUsDesc(value);
    }

    return(
        <Container>
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <Content>
               
                <div className="imageBox">

                </div>
   
                <h1>{data?.name}</h1>

                <label htmlFor="">Description</label>
                <input
                    name="description"
                    className="description" 
                    placeholder="Description" 
                    value={usDesc? usDesc : data?.description} 
                    onChange={handleChange}
                />
                
                <label htmlFor="">Music</label>
                <input
                    name="music"
                    className="music" 
                    placeholder="Music YT video ID" 
                    value={usMusic? usMusic : data?.music} 
                    onChange={handleChange}
                />
               

                <button onClick={handleClick} disabled={isLoading}>{!isLoading ? "Save" : "Loading"}</button>
                {isSuccess && <div>saved</div> }
                {isError && <div>error</div> }

            </Content>
        </Container>
    )
}

const YTWrapper = styled.div`
    display: none;
`

const Container = styled.div`
    background-color: rgb(26, 26, 26);
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
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

const Content = styled.div`
    background-color: rgb(14, 14, 14);
    flex: 1;
    min-width: 1200px;
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    padding-top: 5vh;

    .imageBox{
        background-color: #4e4e4e;
        height: 300px;
        width: 300px;
        
    }

    h1{
        margin: 10px 0;
        font-size: 40px;
    }

    .description{
        margin: 10px;
        background-color: transparent;
        border: none;
        color: white;
        border-bottom: 1px solid white;
        font-size: 20px;
        padding: 10px;
        width: 500px;
    }

    .music{
        margin: 10px;
        background-color: transparent;
        border: none;
        color: white;
        border-bottom: 1px solid white;
        font-size: 20px;
        padding: 10px;
        width: 500px;
    }

    label{
        margin-top: 50px;
    }


    button{
        margin: 10px;
        background-color: transparent;
        border: none;
        color: white;
        border: 1px solid white;
        font-size: 20px;
        padding: 10px;
        width: 200px;
        margin-top: 50px;
        border-radius: 5px;

        transition: background-color .5s;

        &:hover{
            background-color: rgba(255, 255, 255, 0.075);
        }
    }

`

export default Profile;