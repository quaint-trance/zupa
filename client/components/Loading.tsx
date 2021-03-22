import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { animated, useTrail } from 'react-spring'

type props = {

}

const colors = [
    `#2645bd`,
    `#a9baff`,
    `#3f63f0`,
]

const Loading: React.FC<props> = () =>{

    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
    }, [])

    const trail = useTrail(colors.length, {
        transform: `translate(-50%, -50%) rotate(${loading?'0deg' : '360deg'})`,
        config:{
            mass: 5,
            friction: 24,
            tension: 70,
            velocity: 20,
        },

    });

    return(
        <Container>
            {trail.map((props, index)=>
                <Square color={colors[index]} key={index} style={props} />
            )}
        </Container>
    )
}


const Container = styled.div`
    position: relative;

    .square{
    }
`

const Square = styled(animated.div)<{color:string}>`
    width: 100px;
    height: 100px;
    background-color: ${props=>props.color};
    position: absolute;
    top: 50%;
    left: 50%;
`

export default Loading;