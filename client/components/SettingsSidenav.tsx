import { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { useRouter } from 'next/router'

function getLastFromRoute(route: string){
    const index = route.lastIndexOf('/');
    return route.substr(index+1);
}

const SettingsSidenav:React.FC = () =>{

    const router = useRouter();
    const [settingsPageName] = useState(getLastFromRoute(router.pathname));
    
    return(
        <Container>
            <Link href='/settings'>
                <li className={`${settingsPageName=='settings'&&'active'}`}>
                    general
                </li>
            </Link>
            <Link href='/settings/connect4'>
                <li className={`${settingsPageName=='connect4'&&'active'}`}>
                    connect4
                </li>
            </Link>
            <Link href='/settings/charades'>
                <li className={`${settingsPageName=='charades'&&'active'}`}>
                    charades
                </li>
            </Link>
       </Container>
    )
}

const Container = styled.ol`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 300px;
    padding-top: 30px;

    & > li{
        margin: 0;
        list-style-type: none;
        padding: 15px 50px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.753);
        cursor: pointer;
        transition: all .5s;
        position: relative;

        
        &:hover{
            color: rgba(255, 255, 255, 0.924);
            background-color: rgba(255, 255, 255, 0.082);
        }
        
        &.active{
            background-color: rgba(255, 255, 255, 0.082);

            &:before{
                content: '';
                display: block;
                width: 10px;
                height: 100%;
                background-color: #2f4077;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
`


export default SettingsSidenav;