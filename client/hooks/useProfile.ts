import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import ENDPOINT from '../ENDPOINT'

export default (userId: string)=>{
    
    const router = useRouter();

    const  {data, isLoading, isError } = useQuery(`profile-${userId}`, ()=>
        fetch(ENDPOINT+`/user/profile?name=${userId}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res=>{
            if(res.status === 200) return res.json();
        })
    ,{
        
    })

    return{
        data,
        isLoading,
        isError
    }
}