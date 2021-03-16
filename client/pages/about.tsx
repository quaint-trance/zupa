import styled from "@emotion/styled"
import Loading from '../components/Loading'

export default function About(){

    return(
        <Container>
            <Loading/>
        </Container>
    )
}

const Container = styled.div`
    background: ${props=>props.theme.background};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`