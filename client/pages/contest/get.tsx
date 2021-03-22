import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import useContest from '../../hooks/useContest'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion';
import {useTransition, animated} from 'react-spring'
import { useRouter } from 'next/router'

interface props{

}

const animate = {
    initial:{
        opacity: 0,
    },
    animate:{
        opacity: 1,
    },
    exit:{
        opacity: 0,
    }
}

const GamesList:React.FC<props> = () =>{

    const router = useRouter();

    const { data, isLoading, isError } = useContest(typeof router.query.id === 'object' ? router.query.id[0] : router.query.id || ' ');
    
    const [leftTime, setLeftTime] = useState(6000000);

    useEffect(()=>{

        const interval = setInterval(()=>{
            setLeftTime(o=>o-1000);
        }, 1000);

        return ()=>clearInterval(interval);
    }, [])

    useEffect(()=>{
        if(data?.ends) setLeftTime(
            (new Date(data.ends)).getTime() - Date.now()
        )
    }, [data?.ends])

    return(
    <Background>
            <Navbar fixed={true} space={true}/>
            <Head>
                <title>Zupa - Contest</title>
            </Head>
        <Container {...animate} >
                <h1>Contest {data?.game}</h1>

                <h3>{data?.ends && formatDate( leftTime ) }</h3>
                
                <div className="description">{data?.description}{isLoading && 'loading'}{isError&&'error'}</div>
                <ul>{data?.scoreboard.map((record, recordIndex)=>(
                    <li>
                        <span>{recordIndex+1}.</span>
                        <span>{record.userId}</span>
                        <span>{Math.floor(record.score/10)/100}</span>
                    </li>
                ))}</ul>
        </Container>
    </Background>
    )
}

const Background = styled.div`
    min-height: 100vh;
    background: ${props=>props.theme.background};
`

const Container = styled(motion.div)`
    color: ${props=>props.theme.text};
    padding-top: 20px;
    padding-bottom: 50px;
    overflow-x: hidden;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 30px;

    & > h1{
        margin: 50px 10px 10px 10px;
        padding: 0;
        font-weight: 300;
        font-size: 50px;
        text-align: center;
    }
    & > h3{
        text-align: center;
        margin: 0px;
        font-weight: 300;
        margin-bottom: 50px;
    }

    & > .description{
        text-align: justify;
        margin-bottom: 50px;
    }

    & > ul{
        margin: 0;
        padding: 0 0px;

        & > li{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            padding: 20px 20px;
            cursor: pointer;

            &:hover{
                background-color: ${props=>props.theme.hover}
            }

            & > span{
                text-align: center;
            }
        }
    }
`

function formatDate(mtime: number){
    let time = Math.floor(mtime/1000);

    const days = Math.floor(time/(60*60*24));
    if(days)time = time%(days*60*60*24);
    
    const hours = Math.floor(time/(60*60));
    if(hours)time = time%(hours*60*60);

    const minutes = Math.floor(time/(60));
    if(minutes)time = time%(minutes*60)

    const seconds = Math.floor(time);

    return `${days}D ${hours}h ${minutes}m ${seconds}s`
}


export default GamesList;