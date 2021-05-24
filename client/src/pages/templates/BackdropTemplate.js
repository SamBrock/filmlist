import React, { useRef } from 'react'
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useLocation } from 'react-router';

import BackdropImg from '../../components/layout/BackdropImg';

const StyledMoviePageContainer = styled(motion.div)`
  ${props => props.theme.mixins.backdropTemplateGrid}
`;

export default function BackdropTemplate({ children, backdropPath }) {
  const backdropRef = useRef();

  const { pathname } = useLocation();
  const hide = pathname === '/login' || pathname === '/register';

  return (
    <StyledMoviePageContainer exit={{ opacity: 1 }} className="grid">
      <BackdropImg backdropPath={backdropPath} backdropRef={backdropRef} className={hide ? 'hidden md:block' : ''} />
      <div ref={backdropRef} className={hide ? 'hidden md:block' : ''} />
      {children}
    </StyledMoviePageContainer >
  )
}
