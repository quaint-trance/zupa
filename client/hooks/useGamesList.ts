import { useQuery } from 'react-query'
import { gameInfo }  from "../../server/src/types/GameStore"
import ENDPOINT from '../ENDPOINT';

export default ()=>{
    const { data }: {data: gameInfo[] | undefined} = useQuery('gamesList', ()=>
        fetch(ENDPOINT+'/games', {
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
        initialData: [],
    })


    return{
        data: data ? data : []
    }
}