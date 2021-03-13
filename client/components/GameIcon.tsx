import styled from '@emotion/styled'
import Link from 'next/link'

type props = {
    link: string,
    img: string,
}

const GameIcon:React.FC<props> = ({ link, img }) =>{

    return(
        <Link href={link}>
            <Container>
                <h2>Yatzy</h2>
                <div>
                    <img src={img} alt='icon' />
                </div>
            </Container>
        </Link>
    )
}

const Container = styled.div`
      z-index: 2;
      margin: 20px;
      border: solid 2px white;
      border-radius: 20px;
      cursor: pointer;
      color: white;
      width: 200px;
      height: 200px;
      display: grid;
      flex-direction: column;
      grid-template: auto 1fr / 1fr;
      padding: 20px;
      
    
      & > h2{
        margin: 0px;
        width: 100%;
        text-align: center;
      }
    
      & > div{
        display: flex;
        align-items: center;
        justify-content: center;

        & > *{
          height: 70%;
          width: 70%;
        }
      }
`

export default GameIcon;