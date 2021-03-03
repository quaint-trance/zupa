import { useMutation } from 'react-query'
import ENDPOINT from '../ENDPOINT'

export default (handleSave)=>{
    
    const  {data, mutate, isLoading, isError, isSuccess } = useMutation( (props:{playerName: string})=>
        fetch(ENDPOINT+`/user/save`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...props,
                token: localStorage.getItem('token')
                
            })
        }).then(res=>{
            handleSave();
            return {};
        })
    ,{
    })

    return{
        data,
        mutate: (data)=> mutate(data),
        isLoading,
        isError,
        isSuccess,
    }
}