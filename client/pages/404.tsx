import Link from 'next/link'
import styled from '@emotion/styled'

export default function FourOhFour() {
  return(
      <Container>
        <h1>404 - Page Not Found</h1>
            <Link href="/">
                <a>
                Go back home
                </a>
            </Link>
        </Container>
   ) 
}

const Container = styled.div`
    background: ${props=>props.theme.background};
    min-height: 100vh;
    color: ${props=>props.theme.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 15vh;

    & > a{
        border-bottom: 1px solid ${props=>props.theme.text};
    }
`