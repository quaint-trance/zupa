import { useState, useEffect, useReducer } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useProfile from '../../hooks/useProfile'
import { decode } from 'jsonwebtoken'
import useSettings from '../../hooks/useSettings'
import Link from 'next/link'
import SettingsSidenav from '../../components/SettingsSidenav'
import ENDPOINT from '../../ENDPOINT'
import { motion } from 'framer-motion'

interface props{

}

const Profile:React.FC<props> = () =>{
const [userName, setUserName] = useState('');
    const { data, refetch } = useProfile(userName);
    const { isError, isLoading,isSuccess,  mutate } = useSettings(()=>{});

    const [usMusic, setUsMusic] = useState('');
    const [usDesc, setUsDesc] = useState('');

    const [skins, setSkins] = useState<{id: string, value: string}[]>([]);

    useEffect(()=>{
        if(!data) return;
        const loaded:Promise<{id: string, value: string}>[] = data?.gameSettings?.connect4?.unlocked.map(skinId=> loadSkin(skinId));
        Promise.all(loaded).then(loaded=>{
            setSkins(loaded);
            console.log(loaded);
        });
    }, [data]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;
        const payload = decode(token);
        if(!payload || typeof payload === 'string' || !payload.name) return;
        setUserName(payload.name);
    }, [])

    const handleClick = (number: number) =>{
        fetch(ENDPOINT+`/user/setSkin`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                token: localStorage.getItem('token'),
                skinId: data?.gameSettings?.connect4?.unlocked[number]
            })
        }).then( res => refetch() );
    }

    return(
    <Background>
        <Container>
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <SettingsSidenav />
            <Content
                exit={{opacity: 0}} 
                animate={{opacity: 1}} 
                initial={{opacity: 0}}
            >
                    <h1>Connect4</h1>
                     <div className="skinBox">

                    {data?.gameSettings?.connect4?.unlocked?.map((skinId, skinIndex)=>(
                        <Skin onClick={()=>handleClick(skinIndex)} bg={skins&&skins[skinIndex]?.value} selected={data?.gameSettings?.connect4.skin === skinId ? true : false}/>
                    ))}

                </div>

            </Content>
        </Container>
    </Background>
    )
}

const Skin = styled.div<{bg:string, selected: boolean}>`
    background: ${props=>props.bg};
    background-position: center;
    background-size: 200px 200px;
    border: ${props=>props.theme.text} 8px solid;
    border-radius: 10px;
    width: 200px;
    height: 200px;
    cursor: pointer;
    margin: 10px;

    ${props=>props.selected&&`
        border-color: green;
    `}
`
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

    .skinBox{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }


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
        margin: 10px 0;
        font-size: 40px;
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

async function loadSkin(id: string):Promise<string>{
    return fetch(ENDPOINT+`/user/skin?id=${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(res=>{
       return res.json();
    }).then(res=>res.value);
}

export default Profile;