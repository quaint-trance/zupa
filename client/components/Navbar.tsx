import { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { decode } from 'jsonwebtoken'
import { animated, useSpring } from 'react-spring'

import { MdPerson, MdSettings, MdKeyboardArrowDown, MdHelp } from 'react-icons/md'

interface props{
    fixed?: boolean;
    space?: boolean;
}

const Navbar:React.FC<props> = ({fixed=false, space=true}) =>{
    const listRef = useRef<HTMLElement | null>(null);

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;
        const payload = decode(token);
        if(!payload || typeof payload === 'string' || !payload.name) return;
        setUserName(payload.name);
    }, [])

    const animatedProps = useSpring({
        height: show ? userName ? '150px' : '150px' : '0px', 
        pointerEvents: show ? 'all' : 'none',
        borderColor: show ? '#22282e' : 'black' ,
        opacity: show ? 1 : 0,
    });

    const animatedArrow = useSpring({
        transform: `rotate(${show ? '-180deg' : '0deg'})`
    });


    if(!userName) return(
        <>
        <Container fixed={fixed}>
            <div className="menu nlogged">
                <animated.button onClick={handleClick} style={animatedArrow}><MdKeyboardArrowDown/></animated.button>
                <animated.ul style={animatedProps} onMouseLeave={handleBlur}>
                   <Link href={`/login`}>
                        <li>
                            <div>Log In</div>
                        </li>
                    </Link>
                    <Link href={`/signup`}>
                        <li>
                            <div>Sign Up</div>
                        </li>
                    </Link>
                    <Link href={`/about`}>
                        <li>
                            <i><MdHelp/></i><div>About</div>
                        </li>
                    </Link>
                </animated.ul>
            </div>
       </Container>
       {space&&<Space />}
       </>
    )

    function handleClick(){
        if(!show) listRef.current?.focus();
        setShow(!show);
    }

    function handleBlur(){
        setShow(false);
    }

    return(
        <>
        <Container fixed={fixed}>
            <Link href={`/profile?userId=${userName}`}><div className="name">{userName}</div></Link>

            <div className="menu">
                <animated.button onClick={handleClick} style={animatedArrow}><MdKeyboardArrowDown/></animated.button>
                <animated.ul style={animatedProps} onMouseLeave={handleBlur}>
                    <Link href={`/profile?userId=${userName}`}>
                        <li>
                            <i><MdPerson /></i><div>Profile</div>
                        </li>
                    </Link>
                    <Link href={`/settings`}>
                        <li>
                            <i><MdSettings/></i><div>Settings</div>
                        </li>
                    </Link>
                    <Link href={`/about`}>
                        <li>
                            <i><MdHelp/></i><div>About</div>
                        </li>
                    </Link>
                </animated.ul>
            </div>

       </Container>
       {space&&<Space />}
       </>
    )
}

const Container = styled.nav<{fixed:boolean}>`
    ${props=>props.fixed && `
        position: fixed;
        top: 0;
    `}

    display: flex;
    justify-content: flex-end;
    color: white;
    width: 100%;
    padding: 20px;
    font-size: 25px;
    font-weight: 300;
    background: #1b2025;
    background: ${props=>props.theme.secondary};
    z-index: 50;

    & > .name{
        margin: 0 20px;
        font-size: 20px;
        height: 100%;
        display: flex;
        padding-top: 5px;
        align-items: center;
        cursor: default;
    }

    & > .menu{
        position: relative;
        z-index: 60;

        & > button{
            background-color: transparent;
            border: none;
            outline: none;
            color: white;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            cursor: pointer;
        }

        & > ul{
            margin: 0;
            padding: 0;
            top: calc(100% + 10px);
            right: 0px;
            overflow: hidden;

            position: absolute;
            flex-direction: column;
            border: 1px solid rgba(255, 255, 255, 0);
            border-radius: 5px;
            padding: 5px;
            font-size: 20px;
            font-weight: 500;
            background-color: #22282e;

            & > li{
                margin: 0;
                padding: 0;

                padding: 10px 15px;
                border-radius: 5px;

                list-style: none;
                display: grid;
                grid-template: 1fr / auto 1fr;
                
                /*background-color: #1b2025;*/
                transition: all .5s;
                cursor: pointer;
                white-space: nowrap;

                &:hover{
                    background-color: #272e35;
                }

                & > i{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 15px
                }
            }
        }
    }
`

const Space = styled.div`
    height: 60px;
`


export default Navbar;