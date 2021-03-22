import { useQuery } from 'react-query'
import { ContestData }  from "../../server/src/domain/Contest/ContestTypes"
import ENDPOINT from '../ENDPOINT';

export default (id: string)=>{
    const { data, isLoading, isError, isSuccess } = useQuery<ContestData>(`contest${id}`, ()=>
        fetch(ENDPOINT+`/contest/data?id=${id}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res=>{
            return res.json();
        })
    , {
        refetchInterval: 1000*20,
    })


    return{
        data: data,
        isLoading,
        isError,
        isSuccess,
    }
}