import React from 'react'
import { motion } from 'framer-motion';
import styled from '@emotion/styled'

type props = {
    style?: any;
    variants?:{
      initial: any,
      animate: any,
      exit: any,
    }
}

const variants = {
    initial: {
      opacity: 0,
    },
    animte:{
      opacity: 1,
    },
    exit:{
      opacity: 0,
    }
  }

const AnimatedPage: React.FC<props> = ({children, style, variants: customVariants}) =>{
    return(
        <Container
          exit={customVariants? customVariants.exit : variants.exit} 
          initial={customVariants? customVariants.initial : variants.initial} 
          animate={customVariants? customVariants.animate : variants.animte} 
          style={style} 
          className='content'
        >
            {children}
        </Container>
    )
}

const Container = styled(motion.div)`
`

export default AnimatedPage;