import { useMutation } from 'react-query'
import { Game }  from "../../server/src/types/GameStore"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ENDPOINT from '../ENDPOINT'

export default (gameType: string, gameId: string)=>{
    
    const router = useRouter();

    const handleSuccess = (data: {token: string, name: string, gameId: string}) =>{
        localStorage.setItem(`token-${data.gameId}`, data.token);
        localStorage.setItem(`name-${data.gameId}`, data.name);
        router.push(`/games/yatzy?gameId=${data.gameId}`);
    }

    const  {data, mutate, isLoading, isError } = useMutation( (playerName)=>
        fetch(ENDPOINT+`/${gameType}/join`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerName,
                gameId
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            return data;
        })
    ,{
        onSuccess: handleSuccess,
        onMutate: ()=>{
            console.log(gameId);
            console.log(router.query);
        }
    })

    useEffect(()=>{
        if(
            localStorage.getItem(`token-${gameId}`)
            && localStorage.getItem(`name-${gameId}`)
        ) router.push(`/games/yatzy?gameId=${gameId}`);
    }, [])


    return{
        data,
        mutate: (data)=> mutate(data),
        isLoading,
        isError
    }
}