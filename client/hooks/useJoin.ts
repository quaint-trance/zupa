import { useMutation } from 'react-query'
import Game  from "../../server/src/types/GameStore"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ENDPOINT from '../ENDPOINT'

export default (gameType: string, gameId: string)=>{
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleSuccess = (data: {token: string, name: string, gameId: string, settings: any}) =>{
        localStorage.setItem(`token-${data.gameId}`, data.token);
        localStorage.setItem(`name-${data.gameId}`, data.name);
        localStorage.setItem(`name`, data.name);
        router.push(`/games/${gameType}?gameId=${data.gameId}`);
    }
    
    function asViewer(){
        router.push(`/games/${gameType}?gameId=${gameId}`);
    }

    const  {data, mutate, isLoading, isError } = useMutation( (props:{playerName: string})=>
        fetch(ENDPOINT+`/${gameType}/join`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...props,
                gameId,
                userToken: localStorage.getItem('token')
                
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
        const token = localStorage.getItem(`token-${gameId}`);
        const name = localStorage.getItem(`name-${gameId}`);
        if( token && name ) router.push(`/games/${gameType}?gameId=${gameId}`);
        else setLoading(false);
    }, [])


    return{
        data,
        mutate: (data)=> mutate(data),
        isLoading,
        isError,
        loading,
        asViewer,
    }
}