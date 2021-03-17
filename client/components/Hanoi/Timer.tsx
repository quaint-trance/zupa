import React, { useEffect, useState } from 'react'

type props = {
    start: number;
    refToStop: ()=>void;
}

const Timer: React.FC<props> = ({ start, refToStop }) =>{

    const [time, setTime] = useState<number>(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime( Date.now() - start );
        }, 100);

        refToStop = ()=>clearInterval(interval);

        return ()=>clearInterval(interval);

    }, []);

    return(
        <div>
            {time/1000}
        </div>
    )
}

export default Timer;