import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Die from './Die'
import { useSpring, animated, config } from 'react-spring'

interface props{
    score: number;
    selected?: boolean;
    onClick?: ()=>void;
    throwRefresh: number;
}

const positions = [
    {x: 0, y: 0},
    {x: 0, y: 270},
    {x: 180, y: 0},
    {x: 0, y: 90},
    {x: 270, y: 0},
    {x: 90, y: 0},
]

const Dice3D:React.FC<props> = ({score, onClick, selected, throwRefresh}) =>{
    const [deg, setDeg] = useState({x: 0, y: 0, z: 0});

    const props = useSpring({
        transform: `rotateX(${deg.x + ([9].includes(score)? -15 : 15)}deg) rotateY(${deg.y + ([3, 6].includes(score)? 15 : -15)}deg) rotateZ(${deg.z + + ([6].includes(score)? 15 : 0)}deg)`,
        config: {
            tension: 280,
            friction: 180,
            mass: 1
        }
    })

    const handleClick = () =>{
        if(onClick) onClick();
    }

    useEffect(()=>{
        const r = score;
        const n = 2;
        if(!deg) return;
        const obj = {
            x: (Math.floor(deg?.x/360)+n)*360 + positions[r-1].x,
            y: (Math.floor(deg?.y/360)+0)*360 + positions[r-1].y,
            z: 0
        };
        setDeg(obj);
    }, [score, throwRefresh]);

    return(
        <Container style={props}>
            <div onClick={handleClick}><Die score={1} selected={selected} /></div>
            <div onClick={handleClick}><Die score={2} selected={selected} /></div>
            <div onClick={handleClick}><Die score={3} selected={selected} /></div>
            <div onClick={handleClick}><Die score={4} selected={selected} /></div>
            <div onClick={handleClick}><Die score={5} selected={selected} /></div>
            <div onClick={handleClick}><Die score={6} selected={selected} /></div>
        </Container>
    )
}

const Container = styled(animated.div)`
    width: 50px;
    height: 50px;
    position: relative;
    transform-style: preserve-3d;

    & > *{
        position: absolute;
        width: 50px;
        height: 50px;
        cursor: pointer;

        & > *{
            pointer-events: none;
            border: none;
            border-radius: 0px;
        }
        
        &:nth-of-type(1){
            transform: rotateY( 0deg ) translateZ(25px)
        }
        &:nth-of-type(2){
            transform: rotateY( 90deg ) translateZ(25px)
        }
        &:nth-of-type(3){
            transform: rotateY(  180deg) translateZ(25px)
        }
        &:nth-of-type(4){
            transform: rotateY(  270deg) translateZ(25px)
        }
        &:nth-of-type(5){
            transform: rotateX(  90deg) translateZ(25px)
        }
        &:nth-of-type(6){
            transform: rotateX(  -90deg) translateZ(25px)
        }
    }

    
`


export default Dice3D;