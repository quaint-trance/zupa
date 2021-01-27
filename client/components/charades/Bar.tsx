import styled from '@emotion/styled'
import useCanvas, { typeStyle } from '../../hooks/useCanvas'
import { animated, config, useTransition } from 'react-spring'

interface props{
   time: number;
   drawing: number;
}

const Bar:React.FC<props> = ({ time, drawing }) =>{

    const animatedProps = useTransition(true, null, {
        from:{
            width: "100%",
            backgroundColor: 'green',
        },
        enter: {
            width: "0%",
            backgroundColor: 'red',
        },
        config:{
            duration: time*1000
        }
    });


    if(drawing === -1) return <Container style={{width: "0px"}} />

    return(
        <>
            {animatedProps.map(({item, key, props})=>{
                return item && <Container style={props} />
            })}
        </>
    )
}

const Container = styled(animated.div)`
    min-height: 10px;
`

export default Bar;