import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { FaPlayCircle } from 'react-icons/fa'

interface props{
    display: boolean;
    setDisplay: any;
    sendMessage: (content: string) => void;
}

const Settings:React.FC<props> = ({ display, setDisplay, sendMessage}) =>{
    
    const changeState = (state: boolean) => {
        setDisplay(state);
    }
    
    const animatedProps = useSpring({
        top: display? "50%" : "100%",
        opacity: display ? 1 : 0,
        config: config.stiff
    });
    
    const animatedBlur = useSpring({
        pointerEvents: display ? "all" : "none",
        backdropFilter: display ? "blur(5px)" : "blur(0px)",
    });
    
    

    return(
        <Container style={animatedBlur} onClick={()=>changeState(false)}>
            <animated.main style={animatedProps} onClick={e=>e.stopPropagation()}>
                <section>
                    <span>start</span>
                    <button onClick={()=>sendMessage('/start')}><FaPlayCircle/></button>
                </section>
                <section>
                    <span>new</span>
                    <button onClick={()=>sendMessage('/new')}><FaPlayCircle/></button>
                </section>
                <section>
                    <span>scoreboard</span>
                    <button onClick={()=>{sendMessage('/scoreboard');setDisplay(false)}}><FaPlayCircle/></button>
                </section>
                <button onClick={()=>changeState(false)}>close</button>
            </animated.main>
        </Container>
    )
}

const Container = styled(animated.div)`
    position: absolute;
    z-index: 120;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0px !important;

    & > main{
        border-radius: 20px;
        transform: translate(-50%, -50%);
        z-index: 100;
        position: absolute;
        left:50%;
        top: 50%;
        width: 30vw;
        height: 80vh;
        background-color: #000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        & > section{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 30px;

            & > button{
                background-color: transparent;
                padding: 0;
                margin: 0;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
            }
        }

        & > button{
            width: 100%;
            color: white;
            background-color: rgba(255, 0, 0, 0);
            font-size: 20px;
            font-weight: 800;
            padding: 5px;
            border: 2px solid white;
            grid-column: 1 / 4;
            cursor: pointer;
            margin-top: auto;
            border-radius: 10px;
        }
    }
`


export default Settings;