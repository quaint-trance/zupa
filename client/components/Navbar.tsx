import { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { decode } from 'jsonwebtoken'
import { animated, useSpring } from 'react-spring'

import { MdPerson, MdSettings, MdKeyboardArrowDown, MdHelp } from 'react-icons/md'

interface props{

}

const Chat:React.FC<props> = ({}) =>{
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
        height: show ? '150px' : '0px', 
        pointerEvents: show ? 'all' : 'none',
        borderColor: show ? 'white' : '#FF6F91',
    });

    const animatedArrow = useSpring({
        transform: `rotate(${show ? '-180deg' : '0deg'})`
    });


    if(!userName) return(
        <Container>
            <Link href="/login"><div>Login In</div></Link>
            <Link href="/signup"><div>Sign Up</div></Link>
        </Container>
    )

    function handleClick(){
        if(!show) listRef.current?.focus();
        setShow(!show);
    }

    function handleBlur(){
        setShow(false);
    }

    return(
        <Container>

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
    )
}

const Container = styled.nav`
    display: flex;
    justify-content: flex-end;
    color: white;
    width: 100%;
    padding: 20px;
    font-size: 25px;
    font-weight: 300;
    background-color: #FF6F91;

    & > .menu{
        position: relative;

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
            top: 100%;
            right: 0px;
            overflow: hidden;

            position: absolute;
            flex-direction: column;
            border: 1px solid white;
            border-radius: 5px;
            padding: 5px;
            font-size: 20px;
            font-weight: 500;
            background-color: #FF6F91;


            & > li{
                margin: 0;
                padding: 0;

                padding: 10px 15px;
                border-radius: 5px;

                list-style: none;
                display: grid;
                grid-template: 1fr / auto 1fr;
                
                background-color: #FF6F91;
                transition: all .5s;
                cursor: pointer;

                &:hover{
                    background-color: #f16182;
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


export default Chat;