import { useState, useEffect, useReducer, useContext } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useProfile from '../../hooks/useProfile'
import { decode } from 'jsonwebtoken'
import useSettings from '../../hooks/useSettings'
import { useRouter } from 'next/router'
import SettingsSidenav from '../../components/SettingsSidenav'
import { motion } from 'framer-motion';
import { GlobalContext } from '../_app'

interface props{
}

const Profile:React.FC<props> = () =>{

    const [userName, setUserName] = useState('');
    const { data, refetch } = useProfile(userName);
    
    const [usMusic, setUsMusic] = useState('');
    const [usDesc, setUsDesc] = useState('');

    const router = useRouter();

    const {theme, changeTheme} = useContext(GlobalContext);
    
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
        <Container>
            <Head>
                <title>Zupa - settings</title>
            </Head>
            <SettingsSidenav />
            <Content
                exit={{opacity: 0}} 
                animate={{opacity: 1}} 
                initial={{opacity: 0}}
            >
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
                    <div>
                        <label>theme: {theme}</label>
                        <button
                            onClick={()=>changeTheme(theme==='dark'?'light':'dark')}
                        >change</button>
                    </div>
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
    background: ${props=>props.theme.secondary};
`

const Container = styled.div`
    min-height: 100vh;
    color: ${props=>props.theme.text};
    display: flex;

    & button{
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

`

const Content = styled(motion.div)`
    background: ${props=>props.theme.background};
    flex: 1;
    padding: 0 100px;
    padding-top: 5vh;
    max-height: 100vh;

    display: flex;
    flex-direction: column;

    nav{
        border-left: 1px solid ${props=>props.theme.text};
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
        color: ${props=>props.theme.text};
        border-bottom: 1px solid ${props=>props.theme.text};
        font-size: 20px;
        padding: 10px;
        width: 500px;
    }

    .music{
        margin: 10px;
        background-color: transparent;
        border: none;
        color: ${props=>props.theme.text};
        border-bottom: 1px solid ${props=>props.theme.text};
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
        color: ${props=>props.theme.text};
        border: 1px solid ${props=>props.theme.text};
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