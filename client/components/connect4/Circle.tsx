import styled from '@emotion/styled'

interface props{
   row: undefined | number;
}

const Circle:React.FC<props> = ({ row }) =>{

    if(row === undefined || row===-1) return <Blank />;

    
    return(
        <Square color={colors[row >= 0 ? row : 4]} />
    )
}

const Full = styled.div`
    margin: 10px auto;
    width: 90%;

    overflow: hidden;
    &:before{
        border-radius: 50%;
        content:'';
        display: block;
        padding-bottom: 90%;
        background-color: ${props => props.color};
    } 
`

const Square = styled.div`
    height: 100%;
    margin: 10px;
    
    background-color: ${props => props.color};
`

const Blank = styled.div`
    margin: 10px; 
`

const colors = [
    'coral',
    'lightblue',
    'lightgreen',
    'orange',
    'pink'
]


export default Circle;