import { useState, useEffect, useReducer } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import useProfile from '../../hooks/useProfile'
import { decode } from 'jsonwebtoken'
import useSettings from '../../hooks/useSettings'
import ENDPOINT from '../../ENDPOINT'

interface props{

}

const skins:React.FC<props> = () =>{

    const [userName, setUserName] = useState('');
    const { data } = useProfile(userName);
    const { isError, isLoading,isSuccess,  mutate } = useSettings();

    const [usMusic, setUsMusic] = useState('');
    const [usDesc, setUsDesc] = useState('');

    const [skins, setSkins] = useState<string[]>([]);

    useEffect(()=>{
        if(!data) return;
        const loaded:Promise<string>[] = data?.gameSettings?.connect4?.unlocked.map(skinId=> loadSkin(skinId));
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
        }).then(res=> ({}) );
    }

    return(
        <Container>
            <Head>
                <title>Zupa - user profile</title>
            </Head>
            <Content>
               
               <div className="skinBox">

                    {data?.gameSettings?.connect4?.unlocked?.map((skinId, skinIndex)=>(
                        <Skin onClick={()=>handleClick(skinIndex)} bg={skins&&skins[skinIndex]} selected={data?.gameSettings?.connect4.skin === skinId ? true : false}/>
                    ))}

                </div>

                <button disabled={isLoading}>{!isLoading ? "Save" : "Loading"}</button>
                {isSuccess && <div>saved</div> }
                {isError && <div>error</div> }

            </Content>
        </Container>
    )
}

const Skin = styled.div<{bg:string, selected: boolean}>`
    background: ${props=>props.bg};
    background-position: center;
    background-size: 200px 200px;
    border: white 8px solid;
    border-radius: 10px;
    width: 200px;
    height: 200px;
    cursor: pointer;
    margin: 10px;

    ${props=>props.selected&&`
        border-color: green;
    `}
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

    .skinBox{
        display: flex;
    }

`

export default skins;

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