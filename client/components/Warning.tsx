import React from 'react'
import { BsPhoneLandscape } from 'react-icons/bs'
import styled from '@emotion/styled'

type props = {

}

const Warning:React.FC<props> = () =>{

    return(
        <Container>
          <div>
            this website is only viewable in landscape mode
            <div className="icon"><BsPhoneLandscape /></div>
            <i>rotate your device</i>
          </div>
        </Container>

    )
}

const Container = styled.div`
  display: none;
  z-index: 250;
  overflow: hidden;
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .icon{
    display: flex;
    justify-content: center;
    font-size: 40px;
  }
  
  & > div{
    z-index: 251;
    position: fixed;
    background-color: orange;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 80vw;
    border-radius: 10px;
    font-size: 25px;
    text-align: justify;
  }

  i{
    display: flex;
    justify-content: center;
    margin: 5px;
    font-weight: 500;
  }

  @media only screen and (orientation:portrait){
     display:hidden;
  }
`

export default Warning;