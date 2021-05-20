import React, { useRef } from 'react'
import { motion } from 'framer-motion';
import styled from 'styled-components';

import BackdropImg from '../../components/layout/BackdropImg';

const StyledMoviePageContainer = styled(motion.div)`
  grid-template-columns: 3fr 610px;
`;

export default function BackdropTemplate({ children, backdropPath }) {
  const backdropRef = useRef();
  
  return (
    <StyledMoviePageContainer exit={{ opacity: 1 }} className="grid">
      <BackdropImg backdropPath={backdropPath} backdropRef={backdropRef} />
      <div ref={backdropRef} />
      {children}
    </StyledMoviePageContainer >
  )
}
