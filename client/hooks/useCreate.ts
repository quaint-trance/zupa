import { useMutation } from 'react-query'
import { Game }  from "../../server/src/types/GameStore"
import { useRouter } from 'next/router'
import ENDPOINT from '../ENDPOINT';


export default (gameType: string)=>{
    
    const router = useRouter();

    const handleSuccess = (data: {token: string, name: string, gameId: string}) =>{
        localStorage.setItem(`token-${data.gameId}`, data.token);
        localStorage.setItem(`name-${data.gameId}`, data.name);
        localStorage.setItem(`name`, data.name);
        router.push(`/games/${gameType}?gameId=${data.gameId}`);
    };

    const  {data, mutate, isLoading, isError } = useMutation( (props:{playerName: string})=>
        fetch(ENDPOINT+`/${gameType}/create`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...props,
                userToken: localStorage.getItem('token')
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            return data;
        })
    ,{
        onSuccess: handleSuccess
    });



    return{
        data,
        mutate: (data)=> mutate(data),
        isLoading,
        isError
    }
}