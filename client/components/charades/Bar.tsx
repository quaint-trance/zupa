import styled from '@emotion/styled'
import useCanvas, { typeStyle } from '../../hooks/useCanvas'
import { animated, config, useTransition } from 'react-spring'

interface props{
   time: number;
}

const Bar:React.FC<props> = ({ time }) =>{

    const animatedProps = useTransition(true, null, {
        from:{
            width: "100%",
        },
        enter: {
            width: "0%",
        },
        config:{
            duration: time*1000
        }
    });


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
    min-width: 10px;
    background-color: #d81db9;
`

export default Bar;