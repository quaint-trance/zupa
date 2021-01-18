import React from 'react'
import styled from '@emotion/styled'

interface props{
    score: number;
    selected?: boolean;
    onClick?: ()=>void;
}

const Dice:React.FC<props> = ({score, onClick, selected}) =>{
    return(
        
        <Container onClick={onClick} style={{borderWidth: selected?'2px':'1px'}}>
        
            <Dot style={[2, 3, 4, 5, 6].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[-3].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[4, 5, 6].includes(score) ? {} : {opacity: 0}}/>
            
            <Dot style={[6].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[1, 3, 5].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[6].includes(score) ? {} : {opacity: 0}}/>
            
            <Dot style={[4, 5, 6].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[-3].includes(score) ? {} : {opacity: 0}}/>
            <Dot style={[2, 3, 4, 5, 6].includes(score) ? {} : {opacity: 0}}/>            
        
        </Container>
    )
}


const Container = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 3px;
    border: solid rgb(0, 0, 0);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    padding: .3%;

    & > *{
        margin: 0 auto;
        pointer-events: none;
    }
    
`

const Dot = styled.div`
    height: 70%;
    width: 70%;
    background-color: #313131;
    border-radius: 100%;
`


export default Dice;