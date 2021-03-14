import { useState, useEffect, useReducer } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useProfile from '../../hooks/useProfile'
import { decode } from 'jsonwebtoken'
import useSettings from '../../hooks/useSettings'
import { useRouter } from 'next/router'
import SettingsSidenav from '../../components/SettingsSidenav'
import AnimatedPage from '../../components/AnimatedPage'
import { motion } from 'framer-motion';
import { GiLaserTurret } from 'react-icons/gi'

interface props{

}

const Profile:React.FC<props> = () =>{

    const [userName, setUserName] = useState('');
    const { data, refetch } = useProfile(userName);
    
    const [usMusic, setUsMusic] = useState('');
    const [usDesc, setUsDesc] = useState('');

    const router = useRouter();
    
   function handleSave(){
       setUsMusic('');
       setUsDesc('');
       refetch();
   } 
   const { isError, isLoading, isSuccess,  mutate } = useSettings(handleSave);


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

    const handleLogout = () =>{
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        router.push('/')
    }

    return(
    <Background>
        <Container
            exit={{transform: 'translate(0vw)', opacity: 0}} 
            animate={{transform: 'translate(0vw)', opacity: 1}} 
            initial={{transform: 'translate(20vw)', opacity: 0}}
        >
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <SettingsSidenav />
            <Content >
                <div className="imageBox"></div>
    
                    <h1>{data?.name || 'Loading...'}</h1>
                    <span className="logout" onClick={handleLogout}>logout</span>

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
                    {isSuccess && !(usDesc || usMusic) && <div>saved</div>}
                    {isError && <div>error</div>}
                    {!isLoading && (usDesc || usMusic) && <div>click <i>save</i> to keep changes</div>}
            </Content>
        </Container>
    </Background>
    )
}

const Background = styled.div`
    background-color: #1b2025;
`

const Container = styled(motion.div)`
    min-height: 100vh;
    color: white;
    display: flex;

    & button{
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
    background-color: #15191d;
    flex: 1;
    padding: 0 100px;
    padding-top: 5vh;
    max-height: 100vh;

    display: flex;
    flex-direction: column;

    nav{
        border-left: 1px solid white;
        padding: 20px;
         & > div{
            font-size: 25px;
            font-weight: 400;
            cursor: pointer;
         }
    }

    .imageBox{
        background-color: #4e4e4e;
        height: 300px;
        width: 300px;
        display: none;
        
    }

    h1{
        margin: 10px 0 0 0;
        font-size: 40px;
    }

    .logout{
        font-size: 18px;
        font-weight: 300;
        cursor: pointer;
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