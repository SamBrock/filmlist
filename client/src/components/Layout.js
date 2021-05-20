import React from 'react';
import styled from 'styled-components';

import Head from './Head';
import Header from './layout/Header';
import SideNav from './layout/SideNav';

const StyledLayoutContainer = styled.div`
  
`;

export default function Layout({ children }) {
  return (
    <StyledLayoutContainer>
      <Head />
      <Header />
      <SideNav />
      {children}
    </StyledLayoutContainer>
  )
}
