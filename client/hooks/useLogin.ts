import { useMutation } from 'react-query'
import Game  from "../../server/src/types/GameStore"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ENDPOINT from '../ENDPOINT'

export default ()=>{
    
    const router = useRouter();

    const handleSuccess = (data: {token: string,payload: any}) =>{
        localStorage.setItem(`name`, data.payload.name);
        localStorage.setItem(`token`, data.token);
        setTimeout(()=>router.push(`/`), 2000);
    }

    const  {data, mutate, isLoading, isError, isSuccess } = useMutation( (props:{playerName: string})=>
        fetch(ENDPOINT+`/user/login`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...props,
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            return data;
        })
    ,{
        onSuccess: handleSuccess,
    })

    return{
        data,
        mutate: (data)=> mutate(data),
        isLoading,
        isError,
        isSuccess,
    }
}